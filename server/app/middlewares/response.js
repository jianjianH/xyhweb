/**
 * 响应处理模块
 */
module.exports = async (ctx, next) => {
    try {
        // 调用下一个 middleware
        await next();

        // 处理响应结果
        // 如果直接写入在 body 中，则不作处理
        // 如果写在 ctx.body 为空，则使用 state 作为响应
        ctx.body = ctx.body ? ctx.body : {
            result: ctx.state.result !== undefined ? ctx.state.result : 0,
            data: ctx.state.data !== undefined ? ctx.state.data : { errorMsg: "empty data" }
        }
    } catch (e) {
        // 设置状态码为 200 - 服务端错误
        ctx.status = 200

        // 输出详细的错误信息
        ctx.body = {
            code: -1,
            error: e && e.message ? e.message : e.toString()
        }
    }
}
