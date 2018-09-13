/**
 * 接口定义
 */
const router = require('koa-router')()
/**
 * 0. 测试接口：
 * https://www.jcbjxyh.cn/test
 */
const xyh = require('../controllers/xyh')
router.get('/test', xyh.test)

module.exports = router