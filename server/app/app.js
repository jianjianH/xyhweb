const Koa = require('koa')
const app = new Koa()

const views = require('koa-views')
const co = require('co')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const debug = require('debug')('koa2:server')
const path = require('path')
const cors = require('koa-cors');

const config = require('./config')
const response = require('./middlewares/response')
const router = require('./routes')

// 初始化log4js目录
const initLog = require('./config/log_init')
initLog.initLogPath();

// log工具
const logUtil = require('./utils/log_util');
// logger
app.use(async (ctx, next) => {
  const start = new Date();
  //响应时间
  let ms = 0;
  try {
    //开始进入到下一个中间件
    await next();

    ms = new Date() - start;
    logUtil.logResponse(ctx, ms);
  } catch (error) {

    ms = new Date() - start;
    //记录异常日志
    logUtil.logError(ctx, error, ms);
  }
});

// error handler
onerror(app)

// middlewares
app
  .use(cors())
  .use(response)
  .use(bodyparser())
  .use(json())
  .use(require('koa-static')(path.join(__dirname, './../../client')))
  .use(views(path.join(__dirname, '/views'), {
    options: { settings: { views: path.join(__dirname, 'views') } },
    map: { 'hjs': 'hogan' },
    extension: 'hjs'
  }))
  .use(router.routes())

app.on('error', function (err, ctx) {
  console.log(err)
  logger.error('server error', err, ctx)
})

module.exports = app.listen(config.port, () => {
  console.log(`Listening on http://localhost:${config.port}`)
})
