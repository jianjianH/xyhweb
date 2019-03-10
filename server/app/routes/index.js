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
router.get('/v1/user/login', xyh.login)

/**
 *  5. 管理后台相关
 */
const manage = require('../controllers/manage')
router.post('/v1/backstage/banner/add',manage.addBanner)
router.post('/v1/backstage/banner/update',manage.updateBanner)
router.get('/v1/backstage/banner/list',manage.getBannerList)
module.exports = router
