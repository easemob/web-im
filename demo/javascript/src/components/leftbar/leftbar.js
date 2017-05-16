var React = require('react');

var Avatar = require('../common/avatar');
var Cate = require('./cate');
var Operations = require('./operations');


module.exports = React.createClass({

    getInitialState: function () {
        var me = this;

        return null;
    },

    shouldComponentUpdate: function (nextProps, nextState) {
        return nextProps.cur !== Demo.selectedCate;
    },

    updateFriend: function () {
        Demo.selectedCate = 'friends';
        this.props.update('friend', true);
    },

    updateGroup: function () {
        Demo.selectedCate = 'groups';
        this.props.update('group', true);
    },

    updateStranger: function () {
        Demo.selectedCate = 'strangers';
        this.props.update('stranger', true);
    },

    updateChatroom: function () {
        Demo.selectedCate = 'chatrooms';
        this.props.update('chatroom', true);
    },

    render: function () {
        return (
            <div className='webim-leftbar'>
                <Avatar className='webim-profile-avatar small' title={Demo.user}/>
                <div className='username'>{Demo.user}</div>
                <Cate name='friend' update={this.updateFriend} cur={this.props.cur}/>
                <Cate name='group' update={this.updateGroup} cur={this.props.cur}/>
                <Cate name='chatroom' update={this.updateChatroom} cur={this.props.cur}/>
                <Cate name='stranger' update={this.updateStranger} cur={this.props.cur}/>
                <Operations username={Demo.user}/>
            </div>
        );
    }
});
