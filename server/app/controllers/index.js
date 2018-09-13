// 测试接口是否正常
async function test(ctx, next) {
    ctx.state = {
        data: 'test data'
    }
}

module.exports = {
    test
}