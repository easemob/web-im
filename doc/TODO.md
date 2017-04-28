[TOC]
# V1.1.3 (Now~2016.10)
### upgrade strophe from 1.2.2 to 1.2.8, and use strophe-1.2.8.min.js in the product mode, use strophe.js in the debug mode (文科 done)
### 断线重连 (文科 done)
### 群组的xmpp协议版本  (刘伟展 done)
### IE9的兼容性bug （文科 done）
### 群组的windowSDK:黑名单 (刘伟展 done)
### 登录分批拉离线消息（解决摩尔提出的第一次聊天记录发送延迟的bug）(文科 done）
### 增加WebRTC视频聊天功能, support Webkit+https only. (文科 done）
### chatrooms的接口，原来是一次取所有，改成分页，下拉到底部获取下一页. (文科 done）
### 热加载 (刘伟展 done)
### 消息发送不成功，添加红色惊叹号提示(刘伟展 done)
### 引入UNDERSCORE库(刘伟展 done)

# V1.4.0 (2016.11.25)
### 加入ip策略功能 参考ios客户端 解决猎聘的客户需求(文科 done)
### webrtc的bug修改和UI调整（文科 done）
### 好友和群组，第一次打开，读取十条历史记录，跟聊天室一样。(windowsdk需求)
### v1.1.1里面有限制浏览器多标签页登录最多8个的逻辑 v1.1.2里面这个逻辑没有了 (钟泽方 done)
### JavaScript Web SDK installation via CDN and NPM 的可行性和implementation 参考https://docs.layer.com/sdk/web/install 11.20前完成  (刘伟展)
### bug fix: 群组用rest接口解散不了
### 文档整理 (钟泽方)


# V1.5.0 (2016.12)
### 新版UI
### 检查所有Demo.api.Notify. 普通提示用Demo.api.NotitySuccess,错误提示才用Demo.api.NotifyError (钟泽方 done)
### leftbar分类切换时，右侧的聊天窗口需要替换成遮罩，避免歧义和bug                    (钟泽方 done)
### 现有的机制是登录就创建所有的好友/群组/群的chatwindow,性能有问题。需要改成动态创建。 (钟泽方 done)
### webrtc视频弹窗增加声音开关按钮                                                (钟泽方 done)
### 传文件的时候 把文件大小传过去，方便没下载之前先看到文件大小。与客户端保持一致功能。(钟泽方 done)

# TODO 
### 调整框架目录结构:src/dist/publish
### 文件下载前，先发ajax请求带token参数去fileserver做验证
### 增加搜索功能
### 修改multi-select-box组件的UI
### © 2016 环信科技  2016不要写死 (钟泽方 done)
### 所有eval('(' + message + ')');  改成 JSON.parse(message)  所有 eval('(' + str + ')');  改成 JSON.parse(str)  
### 加入单元测试
### CI & CD
### 引入promise库
### 引入REDUX，减少原生dom操作
### http://docs.easemob.com/im/400webimintegration/60toolrelated 截图发送 还维护吗?
### xmppURL需要容错检查: 如果用户自己加了ws://或者wss://前缀 要去除掉，避免报错！
### chatrooms的接口，应该用户点击之后才获取，不应该登录就自动获取！
### 修改群信息之后，群组名的刷新是用dom直接操作的，需要修改

```
<script src='//cdn.layer.com/sdk/3.0.n/layer-websdk.min.js'></script>
npm install layer-websdk@beta --save
```
### 用React Hot Loader 3替换已经deprecated的react-transform-hmr https://github.com/gaearon/react-transform-hmr
### webim所有接口的xmpp协议(邹金海)和react协议(仝瑶)的文档整理
### webim所有接口的测试用例整理
### RectMix:将ReactJS转成ReactNative生成app(IOS/ANDROID) (刘伟展)
### 增加一层shim封装(类似webrtc对不同浏览器的封装):将windowSDK的逻辑和正常版本分成不同文件，方便维护
