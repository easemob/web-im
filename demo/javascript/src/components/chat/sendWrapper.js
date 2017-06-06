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

        // TODO: ios/android client doesn't encodeURIComponent yet
        // value = encodeURIComponent(value);

        setTimeout(function () {
            if (me.refs['textarea']) {
                me.refs['textarea'].value = '';
            }
        }, 0);


        if (chatroom && Demo.currentChatroom !== Demo.selected) {

            Demo.api.NotifySuccess(Demo.lan.notin);
            return false;
        }

        var id = Demo.conn.getUniqueId();
        var msg = new WebIM.message('txt', id);
        msg.set({
            msg: value,
            to: Demo.selected,
            roomType: chatroom,
            success: function (id, mid) {
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

    callVideo: function () {
        console.log('sendWrapper::callVideo');
        Demo.call.caller = Demo.user;
        Demo.call.makeVideoCall(Demo.selected);
    },

    callVoice: function () {
        console.log('sendWrapper::callVoice');
        Demo.call.caller = Demo.user;
        Demo.call.makeVoiceCall(Demo.selected);
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
    clear: function(){
          var user = Demo.selected;
          var chatDom = document.getElementById('wrapper' + user);
          chatDom.innerHTML = "";
          var itemDom = document.getElementById(user);
          itemDom.querySelector('em').innerHTML = '';
          if(Demo.chatRecord[user])
            delete Demo.chatRecord[user];
    },
    render: function () {

        var showEmoji = this.state.showEmoji ? '' : ' hide',
            disabled = this.state.send ? '' : ' disabled';

        var roomMember = [];
        var keyValue = 0;
        roomMember.push(<span key={keyValue++} className='webim-emoji-icon font smaller'
                              onClick={this.showEmoji}>J</span>);
        roomMember.push(<span key={keyValue++} className='webim-picture-icon font smaller'
                              onClick={this.sendPicture}>K</span>);
        roomMember.push(<span key={keyValue++} className='webim-audio-icon font smaller'
                              onClick={this.sendAudio}>R</span>);
        roomMember.push(<span key={keyValue++} className='webim-file-icon font smaller'
                              onClick={this.sendFile}>S</span>);
        if (WebIM.config.isWebRTC && Demo.selectedCate == 'friends') {
            roomMember.push(<span key={keyValue++} className='webim-audio-icon font smaller'
                                  onClick={this.callVideo}>a</span>);
            roomMember.push(<span key={keyValue++} className='webim-audio-icon font smaller'
                                  onClick={this.callVoice}>z</span>);
        }
        roomMember.push(<span key={keyValue++} className='webim-file-icon font smaller'
                              onClick={this.clear}>T</span>);
        return (
            <div className='webim-send-wrapper'>
                <div className='webim-chatwindow-options'>
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