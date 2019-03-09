/**
 * 对外请求的封装，比如查询微信服务器接口
 * 只查询 https 接口
 */

let https = require('https');
let qs = require('querystring');

let get = (url, data) => {
  return new Promise((resolve, reject) => {
    let content = qs.stringify(data);
    url = url + '?' + content;
    let proto = https;
    let req = proto.get(url, (res) => {
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        let json = JSON.parse(chunk);
        let result = {
          'success': true,
          'data': JSON.stringify(json)
        }
        console.log("get result:" + JSON.stringify(result))
        resolve(result);
      });
    });

    req.on('error', (e) => {
      let result = {
        'success': false,
        'data': e
      }
      console.log("get erro:" + JSON.stringify(result))
      resolve(result);
    });

    req.end();
  });
};

module.exports = {
	get,
}
