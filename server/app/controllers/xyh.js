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
 * 为南昌校友会提供捐款接口
 */
const donatenc = JSON.parse(fs.readFileSync(path.join(__dirname, '../json/donatenc.json')))
async function getDonateNcList(ctx, next) {
    if(donatenc){
        ctx.state = {
            result: 1,
            data: donatenc
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

/**
 * 3. 足球队相关接口
 */
const playerList = JSON.parse(fs.readFileSync(path.join(__dirname, '../json/football.json')))
// 获取用户列表，目的是将playerList中photos字段去除
let player = {
    'username': undefined,
    'sportSuit': undefined,
    'order': undefined,
    'avatar': undefined
}
let players = new Array(playerList.length)

for (var i = 0; i < playerList.length; i++) {
    player = {}
    player.username = playerList[i].username
    player.sportSuit = playerList[i].sportSuit
    player.order = playerList[i].order
    player.avatar = playerList[i].avatar
    players[i] = player
}

async function getPlayerList (ctx, next) {
    ctx.state = {
        data: players
    }
}

async function getPlayerPhotos (ctx, next) {
    const query = ctx.request.query
    let order = query.order
    let photos = []
    for (let i = 0; i < playerList.length; i++) {
        if (playerList[i].order == order) {
            photos = playerList[i].photos
        }
    }
    ctx.state = {
        data: photos
    }
}

module.exports = {
    getDonateList,
    getDonateNcList,
    getNewsList,
    getPlayerList,
    getPlayerPhotos,
}
