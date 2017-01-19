#版本更新说明:

## v1.4.8 @ 2016-12-27

###Feature

* [demo] 增加webrtc视频聊天的声音开关
* [demo] 动态创建chatWindow，提高网页性能
* [demo] 切换leftbar时会给chatWindow添加遮罩，返回之前的leftbar时会直接跳到之前选中的cate和chatWindow
* [demo] 登录成功后，刷新页面不会再回到登录页

###BugFix

* [sdk] 移除sdk中所有log方法
* [sdk] 退出muc group room 时，追加发送一条unavailable的presence stanza

## v1.4.7 @ 2016-12-21

###Feature

* [demo] 在demo.html中新增视频聊天及发送视频文件的功能

###BugFix

* [sdk] 解决在手机浏览器在后台运行时无法断线重连的问题
* [demo] WebIM建群，等待后台建群成功后再拉取群信息并更新UI中的群列表
* [demo] WebIM群加人，群主和被添加的群成员均可以收到通知
* [demo] WebIM群主将群成员从黑名单移除后，不再回到群成员列表中，而直接被删除

## v1.4.6 @ 2016-12-20

###Feature

* [sdk] 新增 demo.html, 演示如何调用sdk的各种接口

###BugFix

* [demo] 创建群组成功之后，立即刷新群组列表，不再等1秒
* [sdk]  sdk与上层Demo解耦，删除Demo相关代码
* [sdk]  删除server不支持的connection.prototype.createRoom



##v1.4.5 @ 2016-12-01
###新功能

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
###Bug修复

- [sdk] 解散群组不更新UI
- [sdk] 修复了发送cmd消息成功后无法调用回调函数的bug



##v1.1.3 @ 2016-11-01

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
#ChangeLog:

## v1.4.8 @ 2016-12-27

###Feature

* [demo] Add a mute button to the video chat window
* [demo] Create a chat window automaticly
* [demo] Hide the chat window when switch a cate in leftbar
* [demo] Not back to the login page when refresh the webpage if login succeed

###BugFix

* [sdk] Remove all of the log methods
* [sdk] Send an unavailable presence stanza when leave a group

## v1.4.7 @ 2016-12-21

###Feature

* [demo] Add video chat and send video file functions into the demo.html

###BugFix

* [sdk] Fix the bug when the browser runs in back end that WebIM can't reconnect on phones
* [demo] Refresh the group list on the front end after create a group succeed on back end
* [demo] The master of a group and the members will be added will receive a notification when add members to group
* [demo] A member will leave group when the master of the group remove this member from group black list

## v1.4.6 @ 2016-12-20

###Feature

* [sdk] add demo.html, listing how to use sdk's interfaces

###BugFix

* [demo] after create group success, UI will refresh group list immediately, won't wait 1 second any more.
* [sdk] to decoupling from Demo namespaces, delete codes using Demo
* [sdk] delete connection.prototype.createRoom, which is not supported by server


##v1.4.5 @ 2016-12-01

###Feature

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
###BugFix

- [sdk] does not update catact list UI after destory group
- [sdk] does not call the callback function after send out the cmd message

##v1.1.3 @ 2016-11-01

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

