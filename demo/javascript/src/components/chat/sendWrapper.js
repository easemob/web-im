var React = require("react");
var UI = require('../common/webim-demo');
var Button = UI.Button;
var UploadShim = require('./uploadShim');


module.exports = React.createClass({

    getInitialState: function () {
        var emojiArr = [];

        var emoji = WebIM.Emoji;
        var data = emoji.map;
        var path = emoji.path;

        for (var i in data) {
            if (data.hasOwnProperty(i)) {
                emojiArr.push('<li key="' + i + '" class="webim-emoji-item"><img src="' + path + data[i] + '" /></li>');
            }
        }

        WebIM.flashUpload = UploadShim({fileInputId: 'uploadShim'}).flashUpload;

        return {
            send: false,
            showEmoji: false,
            emoji: {
                data: emojiArr,
                path: path
            }
        };
    },

    ctrl_down: false,
    handleKeyDown: function (e) {
        if (e) {
            if (e.keyCode == 17) {
                this.ctrl_down = true;
            } else if (e.keyCode == 13) {
                if (this.ctrl_down) {
                    this.ctrl_down = false;  //换行后记得将全局变量置为1，否则enter将变成换行，失去发送功能
                    this.refs.textarea.value += '\n';
                } else {
                    this.sendText();
                }
            }
        }

        return false;
    },

    sendText: function () {
        var me = this,
            value = this.refs.textarea.value,
            chatroom = Demo.selectedCate === 'chatrooms';

        if (!value) {
            return;
        }

        setTimeout(function () {
            if (me.refs['textarea']) {
                me.refs['textarea'].value = '';
            }
        }, 0);


        if (chatroom && Demo.currentChatroom !== Demo.selected) {

            Demo.api.NotifyError(Demo.lan.notin);
            return false;
        }

        var id = Demo.conn.getUniqueId();
        var msg = new WebIM.message('txt', id);
        msg.set({
            msg: value,
            to: Demo.selected,
            roomType: chatroom,
            success: function (id) {
                log('send success', id);
                me.state.showEmoji && me.setState({showEmoji: false});
            }
        });

        if (Demo.selectedCate === 'groups') {
            msg.setGroup(Demo.groupType);
        } else if (chatroom) {
            msg.setGroup(Demo.groupType);
        }

        this.props.send(msg.body);
    },

    showEmoji: function () {

        if (this.state.showEmoji) {
            this.setState({showEmoji: false});
        } else {

            if (!this.refs.emoji.innerHTML) {
                var str = '';

                for (var i = 0; i < this.state.emoji.data.length; i++) {
                    str += this.state.emoji.data[i];
                }
                this.refs.emoji.innerHTML = str;
            }
            this.setState({showEmoji: true});
        }
    },

    selectEmoji: function (e) {
        var value = e.target.parentNode.getAttribute('key');
        if (value != null) {
            this.refs.textarea.value += value;
        }
    },

    call: function () {
        Demo.call.makeVideoCall(Demo.selected);
    },

    acceptCall: function () {
        Demo.call.acceptCall();
    },
    sendPicture: function () {
        this.props.sendPicture(this.props.chatType);
    },
    sendAudio: function () {
        this.props.sendAudio(this.props.chatType);
    },
    sendFile: function () {
        this.props.sendFile(this.props.chatType);
    },
    sendFileNull: function () {
        var accessToken = "YWMtSA8qRGz0Eea8me-22m8DgQAAAVgFH60HdKgMuwEMxH74_zGVP2sCxMnsE_w",
            ext = {weichat: {originType: "webim"}},
            file_length = 0,
            filename = "home.css.zip",
            from = "wk3368",
            id = "251695734842196412",
            secret = "2wTA2o97Eearx0GpFzl9MqIIlV3rvbaNWYZvGY9VBs7njhgV",
            to = "wenke",
            type = "chat",
            url = "";

        var msg = {
            id: id
            , type: type
            , from: from
            , to: to
            , url: url
            , secret: secret
            , filename: filename
            , file_length: file_length
            , accessToken: accessToken || ''
            , ext: ext
        };
        console.log('sendFileNull');
        console.log(msg);
        Demo.api.appendMsg(msg, 'file');

    },
    sendFileUrl: function () {

        var accessToken = "YWMtSA8qRGz0Eea8me-22m8DgQAAAVgFH60HdKgMuwEMxH74_zGVP2sCxMnsE_w",
            ext = {weichat: {originType: "webim"}},
            file_length = 0,
            filename = "home.css.zip",
            from = "wk3368",
            id = "251695734842196412",
            secret = "2wTA2o97Eearx0GpFzl9MqIIlV3rvbaNWYZvGY9VBs7njhgV",
            to = "wenke",
            type = "chat",
            url = "https://a1.easemob.com/easemob-demo/chatdemoui/chatfiles/022f7b20-8f84-11e6-b249-fd50802617e8";

        var msg = {
            id: id
            , type: type
            , from: from
            , to: to
            , url: url
            , secret: secret
            , filename: filename
            , file_length: file_length
            , accessToken: accessToken || ''
            , ext: ext
        };
        console.log('sendFileUrl');
        console.log(msg);
        var cur = document.getElementById(msg.id);
        console.log(cur);
        if (cur) {
            console.log('已经存在，update');
            Demo.api.onUpdateFileUrl({url: msg.url});
        } else {
            Demo.api.appendMsg(msg, 'file');
        }

    },
    render: function () {

        var showEmoji = this.state.showEmoji ? '' : ' hide',
            disabled = this.state.send ? '' : ' disabled';

        var roomMember = [];
        var keyValue = 0;
        if (WebIM.config.isWebRTC) {
            roomMember.push(<span key={keyValue++} className='webim-audio-icon font smaller'
                                  onClick={this.call}>R</span>);
            roomMember.push(<span key={keyValue++} className='webim-audio-icon font smaller'
                                  onClick={this.acceptCall}>R</span>);
        }
        //send file test


        roomMember.push(<span key={keyValue++} className='webim-audio-icon font smaller'
                              onClick={this.sendFileNull}>R</span>);
        roomMember.push(<span key={keyValue++} className='webim-audio-icon font smaller'
                              onClick={this.sendFileUrl}>R</span>);
        return (
            <div className='webim-send-wrapper'>
                <div className='webim-chatwindow-options'>
                    <span className='webim-emoji-icon font smaller' onClick={this.showEmoji}>J</span>
                    <span className='webim-picture-icon font smaller' onClick={this.sendPicture}>K</span>
                    <span className='webim-audio-icon font smaller' onClick={this.sendAudio}>R</span>
                    <span className='webim-file-icon font smaller' onClick={this.sendFile}>S</span>
                    {roomMember}
                </div>
                <ul ref='emoji' onClick={this.selectEmoji} className={showEmoji}></ul>
                <textarea ref='textarea' onKeyDown={this.handleKeyDown}></textarea>
                <Button className={'webim-send-btn base-bgcolor' + disabled} text={Demo.lan.send}
                        onClick={this.sendText}/>
            </div>
        );
    }
});


