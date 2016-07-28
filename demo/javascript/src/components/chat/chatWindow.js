var React = require("react");
var SendWrapper = require('./sendwrapper');

module.exports = React.createClass({

    getInitialState: function () {
        var me = this;

        return {
            memberShow: false
         };
    },

    componentWillReceiveProps: function ( nextProps ) {
        
    },

    listMember: function () {
        this.refs.member.innerHTML += '';
    },

    send: function ( msg ) {
        Demo.conn.send(msg);
        Demo.api.appendMsg(msg, 'txt');
    },

    render: function () {
		var className = this.state.memberShow ? '' : 'hide',
            isGroup = this.props.isGroup ? '' : ' hide',
            props = {
                sendPicture: this.props.sendPicture,
                sendAudio: this.props.sendAudio,
                sendFile: this.props.sendFile
            };

        return (
            <div className={'webim-chatwindow ' + this.props.className}>
                <p className='webim-chatwindow-title'>
                    {this.props.cur}
                    <i className={'webim-down-icon font smaller' + isGroup} onClick={this.listMember}></i>
                </p>
				<ul ref='member' className={'webim-group-memeber' + className}></ul>
                <div id={this.props.id} ref='wrapper' className='webim-chatwindow-msg'></div>
                <SendWrapper send={this.send} {...props} />
            </div>
        );
    }
});
