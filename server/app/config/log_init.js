const fs = require('fs');
const log_config = require('./log_config');

/**
 * 确定目录是否存在，如果不存在则创建目录
 */
let confirmPath = function (pathStr) {
    if (!fs.existsSync(pathStr)) {
        fs.mkdirSync(pathStr);
        console.log('createPath: ' + pathStr);
    }
}

/**
 * 初始化log相关目录
 */
let initLogPath = function () {
    // 创建log的根目录'logs'
    if (log_config.baseLogPath) {
        confirmPath(log_config.baseLogPath)
        // 根据不同的logType创建不同的文件目录
        for (let i = 0, len = log_config.appenders.length; i < len; i++) {
            if (log_config.appenders[i].path) {
                confirmPath(log_config.baseLogPath + log_config.appenders[i].path);
            }
        }
    }
}

module.exports = {
    initLogPath
}