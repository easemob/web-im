var React = require("react");
var ReactDOM = require('react-dom');

var componentsNode = document.getElementById('components');
var dom = document.createElement('div');
componentsNode.appendChild(dom);

var UI = require('../common/webim-demo');
var Button = UI.Button;
var Input = UI.Input;

var JoinPublicGroup = React.createClass({

    onSubmit: function () {

        var value = this.refs.input.refs.input.value;

        if (!value) {
            Demo.api.NotifyError("群组名不能为空");
            return;
        }
        if (WebIM.config.isWindowSDK) {
            //TODO:@lhr 申请加入群组
            WebIM.doQuery('{"type":"joinPublicGroup"}',
                function (response) {
                    Demo.api.updateGroup();
                },
                function (code, msg) {
                    Demo.api.NotifyError("JoinPublicGroup error:" + code);
                });
        } else {
            Demo.conn.joinPublicGroup({
                roomId: value,
                success: function () {
                },
                error: function (e) {
                    Demo.api.NotifyError("JoinPublicGroup error:" + e);
                }
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
                        <Input defaultFocus='true' ref='input' placeholder={Demo.lan.groupSubject}/>
                    </div>
                    <Button text={Demo.lan.confirm} onClick={this.onSubmit} className='webim-dialog-button'/>
                    <span className='font' onClick={this.close}>A</span>
                </div>
            </div>
        );
    }
});

module.exports = {
    show: function () {
        ReactDOM.render(
            <JoinPublicGroup onClose={this.close}/>,
            dom
        );
    },

    close: function () {
        ReactDOM.unmountComponentAtNode(dom);
    }
};
