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
const db = require("../utils/db");
const moment = require('moment')
let login = async (ctx, next) => {
    // 请求参数
    const query = ctx.request.query;
    let code = query.code;
    // 返回的对象
    let returnBody = {
        'errCode': undefined,
        'Msg': undefined,
        'isSuccess': undefined
    }

    await wxLogin(code, (json) => {
        console.log("login callback:" + JSON.stringify(json))
        // // todo
        // returnBody.isSuccess = 1;
        // returnBody.Msg = '登录成功';
        // ctx.state = {
        //     "result": 1,
        //     "data": returnBody
        // }

        if (json.result === -2) {
            // 网络请求失败
            let error = json.data;

            // 返回提示语"网络不稳定，请稍后重试"
            returnBody.errCode = '10001';
            returnBody.isSuccess = 0;
            returnBody.Msg = '网络不稳定，请稍后重试' + error;
            ctx.state = {
                result: 1,
                data: returnBody
            }
            return;
        } else if (json.result === -1) {
            // 微信后台返回错误
            // { errcode: 40163, errmsg: 'code been used, hints: [ req_id: TlLAKnACe-Q1gs9 ]' }
            let data = json.data;
            let errcode = data.errcode;
            let errmsg = data.errmsg;

            // 返回提示语"请重新登录"
            returnBody.errCode = errcode;
            returnBody.isSuccess = 0;
            returnBody.Msg = '请重新登录' + errmsg;
            ctx.state = {
                result: 1,
                data: returnBody
            }
        } else if (json.result === 1) {
            // 微信返回成功
            // { session_key: 'V5+NDP7UYa/eH7xZH5goAw==', openid: 'ozTUr5MGg1rLI17T8w5DwsbgO4z8' }
            let data = JSON.parse(json.data);
            let session_key = data.session_key;
            let openid = data.openid;

            // 保存数据库中
            // 调用db.js中的插入方法
            // 获取当前时间
            let date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
            // 根据openid查询数据库是否有值，无值则插入
            let sql = 'SELECT * FROM T_APPLET_USER WHERE openid = "' + openid + '"';
            db.select(sql, (result) => {
                // 数据库无值，插入
                if(result == null) {
                    let paramObject = {
                        "openid": openid,
                        "user_status": 1,// 用户状态：0 已退出校友会；1 目前在校友会
                        "create_time": date,
                        "update_time": date
                    }
                    db.insert(paramObject, "T_APPLET_USER", (result) => {
                        // 返回为true
                        if(result){
                            returnBody.isSuccess = 1;
                            returnBody.Msg = '登录成功';
                            ctx.state = {
                                result: 1,
                                data: returnBody
                            }
                        }else{
                            returnBody.isSuccess = 0;
                            returnBody.Msg = '登录失败，保存数据库失败';
                            returnBody.errCode = '10002';
                            ctx.state = {
                                result: 0,
                                data: returnBody
                            }
                        }
                    });
                }else {
                    returnBody.isSuccess = 1;
                    returnBody.Msg = '登录成功';
                    ctx.state = {
                        "result": 1,
                        "data": returnBody
                    }
                    console.log(ctx.state)
                }
            });
        }
    });
}

/**
 * 调用微信登录的api
 * @param {*} code
 */
const http = require("../utils/http");
const app_config = require("../config/app_config").config;
let wxLogin = async (code, callback) => {
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

// 测试 使用banner表测试
let testAdd = async (ctx, next) => {
  let paramObject = {
    "banner_type": 1,
    "url":"www.jnehuang.cn",
    "image_url":"https://jnehuang.cn",
    "weight":100,
    "begin_time":"2019-3-2",
    "end_time":"2019-3-3"
  }
  console.log("test insert")
  db.insert(paramObject, "banner", (result) => {
    console.log(result);
    ctx.state = {
      result: 1,
      data: {'nice': result}
    }
  });
}
let testQuery = async (ctx, next) => {
  db.select("select * from banner", (result) => {
    console.log(result);
  });
}
let testUpdate = async (ctx, next) => {
  let paramObject = {
    "banner_type": 2,
    "weight": 99
  }
  let where = {
    "end_time":"2019-3-3"
  }
  db.update(paramObject, "banner", where, (result) => {
    console.log(result);
  });
}

module.exports = {
    testAdd,
    testQuery,
    testUpdate,
    getDonateList,
    getDonateNcList,
    getNewsList,
    getPlayerList,
    getPlayerPhotos,
    login
}
