import type { FetchOptions, FetchRequest } from 'ofetch'
import { ofetch } from 'ofetch'

export function useOFetch() {
  const { errorHandle } = useModal()
  const router = useRouter()
  const localePath = useLocalePath()
  const { t } = useI18n()
  // const { csrf } = useCsrf()
  async function $ofetch<T = unknown>(input: FetchRequest, options?: FetchOptions) {
    const headers = {
      // 'csrf-token': csrf,
      ...(options?.headers || {})
    } as any
    return await ofetch<T>(input, {
      timeout: 15000,
      ...options,
      headers
    }).catch((error) => {
      if (error.message.includes('TimeoutError')) {
        throw new Error(t('timeout'))
      }
      if (error.message.includes('AbortError')) {
        throw new Error(t('networkErr'))
      }
      if (error.statusCode === 401 && router.currentRoute.value.path !== '/login') {
        router.push(localePath({
          path: '/login',
          query: { redirect: router.currentRoute.value.fullPath }
        }))
        throw new Error(t('needLogin'))
      }
      // nuxt-i18n useTranslation bug workaround https://github.com/nuxt-modules/i18n/issues/3725
      function handleI18nError(message: string) {
        if (message.startsWith('i18n.')) {
          return t(message.replace('i18n.', ''))
        }
        return message
      }
      if (error.data.data?.name === 'ZodError') {
        const messages = JSON.parse(error.data.message)
        throw new Error(handleI18nError(messages[0].message))
      }
      throw new Error(handleI18nError(error.data.message || error.data.statusMessage))
    })
  }
  async function oFetch<T = unknown>(input: FetchRequest, options?: FetchOptions) {
    return await $ofetch<T>(input, options).catch((error) => {
      errorHandle(error)
      return null
    })
  }
  return {
    $ofetch,
    oFetch
  }
}
