// debug为false时，路径为: /home/jne/project/xyhweb/server/app
let debug = __dirname.indexOf('home/jne') > -1 ? (_dirname.indexOf('test') > -1 ? true : false) : true;

module.exports = {
  debug,
  port: debug ? 5001 : 5000,
}
