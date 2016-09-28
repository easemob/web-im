var React = require("react");
var ReactDOM = require('react-dom');

var componentsNode = document.getElementById('components');
var dom = document.createElement('div');
componentsNode.appendChild(dom);

var UI = require('../common/webim-demo');
var Button = UI.Button;
var Input = UI.Input;


var ConfirmPop = React.createClass({

    check: function (node) {
        if (node.parentNode.childNodes.length === 1) {
            node.parentNode.removeChild(node);
            this.close();
        } else {
            node.parentNode.removeChild(node);
        }
    },

    agree: function (e) {
        var li = e.target.parentNode,
            name = li.getAttribute('id');

        this.props.data.agree();

        this.check(li);
    },

    reject: function (e) {
        var li = e.target.parentNode,
            name = li.getAttribute('id');

        this.props.data.reject();

        this.check(li);
    },

    close: function () {
        typeof this.props.onClose === 'function' && this.props.onClose();
    },

    render: function () {
        var requests = [];

        var i = 0;
        if (this.props.data.hasOwnProperty('reject')) {
            requests.push(
                <li id={i} key={i}>
                    <span>{this.props.data.msg}</span>
                    <br/>
                    <Button text={Demo.lan.agree} onClick={this.agree} className='webim-subscribe-button'/>
                    <Button text={Demo.lan.reject} onClick={this.reject} className='error webim-subscribe-button'/>
                </li>
            );
        } else {
            requests.push(
                <li id={i} key={i}>
                    <span>{this.props.data.msg}</span>
                    <br/>
                    <Button text={Demo.lan.confirm} onClick={this.agree} className='webim-subscribe-button'/>
                </li>
            );
        }


        return (
            <div>
                <div ref='layer' className='webim-layer'></div>
                <div className='webim-dialog webim-friend-requests-widnowSDK'>
                    <h3>{this.props.data.title}</h3>
                    <div ref='content'>
                        <ul>{requests}</ul>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = {
    requests: {},
    show: function (options) {

        ReactDOM.render(
            <ConfirmPop onClose={this.close} data={options}/>,
            dom
        );
    },

    close: function () {
        ReactDOM.unmountComponentAtNode(dom);
    }
};
