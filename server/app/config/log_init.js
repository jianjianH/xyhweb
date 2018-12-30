const fs = require('fs');
const log_config = require('./log_config');

/**
 * 确定目录是否存在，如果不存在则创建目录
 */
let _confirmPath = (pathStr) => {
    if (!fs.existsSync(pathStr)) {
        fs.mkdirSync(pathStr);
        console.log('createPath: ' + pathStr);
    }
}

/**
 * 初始化log相关目录
 */
let initLogPath = () => {
    // 创建log的根目录'logs'
    if (log_config.baseLogPath) {
        _confirmPath(log_config.baseLogPath);
        // 根据不同的logType创建不同的文件目录
        for (let i = 0, len = log_config.appenders.length; i < len; i++) {
            if (log_config.appenders[i].path) {
                _confirmPath(log_config.baseLogPath + log_config.appenders[i].path);
            }
        }
    }
}

module.exports = {
    initLogPath
}