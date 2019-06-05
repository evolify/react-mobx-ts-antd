module.exports = ctx => {
  const { env } = ctx
  return {
    map: env === 'production' ? false : 'inline',
    parser: 'postcss-scss'
  }
}
