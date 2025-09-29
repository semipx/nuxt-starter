import { promises as fs } from 'node:fs'
import stringify from 'json-stringify-pretty-compact'
import dotenv from 'dotenv'
import OpenAI from 'openai'
import en from '../i18n/locales/en.json'
import zh from '../i18n/locales/zh-hans.json'
import index from '../i18n/localeFiles'
import { localePrompt } from './prompts'

dotenv.config()
const openai = new OpenAI({
  baseURL: process.env.OPEN_ROUTER_URL,
  apiKey: process.env.OPEN_ROUTER_KEY
})

const getDiffKeys = (obj1: any, obj2: any) => {
  return Object.keys(obj2).reduce((diff: any, key) => {
    // eslint-disable-next-line
    if (!obj1.hasOwnProperty(key)) {
      diff[key] = obj2[key]
    }
    return diff
  }, {})
}
async function main(lang: string, reTranslateKey?: string[]) {
  const file = `./i18n/locales/${lang}.json`
  let exists: Record<string, any> = {}
  try {
    const existsStr = await fs.readFile(file, { encoding: 'utf-8' })
    exists = JSON.parse(existsStr)
  }
  catch (e: any) {
    console.log(`read error：${e.message}`)
  }
  if (reTranslateKey?.length) {
    for (const key of reTranslateKey) {
      // eslint-disable-next-line
      delete exists[key]
    }
  }
  const enDiff = getDiffKeys(exists, en)
  const zhDiff = getDiffKeys(exists, zh)
  if (!Object.keys(enDiff).length || !Object.keys(zhDiff).length) return

  const prompt = localePrompt(enDiff, zhDiff, lang)
  console.log(lang)
  // console.log(prompt)
  const res: any = await openai.chat.completions.create({
    model: 'openai/gpt-5',
    messages: [
      { role: 'system', content: 'You are a helpful assistant who is proficient in various languages and designed to output JSON.' },
      { role: 'user', content: prompt }
    ],
    temperature: 1,
    response_format: { type: 'json_object' }
  })
  console.log(`tokens: ${res.usage.total_tokens} (${res.usage.prompt_tokens} + ${res.usage.completion_tokens})`)
  const data = JSON.parse(res.choices[0].message.content)
  for (const key in data) {
    exists[key] = data[key]
  }

  await fs.writeFile(`./i18n/locales/${lang}.json`, stringify(exists))
}

// const badResult = ['da', 'fi', 'he', 'hu', 'id', 'it', 'th', 'tr'].map(lang => ({ code: lang }))
async function go() {
  for (const l of index) {
    if (l.code !== 'en' && l.code !== 'zh-Hans') {
      await main(l.code, [])
    }
  }
}

go()
