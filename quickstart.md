---
title: 环信
description: 5分钟为你的APP加入聊天功能
category: webchat
layout: docs
---

## WebIM sdk介绍:
##**基本功能**

### 1.创建连接
    var conn = new Easemob.xmpp.Connection();
### 2.初始化连接
    conn.init({
			onOpened : function() {
				curUserId = conn.context.userId;
				conn.getRoster(function(roster) {
					//获取好友列表，并进行好友列表渲染，roster格式为：
					[
						{
							jid:"asemoemo#chatdemoui_test1@easemob.com",
							name:"test1",
							subscription: "none"
						},
						{
							jid:"asemoemo#chatdemoui_test2@easemob.com",
							name:"test2",
							subscription: "none"
						}
					]
					conn.setPresence(null);
				}, function(e) {
					//获取好友异常处理
					alert(e.msg + ",请重新登录");
				});
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
###4.发送文本（表情）聊天消息
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

###5.发送图片消息
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
		var fileObj = Easemob.xmpp.Helper.getFileUrl(fileInputId);
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
###6.发送音频消息
sdk处理同4.发送图片消息，分两步：1）上传音频；2）发送消息

    function sendAudio () {
		var to = curChatUserId;
		if (to == null) {
			alert("请选择联系人");
			return;
		}
		var fileObj = Easemob.xmpp.Helper.getFileUrl(fileInputId);
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

##**工具类说明**
##1.表情工具类-object
	//返回表情JSON object，格式为：
		{
			"[):]" : "data:image/png;base64,iVBORw0K....==",
			"[:D]" : "data:image/png;base64,iVBORw0KGgoAAAANSUh....=="
		}
	
    var emotion_json = Easemob.xmpp.Helper.EmotionPicData;
##2.Base64工具类-object
    var base64  = Easemob.xmpp.Helper.Base64;
##3.文件上传工具类-attribute
	//是否能上传file
	var canupload = Easemob.xmpp.Helper.isCanUploadFile;
	//是否能下载file
	var candownload = Easemob.xmpp.Helper.isCanDownLoadFile ;
	//是否设置header
	var hasheader = Easemob.xmpp.Helper.hasSetRequestHeader;
	//是否设置mimetype
	var hasmimetype = Easemob.xmpp.Helper.hasOverrideMimeType;
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

    var emotionMsg = Easemob.xmpp.Helper.parseTextMessage(message);
##5.文件上传工具类-Method
	//返回fileinfo对象，格式为：
		{
			url : '',
			filename : '',
			filetype : ''
		}
    var fileObj = Easemob.xmpp.Helper.getFileUrl(fileInputId);
	//上传
	Easemob.xmpp.Helper.upload = uploadFn;
	//下载
	Easemob.xmpp.Helper.download = downloadFn;
	//文件大小
	Easemob.xmpp.Helper.getFileSize = getFileSizeFn;
##6.发送Ajax请求-Method
	Easemob.xmpp.Helper.xhr = doAjaxRequest;
##7.登录usergrid-Method
	Easemob.xmpp.Helper.login2UserGrid = login2UserGrid;
