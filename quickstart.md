---
title: 环信
description: 5分钟为你的APP加入聊天功能
category: webchat
layout: docs
---

## WebIM SDK介绍:
##**基本功能**

### 1.创建连接
    var conn = new Easemob.im.Connection();
### 2.初始化连接
    conn.init({
			onOpened : function() {
				curUserId = conn.context.userId;
				//查询好友列表
				conn.getRoster(....);
			},
			onClosed : function() {
				//处理登出事件
			},
			onTextMessage : function(message) {
               /**处理文本消息，消息格式为：
					{
					from : from,
					to : too,
					data : { "type":"txt",
                          "msg":"hello from test2"
                          }
					}
				*/
				handleTextMessage(message);
			},
			onEmotionMessage : function(message) {
				/*处理表情消息,消息格式为：
                	{
					from : from,
					to : too,
					data : [{ "type":"txt",
                          "msg":"hello from test2"
                          },
                          { "type":"emotion",
                          "msg":"data:image/png;base64, ……"//图片的base64编码
						}]
					}
				*/
				handleEmotion(message);
			},
			onPictureMessage : function(message) {
	              /**处理图片消息，消息格式为：
					{
					from : "test1",
					to : "test2",
					url : "http://s1.easemob.com/weiquan2/a2/chatfiles/0c0f5f3a-e66b-11e3-8863-f1c202c2b3ae",
					secret : "NSgGYPCxEeOou00jZasg9e-GqKUZGdph96EFxJ4WxW-qkxV4",
					filename : "logo.png",
					thumb : "http://s1.easemob.com/weiquan2/a2/chatfiles/0c0f5f3a-e66b-11e3-8863-f1c202c2b3ae",
					thumb_secret : "0595b06a-ed8b-11e3-9b85-93fade9c198c",
					file_length : 42394,
					width : 280,
					height : 160,
					filetype : "image/png",
					accessToken :"YWMtjPPoovCqEeOQs7myPqqaOwAAAUaqNH0a8rRj4PwJLQju6-S47ZO6wYs3Lwo"
				    }
				*/

				handlePictureMessage(message);
			},
			onAudioMessage : function(message) {
                /**处理音频消息，消息格式为：
	               {
					from : "test1",
					to : "test2",
					url : "http://s1.easemob.com/weiquan2/a2/chatfiles/0c0f5f3a-e66b-11e3-8863-f1c202c2b3ae",
					secret :"NSgGYPCxEeOou00jZasg9e-GqKUZGdph96EFxJ4WxW-qkxV4",
					filename : "风雨无阻.mp3",
					length :45223,
					file_length : 304,
					filetype : "mp3",
					accessToken :"YWMtjPPoovCqEeOQs7myPqqaOwAAAUaqNH0a8rRj4PwJLQju6-S47ZO6wYs3Lwo"
				  }
				*/
				handleAudioMessage(message);
			},
			//收到联系人订阅请求的回调方法
			onPresence : function (message){
				/**
				{
				from: "l2",
				fromJid: "easemob-demo#chatdemoui_l2@easemob.com",
				status: "下午11:44:47",
				to: "test1",
				toJid: "easemob-demo#chatdemoui_test1@easemob.com/13856640471403797405809685",
				type: "subscribed"
				}
				*/
				handlePresence(message);
			},
			//收到联系人信息的回调方法
			onRoster : function (message){
				/**
				[
				{
				groups: [{0: "default",
						length: 1}],
				jid: "easemob-demo#chatdemoui_l2@easemob.com",
				name: "l2",
				subscription: "to"
				}]
				*/
				handleRoster(message);
			},
			onError : function(e) {
				//异常处理
				alert(e.msg);
			}
		});
###3.登录聊天用户
    //用户名
	var user = document.getElementById("username").value;
	//密码
	var pass = document.getElementById("password").value;
	if (user == '' || pass == '') {
		alert("请输入用户名和密码");
		return;
	}
	conn.open({
		user : user,
		pwd : pass,
		appKey : 'easemob-demo#chatdemoui'//开发者APPKey
	});
