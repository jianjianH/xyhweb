/**
 * 业务逻辑
 */

/**
 * 捐赠名单
 */
const fs = require('fs')
const path = require('path')
// 捐赠信息保存在json文件中
const donate = JSON.parse(fs.readFileSync(path.join(__dirname, '../json/donate.json')))
async function getDonateList(ctx, next) {
    ctx.state = {
        data: donate
    }
}

module.exports = {
    getDonateList
}
