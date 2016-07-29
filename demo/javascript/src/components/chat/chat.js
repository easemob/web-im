var React = require("react");
var LeftBar = require('../leftbar/leftbar');
var Contact = require('../contact/contact');
var ChatWindow = require('../chat/chatwindow');
var Notify = require('../common/notify');
var Subscribe = require('./subscribe');



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
                /*if ( msg && msg.reconnect ) {}*/
                log('onClosed');
                Demo.api.logout();
            },
            onTextMessage: function ( message ) {
                Demo.api.appendMsg(message, 'txt');
            },
            onEmojiMessage: function ( message ) {
                Demo.api.appendMsg(message, 'emoj');
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
                me.handlePresence(message);
            },
            onRoster: function ( message ) {
                me.getRoster('doNotUpdateGroup');
            },
            onInviteMessage: function ( message ) {
                me.getGroup();
            },
            onOnline: function () {
                log('online');
            },
            onOffline: function () {
                log('offline');
                Demo.api.logout();
            },
            onError: function ( message ) {

                Notify.error(message.data && message.data.data ? message.data.data : 'Error: type=' + message.type);
                Demo.api.logout();
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

    friendRequest: function ( msg ) {
        Subscribe.show(msg);
    },

    componentWillReceiveProps: function ( nextProps ) {
        if ( nextProps.groupChange ) {
            this.getGroup();
        } else if ( nextProps.rosterChange ) {
            this.getRoster('doNotUpdateGroup');
        } else if ( nextProps.chatroomChange ) {
            this.getChatroom();
        }
    },

    handlePresence: function ( msg ) {
        var me = this;

        switch ( msg.type )  {
            case 'leaveGroup'://群组被踢
                Demo.api.updateGroup();
                break;
            case 'subscribe'://别人申请加你为好友
                debugger
                me.friendRequest(msg);
                break;
            case 'subscribed'://别人同意你加他为好友
                debugger
                me.getRoster('doNotUpdateGroup');
                break;
            case 'unsubscribe'://删除现有好友
            case 'unsubscribed'://对方单向的删除了好友
                debugger
                break;
            case 'joinChatRoomSuccess'://加入聊天室成功
                Demo.currentChatroom = msg.from;
                break;
            case 'reachChatRoomCapacity'://加入聊天室失败
                Demo.currentChatroom = null;
                Notify.error('加入聊天室失败');
                break;
            case 'leaveChatRoom'://退出聊天室
                break;
            case 'deleteGroupChat'://聊天室和群组被删除
                var target = document.getElementById(msg.from);

                if ( target ) {
                    Demo.api.updateGroup();
                }
                break;
        };
    },

    getRoster: function ( doNotUpdateGroup ) {
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
                
                doNotUpdateGroup || me.getGroup();
            }
        });
    },

    getGroup: function () {
        var me = this;

        Demo.conn.listRooms({
            success: function ( rooms ) {
                Demo.conn.setPresence();
                me.setState({ groups: rooms });
            },
            error: function(e) {
                Demo.conn.setPresence();
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
            chatroom = Demo.selectedCate === 'chatrooms',
            url;

        var msg = new WebIM.message('img', Demo.conn.getUniqueId());

        msg.set({
            apiUrl: WebIM.config.apiURL,
            file: WebIM.utils.getFileUrl(me.refs.picture),
            to: Demo.selected,
            roomType: chatroom,
            onFileUploadError: function ( error ) {
                log(error);
                me.refs.picture.value = null;

                Demo.api.appendMsg({
                    data: Demo.lan.sendImageFailed,
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

        if ( Demo.selectedCate === 'groups' ) {
            msg.setGroup(Demo.groupType);
        } else if ( chatroom ) {
            msg.setGroup(Demo.groupType);
        }

		Demo.conn.send(msg.body);
    },

    sendAudio: function () {
        this.refs.audio.click();
    },

    sendAudioMsg: function ( file, duration ) {
        var msg = new WebIM.message.audio(Demo.conn.getUniqueId()),
            chatroom = Demo.selectedCate === 'chatrooms',
            url,
            me = this;

        msg.set({
            apiUrl: WebIM.config.apiURL,
            file: file,
            to: Demo.selected,
            roomType: chatroom,
            length: duration || 0,
            onFileUploadError: function ( error ) {
                log(error);
                me.refs.audio.value = null;

                Demo.api.appendMsg({
                    data: Demo.lan.sendAudioFailed,
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

		if ( Demo.selectedCate === 'groups' ) {
            msg.setGroup(Demo.groupType);
        } else if ( chatroom ) {
            msg.setGroup(Demo.groupType);
        }

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
            chatroom = Demo.selectedCate === 'chatrooms',
            file = WebIM.utils.getFileUrl(me.refs.file),
            filename = file.filename;

        msg.set({
            apiUrl: WebIM.config.apiURL,
            file: file,
            filename: filename,
            to: Demo.selected,
            roomType: chatroom,
            onFileUploadError: function ( error ) {
                log(error);
                me.refs.file.value = null;

                Demo.api.appendMsg({
                    data: Demo.lan.sendFileFailed,
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

		if ( Demo.selectedCate === 'groups' ) {
            msg.setGroup(Demo.groupType);
        } else if ( chatroom ) {
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

        for ( var i = 0; i < this.state.friends.length; i++ ) {
            id = this.state.friends[i].name;
            props.name = id;

            windows.push(<ChatWindow id={'wrapper' + id} key={id} {...props}
                className={this.state.friends[i].name === this.state.curNode ? '' : 'hide'} />);
        }

        for ( var i = 0; i < this.state.groups.length; i++ ) {
            id = this.state.groups[i].roomId;
            props.name = this.state.groups[i].name;

            windows.push(<ChatWindow id={'wrapper' + id} key={id} {...props} 
                className={id === this.state.curNode ? '' : 'hide'} />);
        }

        for ( var i = 0; i < this.state.chatrooms.length; i++ ) {
            id = this.state.chatrooms[i].id;
            props.name = this.state.chatrooms[i].name;

            windows.push(<ChatWindow id={'wrapper' + id} key={id} {...props} 
                className={id === this.state.curNode ? '' : 'hide'} />);
        }

        for ( var i = 0; i < this.state.strangers.length; i++ ) {
            id = this.state.strangers[i].name;
            props.name = id;

            windows.push(<ChatWindow id={'wrapper' + id} key={id} {...props}
                className={this.state.strangers[i].name === this.state.curNode ? '' : 'hide'} />);
        }

        return (
            <div className={this.props.show ? 'webim-chat' : 'webim-chat hide'}>
                <LeftBar cur={this.state.cur} update={this.update} />
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
