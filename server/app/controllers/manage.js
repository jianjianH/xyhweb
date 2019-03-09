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
    // 返回参数(暂时不清楚mysql返回自增主键的值是怎么样的)
    let returnBody = {
        "result": -1,
        "data": {
            'banner_id': 0
        }
    }
    db.insert(data, 'banner', (result) => {
        console.log(result);
        if (result) {
            returnBody.result = 1;
            //返回bannerId(返回mysql的自增主键)
            returnBody.data.banner_id = 123;
        } else {
            returnBody.result = 0;
        }
        ctx.state = returnBody;
    });
}


/**
 * 更新一条新的banner
 */
let updateBanner = async (ctx, next) => {
    // 请求参数
    let data = ctx.request.body;
    console.log(data);
    //获取到bannerId 作为修改条件
    let where = { 'id': data.banner_id };
    //获取到除了bannerId以外的其他需要修改的参数
    let paramsObject = data;
    //删除修改条件
    delete paramsObject.banner_id;
    console.log(paramsObject);
    // 返回参数(暂时不清楚mysql返回自增主键的值是怎么样的)
    let returnBody = {
        "result": -1,
        "data": {
            'banner_id': data.banner_id
        }
    }
    db.update(paramsObject, 'banner', where, (result) => {
        console.log(result);
        if (result) {
            returnBody.result = 1;
        } else {
            returnBody.result = 0;
        }

    });
}

module.exports = {
    addBanner,
    updateBanner
}