###4.单聊
####4.1发送文本（表情）聊天消息
	//发送文本消息
    conn.sendTextMessage({
			to : to,
			msg :'hello world！' //文本消息
		});

	//发送表情消息，调用接口同文本消息
	 conn.sendTextMessage({
			to : to,
			msg :'hello world！[(*)][(#)]' //文本消息+表情
		});

####4.2发送图片消息
发送图片消息sdk自动分两步完成：<br>
1）上传图片文件<br>
2）发送图片消息参见2初始化连接中的onPictureMessage的格式

	function sendPic() {
		//图片接收者，如“test1”
		var to = curChatUserId;
		if (to == null) {
			alert("请选择联系人");
			return;
		}
		//fileInputId：文件选择输入框的Id，sdk自动根据id自动获取文件对象（含图片，或者其他类型文件）
		var fileObj = Easemob.im.Helper.getFileUrl(fileInputId);
		if (fileObj.url == null || fileObj.url == '') {
			alert("请选择发送图片");
			return;
		}
		var filetype = fileObj.filetype;
		var filename = fileObj.filename;
		if (filetype in  {
						"jpg" : true,
						"gif" : true,
						"png" : true,
						"bmp" : true
						}) 
			{
			var opt = {
			fileInputId : fileInputId,
			to : to,
			onFileUploadError : function(error) {
				//处理图片上传失败
			},
			onFileUploadComplete : function(data) {
				//处理图片上传成功，如本地消息显示
			}
			};
			conn.sendPicture(opt);
			return;
		}
		alert("不支持此图片类型" + filetype);
	};
####4.3发送音频消息
sdk处理同4.发送图片消息，分两步：1）上传音频；2）发送消息

    function sendAudio () {
		var to = curChatUserId;
		if (to == null) {
			alert("请选择联系人");
			return;
		}
		var fileObj = Easemob.im.Helper.getFileUrl(fileInputId);
		if (fileObj.url == null || fileObj.url == '') {
			alert("请选择发送音频");
			return;
		}
		var filetype = fileObj.filetype;
		var filename = fileObj.filename;
		if (filetype in {
					"mp3" : true,
					"wma" : true,
					"wav" : true,
					"avi" : true
					})
		 	{
			var opt = {
				fileInputId : fileInputId,
				to : to,
				onFileUploadError : function(error) {
				//处理上传音频失败
				},
				onFileUploadComplete : function(data) {
				//处理上传音频成功，如本地消息提示发送成功
				}
			};
			conn.sendAudio(opt);
			return;
		}
		alert("不支持此音频类型" + filetype);
	};
###5.群聊
####5.1发送文本（表情）聊天消息

    //发送文本消息
    conn.sendTextMessage({
			to : to,
	        type : 'groupchat',
			msg :'hello world！' //文本消息
		});

	//发送表情消息，调用接口同文本消息
	 conn.sendTextMessage({
			to : to,
            type : 'groupchat',
			msg :'hello world！[(*)][(#)]' //文本消息+表情
		});
####5.2发送图片消息
发送图片消息sdk自动分两步完成：<br>
1）上传图片文件<br>
2）发送图片消息参见2初始化连接中的onPictureMessage的格式

    //发送图片消息时调用方法
	var sendPic = function() {
		var to = curChatUserId;
		if (to == null) {
			return;
		}
		// Easemob.im.Helper.getFileUrl为easemobwebim-sdk获取发送文件对象的方法，fileInputId为 input 标签的id值
		var fileObj = Easemob.im.Helper.getFileUrl(fileInputId);
		if (fileObj.url == null || fileObj.url == '') {
			alert("请选择发送图片");
			return;
		}
		var filetype = fileObj.filetype;
		var filename = fileObj.filename;
		if (filetype in pictype) {
			document.getElementById("fileSend").disabled = true;
			document.getElementById("cancelfileSend").disabled = true;
			var opt = {
				type:'chat',
				fileInputId : fileInputId,
				to : to,
				onFileUploadError : function(error) {
					//处理图片上传失败
				},
				onFileUploadComplete : function(data) {
					//关闭文件选择窗口
					$('#fileModal').modal('hide');
					//本地缩略图
					var file = document.getElementById(fileInputId);
					if (file && file.files) {
						var objUrl = getObjectURL(file.files[0]);
						if (objUrl) {
							var img = document.createElement("img");
							img.src = objUrl;
							img.width = maxWidth;
						}
					}
				
				}
			};
			//判断是否为群组标识
			if (curChatUserId.indexOf(groupFlagMark) >= 0) {
				opt.type = 'groupchat';//群组标识符
				opt.to = curRoomId;
			}
			conn.sendPicture(opt);
			return;
		}
		alert("不支持此图片类型" + filetype);
	};
