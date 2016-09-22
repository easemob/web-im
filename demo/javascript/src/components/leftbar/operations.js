var React = require("react");
var AddFriend = require("./addFriend");
var DelFriend = require("./delFriend");
var CreateGroup = require("../group/createGroup");
var JoinPublicGroup = require("../group/joinPublicGroup");

module.exports = React.createClass({

    getInitialState: function () {
        var me = this;

        return {hide: 'hide'};
    },

    update: function () {
        this.setState({
            hide: this.state.hide ? '' : ' hide'
        });
    },

    addFriends: function () {
        AddFriend.show();
        this.update();
    },

    delFriends: function () {
        DelFriend.show();
        this.update();
    },

    createGroup: function () {
        CreateGroup.show();
        this.update();
    },

    joinPublicGroup: function () {
        JoinPublicGroup.show();
        this.update();
    },

    logout: function () {
        Demo.api.logout();
    },

    render: function () {
        var className = this.state.hide ? ' ' + this.state.hide : '';
        return (
            <div>
                <i className='webim-operations-icon font xsmaller' onClick={this.update}>M</i>
                <ul className={'webim-operations' + className}>
                    <li onClick={this.addFriends}>
                        <i className='font smallest'>L</i>
                        <span>{Demo.lan.addAFriend}</span>
                    </li>
                    <li onClick={this.delFriends}>
                        <i className='font smallest'>C</i>
                        <span>{Demo.lan.delAFriend}</span>
                    </li>
                    <li onClick={this.createGroup}>
                        <i className='font smallest'>L</i>
                        <span>{Demo.lan.createGroup}</span>
                    </li>
                    <li onClick={this.joinPublicGroup}>
                        <i className='font smallest'>L</i>
                        <span>{Demo.lan.joinPublicGroup}</span>
                    </li>
                    <li onClick={this.logout}>
                        <i className='font smallest'>Q</i>
                        <span>{Demo.lan.quit}({this.props.username})</span>
                    </li>
                </ul>
            </div>
        );
    }
});
