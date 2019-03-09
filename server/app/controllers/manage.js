/**
 * 管理后台的相关接口
 */

 /**
  * 新建Banner(添加一条新的banner)
  */
 const db = require("../utils/db");
 const moment = require('moment')
 let addBanner = async (ctx,next)=>{
     // 请求参数
    let data = ctx.request.body;
    let now = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    data['create_time'] =  now;
    data['update_time'] =  now;
    console.log(data);
    // 返回参数(暂时不清楚mysql返回自增主键的值是怎么样的)
    let returnBody = {
        "result": 1,
        "data": {
            'banner_id':123
        }
    }
   db.insert(data,'banner',(result)=>{
       console.log(result)
   });
   console.log(result)
      //返回给前端banner_id
      ctx.state = returnBody;
 }
 

 module.exports = {
     addBanner
 }