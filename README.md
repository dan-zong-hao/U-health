# U-health
基于Flask+ECharts的可视化大屏

需要环境mysql数据库

各类python的库

先运行一遍spider.py更新数据库

然后直接运行app.py到本地网页查看即可

效果如图90%查看页面最佳
![首页](https://user-images.githubusercontent.com/75935737/164441225-770a35e5-66d4-4994-836d-16c2948bae37.jpg)
首页效果图
![开发模式的code的console提示](https://user-images.githubusercontent.com/75935737/164441508-159ab1f8-467b-4815-bf31-6ee26d685c81.jpg)
开发模式的code的console提示

之后我们点击左上角登录跳转到登录界面如图
![登录界面](https://user-images.githubusercontent.com/75935737/164441843-af284dd1-90be-486d-a3fb-76a737e5c4fa.jpg)

先注册一个账号，然后登录进入健康数据的可视化界面

如果报错请仔细检查mysql数据库，后面会展示mysql数据库的图片

登录进来后进入这个健康数据的界面，目前数据是静态的，之后发布一下小米运动数据的导出
![健康数据](https://user-images.githubusercontent.com/75935737/164463184-79617afb-2459-4991-b518-d334b40e7925.png)

下面展示一下数据库
table1    cov_details 疫情的详细数据
![cov_details](https://user-images.githubusercontent.com/75935737/164471400-051753a6-7c22-456a-a448-9d92a96b73cc.jpg)

table2 cov_history 疫情的历史数据
![cov_history](https://user-images.githubusercontent.com/75935737/164474418-5ec5c144-28cb-4625-aae1-2a03103da169.png)

table3 cov_risk_area 风险地区数据
![cov_risk_area](https://user-images.githubusercontent.com/75935737/164474740-a61936df-e08f-4f16-b759-e5f15b00d687.jpg)

table4 uhealth_user 用户的注册信息
![user](https://user-images.githubusercontent.com/75935737/164475032-1bddedf2-0e9a-46ae-8464-dcf6cc35a63b.png)

