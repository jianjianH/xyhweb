/**
 * 计算捐款总数
 */
const fs = require('fs')
const path = require('path')
// 捐赠信息保存在json文件中
const donate = JSON.parse(fs.readFileSync(path.join(__dirname, '../json/donate.json')))
let sum = 0.0;
for (let i = 0; i < donate.length; i++) {
    sum += parseFloat(donate[i].money)
}
console.log("目前收到的总捐款数为：" + sum)