####5.3发送音频消息
sdk处理同5.2.发送图片消息，分两步：1）上传音频；2）发送消息

	//发送音频消息时调用的方法
	var sendAudio = function() {
		var to = curChatUserId;
		if (to == null) {
			alert("请选择联系人");
			return;
		}
		//利用easemobwebim-sdk提供的方法来构造一个file对象
		var fileObj = Easemob.im.Helper.getFileUrl(fileInputId);
		if (fileObj.url == null || fileObj.url == '') {
				alert("请选择发送音频");
			return;
		}
		var filetype = fileObj.filetype;
		var filename = fileObj.filename;
		if (filetype in audtype) {
			document.getElementById("fileSend").disabled = true;
			document.getElementById("cancelfileSend").disabled = true;
			var opt = {
				type:"chat",
				fileInputId : fileInputId,
				to : to,//发给谁
				onFileUploadError : function(error) {
					//处理上传音频失败
				},
				onFileUploadComplete : function(data) {
					//处理上传音频成功，如本地消息提示发送成功
				}
			};
			//构造完opt对象后调用easemobwebim-sdk中发送音频的方法
			if (curChatUserId.indexOf(groupFlagMark) >= 0) {
				opt.type = 'groupchat';
				opt.to = curRoomId;
			}
			conn.sendAudio(opt);
			return;
		}
		alert("不支持此音频类型" + filetype);
	};
####5.4获取群组成员
	//根据roomId查询room成员列表
	var queryOccupants = function queryOccupants(roomId) {
		var occupants = [];//存放成员容器
		//查询获取room信息
		conn.queryRoomInfo({
			roomId : roomId,
			success : function(occs) {
				if (occs) {
					for ( var i = 0; i < occs.length; i++) {
						occupants.push(occs[i]);
					}
				}
				//查询获取room成员信息
				conn.queryRoomMember({
					roomId : roomId,
					success : function(members) {
						if (members) {
							for ( var i = 0; i < members.length; i++) {
								occupants.push(members[i]);
							}
						}
					}
				});
			}
		});
	};

###6.添加好友
1）.申请添加好友
    
    //主动添加好友操作的实现方法
	var startAddFriend = function startAddFriend(){
		//获取要添加的用户账号
		var user = document.getElementById("addfridentId").value;
		//添加联系人列表，开发者可以放到订阅者同意后再进行此操作
		conn.addRoster({
			to : user,
			name : user,
			groups : ['default'],//此处默认添加到default分组
			success : function(){
				alert("等待对方确认");
			},
			error : function(){
				alert('添加操作成功失败');
			}
		});
		var date = new Date().toLocaleTimeString();
		//发送订阅请求
		conn.subscribe({to : user,message:date});
		return;
	};

    //回调方法执行时对方同意了添加好友的实现方法
	var agreeAddFriend = function agreeAddFriend(connection,who,jid){
		var date = new Date().toLocaleTimeString();
		conn.addRoster({
			toJid : jid,
			name : who,//who为对方
			groups : ['default'],//好友默认分组
			success : function(){
				alert(who+"通过了您添加好友的申请");
			},
			error : function(){
				alert('加好友操作失败');
			}
		});
		var date = new Date().toLocaleTimeString();
		//发送者允许接收者接收他们的出席信息
		connection.subscribed({
			toJid : jid,
			message : date
		});
		//发送订阅请求
		conn.subscribe({toJid : jid,message:date});
	};
