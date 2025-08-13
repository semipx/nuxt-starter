export default defineEventHandler((ev) => {
  const query = getQuery(ev)
  const locale = query.locale as string
  console.log(locale)
  throw createError({
    statusCode: 500,
    message: 'Data Not Found'
  })

  return query
})
