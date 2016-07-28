var React = require("react");

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

	},

	delFriends: function () {
		this.props.close();
	},

    render: function () {
		var className = this.state.hide ? ' ' + this.state.hide : '';
        return (
			<div>
				<i className='webim-operations-icon font bigfont' onClick={this.update}>M</i>
				<ul className={'webim-operations' + className}>
					<li onClick={this.addFriends}><i className='font smallest'>L</i><span>add friends</span></li>
					<li onClick={this.delFriends}><i className='font smallest'>C</i><span>delete friends</span></li>
					<li onClick={this.props.close}><i className='font smallest'>Q</i><span>quit</span></li>
				</ul>
			</div>
        );
    }
});