对于好友的分组，添加好友时在addroster可以指定group属性（默认为：default组），添加好友成功后，好友列表渲染时，根据好友的group属性进行分组渲染，实现类似其他聊天工具的自定义好友分组管理的功能。

2）.添加好友的回调方法实现

    //easemobwebim-sdk中收到联系人订阅请求的处理方法，具体的type值所对应的值请参考xmpp协议规范
	var handlePresence = function (e){
		//（发送者希望订阅接收者的出席信息）
		if(e.type=='subscribe'){
			alert("receive subscribe friend request");
			var fromJid = e.fromJid;
			//此处默认为双方互加好友，具体使用时请结合具体业务进行处理
			agreeAddFriend(conn,e.from,e.fromJid);//e.from用户名，e.fromJid含有appkey用户名
			return;
		}
		//(发送者允许接收者接收他们的出席信息)
		if(e.type=='subscribed'){
			alert("receive friend subscribed message");
			return;
		}
		//（发送者取消订阅另一个实体的出席信息）
		if(e.type=='unsubscribe'){
			alert("receive unsubscribe friend request");
			//单向删除自己的好友信息，具体使用时请结合具体业务进行处理
			delFriend(conn,from,e.fromJid);
			return;
		}
		//（订阅者的请求被拒绝或以前的订阅被取消）
		if(e.type=='unsubscribed'){
			alert("receive delete friend message");
			return;
		}
	};
###7.删除好友

	var date = new Date().toLocaleTimeString();
		conn.removeRoster({
			toJid : jid,
			name : who,
			groups : ['default'],
			success : function(){
				var date = new Date().toLocaleTimeString();
				connection.unsubscribed({
					toJid : jid,
					message : date
				});
				conn.subscribe({toJid : jid,message:date});
				
			},
			error : function(){
				alert('删除联系人失败');
			}
		});
###8.查询好友列表
查询好友列表时，要注意susciption（both，to,from）为不同值得处理,此处认为both和to的为好友，开发者自定义处理，保持跟APP处理一致即可。

    conn.getRoster({
			success : function(roster) {
				hiddenWaitLoginedUI();// 页面处理
				//获取好友列表，并进行好友列表渲染，roster格式为：
				/**	[
						{
							jid:"asemoemo#chatdemoui_test1@easemob.com",
							name:"test1",
							subscription: "both"
						},
						{
							jid:"asemoemo#chatdemoui_test2@easemob.com",
							name:"test2",
							subscription: "from"
						}
					]
				*/
				for(var i in roster){
					var ros = roster[i];	
					//ros.subscriptio值为both/to为要显示的联系人,此处与APP需保持一致，才能保证两个客户端登录后的好友列表一致
					if(ros.subscription =='both' || ros.subscription=='to'){
						newroster.push(ros);
					}
				}
				if (newroster.length >=0) {
					buildContactDiv("contractlist", newroster);//页面处理
					if (newroster.length > 0) {
						setCurrentContact(newroster[0].name);//页面处理将第一个联系人作为当前聊天div
					}
				}
				//conn.setPresence();
			},	
		});

##**工具类说明**
##1.表情工具类-object
	//返回表情JSON object，格式为：
		{
			"[):]" : "data:image/png;base64,iVBORw0K....==",
			"[:D]" : "data:image/png;base64,iVBORw0KGgoAAAANSUh....=="
		}
	
    var emotion_json = Easemob.im.Helper.EmotionPicData;
##2.Base64工具类-object
    var base64  = Easemob.im.Helper.Base64;
	var srcstr="ssss";
	var base64str = base64.encode(srcstr);
	var orgstr = base64.decode(srcstr);
##3.文件上传工具类-attribute
	//是否能上传file
	var canupload = Easemob.im.Helper.isCanUploadFile;
	//是否能下载file
	var candownload = Easemob.im.Helper.isCanDownLoadFile ;
	//是否设置header
	var hasheader = Easemob.im.Helper.hasSetRequestHeader;
	//是否设置mimetype
	var hasmimetype = Easemob.im.Helper.hasOverrideMimeType;
