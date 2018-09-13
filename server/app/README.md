江财北京校友会工程，基于koa框架搭建
===================

〇、 测试接口
-------------
https://www.jcbjxyh.cn/test

一、 捐赠
-------------
网站：  
https://www.jcbjxyh.cn/donate/#/  
接口：  
>1. 获取捐款名单  
https://www.jcbjxyh.cn/v1/donate/getDonateList  

| key    | type   | describle |
| :----: | :----: | :-------: |
| name   | string |  名称     |
| grade  | string |  入学年级  |
| money  | float  |  捐款金额  |
| date   | string |  捐款时间  |

eg:
{
    "result": 1,
    "data": [
        {
            "name": "黄*",
            "grade": "02金融",
            "money": "2000",
            "date": "9月14日"
        },
        {
            "name": "王*",
            "grade": "92审计",
            "money": "20000",
            "date": "9月14日"
        }
    ]
}