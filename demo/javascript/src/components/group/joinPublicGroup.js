var React = require("react");
var ReactDOM = require('react-dom');

var componentsNode = document.getElementById('components');
var dom = document.createElement('div');
componentsNode.appendChild(dom);

var UI = require('../common/webim-demo');
var Button = UI.Button;
var Input = UI.Input;
var Notify = require('../common/notify');

var JoinPublicGroup = React.createClass({

    onSubmit: function () {

        var value = this.refs.input.refs.input.value;

        if (!value) {
            Notify.error("群组名不能为空");
            return;
        }
        log("JoinPublicGroup:", value);
        if (WebIM.config.isWindowSDK) {
            //TODO:@lhr 申请加入群组
            WebIM.doQuery('{"type":"joinPublicGroup"}',
                function (response) {
                },
                function (code, msg) {
                    Notify.error("JoinPublicGroup:" + code);
                });
        } else {
            Demo.conn.joinPublicGroup({
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
                    <h3>{Demo.lan.joinPublicGroup}</h3>
                    <div ref='content'>
                        <Input defaultFocus='true' ref='input' placeholder={Demo.lan.groupSubject} />
                    </div>
                    <Button text={Demo.lan.confirm} onClick={this.onSubmit} className='webim-dialog-button' />
                    <span className='font' onClick={this.close}>A</span>
                </div>
            </div>
        );
    }
});

module.exports = {
    show: function () {
        ReactDOM.render(
            <JoinPublicGroup onClose={this.close} />,
            dom
        );
    },

    close: function () {
        ReactDOM.unmountComponentAtNode(dom);
    }
};