##4.表情解析工具类-Method
	//返回表情JSON，格式为：
		{
			isemotion:true;
			body:[{
					type:txt,
					msg:ssss
					}，
				  {
					type:emotion,
					msg:imgdata
					}]
		}

    var emotionMsg = Easemob.im.Helper.parseTextMessage(message);
##5.文件上传工具类-Method
	//返回fileinfo对象，格式为：
		{
			url : '',
			filename : '',
			filetype : ''
		}
    var fileInfo = Easemob.im.Helper.getFileUrl(fileInputId);
	//上传
	var options={
		appName = 'chatdemoui',
		orgName = 'easemob-demo',
		accessToken = 'YWMtjPPoovCqEeOQs7myPqqaOwAAAUaqNH0a8rRj4PwJLQju6-S47ZO6wYs3Lwo',
		onFileUploadComplete:function(data){//upload file success },
		onFileUploadError:function(e){//upload file error },
		width:100,//only for pic
		heght：100//only for pic
	}
	Easemob.im.Helper.upload(options);
	//下载
	var options = {
		method:'GET',//default GET
		responseType:'blob',//default blob
		mimeType:'text/plain; charset=x-user-defined',//default
		url:'http://s1.easemob.com/weiquan2/a2/chatfiles/0c0f5f3a-e66b-11e3-8863-f1c202c2b3ae',
		secret = 'NSgGYPCxEeOou00jZasg9e-GqKUZGdph96EFxJ4WxW-qkxV4',
		accessToken = 'YWMtjPPoovCqEeOQs7myPqqaOwAAAUaqNH0a8rRj4PwJLQju6-S47ZO6wYs3Lwo',
		onFileUploadComplete:function(data){//upload file success },
		onFileUploadError:function(e){//upload file error },
	}
	Easemob.im.Helper.download(options);
	//文件大小 
	var options={
		fileInputId:'uploadfileinput'//文件输入框id
	};
	var fileSize = getFileSize(options.fileInputId);;
##6.发送Ajax请求-Method
	var options = {
		dataType:'text',//default
		success:function(){//handle request success},
		error :function(){//handle request error},
		type ： 'post',//default 'post'
		url : 'http://s1.easemob.com/weiquan2/a2/chatfiles/0c0f5f3a-e66b-11e3-8863-f1c202c2b3ae',
		headers:'',//default {}
		data : '';//default null
	};
	Easemob.im.Helper.xhr(options);
##7.登录usergrid-Method
	var options = {
		appKey:'easemob-demo#chatdemoui',//default ''
		success:function(data){ //login success },//default emptyFn
		error : cunction(error){ //login error }, //default emptyFn
		user : 'test1', //default ''
		pwd : '123456'  //default ''
	};
	Easemob.im.Helper.login2UserGrid(options);
##8.内置空函数-Method
当所有需要回调的地方接受到函数时，默认采用此函数
var emptyFn = function() {};

##**浏览器支持列表**
<table>
<tr><td>Browser\Func</td><td>Text Message</td><td>Emotion Message</td><td>Picture Message</td><td>Audio Message</td></tr>
<tr><td>IE8</td><td>○</td><td>○</td><td>○</td><td>○</td></tr>
<tr><td>IE9</td><td>○</td><td>○</td><td>○</td><td>○</td></tr>
<tr><td>IE10</td><td>●</td><td>●</td><td>●</td><td>●</td></tr>
<tr><td>IE11</td><td>●</td><td>●</td><td>●</td><td>●</td></tr>
<tr><td>FireFox</td><td>●</td><td>●</td><td>●</td><td>●</td></tr>
<tr><td>Chrome</td><td>●</td><td>●</td><td>●</td><td>●</td></tr>
<tr><td>Safari5X</td><td>●</td><td>●</td><td>●</td><td>●</td></tr>
<tr><td>Safari6X</td><td>●</td><td>●</td><td>●</td><td>●</td></tr>
</table>
---
备注：
1. 已知Picture Message格式支持：png、jpg、bmp；
2. 已知Audio Message格式支持：MP3（amr不支持）。
