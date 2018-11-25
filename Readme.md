##用于江财北京校友会后端服务##

总结目前后端代码的目录结构：

```
|-- xyhweb    建议使用 **Visual Studio Code** 打开
    |-- client    前端网页
    |   |-- code    将项目编译后的文件（build目录内容）放入到服务器对应目录
    |       |-- donate    北京校友会捐赠名单
    |       |-- donatenc    南昌校友会捐赠名单
    |-- server    后端服务，基于nodejs的[koa2](https://koa.bootcss.com/)框架
        |-- 后台接口文档.docx    所有的接口实现后必须添加在文档中
        |-- app    后端代码
            |-- app.js    nodejs入口文件，在此文件使用koa2框架
            |-- package.json
            |-- config    配置文件
            |   |-- index.js    声明正式环境与测试环境，因为目前咱们正式环境与测试环境都在同一台服务器，所以使用不同的端口来启动服务
            |   |-- log_config.js    声明日志信息，在服务器中目录有两个：**error**和**response**，并以时间来命名
            |   |-- log_init.js    在nodejs中初始化log信息
            |-- controllers    用于接口的具体逻辑实现
            |   |-- index.js    测试接口，目前没实际功能
            |   |-- xyh.js    当前接口均在此实现
            |-- json    静态结果返回
            |   |-- donate.json
            |   |-- ...
            |-- middlewares    中间件，用于通用功能封装
            |   |-- response.js    封装json返回值
            |-- routes    用于接口定义
            |   |-- index.js    
            |-- utils    工具类
            |   |-- log_util.js
            |-- views    使用服务器渲染网页时用，目前未用到
                |-- error.hjs
                |-- index.hjs
```