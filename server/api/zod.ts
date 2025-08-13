import { z } from 'zod'

const schema = z.object({
  locale: z.string()
})
export default defineEventHandler(async (ev) => {
  const query = await getValidatedQuery(ev, schema.parse)
  const locale = query.locale as string
  console.log(locale)

  return query
})
