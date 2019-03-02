/**
 * 业务逻辑
 */

/**
 * 1. 捐赠名单
 */
const fs = require('fs')
const path = require('path')
// 捐赠信息保存在json文件�
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
 * 目前只返回原创文�
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
 * 3. 足球队相关接�
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
    let login = async (ctx, next) => {
        const query = ctx.request.query;//请求参数
        let code = query.code;
        //返回的对�
        let returnBody = {
            'errCode': undefined,
            'Msg': undefined,
            'isSuccess': undefined
        }
        wxLogin(code, (json) => {
            console.log("login callback:" + JSON.stringify(json))
            if (json.result === -2) {
                // 网络请求失败
                // todo错误怎么使用
                let error = json.data;

                //返回提示�网络不稳定，请稍后重�
                returnBody.errCode = '10001';
                returnBody.isSuccess = false;
                returnBody.Msg = '网络不稳定，请稍后重�;
                ctx.state = {
                    result: 1,
                    data: returnBody
                }
            } else if (json.result === -1) {
                // 微信后台返回错误
                // { errcode: 40163, errmsg: 'code been used, hints: [ req_id: TlLAKnACe-Q1gs9 ]' }
                // todo完善返回�
                let data = json.data;
                let errcode = data.errcode;
                let errmsg = data.errmsg;

                //返回提示�请重新登�
                returnBody.errCode = errcode;
                returnBody.isSuccess = false;
                returnBody.Msg = '请重新登�;
                ctx.state = {
                    result: 1,
                    data: returnBody
                }

    
            } else if (json.result === 1) {
                // 微信返回成功
                // { session_key: 'V5+NDP7UYa/eH7xZH5goAw==', openid: 'ozTUr5MGg1rLI17T8w5DwsbgO4z8' }
                // todo完善返回�
                let data = json.data;
                let session_key = data.session_key;
                let openid = data.openid;

                //保存数据库中

                 //返回提示�请重新登�
                 returnBody.isSuccess = true;
                 returnBody.Msg = '登录成功';
                 ctx.state = {
                     result: 1,
                     data: returnBody
                 }
    
            }
        });
    }
}

/**
 * 调用微信登录的api
 * @param {*} code 
 */
const http = require("../utils/http");
const app_config = require("../config/app_config").config;
let wxLogin = (code, callback) => {
    let wxAppId = app_config.AppID;
    let wxSecret = app_config.AppSecret;
    let url = "https://api.weixin.qq.com/sns/jscode2session?appid=" + wxAppId + "&secret=" + wxSecret +
        "&js_code=" + code + "&grant_type=authorization_code";
    http.get2(url, null, (success, jsonStr) => {
        console.log(jsonStr)
        if (success) {
            // 接口调用成功
            let json = JSON.parse(JSON.stringify(jsonStr));
            if (json.errcode) {
                // { errcode: 40163, errmsg: 'code been used, hints: [ req_id: TlLAKnACe-Q1gs9 ]' }
                // 错误回调
                let callJson = { "result": -1, "data": JSON.stringify(json) };
                callback(callJson);
            } else {
                // { session_key: 'V5+NDP7UYa/eH7xZH5goAw==', openid: 'ozTUr5MGg1rLI17T8w5DwsbgO4z8' }
                // 成功回调
                let callJson = { "result": 1, "data": JSON.stringify(json) };
                callback(callJson);
            }
        } else {
            // 接口调用失败
            // 错误回调
            let callJson = { "result": -2, "data": jsonStr };
            callback(callJson);
        }
    }, true);
}

module.exports = {
    getDonateList,
    getDonateNcList,
    getNewsList,
    getPlayerList,
    getPlayerPhotos,
    login
}
