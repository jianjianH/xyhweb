const log4js = require('log4js');
const log_config = require('../config/log_config');

// 加载配置文件
log4js.configure(log_config);

let logUtil = {};
// 调用预先定义的日志名称
let resLogger = log4js.getLogger("resLogger");
let errorLogger = log4js.getLogger("errorLogger");
let consoleLogger = log4js.getLogger();

// 封装错误日志
logUtil.logError = (ctx, error, resTime) => {
    if (ctx && error) {
        errorLogger.error(_formatError(ctx, error, resTime || 0));
    }
};

// 封装响应日志
logUtil.logResponse = (ctx, resTime) => {
    if (ctx) {
        resLogger.info(_formatRes(ctx, resTime || 0));
    }
};

logUtil.logInfo = (info) => {
    if (info) {
        consoleLogger.info(_formatInfo(info));
    }
};

let _formatInfo = (info) => {
    let logText = new String();
    // 响应日志开始
    logText += "\n" + "***************info log start ***************" + "\n";

    // 响应内容
    logText += "info detail: " + "\n" + JSON.stringify(info) + "\n";

    // 响应日志结束
    logText += "*************** info log end ***************" + "\n";

    return logText;
}

// 格式化响应日志
let _formatRes = (ctx, resTime) => {
    let logText = new String();
    // 响应日志开始
    logText += "\n" + "*************** response log start ***************" + "\n";

    // 添加请求日志
    logText += _formatReqLog(ctx.request, resTime);

    // 响应状态码
    logText += "response status: " + ctx.status + "\n";

    // 响应内容
    // 只在测试环境打印响应内容，正式环境log太多了
    if (__dirname.indexOf('test') > 0) logText += "response body: " + "\n" + JSON.stringify(ctx.body) + "\n";

    // 响应日志结束
    logText += "*************** response log end ***************" + "\n";

    return logText;
}

// 格式化错误日志
let _formatError = (ctx, err, resTime) => {
    let logText = new String();

    // 错误信息开始
    logText += "\n" + "*************** error log start ***************" + "\n";

    // 添加请求日志
    logText += _formatReqLog(ctx.request, resTime || 0);

    // 错误名称
    logText += "err name: " + err.name + "\n";
    // 错误信息
    logText += "err message: " + err.message + "\n";
    // 错误详情
    logText += "err stack: " + err.stack + "\n";

    // 错误信息结束
    logText += "*************** error log end ***************" + "\n";

    return logText;
};

// 格式化请求日志
let _formatReqLog = (req, resTime) => {
    let logText = new String();

    let method = req.method;
    // 访问方法
    logText += "request method: " + method + "\n";

    // 请求原始地址
    logText += "request originalUrl:  " + req.originalUrl + "\n";

    // 客户端ip
    logText += "request client ip:  " + req.ip + "\n";

    // 请求参数
    if (method === 'GET') {
        logText += "request query:  " + JSON.stringify(req.query) + "\n";
        // startTime = req.query.requestStartTime;
    } else {
        logText += "request body: " + "\n" + JSON.stringify(req.body) + "\n";
        // startTime = req.body.requestStartTime;
    }
    // 服务器响应时间
    logText += "response time: " + (resTime || 0) + "\n";

    return logText;
}

module.exports = logUtil;