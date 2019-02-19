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
let getDonateList = async (ctx, next) => {
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
let getDonateNcList = async (ctx, next) => {
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
let getNewsList = async (ctx, next) => {
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

let getPlayerList = async (ctx, next) => {
    ctx.state = {
        result: 1,
        data: players
    }
}

let getPlayerPhotos = async (ctx, next) => {
    const query = ctx.request.query
    let order = query.order
    let photos = []
    for (let i = 0; i < playerList.length; i++) {
        if (playerList[i].order == order) {
            photos = playerList[i].photos
        }
    }
    ctx.state = {
        result: 1,
        data: photos
    }
}

/**
 * 用户登录
 * @param {} ctx 
 * @param {*} next 
 */
let login = async (ctx,next) => {

    // const query = ctx.request.query;//请求参数
    // let code = query.code;
    let res = wxLogin("code");
    console.log(res);
    // console.log("测试");
    ctx.state = {
        result: 1,
        data:""
    }
}

/**
 * 调用微信登录的api
 * @param {*} code 
 */
const http = require("../utils/http")
let wxLogin = function(code){

    let wxAppId = "wxa0faf64a2bcaf71a";
    let wxSecret = "";
    let url = "https://api.weixin.qq.com/sns/jscode2session?appid=" + wxAppId + "&secret=" + wxSecret +
    "&js_code="+ code +"&grant_type=authorization_code";
    let res = http.get2(url,null,null,1);

    //保存数据库
    return res;
    console.log(res);
}

module.exports = {
    getDonateList,
    getDonateNcList,
    getNewsList,
    getPlayerList,
    getPlayerPhotos,
    login
}
