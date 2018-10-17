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
console.log("----------------------------")

let csl = 0.0;
for (let i = 0; i < donate.length; i++) {
    if(!donate[i].branch){
        csl += parseFloat(donate[i].money)
    }
}
console.log("北京校友会款数为：" + csl)

let jt = 0.0;
for (let i = 0; i < donate.length; i++) {
    if(donate[i].branch == '计统分会'){
        jt += parseFloat(donate[i].money)
    }
}
console.log("计统分会款数为：  " + jt)

let gs = 0.0;
for (let i = 0; i < donate.length; i++) {
    if(donate[i].branch == '工商分会'){
        gs += parseFloat(donate[i].money)
    }
}
console.log("工商分会款数为：  " + gs)

let cs = 0.0;
for (let i = 0; i < donate.length; i++) {
    if(donate[i].branch == '财税与公管'){
        cs += parseFloat(donate[i].money)
    }
}
console.log("财税与公管款数为：" + cs)

let cylh = 0.0;
for (let i = 0; i < donate.length; i++) {
    if(donate[i].branch == '创业联合会'){
        cylh += parseFloat(donate[i].money)
    }
}
console.log("创业联合会款数为：" + cylh)

let fx = 0.0;
for (let i = 0; i < donate.length; i++) {
    if(donate[i].branch == '法学分会'){
        fx += parseFloat(donate[i].money)
    }
}
console.log("法学分会款数为：  " + fx)

let gj = 0.0;
for (let i = 0; i < donate.length; i++) {
    if(donate[i].branch == '国际分会'){
        gj += parseFloat(donate[i].money)
    }
}
console.log("国际分会款数为：  " + gj)

let jj = 0.0;
for (let i = 0; i < donate.length; i++) {
    if(donate[i].branch == '经济分会'){
        jj += parseFloat(donate[i].money)
    }
}
console.log("经济分会款数为：  " + jj)
console.log("----------------------------")