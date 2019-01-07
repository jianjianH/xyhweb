此为小程序首页banner管理的后台需求文档。

![小程序红框内容](https://upload-images.jianshu.io/upload_images/115957-5658cecf55923251.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 页面说明：

小程序后台banner管理页，可以新增、修改banner页面。

	1.登录页面 - 此后台需要登录后才能修改。先使用固定帐号密码（帐号：jcbjxyh 密码：ve5r1*#d）
	2.banner列表 - 展示已有的banner，可以新增和修改，但不可删除，以备留档。
	3.banner新增修改

## 增改说明：

需要存在的选项：

	1.广告id  -  如果是修改banner，这个值存在。新建banner则不存在。
	2.类型  -  下拉列表，有两个选项: 0. 网址  1. 页面路径。
	3.Url  -  与类型有关：
		0.网址(eg: https://data.newrank.cn/m/s.html?s=OyksNS86Kik)  
		1.页面路径(eg: /pages/donate/donate)
	4.权重  -  用于banner显示排序，权重大的显示靠前
	5.开始时间  -  banner开始显示时间
	6.结束时间  -  banner结束显示时间
	7.imgurl  -  banner显示缩略图：
		缩略图建议尺寸为：750px * 375px（宽高比 - 2:1）。图片上传到七牛云服务器。

如果新增banner，图片需先上传，上传成功后获得图片地址，才能新建成功，