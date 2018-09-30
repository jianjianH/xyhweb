/**
 * 接口定义
 */
const router = require('koa-router')()
/**
 * 0. 测试接口：
 * https://www.jcbjxyh.cn/test
 */
const index = require('../controllers/index')
router.get('/test', index.test)
router.get('/testlog', index.testlog)

/**
 * 1. 捐赠
 */
// 获取捐赠名单
const xyh = require('../controllers/xyh')
router.get('/v1/donate/getDonateList', xyh.getDonateList)

/**
 * 2. 新闻
 */
router.get('/v1/news/getNewsList', xyh.getNewsList)

module.exports = router