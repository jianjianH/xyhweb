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
router.get('/v1/donate/getDonateNcList', xyh.getDonateNcList)

/**
 * 2. 新闻
 */
router.get('/v1/news/getNewsList', xyh.getNewsList)

/**
 * 3. 足球队
 */
router.get('/v1/football/getPlayerList', xyh.getPlayerList)
router.get('/v1/football/getPlayerPhotos', xyh.getPlayerPhotos)

/**
 * 4. 用户登录
 */
router.get('/v2/xyh/login',xyh.login)

module.exports = router