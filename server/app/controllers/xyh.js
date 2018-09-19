/**
 * 业务逻辑
 */

/**
 * 1. 捐赠名单
 */
const fs = require('fs')
const path = require('path')
// 捐赠信息保存在json文件中
const donate = JSON.parse(fs.readFileSync(path.join(__dirname, '../json/donate.json')))
async function getDonateList(ctx, next) {
    if(donate){
        ctx.state = {
            result: 1,
            data: donate
        }
    }
}

/**
 * 2. 新闻相关接口
 * 目前只返回原创文章
 */
// 读取新闻的json文件
const newsList = JSON.parse(fs.readFileSync(path.join(__dirname, '../json/news.json')))

async function getNewsList (ctx, next) {
    ctx.state = {
        result: 1,
        data: newsList
    }
}

module.exports = {
    getDonateList,
    getNewsList
}
