var React = require("react");
var LeftBar = require('../leftbar/leftbar');
var Contact = require('../contact/contact');
var ChatWindow = require('../chat/chatWindow');
var RTCChannel = require('../common/rtcChannel');
var Subscribe = require('./subscribe');
var ConfirmPop = require('./confirmPop');
var _ = require('underscore');
var ConfirmGroupInfo = require('../group/confirmGroupInfo');

module.exports = React.createClass({

    getInitialState: function () {
        var me = this;

        Demo.conn.listen({
            onUpdateMyRoster: function (options) {
                me.updateMyRoster(options);
            },
            onUpdateMyGroupList: function (options) {
                me.updateMyGroupList(options);
            },
            onConfirmPop: function (options) {
                me.confirmPop(options);
            },
            onOpened: function () {
                me.props.update({
                    signIn: false,
                    signUp: false,
                    chat: true,
                    loadingStatus: 'hide'
                });

                // blacklist and it's callback call updateRoster
                me.getBlacklist();
                me.getGroup();
                me.getChatroom();
                Demo.conn.errorType = -1;
            },
            onClosed: function (msg) {
                // Demo.api.logout();

                //webRTC:断线处理
                if (WebIM.config.isWebRTC) {
                    me.channel.close();
                }
            },
            onTextMessage: function (message) {
                if (WebIM.config.isWindowSDK) {
                    message = eval('(' + message + ')');
                }
                Demo.api.appendMsg(message, 'txt');
            },
            onEmojiMessage: function (message) {
                if (WebIM.config.isWindowSDK) {
                    message = eval('(' + message + ')');
                }
                Demo.api.appendMsg(message, 'emoji');
            },
            onPictureMessage: function (message) {
                if (WebIM.config.isWindowSDK) {
                    message = eval('(' + message + ')');
                }
                Demo.api.appendMsg(message, 'img');
            },
            onCmdMessage: function (message) {
                if (WebIM.config.isWindowSDK) {
                    message = eval('(' + message + ')');
                }
                Demo.api.appendMsg(message, 'cmd');
            },
            onAudioMessage: function (message) {
                if (WebIM.config.isWindowSDK) {
                    message = eval('(' + message + ')');
                }
                Demo.api.appendMsg(message, 'aud');
            },
            onLocationMessage: function (message) {
                if (WebIM.config.isWindowSDK) {
                    message = eval('(' + message + ')');
                }
                Demo.api.appendMsg(message, 'loc');
            },
            onFileMessage: function (message) {
                if (WebIM.config.isWindowSDK) {
                    message = eval('(' + message + ')');
                }
                Demo.api.appendMsg(message, 'file');
            },
            onVideoMessage: function (message) {
                if (WebIM.config.isWindowSDK) {
                    message = eval('(' + message + ')');
                }
                Demo.api.appendMsg(message, 'video');
            },
            onPresence: function (message) {
                if (WebIM.config.isWindowSDK) {
                    message = eval('(' + message + ')');
                }
                me.handlePresence(message);
            },
            onRoster: function (message) {
                me.getRoster('doNotUpdateGroup');
            },
            onInviteMessage: function (message) {
                message.reason && Demo.api.NotifyError(message.reason);
                me.getGroup();
            },
            onOnline: function () {
                // log(WebIM.utils.ts(), 'online');
            },
            onOffline: function () {
                // log(WebIM.utils.ts(), 'offline');
                if (WebIM.config.isWindowSDK) {
                    Demo.api.NotifyError("Network connection is broken. reconnecting...");
                } else {
                    Demo.api.logout(WebIM.statusCode.WEBIM_CONNCTION_CLIENT_OFFLINE);
                }
            },
            // used for blacklist
            onBlacklistUpdate: function (list) {
                // log('onBlacklistUpdate', list);
                Demo.api.blacklist.parse(list);
                me.setState({blacklist: list});
                // TODO 增量更新
                Demo.api.updateRoster();
            },
            onError: function (message) {
                /*if ( msg && msg.reconnect ) {}*/
                // log(WebIM.utils.ts(), 'onError', message);
                var text = '';
                if (WebIM.config.isWindowSDK) {
                    message = eval('(' + message + ')');
                    text = message.desc;
                    if (message.code == '206') {
                        Demo.api.logout();
                    }
                    //do nothing
                } else {
                    if (message.type == WebIM.statusCode.WEBIM_CONNCTION_DISCONNECTED) {
                        if (Demo.conn.autoReconnectNumTotal < Demo.conn.autoReconnectNumMax) {
                            Demo.conn.errorType = message.type;
                            return;
                        }
                    }
                    if (message.data && message.data.data) {
                        text = message.data.data;
                    } else {
                        text = WebIM.utils.getObjectKey(WebIM.statusCode, message.type) + ' ' + ' type=' + message.type;
                    }
                    // Demo.api.logout(message.type);
                }
                if (Demo.conn.errorType != WebIM.statusCode.WEBIM_CONNCTION_CLIENT_LOGOUT) {
                    Demo.api.NotifyError('onError:' + text);
                }

                Demo.api.init(Demo.conn.errorType);
            }

        });

        return {
            cur: 'friend',
            curNode: '',
            friends: [],
            groups: [],
            chatrooms: [],
            strangers: [],
            blacklist: {},
            chatrooms_totalnum: Demo.api.pagesize,
            contact_loading_show: false
        };
    },
    confirmPop: function (options) {
        ConfirmPop.show(options);
    },
    //for WindosSDK
    updateMyRoster: function (options) {
        var friends = [];
        var roster = eval('(' + options + ')');
        Demo.roster = [];
        for (var i in roster) {
            var ros = roster[i];
            if (ros.subscription === 'both' || ros.subscription === 'from' || ros.subscription === 'to') {
                friends.push(ros);
                Demo.roster[ros.name] = 1;
            }
        }
        Demo.friends = friends;
        this.setState({friends: friends});
    },
    //for WindosSDK
    updateMyGroupList: function (options) {
        var rooms = eval('(' + options + ')');
        this.setState({groups: rooms});
    },
    friendRequest: function (msg) {
        if (msg && msg.status === '[resp:true]') {
            return;
        }

        Subscribe.show(msg);
    },

    componentDidUpdate: function (prevProps, prevState) {
        for (var o in Demo.strangers) {
            if (Demo.strangers.hasOwnProperty(o)) {
                var msg = null;


                while (msg = Demo.strangers[o].pop()) {
                    Demo.api.appendMsg(msg.msg, msg.type);
                }
            }
        }
    },

    componentDidMount: function () {
        if (WebIM.config.isWebRTC && WebIM.WebRTC) {
            this.initWebRTC();
            this.channel = new RTCChannel(this.refs.rtcWrapper);
        }
    },

    initWebRTC: function () {

        if (Demo.call) {
            return;
        }

        var me = this;

        var logger = WebIM.WebRTC.Util.logger;

        Demo.call = new WebIM.WebRTC.Call({
            connection: Demo.conn,

            mediaStreamConstaints: {
                audio: true,
                video: true
            },

            listener: {
                onAcceptCall: function (from, options) {
                    console.log('onAcceptCall', from, options);
                },
                onGotRemoteStream: function (stream) {
                    me.channel.setRemote(stream);
                },
                onGotLocalStream: function (stream) {
                    me.channel.setLocal(stream);
                },
                onRinging: function (caller) {
                    console.log('onRinging', caller);
                },
                onTermCall: function () {
                    me.channel.close();
                },
                onError: function (e) {
                    Demo.api.NotifyError(e && e.message ? e.message : 'An error occured when calling webrtc');
                }
            }
        });
    },

    componentWillReceiveProps: function (nextProps) {
        if (nextProps.groupChange) {
            this.getGroup();
        } else if (nextProps.rosterChange) {
            this.getRoster('doNotUpdateGroup');
        } else if (nextProps.chatroomChange) {
            this.getChatroom();
        } else if (nextProps.strangerChange) {
            this.getStrangers();
        }
    },

    handlePresence: function (msg) {
        var me = this;

        switch (msg.type) {
            case 'joinGroupNotifications':
                ConfirmGroupInfo.show(msg);
                break;
            case 'createGroupACK':

                break;
            case 'leaveGroup':// dismissed by admin
                Demo.api.NotifyError(`${msg.kicked || 'You'} have been dismissed by ${msg.actor || 'admin'} .`);
                Demo.api.updateGroup();
                break;
            case 'subscribe':// The sender asks the receiver to be a friend.
                if (!Demo.roster[msg.from]) {
                    me.friendRequest(msg);
                }
                break;
            case 'subscribed':// The receiver accepts the sender's friend request.
                if (!Demo.roster[msg.from]) {
                    Demo.roster[msg.from] = 1;
                }
                me.getRoster('doNotUpdateGroup');
                break;
            case 'unsubscribe':// The sender deletes a friend.
            case 'unsubscribed':// The other party has removed you from the friend list.
                if (Demo.roster[msg.from]) {
                    delete Demo.roster[msg.from];
                }
                break;
            case 'joinPublicGroupSuccess':
                Demo.api.NotifyError(`You have been invited to group ${msg.from}`);
                //TODO: 服务器端有bug，先延迟1秒刷新列表,找易乐天
                setTimeout(function () {
                    Demo.api.updateGroup()
                }, 1000);

                break;
            case 'joinChatRoomSuccess':// Join the chat room successfully
                Demo.currentChatroom = msg.from;
                break;
            case 'reachChatRoomCapacity':// Failed to join the chat room
                Demo.currentChatroom = null;
                Demo.api.NotifyError('Fail to Join the group');
                break;
            case 'leaveChatRoom':// Leave the chat room
                break;
            case 'deleteGroupChat':// The chat room or group is deleted.
                // ignore the sync `recv` request
                // only handle on async request
                if (msg.original_type == 'unavailable') return;

                var target = document.getElementById(msg.from);
                var options = {
                    title: "Group notification",
                    msg: "You have been out of the group",
                };

                _.find(this.state.groups, function (group, k) {
                    if (group.roomId == msg.from) {
                        options.msg = "You have been out of the group: " + group.name;
                        return true;
                    }
                });

                if (target) {
                    Demo.api.updateGroup();
                }

                Demo.api.NotifyError(options.msg);
                break;
        }

    },

    getStrangers: function () {
        var strangers = [];

        for (var o in Demo.strangers) {
            if (Demo.strangers.hasOwnProperty(o)) {
                strangers.push({name: o});
            }
        }
        this.setState({strangers, strangers});
    },

    getRoster: function (doNotUpdateGroup) {
        var me = this,
            conn = Demo.conn,
            friends = [],
            groups = [];
        if (WebIM.config.isWindowSDK) {
            WebIM.doQuery('{"type":"getRoster"}',
                function success(str) {
                    Demo.roster = [];
                    if (str) {
                        var roster = eval('(' + str + ')');
                        for (var i in roster) {
                            var ros = roster[i];
                            if (ros.subscription === 'both' || ros.subscription === 'from' || ros.subscription === 'to') {
                                friends.push(ros);
                                Demo.roster[ros.name] = 1;
                            }
                        }
                    }
                    me.setState({friends: friends});

                    doNotUpdateGroup || me.getGroup();
                },
                function failure(errCode, errMessage) {
                    Demo.api.NotifyError('getRoster:' + errCode);
                });
        } else {
            conn.getRoster({
                success: function (roster) {
                    var curroster;
                    for (var i in roster) {
                        var ros = roster[i];
                        if (ros.subscription === 'both' || ros.subscription === 'from' || ros.subscription === 'to') {
                            friends.push(ros);
                            Demo.roster[ros.name] = 1;
                        }
                    }
                    me.setState({friends: friends});

                    doNotUpdateGroup || me.getGroup();
                }
            });
        }
        Demo.friends = friends;
    },

    getGroup: function () {
        var me = this;
        if (WebIM.config.isWindowSDK) {
            WebIM.doQuery('{"type":"getGroup"}',
                function success(str) {
                    var rooms = [];
                    if (str) {
                        rooms = eval('(' + str + ')');
                    }
                    me.setState({groups: rooms});
                },
                function failure(errCode, errMessage) {
                    Demo.api.NotifyError('getGroup:' + errCode);
                });
        } else {
            Demo.conn.listRooms({
                success: function (rooms) {
                    Demo.conn.setPresence();
                    me.setState({groups: rooms});
                },
                error: function (e) {
                    Demo.conn.setPresence();
                }
            });
        }
    },

    getChatroom: function () {
        var me = this;
        var pagenum = Math.ceil(this.state.chatrooms.length / Demo.api.pagesize);
        var pageTotal = Math.ceil(this.state.chatrooms_totalnum / Demo.api.pagesize);
        if (pagenum == pageTotal) {
            return;
        }
        pagenum++;
        this.setState({contact_loading_show: true});
        if (WebIM.config.isWindowSDK) {
            WebIM.doQuery('{"type":"getChatroom"}',
                function success(str) {
                    var rooms = eval('(' + str + ')');
                    me.setState({chatrooms: rooms});
                },
                function failure(errCode, errMessage) {
                    Demo.api.NotifyError('getChatroom:' + errCode);
                });
        } else {
            Demo.conn.getChatRooms({
                apiUrl: WebIM.config.apiURL,
                pagenum: pagenum,
                pagesize: Demo.api.pagesize,
                success: function (list) {
                    var states = {};
                    if (list.data) {
                        //TODO: 等接口返回totalnum这个参数之后，就不要再计算totalnum了。 直接states.chatrooms_totalnum=list.totalnum
                        if (list.data.length > 0) {
                            states.chatrooms_totalnum = (parseInt(list.params.pagenum[0]) + 1) * Demo.api.pagesize;
                            states.chatrooms = me.state.chatrooms.concat(list.data);
                        } else {
                            states.chatrooms_totalnum = parseInt(list.params.pagenum[0] - 1) * Demo.api.pagesize;
                        }
                    }
                    states.contact_loading_show = false;
                    me.setState(states);
                },
                error: function (e) {
                    Demo.api.NotifyError('getChatroom:' + e);
                }
            });
        }
    },

    // when signed then get blacklist
    getBlacklist: function () {
        var me = this;
        Demo.api.blacklist.getBlacklist({
            success: function (list) {
                me.setState({blacklist: list});
            }
        });
    },

    update: function (cur) {
        this.setState({cur: cur, contact_loading_show: false});
    },

    updateNode: function (id) {
        this.setState({curNode: id});
    },

    sendPicture: function (chatType) {
        if (WebIM.config.isWindowSDK) {
            this.sendFileImpl("img", chatType);
        } else {
            this.refs.picture.click();
        }
    },

    pictureChange: function () {
        var me = this,
            chatroom = Demo.selectedCate === 'chatrooms',
            file = WebIM.utils.getFileUrl(me.refs.picture),
            url;

        if (!file.filename) {
            me.refs.picture.value = null;
            return false;
        }

        if (!Demo.IMGTYPE[file.filetype.toLowerCase()]) {
            me.refs.picture.value = null;
            Demo.api.NotifyError(Demo.lan.invalidType + ': ' + file.filetype);
            return;
        }

        var msg = new WebIM.message('img', Demo.conn.getUniqueId());

        msg.set({
            apiUrl: WebIM.config.apiURL,
            file: file,
            to: Demo.selected,
            roomType: chatroom,
            onFileUploadError: function (error) {
                log(error);
                me.refs.picture.value = null;

                Demo.api.appendMsg({
                    data: Demo.lan.sendImageFailed,
                    from: Demo.user,
                    to: Demo.selected
                }, 'txt');
            },
            onFileUploadComplete: function (data) {
                url = data.uri + '/' + data.entities[0].uuid;
                me.refs.picture.value = null;
            },
            success: function (id) {
                Demo.api.appendMsg({
                    data: url,
                    from: Demo.user,
                    to: Demo.selected
                }, 'img');
            },
            flashUpload: WebIM.flashUpload
        });

        if (Demo.selectedCate === 'groups') {
            msg.setGroup(Demo.groupType);
        } else if (chatroom) {
            msg.setGroup(Demo.groupType);
        }

        Demo.conn.send(msg.body);
    },

    sendAudio: function (chatType) {
        if (WebIM.config.isWindowSDK) {
            this.sendFileImpl("aud", chatType);
        } else {
            this.refs.audio.click();
        }
    },

    sendAudioMsg: function (file, duration) {
        var msg = new WebIM.message('audio', Demo.conn.getUniqueId()),
            chatroom = Demo.selectedCate === 'chatrooms',
            url,
            me = this;

        msg.set({
            apiUrl: WebIM.config.apiURL,
            file: file,
            to: Demo.selected,
            roomType: chatroom,
            length: duration || 0,
            onFileUploadError: function (error) {
                log(error);
                me.refs.audio.value = null;

                Demo.api.appendMsg({
                    data: Demo.lan.sendAudioFailed,
                    from: Demo.user,
                    to: Demo.selected
                }, 'txt');
            },
            onFileUploadComplete: function (data) {
                url = data.uri + '/' + data.entities[0].uuid;
                me.refs.audio.value = null;
            },
            success: function (id, sid) {
                Demo.api.appendMsg({
                    data: url,
                    from: Demo.user,
                    to: Demo.selected,
                    id: sid,
                    length: duration
                }, 'aud');
            },
            flashUpload: WebIM.flashUpload
        });

        if (Demo.selectedCate === 'groups') {
            msg.setGroup(Demo.groupType);
        } else if (chatroom) {
            msg.setGroup(Demo.groupType);
        }

        Demo.conn.send(msg.body);
    },

    audioChange: function () {
        var me = this,
            file = WebIM.utils.getFileUrl(me.refs.audio);

        if (!file.filename) {
            me.refs.audio.value = null;
            return false;
        }

        if (!Demo.AUDIOTYPE[file.filetype.toLowerCase()]) {
            me.refs.audio.value = null;
            Demo.api.NotifyError(Demo.lan.invalidType + ': ' + file.filetype);
            return;
        }

        if ((WebIM.utils.getIEVersion === null || WebIM.utils.getIEVersion > 9) && window.Audio) {

            var audio = document.createElement('audio');

            audio.oncanplay = function () {
                me.sendAudioMsg(file, Math.ceil(this.duration));
                audio = null;
            }
            audio.src = file.url;
            log('audio loading...');
        }
    },

    sendFile: function (chatType) {
        if (WebIM.config.isWindowSDK) {
            this.sendFileImpl("file", chatType);
        } else {
            this.refs.file.click();
        }
    },
    sendFileImpl: function (type, chatType) {
        //this.refs.file.click();
        var is_chatroom = Demo.selectedCate === 'chatrooms' ? "true" : "false";
        var is_group = (Demo.selectedCate === 'chatrooms' || Demo.selectedCate === 'groups') ? "groupchat" : "singlechat";
        WebIM.doQuery('{"type":"sendFileMessage","to":"' + Demo.selected + '","message_type":"' + type + '","group":"' + is_group + '","chatType":"' + chatType + '","roomType":"' + is_chatroom + '"}',
            function (response) {
                var res = eval('(' + response + ')');

                var url = decodeURI(res.url);
                var pathSplitted = url.split("\\");

                url = url.replace(/\\/ig, "/");
                var fileurl = 'file:///' + url;
                Demo.api.appendMsg({
                    id: res.id,
                    data: fileurl,
                    filename: pathSplitted[pathSplitted.length - 1],
                    from: Demo.user,
                    to: Demo.selected
                }, type);
            },
            function (code, msg) {
                alert(code + " - " + msg);
            });
    },
    fileChange: function () {
        var me = this, url,
            msg = new WebIM.message('file', Demo.conn.getUniqueId()),
            chatroom = Demo.selectedCate === 'chatrooms',
            file = WebIM.utils.getFileUrl(me.refs.file),
            filename = file.filename;

        if (!file.filename) {
            me.refs.file.value = null;
            return false;
        }

        if (!Demo.FILETYPE[file.filetype.toLowerCase()]) {
            me.refs.file.value = null;
            Demo.api.NotifyError(Demo.lan.invalidType + ': ' + file.filetype);
            return;
        }

        msg.set({
            apiUrl: WebIM.config.apiURL,
            file: file,
            filename: filename,
            to: Demo.selected,
            roomType: chatroom,
            onFileUploadError: function (error) {
                log(error);
                me.refs.file.value = null;

                Demo.api.appendMsg({
                    data: Demo.lan.sendFileFailed,
                    from: Demo.user,
                    to: Demo.selected
                }, 'txt');
            },
            onFileUploadComplete: function (data) {
                url = data.uri + '/' + data.entities[0].uuid;
                me.refs.file.value = null;
            },
            success: function (id) {
                Demo.api.appendMsg({
                    data: url,
                    filename: filename,
                    from: Demo.user,
                    to: Demo.selected
                }, 'file');
            },
            flashUpload: WebIM.flashUpload
        });

        if (Demo.selectedCate === 'groups') {
            msg.setGroup(Demo.groupType);
        } else if (chatroom) {
            msg.setGroup(Demo.groupType);
        }

        Demo.conn.send(msg.body);
    },

    render: function () {
        // Demo.api.curLength = this.state[this.state.cur].length;

        var windows = [], id,
            props = {
                sendPicture: this.sendPicture,
                sendAudio: this.sendAudio,
                sendFile: this.sendFile,
                name: ''
            };

        for (var i = 0; i < this.state.friends.length; i++) {
            id = this.state.friends[i].name;
            props.name = id;
            windows.push(<ChatWindow id={'wrapper' + id} key={id} {...props} chatType='singleChat'
                                     updateNode={this.updateNode}
                                     className={this.state.friends[i].name === this.state.curNode ? '' : 'hide'}/>);
        }

        for (var i = 0; i < this.state.groups.length; i++) {
            id = this.state.groups[i].roomId;
            props.name = this.state.groups[i].name;

            windows.push(<ChatWindow roomId={id} id={'wrapper' + id} key={id} {...props} chatType='groupChat'
                                     className={id === this.state.curNode ? '' : 'hide'}/>);
        }

        for (var i = 0; i < this.state.chatrooms.length; i++) {
            id = this.state.chatrooms[i].id;
            props.name = this.state.chatrooms[i].name;

            windows.push(<ChatWindow roomId={id} id={'wrapper' + id} key={id} {...props} chatType='chatRoom'
                                     className={id === this.state.curNode ? '' : 'hide'}/>);
        }

        for (var i = 0; i < this.state.strangers.length; i++) {
            id = this.state.strangers[i].name;
            props.name = id;

            windows.push(<ChatWindow id={'wrapper' + id} key={id} {...props}
                                     className={this.state.strangers[i].name === this.state.curNode ? '' : 'hide'}/>);
        }

        return (
            <div className={this.props.show ? 'webim-chat' : 'webim-chat hide'}>
                <LeftBar cur={this.state.cur} update={this.update}/>
                <Contact cur={this.state.cur}
                         curNode={this.state.curNode}
                         updateNode={this.updateNode}
                         update={this.update}
                         friends={this.state.friends}
                         blacklist={this.state.blacklist}
                         groups={this.state.groups}
                         chatrooms={this.state.chatrooms}
                         strangers={this.state.strangers}
                         getChatroom={this.getChatroom}
                         loading={this.state.contact_loading_show}/>
                {windows}
                <input ref='picture' onChange={this.pictureChange} type='file' className='hide'/>
                <input ref='audio' onChange={this.audioChange} type='file' className='hide'/>
                <input ref='file' onChange={this.fileChange} type='file' className='hide'/>
                <input id='uploadShim' type='file' className='hide'/>
                <div ref='rtcWrapper'></div>
            </div>
        );
    }
});
