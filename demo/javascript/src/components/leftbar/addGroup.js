var React = require("react");
var ReactDOM = require('react-dom');

var componentsNode = document.getElementById('components');
var dom = document.createElement('div');
componentsNode.appendChild(dom);

var UI = require('../common/webim-demo');
var Button = UI.Button;
var Input = UI.Input;
var Checkbox = UI.Checkbox;

var AddGroup = React.createClass({

    addSubmit: function () {
        var value = this.refs.input.refs.input.value;
        var info = this.refs.textarea.value;
        var permission_group = this.refs.permission_group.refs.input.checked;
        var permission_member = this.refs.permission_member.refs.input.checked;
        log(value,info,permission_group,permission_member);
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
                <div className='webim-dialog webim-dialog-2'>
                    <h3>{Demo.lan.addGroup}</h3>
                    <div ref='content'>
                        <Input defaultFocus='true' ref='input' placeholder={Demo.lan.groupName} />
                        <br/>
                        <textarea ref='textarea' placeholder={Demo.lan.groupInfo}></textarea>
                    </div>
                    <div>
                        <Checkbox text={Demo.lan.groupPermission} ref='permission_group' />
                        <Checkbox text={Demo.lan.groupMemberPermission}  ref='permission_member' />
                    </div>
                    <Button text={Demo.lan.addGroupMember} onClick={this.addSubmit} className='webim-dialog-button' />
                    <span className='font' onClick={this.close}>A</span>
                </div>
            </div>
        );
    }
});

module.exports = {
    show: function () {
        ReactDOM.render(
            <AddGroup onClose={this.close} />,
            dom 
        );       
    },

    close: function () {
        ReactDOM.unmountComponentAtNode(dom);
    }
}
