var React = require("react");
var ReactDOM = require('react-dom');

var componentsNode = document.getElementById('components');
var dom = document.createElement('div');
componentsNode.appendChild(dom);

var UI = require('../common/webim-demo');
var Button = UI.Button;
var Input = UI.Input;


var Subscribe = React.createClass({

    check: function (node, name) {
        if (node.parentNode.childNodes.length === 1) {
            node.parentNode.removeChild(node);
            this.close();
        } else {
            node.parentNode.removeChild(node);
        }
        this.props.onHandle(name);
    },

    agree: function (e) {
        var li = e.target.parentNode,
            name = li.getAttribute('id');

        if (WebIM.config.isWindowSDK) {
            WebIM.doQuery('{"type":"acceptInvitation","to":"' + name + '"}',
                function success(str) {
                    //do nothing
                },
                function failure(errCode, errMessage) {
                    Demo.api.NotifyError('agree:' + errCode + ' ' + errMessage);
                });
        } else {
            Demo.conn.subscribed({
                to: name,
                message: '[resp:true]'
            });

            Demo.conn.subscribe({
                to: name,
                message: '[resp:true]'
            });
        }

        this.check(li, name);
    },

    reject: function (e) {
        var li = e.target.parentNode,
            name = li.getAttribute('id');

        if (WebIM.config.isWindowSDK) {
            WebIM.doQuery('{"type":"declineInvitation","to":"' + name + '"}',
                function success(str) {
                    //do nothing
                },
                function failure(errCode, errMessage) {
                    Demo.api.NotifyError('reject:' + errCode + ' ' + errMessage);
                });
        } else {
            Demo.conn.unsubscribed({
                to: name,
                message: new Date().toLocaleString()
            });
        }

        this.check(li, name);
    },

    close: function () {
        typeof this.props.onClose === 'function' && this.props.onClose();
    },

    render: function () {
        var requests = [];

        for (var i in this.props.data) {
            if (!this.props.data[i].handled) {
                var msg = this.props.data[i].msg;

                requests.push(
                    <li id={i} key={i}>
                        <span>{msg}</span>
                        <Button text={Demo.lan.agree} onClick={this.agree} className='webim-subscribe-button'/>
                        <Button text={Demo.lan.reject} onClick={this.reject} className='error webim-subscribe-button'/>
                    </li>
                );
            }
        }


        return (
            <div>
                <div ref='layer' className='webim-layer'></div>
                <div className='webim-dialog webim-friend-requests'>
                    <h3>Friends Request</h3>
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
    show: function (data) {
        if (!this.requests[data.from]) {
            this.requests[data.from] = {msg: data.from + ': ' + data.status, handled: false};
        } else {
            if (this.requests[data.from].handled) {
                this.requests[data.from].handled = false;
            }
        }

        ReactDOM.render(
            <Subscribe onClose={this.close} onHandle={this.handle} data={this.requests}/>,
            dom
        );
    },
    handle: function (name) {
        if (module.exports.requests[name]) {
            module.exports.requests[name].handled = true;
        }
    },

    close: function () {
        ReactDOM.unmountComponentAtNode(dom);
    }
};
