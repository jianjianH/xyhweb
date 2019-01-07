/**
 * 加密
 * https://www.npmjs.com/package/crypto-js
 */

let md5Lib = require('crypto-js/md5');
let md5 = (content) => {
	return md5Lib(content).toString();
};

let toBase64 = (content) => {
	return new Buffer(content).toString('base64');
}

let fromBase64 = (content) => {
	return new Buffer(content, 'base64').toString();
}

module.exports = {
	md5,
	toBase64,
	fromBase64,
}
