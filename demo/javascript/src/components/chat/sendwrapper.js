var React = require("react");
var UI = require('../common/webim-demo');
var Button = UI.Button;
var UploadShim = require('./uploadShim');
var Notify = require('../common/notify');


module.exports = React.createClass({

    getInitialState: function () {
        var emojiArr = [];

        var emoji = WebIM.Emoji;
        var data = emoji.map;
		var path = emoji.path;

        for ( var i in data ) {
            if ( data.hasOwnProperty(i) ) {
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

    handleKeyDown: function ( e ) {
        if ( e && e.keyCode === 13 ) {
            this.sendText();
        }

        return false;
    },

    sendText: function () {
        var me = this,
            value = this.refs.textarea.value,
            chatroom = Demo.selectedCate === 'chatrooms';

        if ( !value ) { return; }

        setTimeout(function () {
            me.refs.textarea.value = '';
        }, 0);


        if ( chatroom && Demo.currentChatroom !== Demo.selected ) {
            
            Notify.error(Demo.lan.notin);
            return false;
        }

        var id = Demo.conn.getUniqueId();
        var msg = new WebIM.message('txt', id);
        msg.set({
            msg: value,
            to: Demo.selected,
            roomType: chatroom,
            success: function ( id ) {
                log('send success', id);
                me.state.showEmoji && me.setState({ showEmoji: false });
            }
        });

        if ( Demo.selectedCate === 'groups' ) {
            msg.setGroup(Demo.groupType);
        } else if ( chatroom ) {
            msg.setGroup(Demo.groupType);
        }

        this.props.send(msg.body);
    },

    showEmoji: function () {

        if ( this.state.showEmoji ) {
            this.setState({ showEmoji: false });
        } else {

            if ( !this.refs.emoji.innerHTML ) {
                var str = '';

                for ( var i = 0; i < this.state.emoji.data.length; i++ ) {
                    str += this.state.emoji.data[i];
                }
                this.refs.emoji.innerHTML = str;
            }
            this.setState({ showEmoji: true });
        }
    },

    selectEmoji: function ( e ) {
        var value = e.target.parentNode.getAttribute('key');
        this.refs.textarea.value += value;
    },

    render: function () {

        var showEmoji = this.state.showEmoji ? '' : ' hide',
            disabled = this.state.send ? '' : ' disabled';

        return (
            <div className='webim-send-wrapper'>
                <div className='webim-chatwindow-options'>
					<span className='webim-emoji-icon font smaller' onClick={this.showEmoji}>J</span>
					<span className='webim-picture-icon font smaller' onClick={this.props.sendPicture}>K</span>
					<span className='webim-audio-icon font smaller' onClick={this.props.sendAudio}>R</span>
					<span className='webim-file-icon font smaller' onClick={this.props.sendFile}>S</span>
				</div>
                <ul ref='emoji' onClick={this.selectEmoji} className={showEmoji}></ul>
				<textarea ref='textarea' onKeyDown={this.handleKeyDown}></textarea>
				<Button className={'webim-send-btn base-bgcolor' + disabled} text={Demo.lan.send} onClick={this.sendText} />
            </div>
        );
    }
});


