var React = require("react");
var UI = require('../common/webim-demo');
var Button = UI.Button;
var UploadShim = require('./uploadShim');


module.exports = React.createClass({

    getInitialState: function () {
        var emotionsArr = [];

        var emotions = WebIM.EMOTIONS;
        var data = emotions.map;
		var path = emotions.path;

        for ( var i in data ) {
            if ( data.hasOwnProperty(i) ) {
                emotionsArr.push('<li key="' + i + '" class="webim-emotions-item"><img src="' + path + data[i] + '" /></li>');
            }
        }

        WebIM.flashUpload = UploadShim({fileInputId: 'uploadShim'}).flashUpload;

        return { 
            send: false,
            showEmotion: false,
            emotions: {
                data: emotionsArr,
                path: path
            }
         };
    },

    componentWillReceiveProps: function ( nextProps ) {
        
    },

    componentDidMount: function () {
        this.refs.textarea.addEventListener('keydown', this.handleKeyDown);
    },

    handleKeyDown: function ( e ) {
        if ( e && e.keyCode === 13 ) {
            this.sendText();
        }
    },

    sendText: function () {
        var me = this,
            value = me.refs.textarea.value;

        if ( !value ) { return; }

        var id = Demo.conn.getUniqueId();
        var msg = new WebIM.message.txt(id);
        msg.set({
            msg: value,
            to: Demo.selected,
            success: function ( id ) {
                log('send success', id);
                me.refs.textarea.value = '';
                me.state.showEmotion && me.setState({ showEmotion: false });
            }
        });

        this.props.send(msg.body);
    },

    sendFile: function () {

    },

    showEmotion: function () {

        if ( this.state.showEmotion ) {
            this.setState({ showEmotion: false });
        } else {

            if ( !this.refs.emotions.innerHTML ) {
                var str = '';

                for ( var i = 0; i < this.state.emotions.data.length; i++ ) {
                    str += this.state.emotions.data[i];
                }
                this.refs.emotions.innerHTML = str;
            }
            this.setState({ showEmotion: true });
        }
    },

    parseEmotion: function () {

    },

    selectEmotion: function ( e ) {
        var value = e.target.parentNode.getAttribute('key');
        this.refs.textarea.value += value;
    },

    render: function () {

        var showEmotion = this.state.showEmotion ? '' : ' hide',
            disabled = this.state.send ? '' : ' disabled';

        return (
            <div className='webim-send-wrapper'>
                <div className='webim-chatwindow-options'>
					<span className='webim-emotion-icon font smaller' onClick={this.showEmotion}>J</span>
					<span className='webim-picture-icon font smaller' onClick={this.props.sendPicture}>K</span>
					<span className='webim-audio-icon font smaller' onClick={this.props.sendAudio}>R</span>
					<span className='webim-file-icon font smaller' onClick={this.props.sendFile}>S</span>
				</div>
                <ul ref='emotions' onClick={this.selectEmotion} className={showEmotion}></ul>
				<textarea ref='textarea' onKeydown={this.handleKeyDown}></textarea>
				<Button className={'webim-send-btn base-bgcolor' + disabled} text='send' click={this.sendText} />
            </div>
        );
    }
});


