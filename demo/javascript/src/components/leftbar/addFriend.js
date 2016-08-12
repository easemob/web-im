var React = require("react");
var ReactDOM = require('react-dom');

var componentsNode = document.getElementById('components');
var dom = document.createElement('div');
componentsNode.appendChild(dom);

var UI = require('../common/webim-demo');
var Button = UI.Button;
var Input = UI.Input;

var AddFriend = React.createClass({

	addFriend: function () {

        var value = this.refs.input.refs.input.value;

        if ( !value ) { return; }

        Demo.conn.subscribe({
            to: value,
            message: Demo.user + Demo.lan.request
        });
        this.close();
	},

    close: function () {
        typeof this.props.onClose === 'function' && this.props.onClose();
    },

    render: function () {

        return (
            <div className='webim-friend-options'>
                <div ref='layer' className='webim-layer'></div>
                <div className='webim-dialog'>
                    <h3>{Demo.lan.addAFriend}</h3>
                    <div ref='content'>
                        <Input defaultFocus='true' ref='input' placeholder={Demo.lan.username} />
                    </div>
                    <Button text={Demo.lan.add} onClick={this.addFriend} className='webim-dialog-button' />
                    <span className='font' onClick={this.close}>A</span>
                </div>
            </div>
        );
    }
});

module.exports = {
    show: function () {
        ReactDOM.render(
            <AddFriend onClose={this.close} />,
            dom 
        );       
    },

    close: function () {
        ReactDOM.unmountComponentAtNode(dom);
    }
}
