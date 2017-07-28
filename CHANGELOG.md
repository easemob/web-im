# 版本更新说明:

## v1.4.12 @ 2017-06-17

###Feature

* [sdk] 修改delivery ack和read ack的格式
* [sdk] 用户在离线状态下发送消息，会自动重连并将未成功发送的消息发送出去
* [sdk] WEBIM支持多设备，添加加入聊天室事件
* [sdk] 给delivered和ack加上from字段
* [demo] 添加Rest Interface的 Test case
* [demo] sdk/demo上传功能兼容ie8

###BugFix

* [sdk] 提升ie8的兼容性
* [sdk] 强制不发送自己发送的消息的read ack
* [demo] 修复建公开群需要审核，实际不需要审核的bug
* [demo] 鼠标悬浮在群禁言图标上出现提示信息"禁言"
* [demo] demo.html中从cdn引入sdk
* [demo] 修复无法准确统计离线消息数的bug
* [demo] window.history.pushState在windows的chrome上有兼容性问题，统一改成window.location.href
* [demo] window.location.href = xxxx，如果修改的是href.search参数(?a=x&b=y)时候, 如果遇到file://方式打开本地index.html会直接跳转页面，造成登录一直不成功，改成修改 href.hash 参数(#a=x&b=y)
* [demo] 将群管理员可操作的项目展示给管理员


## v1.4.11 @ 2017-06-07

###Feature

* [sdk] debug.js融合到sdk当中，优化日志内容输出
* [sdk] 通过Rest屏蔽群组
* [sdk] 通过Rest发出入群申请
* [sdk] 通过Rest获取群组列表
* [sdk] 通过Rest根据groupid获取群组详情
* [sdk] 通过Rest列出某用户所加入的所有群组
* [sdk] 通过Rest列出群组的所有成员
* [sdk] 通过Rest禁止群用户发言
* [sdk] 通过Rest取消对用户禁言的禁止
* [sdk] 通过Rest获取群组下所有管理员
* [sdk] 通过Rest获取群组下所有被禁言成员
* [sdk] 通过Rest设置群管理员
* [sdk] 通过Rest取消群管理员
* [sdk] 通过Rest同意用户加入群
* [sdk] 通过Rest拒绝用户加入群
* [sdk] 通过Rest添加用户至群组黑名单（单个）
* [sdk] 通过Rest添加用户至群组黑名单（批量）
* [sdk] 通过Rest将用户从群黑名单移除（单个）
* [sdk] 通过Rest将用户从群黑名单移除（批量）
* [demo] 聊天窗口中记录可清空
* [demo] 聊天窗口中发送方聊天记录显示状态（未送达、已送达、已读）
* [demo] 查看聊天室成员
* [demo] 通过链接直接打开与好友的对话框
* [demo] 新增申请加入公开群面板
* [demo] 在申请加入公开群面板可下拉分页获取公开群
* [demo] 在申请加入公开群面板可点击群名称可查看群详情
* [demo] 在申请加入公开群面板可搜索群查看群详情
* [demo] 在申请加入公开群面板群详情页面可申请加入群组
* [demo] 群主可同意、拒绝加群申请
* [demo] 在群主的群成员列表中新增添加/移除管理员、禁言/解禁群成员按钮
* [demo] 添加消息状态显示开关

###BugFix

* [sdk] 添加好友会产生多余的订阅消息
* [sdk] 频繁的发送消息会导致消息id重复的问题
* [sdk] 适配SDK发送文件和图片的大小
* [demo] 优化sdk/demo.html，修复某些依赖文件找不到的问题
* [demo] 修复离线消息数量统计不准确问题


## v1.4.10 @ 2017-02-16

### Feature

* [sdk] webrtc新增语音呼叫

### BugFix

* [sdk] webrtc:Firefox在结束通话后的问题
* [sdk] webrtc:多次接通挂断之后,逻辑功能混乱
* [sdk] webrtc:正常挂断不应该提醒offline
* [sdk] webrtc:重连后无法处理音视频IQ消息

## v1.4.9 @ 2017-01-20

### BugFix

* [sdk] 成功/失败的回调函数如果没有定义会报错


## v1.4.8 @ 2016-12-27

### Feature

