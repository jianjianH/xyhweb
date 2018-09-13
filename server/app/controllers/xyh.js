/**
 * 业务逻辑
 */
async function test (ctx, next) {
    // 当没有查询字符串时，返回一个空对象
    ctx.state = {
        data: 'test data'
    }
}

module.exports = {
    test
}
