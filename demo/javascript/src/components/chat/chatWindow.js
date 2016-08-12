var React = require("react");
var SendWrapper = require('./sendwrapper');
var Notify = require('../common/notify');
var Avatar = require('../common/avatar');

module.exports = React.createClass({

    getInitialState: function () {
        var me = this;

        return {
            members: [],
            memberShowStatus: false
         };
    },

    componentWillReceiveProps: function ( nextProps ) {
        
    },

    listMember: function () {
        var me = this;


        if ( me.refs.i.className.indexOf('up') < 0 ) {

            Demo.conn.queryRoomMember({
                roomId: me.props.roomId,
                success: function ( members ) {
                    if ( members && members.length > 0 ) {
                        me.refs.i.className = 'webim-down-icon font smallest dib webim-up-icon';

                        me.setState({ members: members, memberShowStatus: true });
                    }
                },
                error : function() {}
            });
        } else {
            me.refs.i.className = 'webim-down-icon font smallest dib';
            me.setState({ members: [], memberShowStatus: false });
        }
    },

    send: function ( msg ) {
        Demo.conn.send(msg);
        Demo.api.appendMsg(msg, 'txt');
    },

    render: function () {
		var className = this.props.roomId ? ' dib' : ' hide',
            props = {
                sendPicture: this.props.sendPicture,
                sendAudio: this.props.sendAudio,
                sendFile: this.props.sendFile
            },
            memberStatus = this.state.memberShowStatus ? '' : ' hide',
            roomMember = [];

        for ( var i = 0, l = this.state.members.length; i < l; i++ ) {
            var jid = this.state.members[i].jid,
                username = jid.substring(jid.indexOf('_') + 1).split('@')[0];

            roomMember.push(<li key={i}><Avatar src='demo/images/default.png' /><span>{username}</span></li>);
        }

        return (
            <div className={'webim-chatwindow ' + this.props.className}>
                <p className='webim-chatwindow-title'>
                    {this.props.name}
                    <i ref='i' className={'webim-down-icon font smallest' + className} onClick={this.listMember}>D</i>
                </p>
				<ul ref='member' className={'webim-group-memeber' + memberStatus}>{roomMember}</ul>
                <div id={this.props.id} ref='wrapper' className='webim-chatwindow-msg'></div>
                <SendWrapper send={this.send} {...props} />
            </div>
        );
    }
});
