// 测试接口是否正常
async function test(ctx, next) {
    ctx.state = {
        data: 'test data'
    }
}

const logUtil = require('../utils/log_util');
// 测试log是否正常
async function testlog(ctx, next) {
    //记录响应日志
    logUtil.logResponse(ctx);
    //记录异常日志
    logUtil.logError(ctx, new Error("test error"));
}

module.exports = {
    test,
    testlog
}