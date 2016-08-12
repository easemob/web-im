var React = require("react");
var ReactDOM = require('react-dom');

var componentsNode = document.getElementById('components');
var dom = document.createElement('div');
componentsNode.appendChild(dom);

var UI = require('../common/webim-demo');
var Button = UI.Button;
var Input = UI.Input;

var DelFriend = React.createClass({

	delFriend: function () {
        var me = this,
            value = this.refs.input.refs.input.value;

        if ( !value ) { return; }

        Demo.conn.removeRoster({
			to: value,
			success: function () {

                if ( Demo.roster[value] ) {
                    delete Demo.roster[value];
                }

				Demo.conn.unsubscribed({
					to: value
				});
			},
			error : function() {}
		});
        me.close();
	},

    close: function () {
        typeof this.props.onClose === 'function' && this.props.onClose();
    },

    render: function () {

        return (
            <div className='webim-friend-options'>
                <div ref='layer' className='webim-layer'></div>
                <div className='webim-dialog'>
                    <h3>{Demo.lan.delAFriend}</h3>
                    <div ref='content'>
                        <Input defaultFocus='true' ref='input' placeholder={Demo.lan.username} />
                    </div>
                    <Button text={Demo.lan.delete} onClick={this.delFriend} className='webim-dialog-button' />
                    <span className='font' onClick={this.close}>A</span>
                </div>
            </div>
        );
    }
});

module.exports = {
    show: function () {
        ReactDOM.render(
            <DelFriend onClose={this.close} />,
            dom 
        );       
    },

    close: function () {
        ReactDOM.unmountComponentAtNode(dom);
    }
}
