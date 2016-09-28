var React = require("react");
var LeftBar = require('../leftbar/leftbar');
var Contact = require('../contact/contact');
var ChatWindow = require('../chat/chatWindow');
var Notify = require('../common/notify');
var RTCChannel = require('../common/rtcChannel');
var Subscribe = require('./subscribe');
var ConfirmPop = require('./confirmPop');

module.exports = React.createClass({

    getInitialState: function () {
        var me = this;

        Demo.conn.listen({
            onUpdateMyGroupList: function (options) {
                me.updateMyGroupList(options);
            },
            onGetGroup: function () {
                me.getGroup();
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

                me.getRoster();
                me.getChatroom();
            },
            onClosed: function (msg) {
                log('onClosed');
                me.channel.close();
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
                me.getGroup();
            },
            onOnline: function () {
                log('online');
            },
            onOffline: function () {
                log('offline');
                if (WebIM.config.isWindowSDK) {
                    WebIM.doQuery('{"type":"logout"}',
                        function (response) {
                            Notify.error("Network connection is broken. reconnecting...");
                        },
                        function (code, msg) {
                        });

                } else {
                    Demo.api.logout();
                }
            },
            onError: function (message) {
                /*if ( msg && msg.reconnect ) {}*/
                log('onError', message);
                var text = '';
                if (WebIM.config.isWindowSDK) {
                    message = eval('(' + message + ')');
                    text = message.desc;
                    Demo.api.logout();
                    //do nothing
                } else {
                    if (message.data && message.data.data) {
                        text = message.data.data;
                    } else {
                        //offline by multi login
                        if (message.type == 7 || message.type == 8) {
                            text = me.getObjectKey(WebIM.statusCode, message.type);
                        } else {
                            text = 'type=' + message.type;
                        }
                    }
                    Demo.api.logout();
                }
                Notify.error('onError:' + text);
            }
        });


        return {
            cur: 'friend',
            curNode: '',
            friends: [],
            groups: [],
            chatrooms: [],
            strangers: []
        };
    },
    getObjectKey: function (obj, val) {
        for (var key in obj) {
            if (obj[key] == val) {
                return key;
            }
        }
        return '';
    },
    confirmPop: function (options) {
        console.log('comfirmPop', options);


        ConfirmPop.show(options);
    },
    updateMyGroupList: function (options) {
        //TODO:@lhr
        console.log('updateMyGroupList', options);
    },

    friendRequest: function (msg) {
        console.log('friendRequest', msg);
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
                    debugger
                },
                onGotRemoteStream: function (stream) {
                    me.channel.setRemote(stream);
                },
                onGotLocalStream: function (stream) {
                    me.channel.setLocal(stream);
                },
                onRinging: function (caller) {
                    debugger
                },
                onTermCall: function () {
                    me.channel.close();
                },
                onError: function (e) {
                    Notify.error(e && e.message ? e.message : 'An error occured when calling webrtc');
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
            case 'leaveGroup':// dismissied by admin
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
                console.log('joinPublicGroupSuccess');
                Demo.api.updateGroup();
                break;
            case 'joinChatRoomSuccess':// Join the chat room successfully
                Demo.currentChatroom = msg.from;
                break;
            case 'reachChatRoomCapacity':// Failed to join the chat room
                Demo.currentChatroom = null;
                Notify.error('加入聊天室失败');
                break;
            case 'leaveChatRoom':// Leave the chat room
                break;
            case 'deleteGroupChat':// The chat room or group is deleted.
                var target = document.getElementById(msg.from);

                if (target) {
                    Demo.api.updateGroup();
                }
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
                    var roster = eval('(' + str + ')');
                    Demo.roster = [];

                    for (var i in roster) {
                        var ros = roster[i];
                        if (ros.subscription === 'both' || ros.subscription === 'from' || ros.subscription === 'to') {
                            friends.push(ros);
                            Demo.roster[ros.name] = 1;
                        }
                    }
                    me.setState({friends: friends});

                    doNotUpdateGroup || me.getGroup();
                },
                function failure(errCode, errMessage) {
                    Notify.error('getRoster:' + errCode);
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
    },

    getGroup: function () {
        var me = this;
        if (WebIM.config.isWindowSDK) {
            WebIM.doQuery('{"type":"getGroup"}',
                function success(str) {
                    var rooms = eval('(' + str + ')');
                    me.setState({groups: rooms});
                },
                function failure(errCode, errMessage) {
                    Notify.error('getGroup:' + errCode);
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
        if (WebIM.config.isWindowSDK) {
            WebIM.doQuery('{"type":"getChatroom"}',
                function success(str) {
                    var rooms = eval('(' + str + ')');
                    me.setState({chatrooms: rooms});
                },
                function failure(errCode, errMessage) {
                    Notify.error('getChatroom:' + errCode);
                });
        } else {
            Demo.conn.getChatRooms({
                apiUrl: WebIM.config.apiURL,
                success: function (list) {
                    if (list.data && list.data.length > 0) {
                        me.setState({chatrooms: list.data});
                    }
                },
                error: function (e) {
                    Notify.error('getChatroom:' + e);
                }
            });
        }
    },

    update: function (cur) {
        this.setState({cur: cur});
    },

    updateNode: function (id) {
        this.setState({curNode: id});
    },

    sendPicture: function () {
        if (WebIM.config.isWindowSDK) {
            this.sendFileImpl("img");
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
            Notify.error(Demo.lan.invalidType + ': ' + file.filetype);
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

    sendAudio: function () {
        if (WebIM.config.isWindowSDK) {
            this.sendFileImpl("aud");
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
            Notify.error(Demo.lan.invalidType + ': ' + file.filetype);
            return;
        }

        if ((WebIM.utils.getIEVersion === null || WebIM.utils.getIEVersion > 9) && window.Audio) {

            var audio = document.createElement('audio');

            audio.oncanplay = function () {
                log('audio_length:' + this.duration);
                me.sendAudioMsg(file, Math.ceil(this.duration));
                audio = null;
            }
            audio.src = file.url;
            log('audio loading...');
        }
    },

    sendFile: function () {
        if (WebIM.config.isWindowSDK) {
            this.sendFileImpl("file");
        } else {
            this.refs.file.click();
        }
    },
    sendFileImpl: function (type) {
        //this.refs.file.click();
        var is_chatroom = Demo.selectedCate === 'chatrooms' ? "true" : "false";
        var is_group = (Demo.selectedCate === 'chatrooms' || Demo.selectedCate === 'groups') ? "groupchat" : "singlechat";
        WebIM.doQuery('{"type":"sendFileMessage","to":"' + Demo.selected + '","message_type":"' + type + '","group":"' + is_group + '","roomType":"' + is_chatroom + '"}',
            function (response) {
                var pathSplitted = decodeURI(response).split("\\");

                response = response.replace(/\\/ig, "/");
                var fileurl = 'file:///' + response;
                Demo.api.appendMsg({
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
            Notify.error(Demo.lan.invalidType + ': ' + file.filetype);
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

            windows.push(<ChatWindow id={'wrapper' + id} key={id} {...props}
                                     className={this.state.friends[i].name === this.state.curNode ? '' : 'hide'}/>);
        }

        for (var i = 0; i < this.state.groups.length; i++) {
            id = this.state.groups[i].roomId;
            props.name = this.state.groups[i].name;

            windows.push(<ChatWindow roomId={id} id={'wrapper' + id} key={id} {...props} showOptions={true}
                                     className={id === this.state.curNode ? '' : 'hide'}/>);
        }

        for (var i = 0; i < this.state.chatrooms.length; i++) {
            id = this.state.chatrooms[i].id;
            props.name = this.state.chatrooms[i].name;

            windows.push(<ChatWindow roomId={id} id={'wrapper' + id} key={id} {...props}
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
                <Contact cur={this.state.cur} curNode={this.state.curNode} updateNode={this.updateNode}
                         update={this.update}
                         friends={this.state.friends} groups={this.state.groups} chatrooms={this.state.chatrooms}
                         strangers={this.state.strangers}/>
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
