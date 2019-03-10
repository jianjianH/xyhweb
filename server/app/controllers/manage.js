/**
 * 管理后台的相关接口
 */

/**
 * 新建Banner(添加一条新的banner)
 */
const db = require("../utils/db");
const moment = require('moment')
let addBanner = async (ctx, next) => {
    // 请求参数
    let data = ctx.request.body;
    let now = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    data['create_time'] = now;
    data['update_time'] = now;
    console.log(data);
    let returnBody = {
        "result": -1,
        "data": {
            'banner_id': 0
        }
    }
    let insertResult = await db.insert(data, 'banner');
    console.log('insert banner --->' + insertResult);
    // 获取增加主键id：此时获取到的是一个json数组[ { 'LAST_INSERT_ID()': 30 } ]
    let LAST_INSERT_ID = await db.select('SELECT LAST_INSERT_ID();');
    console.log('自增主键-->' + LAST_INSERT_ID);
    let singleObj = LAST_INSERT_ID[0];
    // 由于不能直接 singleObj.LAST_INSERT_ID()取出(会报错)   只能通过循环遍历
    let banner_id = 0;
    for (let i in singleObj) {
        banner_id = singleObj[i];
    }
    // 组装返回参数
    returnBody.result = insertResult ? 1 : 0;
    returnBody.data.banner_id = banner_id;
    ctx.state = returnBody;
}


/**
 * 更新一条新的banner
 */
let updateBanner = async (ctx, next) => {
    // 请求参数
    let data = ctx.request.body;
    console.log(data);
    // 获取到bannerId 作为修改条件
    let where = { 'id': data.banner_id };
    //获取到除了bannerId以外的其他需要修改的参数
    let paramsObject = data;
    // 删除修改条件
    delete paramsObject.banner_id;
    console.log(paramsObject);
    let returnBody = {
        "result": -1,
        "data": {
            'banner_id': where.id
        }
    }
    let updateResult = await db.update(paramsObject, 'banner', where);
    console.log('update banner -->' + updateResult);
    returnBody.result = updateResult ? 1 : 0;
    ctx.state = returnBody;
}

/**
 * 获取所有banner
 */
let getBannerList = async (ctx, next) => {
    let sql = "SELECT id AS banner_id,banner_type,url,image_url,weight,begin_time AS start_time,end_time FROM `banner` ;"
    let bannerList = await db.select(sql);
    let returnBody = {
        "result": -1,
        "data": {

        }
    }
    if (bannerList == undefined) {
        returnBody.result = 0;
    } else {
        returnBody.result = 1;
        returnBody.data = bannerList;
    }
    ctx.state = returnBody;
}

module.exports = {
    addBanner,
    updateBanner,
    getBannerList
}
