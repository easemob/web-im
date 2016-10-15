var React = require("react");
var ReactDOM = require('react-dom');

var componentsNode = document.getElementById('components');
var dom = document.createElement('div');
componentsNode.appendChild(dom);

var UI = require('../common/webim-demo');
var Button = UI.Button;
var Input = UI.Input;

var ChangeGroupSubject = React.createClass({

    onSubmit: function () {

        var value = this.refs.input.refs.input.value;

        if (!value) {
            Demo.api.NotifyError("群组名不能为空");
            return;
        }
        log("ChangeGroupSubject:", value, this.props.roomId);
        if (WebIM.config.isWindowSDK) {
            WebIM.doQuery('{"type":"changeGroupSubject", "id":"' + this.props.roomId + '", "subject":"' + value + '"}',
                function (response) {
                    var json = eval('(' + str + ')');
                    Demo.api.changeGroupSubjectCallBack(json.id, json.subject);
                },
                function (code, msg) {
                    Demo.api.NotifyError("changeGroupSubject:" + code);
                });
        } else {
            // Demo.conn.ChangeGroupSubject({
            //     to: value,
            //     message: Demo.user + Demo.lan.request
            // });
            Demo.api.changeGroupSubjectCallBack(this.props.roomId, value);
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
                    <h3>{Demo.lan.changeGroupSubject}</h3>
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
    show: function (roomId) {
        ReactDOM.render(
            <ChangeGroupSubject onClose={this.close} roomId={roomId}/>,
            dom
        );
    },

    close: function () {
        ReactDOM.unmountComponentAtNode(dom);
    }
};
