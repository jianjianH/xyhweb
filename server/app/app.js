const Koa = require('koa')
const app = new Koa()

const views = require('koa-views')
const co = require('co')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const debug = require('debug')('koa2:server')
const path = require('path')

const config = require('./config')
const response = require('./middlewares/response')
const router = require('./routes')
const port = process.env.PORT || config.port

// error handler
onerror(app)

// middlewares
app
  .use(response)
  .use(bodyparser())
  .use(json())
  .use(logger())
  // .use(require('koa-static')(__dirname + '/public'))
  .use(require('koa-static')(path.join(__dirname, './../../client')))
  .use(views(path.join(__dirname, '/views'), {
    options: {settings: {views: path.join(__dirname, 'views')}},
    map: {'hjs': 'hogan'},
    extension: 'hjs'
  }))
  .use(router.routes())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - $ms`)
})

app.on('error', function(err, ctx) {
  console.log(err)
  logger.error('server error', err, ctx)
})

module.exports = app.listen(config.port, () => {
  console.log(`Listening on http://localhost:${config.port}`)
})
