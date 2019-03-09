/**
 * mysql 封装
 * https://www.npmjs.com/package/mysql
 */

let mysql = require("mysql");
let crypto = require('./crypto');
let debug = require('../config').debug;

let pool = null;

// 空对象
let nop = (a, b, c, d, e, f, g) => { }

// 复用对象池
let query = (sql, callback) => {
    pool.getConnection((err, conn) => {
        if (err) {
            callback(err, null, null);
        } else {
            conn.query(sql, (qerr, vals, fields) => {
                // 释放连接
                conn.release();
                // 事件驱动回调
                callback(qerr, vals, fields);
            });
        }
    });
};

/**
 * 初始化 mysql 连接
 */
let init = () => {
    let config = debug ? require('../config/dbtest_config').config : require('../config/db_config').config;
    pool = mysql.createPool({
        host: config.HOST,
        user: config.USER,
        password: config.PSWD,
        database: config.DB,
        port: config.PORT,
    });
};

// 执行数据库初始化
init();

/**
 * 通用的查询单个或者列表的数据方法
 * @param {*} sql 参数对象
 * @param {*} callback 回调函数
 */
let select = (sql) => {
  return new Promise((resolve, reject) => {
    query(sql, (err, result) => {
      if (err) {
        console.log(err)
        resolve(null);
      }

      if (result.length == 0) {
        resolve(null);
      } else {
        resolve(result);
      }
    });
  });
}

/**
 * 通用的插入数据方法
 * @param {*} paramObject 参数对象
 * @param {*} tableName 表名
 */
let insert = (paramObject, tableName) => {
    return new Promise((resolve, reject) => {
      let fields = '';
      let values = '';
      for(let k in paramObject){
          fields += k + ',';
          values = values + "'" + paramObject[k] + "',";
      }
      fields = fields.slice(0, -1);
      values = values.slice(0, -1);
      let sql = "INSERT INTO " + tableName + '(' + fields + ') VALUES(' + values + ')';
      console.log('sql:' + sql)

      query(sql, (err, rows, fields) => {
        if (err) {
            // 重复键名称'%s'
            if (err.code == 'ER_DUP_ENTRY') {
              console.log(err)
              resolve(false);
            }
            resolve(false);
        }
        else {
          resolve(true);
        }
    });
  })
}

/**
 * 通用的修改数据方法
 * @param {*} paramObject 参数对象
 * @param {*} tableName 表名
 */
let update = (paramObject, tableName, where, callback) => {
  return new Promise((resolve, reject) => {
    let params = '';
    let whereStr = '';
    for(let i in paramObject){
        params += i + "='" + paramObject[i] + "',";
    }
    params = params.slice(0,-1);
    for(let j in where){
        whereStr += j + "='" + where[j] + "'";
    }
    // update table set username='admin2',age='55' where id="5";
    let sql = "UPDATE "+ tableName + ' SET ' + params + ' WHERE ' + whereStr;
    console.log('sql:' + sql)
    query(sql, (err, rows, fields) => {
        if (err) {
            console.log(err)
            resolve(false);
        } else {
            resolve(true);
        }
    });
  })
}

module.exports = {
    query,
    init,
    isAccountExist,
    createAccount,
    getAccountInfo,
    select,
    insert,
    update,
}
