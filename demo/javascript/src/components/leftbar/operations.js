var React = require("react");
var AddFriend = require("./addFriend");
var DelFriend = require("./delFriend");

module.exports = React.createClass({

    getInitialState: function () {
        var me = this;

        return { hide: 'hide' };
    },

	update: function () {
		this.setState({
			hide: this.state.hide ? '' : ' hide'
		});
	},

	addFriends: function () {
        AddFriend.show();
	},

	delFriends: function () {
        DelFriend.show();
	},

    close: function () {
        Demo.api.logout();
    },

    render: function () {
		var className = this.state.hide ? ' ' + this.state.hide : '';
        return (
			<div>
				<i className='webim-operations-icon font xsmaller' onClick={this.update}>M</i>
				<ul className={'webim-operations' + className}>
					<li onClick={this.addFriends}><i className='font smallest'>L</i><span>{Demo.lan.addAFriend}</span></li>
					<li onClick={this.delFriends}><i className='font smallest'>C</i><span>{Demo.lan.delAFriend}</span></li>
					<li onClick={this.close}><i className='font smallest'>Q</i><span>{Demo.lan.quit}</span></li>
				</ul>
			</div>
        );
    }
});
