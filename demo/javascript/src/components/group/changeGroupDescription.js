var React = require("react");
var ReactDOM = require('react-dom');

var componentsNode = document.getElementById('components');
var dom = document.createElement('div');
componentsNode.appendChild(dom);

var UI = require('../common/webim-demo');
var Button = UI.Button;
var Input = UI.Input;
var Notify = require('../common/notify');

var ChangeGroupDescription = React.createClass({

    onSubmit: function () {

        var value = this.refs.input.refs.input.value;

        if (!value) {
            Notify.error("群组名不能为空");
            return;
        }
        log("ChangeGroupSubject:", value, this.props.roomId);
        if (WebIM.config.isWindowSDK) {
            //TODO:@lhr 修改群名称
            WebIM.doQuery('{"type":"changeGroupSubject"}',
                function (response) {
                },
                function (code, msg) {
                    Notify.error("changeGroupSubject:" + code);
                });
        } else {
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
                    <h3>{Demo.lan.changeGroupDescription}</h3>
                    <div ref='content'>
                        <Input defaultFocus='true' ref='input' placeholder={Demo.lan.groupDescription}/>
                    </div>
                    <Button text={Demo.lan.confirm} onClick={this.onSubmit} className='webim-dialog-button'/>
                    <span className='font' onClick={this.close}>A</span>
                </div>
            </div>
        );
    }
});

module.exports = {
    show: function (roomId) {
        ReactDOM.render(
            <ChangeGroupDescription onClose={this.close} roomId={roomId}/>,
            dom
        );
    },

    close: function () {
        ReactDOM.unmountComponentAtNode(dom);
    }
};
