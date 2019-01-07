/**
 * 对外请求的封装，比如查询微信服务器接口
 */

let http = require('http');
let https = require('https');
let qs = require('querystring');

String.prototype.format = (args) => {
	let result = this;
	if (arguments.length > 0) {
		if (arguments.length == 1 && typeof (args) == "object") {
			for (let key in args) {
				if (args[key] != undefined) {
					let reg = new RegExp("({" + key + "})", "g");
					result = result.replace(reg, args[key]);
				}
			}
		}
		else {
			for (let i = 0; i < arguments.length; i++) {
				if (arguments[i] != undefined) {
					let reg = new RegExp("({)" + i + "(})", "g");
					result = result.replace(reg, arguments[i]);
				}
			}
		}
	}
	return result;
};

let post = (host, port, path, data, callback) => {
	let content = qs.stringify(data);
	let options = {
		hostname: host,
		port: port,
		path: path + '?' + content,
		method: 'GET'
	};

	let req = http.request(options, (res) => {
		console.log('STATUS: ' + res.statusCode);
		console.log('HEADERS: ' + JSON.stringify(res.headers));
		res.setEncoding('utf8');
		res.on('data', (chunk) => {
			//console.log('BODY: ' + chunk);
			callback(chunk);
		});
	});

	req.on('error', (e) => {
		console.log('problem with request: ' + e.message);
	});

	req.end();
};

let get = (host, port, path, data, callback, safe) => {
	let content = qs.stringify(data);
	let options = {
		hostname: host,
		path: path + '?' + content,
		method: 'GET'
	};
	if (port) {
		options.port = port;
	}
	let proto = http;
	if (safe) {
		proto = https;
	}
	let req = proto.request(options, (res) => {
		res.setEncoding('utf8');
		res.on('data', (chunk) => {
			//console.log('BODY: ' + chunk);
			let json = JSON.parse(chunk);
			callback(true, json);
		});
	});

	req.on('error', function (e) {
		console.log('problem with request: ' + e.message);
		callback(false, e);
	});

	req.end();
};

let get2 = (url, data, callback, safe) => {
	let content = qs.stringify(data);
	url = url + '?' + content;
	let proto = http;
	if (safe) {
		proto = https;
	}
	let req = proto.get(url, (res) => {
		res.setEncoding('utf8');
		res.on('data', (chunk) => {
			let json = JSON.parse(chunk);
			callback(true, json);
		});
	});

	req.on('error', (e) => {
		console.log('problem with request: ' + e.message);
		callback(false, e);
	});

	req.end();
};

let send = (res, errcode, errmsg, data) => {
	if (data == null) {
		data = {};
	}
	data.errcode = errcode;
	data.errmsg = errmsg;
	let jsonstr = JSON.stringify(data);
	res.send(jsonstr);
};

module.exports = {
	post,
	get,
	get2,
	send,
}