var React = require("react");
var LeftBar = require('../leftbar/leftbar');
var Contact = require('../contact/contact');
var ChatWindow = require('../chat/chatwindow');



module.exports = React.createClass({

    getInitialState: function () {
        var me = this;

        Demo.conn.listen({
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
            onClosed: function ( msg ) {
                if ( msg && msg.reconnect ) {

                }
                log('onClosed');
            },
            onTextMessage: function ( message ) {
                Demo.api.appendMsg(message, 'txt');
            },
            onEmotionMessage: function ( message ) {
                Demo.api.appendMsg(message, 'emotion');
            },
            onPictureMessage: function ( message ) {
                Demo.api.appendMsg(message, 'img');
            },
            onCmdMessage: function ( message ) {
                Demo.api.appendMsg(message, 'cmd');
            },
            onAudioMessage: function ( message ) {
                Demo.api.appendMsg(message, 'aud');
            },
            onLocationMessage: function ( message ) {
                Demo.api.appendMsg(message, 'loc');
            },
            onFileMessage: function ( message ) {
                Demo.api.appendMsg(message, 'file');
            },
            onVideoMessage: function ( message ) {
                Demo.api.appendMsg(message, 'video');
            },
            onPresence: function ( message ) {
                log('onPresence');
                //this.handlePresence(message);
            },
            onRoster: function ( message ) {
                log('onRoster');
            },
            onInviteMessage: function ( message ) {
                log('onInviteMessage');
            },
            onOnline: function () {
                log('online');
            },
            onError: function ( message ) {
                log('onError', message);
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

    /*handlePresence: function ( msg ) {
        switch ( msg.type )  {
            case 'leaveGroup'://群组被踢
                debugger
                Demo.api.removeGroup(msg.to);
                break;
            case 'subscribe'://别人申请加你为好友
                debugger
                Demo.conn.subscribed({//agree
                    to : msg.from,
                    message : "[resp:true]"
                });
                Demo.conn.unsubscribed({//reject
                    to : user,
                    message : getLoacalTimeString()
                });
                break;
            case 'subscribed'://别人同意你加他为好友
                debugger
                /*toRoster.push({
                    name : e.from,
                    jid : e.fromJid,
                    subscription : "to"
                });
                break;
            case 'unsubscribe'://删除现有好友
                debugger
            case 'unsubscribed'://对方单向的删除了好友
                debugger
                Demo.conn.removeRoster({
                    to: msg.from,
                    groups: [ 'default' ],
                    success: function () {
                        Demo.conn.unsubscribed({
                            to: msg.from
                        });
                    }
                });
                break;
            case 'joinChatRoomSuccess'://加入聊天室成功
                debugger
                Demo.api.appendMsg({
                    data: '加入聊天室成功',
                    to: msg.from
                }, 'txt');
                break;
            case 'joinChatRoomFailed'://加入聊天室失败
                debugger
                Demo.api.appendMsg({
                    data: '加入聊天室失败',
                    to: msg.from
                }, 'txt')
                break;
            case 'leaveChatRoom'://退出聊天室

                break;
            case 'deleteGroupChat'://聊天室和群组被删除
                var targetTmp1 = $('#' + curUserId + '-' + chatRoomMark + e.from),
                    targetTmp2 = $('#' + curUserId + '-' + groupFlagMark + e.from),
                    target = null;

                if ( targetTmp1.length ) {
                    appendMsg(curUserId, chatRoomMark + e.from, '聊天室已被删除', true);
                    target = targetTmp1;
                    if ( curChatRoomId &&  curChatRoomId == e.from) {
                        curChatRoomId = null;
                    }
                    $('#' + chatRoomMark + e.from).remove();
                    if ( curChatUserId === 'chatroom' + e.from ) {
                        curChatUserId = null;
                    }
                } else if ( targetTmp2.length ) {
                    appendMsg(curUserId, groupFlagMark + e.from, '群组已被删除', true);
                    target = targetTmp2;
                    curRoomId = null;
                    $('#' + groupFlagMark + e.from).remove();
                    if ( curChatUserId === e.from ) {
                        curChatUserId = null;
                    }
                }
                var el = $('#' + groupFlagMark + e.from),
                    el2 = $('#' + chatRoomMark + e.from);

                el && $(el).remove();
                el2 && $(el2).remove();
                setTimeout(function () { target && target.remove(); }, 1000);
                break;
        };
    },*/

    getRoster: function () {
        var me = this,
            conn = Demo.conn,
            friends = [],
            groups = [];

        conn.getRoster({
            success : function ( roster ) {
                var curroster;
                for ( var i in roster ) {
                    var ros = roster[i];
                    if ( ros.subscription === 'both' || ros.subscription === 'from' ) {
                        friends.push(ros);
                        
                    }
                }
                me.setState({ friends: friends });
                
                conn.listRooms({
                    success: function ( rooms ) {
                        conn.setPresence();
                        me.setState({ groups: rooms });
                    },
                    error: function(e) {
                        conn.setPresence();
                    }
                });
            }
        });
    },

    getChatroom: function () {
        var me = this;

	    Demo.conn.getChatRooms({
            apiUrl: WebIM.config.apiURL,
            success: function ( list ) {

                if ( list.data && list.data.length > 0 ) {
                    me.setState({ chatrooms: list.data });
                }
            },
            error: function ( e ) {
                log(e);
            }
        });
    },

    close: function () {
        Demo.conn.close();
        this.props.close();
    },

    componentWillUnmount: function () {
        
    },

    update: function ( curNode ) {
        this.setState({ cur: curNode });
    },

    updateNode: function ( id ) {
        this.setState({ curNode: id });
    },

    sendPicture: function () {
        this.refs.picture.click();
    },

    pictureChange: function () {
        var me = this,
            url;

        var msg = new WebIM.message.img(Demo.conn.getUniqueId());

        msg.set({
            apiUrl: WebIM.config.apiURL,
            file: WebIM.utils.getFileUrl(me.refs.picture),
            to: Demo.selected,
            onFileUploadError: function ( error ) {
                log(error);
                me.refs.picture.value = null;

                Demo.api.appendMsg({
                    data: '发送图片失败',
                    from: Demo.user,
                    to: Demo.selected
                }, 'txt');
            },
            onFileUploadComplete: function ( data ) {
                url = data.uri + data.entities[0].uuid;
                me.refs.picture.value = null;
            },
            success: function ( id ) {
                Demo.api.appendMsg({
                    data: url,
                    from: Demo.user,
                    to: Demo.selected
                }, 'img');
            },
            flashUpload: WebIM.flashUpload
        });

		/*if (curChatUserId.indexOf(groupFlagMark) >= 0) {
			opt.type = groupFlagMark;
			opt.to = curRoomId;
		} else if (curChatUserId.indexOf(chatRoomMark) >= 0) {
			opt.type = groupFlagMark;
			opt.roomType = chatRoomMark;
			opt.to = curChatRoomId;
		}*/

		Demo.conn.send(msg.body);
    },

    sendAudio: function () {
        this.refs.audio.click();
    },

    sendAudioMsg: function ( file, duration ) {
        var msg = new WebIM.message.audio(Demo.conn.getUniqueId()),
            url,
            me = this;

        msg.set({
            apiUrl: WebIM.config.apiURL,
            file: file,
            to: Demo.selected,
            length: duration || 0,
            onFileUploadError: function ( error ) {
                log(error);
                me.refs.audio.value = null;

                Demo.api.appendMsg({
                    data: '发送音频失败',
                    from: Demo.user,
                    to: Demo.selected
                }, 'txt');
            },
            onFileUploadComplete: function ( data ) {
                url = data.uri + data.entities[0].uuid;
                me.refs.audio.value = null;
            },
            success: function ( id, sid ) {
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

		/*if (curChatUserId.indexOf(groupFlagMark) >= 0) {
			opt.type = groupFlagMark;
			opt.to = curRoomId;
		} else if (curChatUserId.indexOf(chatRoomMark) >= 0) {
			opt.type = groupFlagMark;
			opt.roomType = chatRoomMark;
			opt.to = curChatRoomId;
		}*/

		Demo.conn.send(msg.body);
    },

    audioChange: function () {
        var me = this,
            file = WebIM.utils.getFileUrl(me.refs.audio);

        if ( (WebIM.utils.getIEVersion === null || WebIM.utils.getIEVersion > 9) && window.Audio ) {

            var audio = document.createElement('audio');

            audio.oncanplay = function () {
                me.sendAudioMsg(file, Math.ceil(this.duration));
            }
            audio.src = file.url;
        }
    },

    sendFile: function () {
        this.refs.file.click();
    },

    fileChange: function () {
        var me = this,
            url;

        var msg = new WebIM.message.file(Demo.conn.getUniqueId()),
            file = WebIM.utils.getFileUrl(me.refs.file),
            filename = file.filename;

        msg.set({
            apiUrl: WebIM.config.apiURL,
            file: file,
            filename: filename,
            to: Demo.selected,
            onFileUploadError: function ( error ) {
                log(error);
                me.refs.file.value = null;

                Demo.api.appendMsg({
                    data: '发送文件失败',
                    from: Demo.user,
                    to: Demo.selected
                }, 'txt');
            },
            onFileUploadComplete: function ( data ) {
                url = data.uri + data.entities[0].uuid;
                me.refs.file.value = null;
            },
            success: function ( id ) {
                Demo.api.appendMsg({
                    data: url,
                    filename: filename,
                    from: Demo.user,
                    to: Demo.selected
                }, 'file');
            },
            flashUpload: WebIM.flashUpload
        });

		/*if (curChatUserId.indexOf(groupFlagMark) >= 0) {
			opt.type = groupFlagMark;
			opt.to = curRoomId;
		} else if (curChatUserId.indexOf(chatRoomMark) >= 0) {
			opt.type = groupFlagMark;
			opt.roomType = chatRoomMark;
			opt.to = curChatRoomId;
		}*/

		Demo.conn.send(msg.body);
    },

    render: function () {
        var windows = [], id, 
            props = {
                sendPicture: this.sendPicture,
                sendAudio: this.sendAudio,
                sendFile: this.sendFile,
                cur: this.state.curNode
            };

        for ( var i = 0; i < this.state.friends.length; i++ ) {
            id = this.state.friends[i].name;

            windows.push(<ChatWindow id={'wrapper' + id} key={id} {...props}
                className={this.state.friends[i].name === this.state.curNode ? '' : 'hide'} />);
        }

        for ( var i = 0; i < this.state.groups.length; i++ ) {
            id = this.state.groups[i].roomId;

            windows.push(<ChatWindow id={'wrapper' + id} key={id} {...props} 
                className={this.state.groups[i].name === this.state.curNode ? '' : 'hide'} />);
        }

        for ( var i = 0; i < this.state.chatrooms.length; i++ ) {
            id = this.state.chatrooms[i].id;

            windows.push(<ChatWindow id={'wrapper' + id} key={id} {...props} 
                className={this.state.chatrooms[i].name === this.state.curNode ? '' : 'hide'} />);
        }

        for ( var i = 0; i < this.state.strangers.length; i++ ) {
            id = this.state.strangers[i].name;

            windows.push(<ChatWindow id={'wrapper' + id} key={id} {...props}
                className={this.state.strangers[i].name === this.state.curNode ? '' : 'hide'} />);
        }

        return (
            <div className={this.props.show ? 'webim-chat' : 'webim-chat hide'}>
                <LeftBar cur={this.state.cur} update={this.update} close={this.close} />
                <Contact cur={this.state.cur} curNode={this.state.curNode} updateNode={this.updateNode} update={this.update} 
                    friends={this.state.friends} groups={this.state.groups} chatrooms={this.state.chatrooms} strangers={this.state.strangers} />
                {windows}
                <input ref='picture' onChange={this.pictureChange} type='file' className='hide' />
                <input ref='audio' onChange={this.audioChange} type='file' className='hide' />
                <input ref='file' onChange={this.fileChange} type='file' className='hide' />
                <input id='uploadShim' type='file' className='hide' />
            </div>
        );
    }
});