* [demo] 增加webrtc视频聊天的声音开关
* [demo] 动态创建chatWindow，提高网页性能
* [demo] 切换leftbar时会给chatWindow添加遮罩，返回之前的leftbar时会直接跳到之前选中的cate和chatWindow
* [demo] 登录成功后，刷新页面不会再回到登录页

### BugFix

* [sdk] 移除sdk中所有log方法
* [sdk] 退出muc group room 时，追加发送一条unavailable的presence stanza

## v1.4.7 @ 2016-12-21

### Feature

* [demo] 在demo.html中新增视频聊天及发送视频文件的功能

### BugFix

* [sdk] 解决在手机浏览器在后台运行时无法断线重连的问题
* [demo] WebIM建群，等待后台建群成功后再拉取群信息并更新UI中的群列表
* [demo] WebIM群加人，群主和被添加的群成员均可以收到通知
* [demo] WebIM群主将群成员从黑名单移除后，不再回到群成员列表中，而直接被删除

## v1.4.6 @ 2016-12-20

### Feature

* [sdk] 新增 demo.html, 演示如何调用sdk的各种接口

### BugFix

* [demo] 创建群组成功之后，立即刷新群组列表，不再等1秒
* [sdk]  sdk与上层Demo解耦，删除Demo相关代码
* [sdk]  删除server不支持的connection.prototype.createRoom



## v1.4.5 @ 2016-12-01
### 新功能

