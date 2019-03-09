/**
 * 管理后台的相关接口
 */

 /**
  * 新建Banner(添加一条新的banner)
  */
 const db = require("../utils/db");
 let addBanner = async (ctx,next)=>{
     // 请求参数
    const query = ctx.request.query;
    console.log(query);
 }

 module.exports = {
     addBanner
 }