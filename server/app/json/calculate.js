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
console.log("总捐款人数为：" + donate.length)
console.log("----------------------------")

let csl = 0.0;
let cslr = 0;
for (let i = 0; i < donate.length; i++) {
    if(!donate[i].branch){
        // console.log(donate[i])
        cslr ++;
        csl += parseFloat(donate[i].money)
    }
}
console.log("北京校友会款数为：" + csl)
console.log("北京校友会人数为：" + cslr)
console.log()

let jt = 0.0;
let jtr = 0;
for (let i = 0; i < donate.length; i++) {
    if(donate[i].branch == '计统分会'){
        jtr ++;
        jt += parseFloat(donate[i].money)
    }
}
console.log("计统分会款数为：  " + jt)
console.log("计统分会人数为：  " + jtr)
console.log()

let gs = 0.0;
let gsr = 0;
for (let i = 0; i < donate.length; i++) {
    if(donate[i].branch == '工商分会'){
        gsr ++;
        gs += parseFloat(donate[i].money)
    }
}
console.log("工商分会款数为：  " + gs)
console.log("工商分会人数为：  " + gsr)
console.log()

let cs = 0.0;
let csr = 0;
for (let i = 0; i < donate.length; i++) {
    if(donate[i].branch == '财税与公管'){
        csr ++;
        cs += parseFloat(donate[i].money)
    }
}
console.log("财税与公管款数为：" + cs)
console.log("财税与公管人数为：" + csr)
console.log()

let cylh = 0.0;
let cylhr = 0;
for (let i = 0; i < donate.length; i++) {
    if(donate[i].branch == '创业联合会'){
        cylhr ++;
        cylh += parseFloat(donate[i].money)
    }
}
console.log("创业联合会款数为：" + cylh)
console.log("创业联合会人数为：" + cylhr)
console.log()

let fx = 0.0;
let fxr = 0;
for (let i = 0; i < donate.length; i++) {
    if(donate[i].branch == '法学分会'){
        fxr ++;
        fx += parseFloat(donate[i].money)
    }
}
console.log("法学分会款数为：  " + fx)
console.log("法学分会人数为：  " + fxr)
console.log()

let gj = 0.0;
let gjr = 0;
for (let i = 0; i < donate.length; i++) {
    if(donate[i].branch == '国际分会'){
        gjr ++;
        gj += parseFloat(donate[i].money)
    }
}
console.log("国际分会款数为：  " + gj)
console.log("国际分会人数为：  " + gjr)
console.log()

let jj = 0.0;
let jjr = 0;
for (let i = 0; i < donate.length; i++) {
    if(donate[i].branch == '经济分会'){
        jjr ++;
        jj += parseFloat(donate[i].money)
    }
}
console.log("经济分会款数为：  " + jj)
console.log("经济分会人数为：  " + jjr)
console.log("----------------------------")