- GNU风格的版本号命名格式: 主版本号.子版本号.修正版本号  (新版本规则的1.4.5 = 旧版本规则的1.1.4.5)
- [demo] 好友之间可以通过webrtc进行视频聊(仅支持 https + Webkit浏览器)
- [demo] 支持同一账号最多8个标签页登录 `isMultiLoginSessions:true`
- [demo] http访问加入ip策略功能,防止DNS劫持  `isHttpDNS:true`
- [sdk]  新增两种安装引用方式
    -  添加 `<script>` 标签
    
    ```
    <script src='http://downloads.easemob.com/downloads/cdn/websdk-1.4.5.js'></script>
    or
    <script src='http://downloads.easemob.com/downloads/cdn/websdk-1.4.5.min.js'></script>
    ```
    通过WebIM 命名空间访问websdk:
    
    ```
	 Demo.conn = new WebIM.connection({
	    isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
	    https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
	    url: WebIM.config.xmppURL,
	    isAutoLogin: false,
	    heartBeatWait: WebIM.config.heartBeatWait,
	    autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
	    autoReconnectInterval: WebIM.config.autoReconnectInterval
	});
	```
	
    - NPM 
    
    websdk 已经发布到 [NPM](https://www.npmjs.com/package/easemob-websdk):
    
    ```
    npm install easemob-websdk --save
    ```
    先require,再访问WebIM:
    
    ```
    require('easemob-websdk'); 
    //... blablabla
    Demo.conn = new WebIM.connection({
	    isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
	    https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
	    url: WebIM.config.xmppURL,
	    isAutoLogin: false,
	    heartBeatWait: WebIM.config.heartBeatWait,
	    autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
	    autoReconnectInterval: WebIM.config.autoReconnectInterval
	});


    ```
### Bug修复

- [sdk] 解散群组不更新UI
- [sdk] 修复了发送cmd消息成功后无法调用回调函数的bug



## v1.1.3 @ 2016-11-01

* [demo] 支持 Windows SDK. <http://www.easemob.com/download/im>
* [demo] 新增黑名单功能.
* [demo] 获取聊天室列表: 支持分页,下拉刷新,新增以下2个参数：pagenum 和 pagesize。
* [demo] 调试更方便，webpack 支持开发和生产模式.
    * `npm run dev` , 开发模式, 支持热加载, 启动一个供调试的webserve http://localhost:3000.
    * `npm run prod`, 生产模式, 编译速度更快.
* [demo] 群组增加以下功能：创建群组, 修改群组名称, 修改群组简介, 群组成员管理, 加入公开群.
* [sdk] strophe 从 v1.2.2 升级到 v1.2.8，在生产模式使用 strophe-1.2.8.min.js， 在开发模式使用 strophe.js.
* [sdk] 支持自动重连: 在 webim.config.js 文件中新增相关参数 `autoReconnectNumMax` 和 `autoReconnectInterval`.

* Bug修复:
    1. [demo] 增加 `babel-core/browser-polyfill.js`文件，修复了 IE 不支持 HTML5 element 的 bug。
    2. [demo] 修复了有未读消息时点击联系人不生效的bug。
    3. [sdk] 修复了strophe.js v1.2.8在IE9中使用BOSH会报错的bug。  <https://github.com/strophe/strophejs/issues/213>
    4. [sdk] 修复了存在大量离线消息时收发消息延迟的bug。客户端将发送ack应答消息的速度限制在5个/秒，不影响其他正常消息。
    5. [sdk] 将心跳消息从 空body的json message 切换为 ping/pong iq。前者会作为离线消息被XMPP Server缓存。
   
   
---
# ChangeLog:

## v1.4.12 @ 2017-06-17

###Feature

* [sdk] Modify format of delivery ack and read ack
* [sdk] Will auto reconnect and send the messages didn't sent when user send messages offline
* [sdk] WebIM support multiple devices, add join chat room event
* [sdk] Add "from" attribute for delivery ack and read ack
* [demo] Add test case of rest interface
* [demo] Upload file function for IE8 compatible in sdk/demo.html

###BugFix

* [sdk] Backward compatible for IE8
* [sdk] Force not to send read ack to user self
* [demo] Fix the bug of creating public group
* [demo] Will show a message with "mute" when the mouse hover on the group mute icon
* [demo] Quote sdk from cdn in demo.html
* [demo] Correct the offline message amount
* [demo] Change window.history.pushState into window.location.href
* [demo] Change window.location.href = xxxx into href.hash
* [demo] Show the available operations to administrators

## v1.4.11 @ 2017-06-07

###Feature

* [sdk] debug.js fused to sdk logs output optimized
* [sdk] Block groups through rest api
* [sdk] Apply for appending groups through rest api
* [sdk] Get groups list through rest api
* [sdk] Get a group detail through rest api
* [sdk] List all groups a user in through rest api
* [sdk] List all of a group's members through rest api
* [sdk] Block member in group through rest api
* [sdk] Unblock member in group through rest api
* [sdk] List all of administrators in a group through rest api
* [sdk] List blocked members in a group through rest api
* [sdk] Set members as administrator in a group through rest api
* [sdk] Delete an administrator in a group through rest api
* [sdk] Agree a user's application filings of join in the group through rest api
* [sdk] Reject a user's application filings of join in the group through rest api
* [sdk] Add a single user in a group to the blacklist of this group through rest api
* [sdk] Add multi of users in a group to the blacklist of this group through rest api
* [sdk] Delete a single user in a group from the blacklist of this group through rest api
* [sdk] Delete multi of users in a group from the blacklist of this group through rest api
* [demo] Chat record can be deleted
* [demo] Show status of chat records(Undelivered, delivered, read) 
* [demo] List members in a chat room
* [demo] Open a dialog window with friends just through a link
* [demo] Add the board apply for join in a group
* [demo] In the apply for join in a group board get pages of public groups while scroll to the bottom
* [demo] Click a group's name will show detail information of this group on the apply for join in a group board
* [demo] Search a group by the group's id will show detail information of this group on the apply for join in a group board
* [demo] Users are be able to apply for join in a group on the apply for join in a group board
* [demo] Group owners are able to agree or reject a user's filings of join in the group
* [demo] Add the add/delete administrator and block/unblock members buttons in the group members list
* [demo] Add a switch of status in a single chat

###BugFix

* [sdk] Add a new friend will create spare subscription information
* [sdk] Send messages continually will cause the problem of message id repetition
* [sdk] Adapt size of pictures whild sdk and webim sending pictures to each other 
* [demo] Optimize sdk/demo.html, fix the problem that some of dependent files can't be found
* [demo] Fix the problem that off-line messages count not right

## v1.4.10 @ 2017-02-16

### Feature

* [sdk] webrtc add voice call

### BugFix

* [sdk] webrtc:Firefox error while close call
* [sdk] webrtc:logical error after multitimes connection and close
* [sdk] webrtc:shoud not warning offline after normal close
* [sdk] webrtc:can't handle IQ message after reconnect

## v1.4.9 @ 2017-01-20

### BugFix

* [sdk] fix a bug in success/error callback

## v1.4.8 @ 2016-12-27

### Feature

* [demo] Add a mute button to the video chat window
* [demo] Create a chat window automaticly
* [demo] Hide the chat window when switch a cate in leftbar
* [demo] Not back to the login page when refresh the webpage if login succeed

### BugFix

* [sdk] Remove all of the log methods
* [sdk] Send an unavailable presence stanza when leave a group

## v1.4.7 @ 2016-12-21

### Feature

* [demo] Add video chat and send video file functions into the demo.html

### BugFix

* [sdk] Fix the bug when the browser runs in back end that WebIM can't reconnect on phones
* [demo] Refresh the group list on the front end after create a group succeed on back end
* [demo] The master of a group and the members will be added will receive a notification when add members to group
* [demo] A member will leave group when the master of the group remove this member from group black list

## v1.4.6 @ 2016-12-20

### Feature

* [sdk] add demo.html, listing how to use sdk's interfaces

### BugFix

* [demo] after create group success, UI will refresh group list immediately, won't wait 1 second any more.
* [sdk] to decoupling from Demo namespaces, delete codes using Demo
* [sdk] delete connection.prototype.createRoom, which is not supported by server


## v1.4.5 @ 2016-12-01

### Feature

- GNU version number: `Major_Version_Number.Minor_Version_Number.Revision_Number` (new v1.4.5 = old v1.1.4.5)
- [demo] friends can video chat to each other (support https + Webkit only)
- [demo] limite of a single user the number of opened tabs in the same browser `isMultiLoginSessions:true`
- [demo] while http access,use ip directly instead of ServerName,avoid DNS hijacking.  `isHttpDNS:true`
- [sdk]  add tow way to load websdk:
    -  `<script>` tag
    
    ```
    <script src='http://downloads.easemob.com/downloads/cdn/websdk-1.4.5.js'></script>
    or
    <script src='http://downloads.easemob.com/downloads/cdn/websdk-1.4.5.min.js'></script>
    ```
    All classes can then be accessed via the WebIM namespace:
    
    ```
	 Demo.conn = new WebIM.connection({
	    isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
	    https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
	    url: WebIM.config.xmppURL,
	    isAutoLogin: false,
	    heartBeatWait: WebIM.config.heartBeatWait,
	    autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
	    autoReconnectInterval: WebIM.config.autoReconnectInterval
	});
	```
	
    - NPM 
    
    websdk is also available on [NPM](https://www.npmjs.com/package/easemob-websdk):
    
    ```
    npm install easemob-websdk --save
    ```
    All classes can then be accessed by requiring the module:
    
    ```
    require('easemob-websdk'); 
    //... blablabla
    Demo.conn = new WebIM.connection({
	    isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
	    https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
	    url: WebIM.config.xmppURL,
	    isAutoLogin: false,
	    heartBeatWait: WebIM.config.heartBeatWait,
	    autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
	    autoReconnectInterval: WebIM.config.autoReconnectInterval
	});


    ```
### BugFix

- [sdk] does not update catact list UI after destory group
- [sdk] does not call the callback function after send out the cmd message

## v1.1.3 @ 2016-11-01

* [demo] support Windows SDK. <http://www.easemob.com/download/im>
* [demo] add blacklist feature.
* [demo] paging getChatrooms, add 2 params:pagenum and pagesize. 
* [demo] easy debug, webpack support development and production mode。
    * `npm run dev`  debug mode, support hot reload, start a webserver and listen at http://localhost:3000.
    * `npm run prod` product mode, faster than before.
* [demo] groups add features: createGroup,changeGroupSubject,changeGroupDesc,adminGroupMembers,joinPublicGroup.
* [sdk]  upgrade strophe from v1.2.2 to v1.2.8, and use strophe-1.2.8.min.js in the product mode, use strophe.js in the debug mode.
* [sdk]  auto reconnect while configured `autoReconnectNumMax` and `autoReconnectInterval` in webim.config.js.

* Bug fixes:
    1. [demo] Fixed a bug of HTML5 elements are not supported in IE by add `babel-core/browser-polyfill.js`.
    2. [demo] Fixed a bug of friends contact is not clickable while there are unread messages.
    3. [sdk] Fixed a bug of strophe.js v1.2.8 using BOSH in IE9.  <https://github.com/strophe/strophejs/issues/213>
    4. [sdk] Fixed a bug of send/receive message delay while there was a lot of offline messages.Client should limit the speed of sending ack messages  up to 5/s, the other nomal send/recv will not be influenced.
    5. [sdk] switch heartBeat from empty body json message to ping/pong iq, the former will be cached as offline message by XMPP Server.

