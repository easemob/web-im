var React = require("react");
var ReactDOM = require('react-dom');

var componentsNode = document.getElementById('components');
var dom = document.createElement('div');
componentsNode.appendChild(dom);

var UI = require('../common/webim-demo');
var Button = UI.Button;
var Input = UI.Input;

var AddMember = React.createClass({

    addMember: function () {

        var value = this.refs.input.refs.input.value;

        if (!value) {
            Demo.api.NotifyError(Demo.lan.username + Demo.lan.notEmpty);
            return;
        }
        if (value == Demo.user) {
            Demo.api.NotifyError(Demo.lan.addFriendSelfInvalid);
            this.close();
            return;
        }
        if (Demo.roster[value] == 1) {
            Demo.api.NotifyError(value + ' ' + Demo.lan.addFriendRepeat);
            this.close();
            return;
        }


        if (WebIM.config.isWindowSDK) {
            WebIM.doQuery('{"type":"addFriend","to":"' + value + '","message":"' + Demo.user + Demo.lan.request + '"}',
                function success(str) {
                    alert(Demo.lan.contact_added);
                },
                function failure(errCode, errMessage) {
                    Demo.api.NotifyError('addMember:' + errCode + ' ' + errMessage);
                });
        } else {
            Demo.conn.subscribe({
                to: value,
                message: Demo.user + Demo.lan.request
            });
        }
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
                        <Input defaultFocus='true' ref='input' placeholder={Demo.lan.username}/>
                    </div>
                    <Button text={Demo.lan.add} onClick={this.addMember} className='webim-dialog-button'/>
                    <span className='font' onClick={this.close}>A</span>
                </div>
            </div>
        );
    }
});

module.exports = {
    show: function () {
        ReactDOM.render(
            <AddMember onClose={this.close}/>,
            dom
        );
    },

    close: function () {
        ReactDOM.unmountComponentAtNode(dom);
    }
};
