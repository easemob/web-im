<a name="connection"></a>

## connection
**Kind**: global class  

* [connection](#connection)
    * [new connection(options)](#new_connection_new)
    * [.registerUser(options)](#connection+registerUser)
    * [.listen(options)](#connection+listen)
    * [.open(options)](#connection+open)
    * [.close(reason)](#connection+close)
    * [.getUniqueId(prefix)](#connection+getUniqueId) ⇒ <code>string</code>
    * [.send(messageSource)](#connection+send)
    * ~~[.addRoster(options)](#connection+addRoster)~~
    * [.removeRoster(options)](#connection+removeRoster)
    * [.getRoster(options)](#connection+getRoster)
    * [.subscribe(options)](#connection+subscribe)
    * [.subscribed(options)](#connection+subscribed)
    * ~~[.unsubscribe(options)](#connection+unsubscribe)~~
    * [.unsubscribed(options)](#connection+unsubscribed)
    * ~~[.joinPublicGroup(options)](#connection+joinPublicGroup)~~
    * ~~[.listRooms(options)](#connection+listRooms)~~
    * [.queryRoomMember(options)](#connection+queryRoomMember)
    * [.queryRoomInfo(options)](#connection+queryRoomInfo)
    * ~~[.queryRoomOccupants(options)](#connection+queryRoomOccupants)~~
    * [.getChatRooms(options)](#connection+getChatRooms)
    * [.joinChatRoom(options)](#connection+joinChatRoom)
    * [.quitChatRoom(options)](#connection+quitChatRoom)
    * [.getBlacklist(options)](#connection+getBlacklist)
    * [.addToBlackList(options)](#connection+addToBlackList)
    * [.removeFromBlackList(options)](#connection+removeFromBlackList)
    * [.addToGroupBlackList(options)](#connection+addToGroupBlackList)
    * [.getGroupBlacklist(options)](#connection+getGroupBlacklist)
    * [.removeGroupMemberFromBlacklist(options)](#connection+removeGroupMemberFromBlacklist)
    * [.changeGroupSubject(options)](#connection+changeGroupSubject)
    * [.destroyGroup(options)](#connection+destroyGroup)
    * [.leaveGroupBySelf(options)](#connection+leaveGroupBySelf)
    * [.leaveGroup(options)](#connection+leaveGroup)
    * [.addGroupMembers(options)](#connection+addGroupMembers)
    * [.acceptInviteFromGroup(options)](#connection+acceptInviteFromGroup)
    * [.rejectInviteFromGroup(options)](#connection+rejectInviteFromGroup)
    * [.createGroupAsync(p)](#connection+createGroupAsync)
    * [.createGroup(options)](#connection+createGroup)
    * [.blockGroup(options)](#connection+blockGroup)
    * [.joinGroup(opt)](#connection+joinGroup)
    * [.listGroups(opt)](#connection+listGroups)
    * [.getGroupInfo(opt)](#connection+getGroupInfo)
    * [.getGroup(opt)](#connection+getGroup)
    * [.listGroupMember(opt)](#connection+listGroupMember)
    * [.mute(opt)](#connection+mute)
    * [.removeMute(opt)](#connection+removeMute)
    * [.getGroupAdmin(opt)](#connection+getGroupAdmin)
    * [.getMuted(opt)](#connection+getMuted)
    * [.setAdmin(opt)](#connection+setAdmin)
    * [.removeAdmin(opt)](#connection+removeAdmin)
    * [.agreeJoinGroup(opt)](#connection+agreeJoinGroup)
    * [.rejectJoinGroup(opt)](#connection+rejectJoinGroup)
    * [.groupBlockSingle(opt)](#connection+groupBlockSingle)
    * [.groupBlockMulti(opt)](#connection+groupBlockMulti)
    * [.removeGroupBlockSingle(opt)](#connection+removeGroupBlockSingle)
    * [.removeGroupBlockMulti(opt)](#connection+removeGroupBlockMulti)
    * [.dissolveGroup(opt)](#connection+dissolveGroup)
    * [.getGroupBlacklistNew(opt)](#connection+getGroupBlacklistNew)
    * [.quitGroup(opt)](#connection+quitGroup)
    * [.modifyGroup(opt)](#connection+modifyGroup)
    * [.removeSingleGroupMember(opt)](#connection+removeSingleGroupMember)
    * [.removeMultiGroupMember(opt)](#connection+removeMultiGroupMember)
    * [.inviteToGroup(opt)](#connection+inviteToGroup)

<a name="new_connection_new"></a>

### new connection(options)
The connection class.

**Returns**: <code>Class</code> - a single instance of connection  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | - |
| options.url | <code>String</code> | xmppURL for xmpp server |
| options.apiUrl | <code>String</code> | apiURL for restful API server |
| options.isHttpDNS | <code>Boolean</code> | while http:// protocol,use ip directly,instead of ServerName,avoiding DNS problem.default false |
| options.isMultiLoginSessions | <code>Boolean</code> | true: A visitor can sign in to multiple webpages and receive messages at all the webpages. false: A visitor can sign in to only one webpage and receive messages at the webpage. |
| options.https | <code>Boolean</code> | Whether use wss or not. |
| options.heartBeatWait | <code>Number</code> | after login, send empty message to xmpp server like heartBeat every 45s, to keep the ws connection alive. |
| options.isAutoLogin | <code>Boolean</code> | set presence after login |
| options.autoReconnectNumMax | <code>Number</code> | will auto connect the xmpp server autoReconnectNumMax times in background when client is offline. |
| options.autoReconnectInterval | <code>Number</code> | the interval seconds between each auto reconnectting. |
| options.isWindowSDK | <code>Boolean</code> | Whether for windows platform. default false. |
| options.encrypt | <code>Boolean</code> | whether encrypt text message and emoji message |
| options.delivery | <code>Boolean</code> | When a message arrived, whether the receiver send an ack message to the sender or not. |
| options.pollingTime | <code>Number</code> | - |
| options.maxRetries | <code>Number</code> | - |
| options.hold | <code>Boolean</code> | - |
| options.route | <code>String</code> | - |
| options.domain | <code>String</code> | - |
| options.inactivity | <code>Boolean</code> | - |

<a name="connection+registerUser"></a>

### connection.registerUser(options)
注册新用户

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>options</code> | - |

<a name="connection+listen"></a>

### connection.listen(options)
注册监听函数

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>options</code> | - |

<a name="connection+open"></a>

### connection.open(options)
登录

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | - |

<a name="connection+close"></a>

### connection.close(reason)
close connection

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type |
| --- | --- |
| reason | <code>String</code> | 

<a name="connection+getUniqueId"></a>

### connection.getUniqueId(prefix) ⇒ <code>string</code>
gen uuid with customized prefix

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type |
| --- | --- |
| prefix | <code>String</code> | 

<a name="connection+send"></a>

### connection.send(messageSource)
send message

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type |
| --- | --- |
| messageSource | <code>Object</code> | 

<a name="connection+addRoster"></a>

### ~~connection.addRoster(options)~~
***Deprecated***

添加联系人

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

<a name="connection+removeRoster"></a>

### connection.removeRoster(options)
删除联系人

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

<a name="connection+getRoster"></a>

### connection.getRoster(options)
获取联系人

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

<a name="connection+subscribe"></a>

### connection.subscribe(options)
订阅

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

<a name="connection+subscribed"></a>

### connection.subscribed(options)
订阅成功

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

<a name="connection+unsubscribe"></a>

### ~~connection.unsubscribe(options)~~
***Deprecated***

取消订阅成功

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

<a name="connection+unsubscribed"></a>

### connection.unsubscribed(options)
取消订阅成功

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

<a name="connection+joinPublicGroup"></a>

### ~~connection.joinPublicGroup(options)~~
***Deprecated***

加入公开群组

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

<a name="connection+listRooms"></a>

### ~~connection.listRooms(options)~~
***Deprecated***

获取聊天室列表

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

<a name="connection+queryRoomMember"></a>

### connection.queryRoomMember(options)
获取聊天室成员列表

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

<a name="connection+queryRoomInfo"></a>

### connection.queryRoomInfo(options)
获取聊天室信息

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

<a name="connection+queryRoomOccupants"></a>

### ~~connection.queryRoomOccupants(options)~~
***Deprecated***

获取聊天室管理员

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

<a name="connection+getChatRooms"></a>

### connection.getChatRooms(options)
获取聊天室列表

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

<a name="connection+joinChatRoom"></a>

### connection.joinChatRoom(options)
加入聊天室

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

<a name="connection+quitChatRoom"></a>

### connection.quitChatRoom(options)
退出聊天室

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

<a name="connection+getBlacklist"></a>

### connection.getBlacklist(options)
获取好友黑名单

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

<a name="connection+addToBlackList"></a>

### connection.addToBlackList(options)
加入好友黑名单

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

<a name="connection+removeFromBlackList"></a>

### connection.removeFromBlackList(options)
从好友黑名单删除

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

<a name="connection+addToGroupBlackList"></a>

### connection.addToGroupBlackList(options)
加入群组黑名单

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

<a name="connection+getGroupBlacklist"></a>

### connection.getGroupBlacklist(options)
获取群组黑名单

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

<a name="connection+removeGroupMemberFromBlacklist"></a>

### connection.removeGroupMemberFromBlacklist(options)
从群组黑名单删除

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 

<a name="connection+changeGroupSubject"></a>

### connection.changeGroupSubject(options)
修改群名称

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | - |

**Example**  
```js
<iq to='easemob-demo#chatdemoui_roomid@conference.easemob.com' type='set' id='3940489311' xmlns='jabber:client'>
 <query xmlns='http://jabber.org/protocol/muc#owner'>
 <x type='submit' xmlns='jabber:x:data'>
 <field var='FORM_TYPE'><value>http://jabber.org/protocol/muc#roomconfig</value></field>
 <field var='muc#roomconfig_roomname'><value>Room Name</value></field>
 </x>
 </query>
 </iq>
```
<a name="connection+destroyGroup"></a>

### connection.destroyGroup(options)
删除群组

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | - |

**Example**  
```js
<iq id="9BEF5D20-841A-4048-B33A-F3F871120E58" to="easemob-demo#chatdemoui_1477462231499@conference.easemob.com" type="set">
 <query xmlns="http://jabber.org/protocol/muc#owner">
 <destroy>
 <reason>xxx destory group yyy</reason>
 </destroy>
 </query>
 </iq>
```
<a name="connection+leaveGroupBySelf"></a>

### connection.leaveGroupBySelf(options)
主动离开群组

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | - |

**Example**  
```js
<iq id="5CD33172-7B62-41B7-98BC-CE6EF840C4F6_easemob_occupants_change_affiliation" to="easemob-demo#chatdemoui_1477481609392@conference.easemob.com" type="set">
 <query xmlns="http://jabber.org/protocol/muc#admin">
 <item affiliation="none" jid="easemob-demo#chatdemoui_lwz2@easemob.com"/>
 </query>
 </iq>
 <presence to="easemob-demo#chatdemoui_1479811172349@conference.easemob.com/mt002" type="unavailable"/>
```
<a name="connection+leaveGroup"></a>

### connection.leaveGroup(options)
被踢出群组

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | - |

**Example**  
```js
<iq id="9fb25cf4-1183-43c9-961e-9df70e300de4:sendIQ" to="easemob-demo#chatdemoui_1477481597120@conference.easemob.com" type="set" xmlns="jabber:client">
 <query xmlns="http://jabber.org/protocol/muc#admin">
 <item affiliation="none" jid="easemob-demo#chatdemoui_lwz4@easemob.com"/>
 <item jid="easemob-demo#chatdemoui_lwz4@easemob.com" role="none"/>
 <item affiliation="none" jid="easemob-demo#chatdemoui_lwz2@easemob.com"/>
 <item jid="easemob-demo#chatdemoui_lwz2@easemob.com" role="none"/>
 </query>
 </iq>
```
<a name="connection+addGroupMembers"></a>

### connection.addGroupMembers(options)
添加群组成员

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | - |

**Example**  
```js
Attention the sequence: message first (每个成员单独发一条message), iq second (多个成员可以合成一条iq发)
 <!-- 添加成员通知：send -->
 <message to='easemob-demo#chatdemoui_1477482739698@conference.easemob.com'>
 <x xmlns='http://jabber.org/protocol/muc#user'>
 <invite to='easemob-demo#chatdemoui_lwz2@easemob.com'>
 <reason>liuwz invite you to join group '谢谢'</reason>
 </invite>
 </x>
 </message>
 <!-- 添加成员：send -->
 <iq id='09DFB1E5-C939-4C43-B5A7-8000DA0E3B73_easemob_occupants_change_affiliation' to='easemob-demo#chatdemoui_1477482739698@conference.easemob.com' type='set'>
 <query xmlns='http://jabber.org/protocol/muc#admin'>
 <item affiliation='member' jid='easemob-demo#chatdemoui_lwz2@easemob.com'/>
 </query>
 </iq>
```
<a name="connection+acceptInviteFromGroup"></a>

### connection.acceptInviteFromGroup(options)
接受加入申请

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | - |

<a name="connection+rejectInviteFromGroup"></a>

### connection.rejectInviteFromGroup(options)
拒绝入群申请

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | - |

**Example**  
```js
throw request for now 暂时不处理，直接丢弃

 <message to='easemob-demo#chatdemoui_mt002@easemob.com' from='easmeob-demo#chatdemoui_mt001@easemob.com' id='B83B7210-BCFF-4DEE-AB28-B9FE5579C1E2'>
 <x xmlns='http://jabber.org/protocol/muc#user'>
 <apply to='easemob-demo#chatdemoui_groupid1@conference.easemob.com' from='easmeob-demo#chatdemoui_mt001@easemob.com' toNick='llllll'>
 <reason>reject</reason>
 </apply>
 </x>
 </message>
```
<a name="connection+createGroupAsync"></a>

### connection.createGroupAsync(p)
创建群组-异步

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type | Description |
| --- | --- | --- |
| p | <code>Object</code> | - |

<a name="connection+createGroup"></a>

### connection.createGroup(options)
创建群组

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | - |

**Example**  
```js
1. 创建申请 -> 得到房主身份
2. 获取房主信息 -> 得到房间form
3. 完善房间form -> 创建成功
4. 添加房间成员
5. 消息通知成员
```
<a name="connection+blockGroup"></a>

### connection.blockGroup(options)
通过RestFul API屏蔽群组

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | - |

<a name="connection+joinGroup"></a>

### connection.joinGroup(opt)
通过RestFul API发出入群申请

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type | Description |
| --- | --- | --- |
| opt | <code>Object</code> | - |

<a name="connection+listGroups"></a>

### connection.listGroups(opt)
通过RestFul API获取群组列表

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type | Description |
| --- | --- | --- |
| opt | <code>Object</code> | - |

<a name="connection+getGroupInfo"></a>

### connection.getGroupInfo(opt)
通过RestFul API根据groupid获取群组详情

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type | Description |
| --- | --- | --- |
| opt | <code>Object</code> | - |

<a name="connection+getGroup"></a>

### connection.getGroup(opt)
通过RestFul API列出某用户所加入的所有群组

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type | Description |
| --- | --- | --- |
| opt | <code>Object</code> | - |

<a name="connection+listGroupMember"></a>

### connection.listGroupMember(opt)
通过RestFul API列出群组的所有成员

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type | Description |
| --- | --- | --- |
| opt | <code>Object</code> | - |

<a name="connection+mute"></a>

### connection.mute(opt)
通过RestFul API禁止群用户发言

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type | Description |
| --- | --- | --- |
| opt | <code>Object</code> | - |

<a name="connection+removeMute"></a>

### connection.removeMute(opt)
通过RestFul API取消对用户禁言

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type | Description |
| --- | --- | --- |
| opt | <code>Object</code> | - |

<a name="connection+getGroupAdmin"></a>

### connection.getGroupAdmin(opt)
通过RestFul API获取群组下所有管理员

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type | Description |
| --- | --- | --- |
| opt | <code>Object</code> | - |

<a name="connection+getMuted"></a>

### connection.getMuted(opt)
通过RestFul API获取群组下所有被禁言成员

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type | Description |
| --- | --- | --- |
| opt | <code>Object</code> | - |

<a name="connection+setAdmin"></a>

### connection.setAdmin(opt)
通过RestFul API设置群管理员

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type | Description |
| --- | --- | --- |
| opt | <code>Object</code> | - |

<a name="connection+removeAdmin"></a>

### connection.removeAdmin(opt)
通过RestFul API取消群管理员

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type | Description |
| --- | --- | --- |
| opt | <code>Object</code> | - |

<a name="connection+agreeJoinGroup"></a>

### connection.agreeJoinGroup(opt)
通过RestFul API同意用户加入群

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type | Description |
| --- | --- | --- |
| opt | <code>Object</code> | - |

<a name="connection+rejectJoinGroup"></a>

### connection.rejectJoinGroup(opt)
通过RestFul API拒绝用户加入群

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type | Description |
| --- | --- | --- |
| opt | <code>Object</code> | - |

<a name="connection+groupBlockSingle"></a>

### connection.groupBlockSingle(opt)
通过RestFul API添加用户至群组黑名单(单个)

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type | Description |
| --- | --- | --- |
| opt | <code>Object</code> | - |

<a name="connection+groupBlockMulti"></a>

### connection.groupBlockMulti(opt)
通过RestFul API添加用户至群组黑名单(批量)

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type | Description |
| --- | --- | --- |
| opt | <code>Object</code> | - |

<a name="connection+removeGroupBlockSingle"></a>

### connection.removeGroupBlockSingle(opt)
通过RestFul API将用户从群黑名单移除（单个）

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type | Description |
| --- | --- | --- |
| opt | <code>Object</code> | - |

<a name="connection+removeGroupBlockMulti"></a>

### connection.removeGroupBlockMulti(opt)
通过RestFul API将用户从群黑名单移除（批量）

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type | Description |
| --- | --- | --- |
| opt | <code>Object</code> | - |

<a name="connection+dissolveGroup"></a>

### connection.dissolveGroup(opt)
通过RestFul API解散群组

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type | Description |
| --- | --- | --- |
| opt | <code>Object</code> | - |

<a name="connection+getGroupBlacklistNew"></a>

### connection.getGroupBlacklistNew(opt)
通过RestFul API获取群组黑名单

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type | Description |
| --- | --- | --- |
| opt | <code>Object</code> | - |

<a name="connection+quitGroup"></a>

### connection.quitGroup(opt)
通过RestFul API离开群组

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type | Description |
| --- | --- | --- |
| opt | <code>Object</code> | - |

<a name="connection+modifyGroup"></a>

### connection.modifyGroup(opt)
通过RestFul API修改群信息

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type | Description |
| --- | --- | --- |
| opt | <code>Object</code> | - |

<a name="connection+removeSingleGroupMember"></a>

### connection.removeSingleGroupMember(opt)
通过RestFul API删除单个群成员

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type | Description |
| --- | --- | --- |
| opt | <code>Object</code> | - |

<a name="connection+removeMultiGroupMember"></a>

### connection.removeMultiGroupMember(opt)
通过RestFul API删除多个群成员

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type | Description |
| --- | --- | --- |
| opt | <code>Object</code> | - |

<a name="connection+inviteToGroup"></a>

### connection.inviteToGroup(opt)
通过RestFul API邀请群成员

**Kind**: instance method of [<code>connection</code>](#connection)  

| Param | Type | Description |
| --- | --- | --- |
| opt | <code>Object</code> | - |

