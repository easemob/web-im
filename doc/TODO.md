[TOC]
#V1.1.3 (Now~2016.10) 紧急需求和bug:
###1.upgrade strophe from 1.2.2 to 1.2.8, and use strophe-1.2.8.min.js in the product mode, use strophe.js in the debug mode (文科 done)
###2.断线重连 (文科 done)
###3.群组的xmpp协议版本  (刘伟展 done)
###4.IE9的兼容性bug （文科 done）
###5.群组的windowSDK:黑名单 (刘伟展 done)
###6.登录分批拉离线消息（解决摩尔提出的第一次聊天记录发送延迟的bug）(文科 done）
###7.增加WebRTC视频聊天功能, support Webkit+https only. (文科 done）
###8.chatrooms的接口，原来是一次取所有，改成分页，下拉到底部获取下一页. (文科 done）

#1.1.4 (2016.11.11)
###加入ip策略功能 参考ios客户端 解决猎聘的客户需求
###1.webrtc的接受视频请求按钮，改成弹窗同意或拒绝

#V1.1.5 (2016.11~2016.12) 优化和新需求:
###2.webrtc相关功能的实现
###3.leftbar分类切换时，右侧的聊天窗口需要替换成遮罩，避免歧义和bug
###4.现有的机制是登录就创建所有的好友/群组/群的chatwindow,性能有问题。需要改成动态创建。
###5.消息发送不成功，添加红色惊叹号提示
###6.文件下载前，先发ajax请求带token参数去fileserver做验证
###7.增加搜索功能
###8.修改multi-select-box组件的UI
###9.调整框架目录结构:src/dist/publish
###10.© 2016 环信科技  2016不要写死
###11.所有eval('(' + message + ')');  改成 JSON.parse(message)  所有 eval('(' + str + ')');  改成 JSON.parse(str)  
###12.引入UNDERSCORE库
###13.引入promise库
###14.引入REDUX，减少原生dom操作
###15.热加载 (刘伟展 done)
###16.http://docs.easemob.com/im/400webimintegration/60toolrelated 截图发送 还维护吗?
###17.xmppURL需要容错检查: 如果用户自己加了ws://或者wss://前缀 要去除掉，避免报错！
###18.chatrooms的接口，应该用户点击之后才获取，不应该登录就自动获取！
###19.v1.1.1里面有限制浏览器多标签页登录最多8个的逻辑 v1.1.2里面这个逻辑没有了  handlePageLimit clearPageSign getPageCount
###20.修改群信息之后，群组名的刷新是用dom直接操作的，需要修改
###21.JavaScript Web SDK installation via CDN and NPM 的可行性和implementation 参考https://docs.layer.com/sdk/web/install 11.20前完成 可以交给钟泽芳负责

```
<script src='//cdn.layer.com/sdk/3.0.n/layer-websdk.min.js'></script>
npm install layer-websdk@beta --save
```
###22.用React Hot Loader 3替换已经deprecated的react-transform-hmr https://github.com/gaearon/react-transform-hmr

#V1.1.5 (2017.01~2017.06) 新需求：
###1.webim所有接口的xmpp协议(邹金海)和react协议(仝瑶)的文档整理
###2.webim所有接口的测试用例整理
###3.RectMix:将ReactJS转成ReactNative生成app(IOS/ANDROID)


 