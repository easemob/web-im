var React = require("react");
var ReactDOM = require('react-dom');

var componentsNode = document.getElementById('components');
var dom = document.createElement('div');
componentsNode.appendChild(dom);

var UI = require('../common/webim-demo');
var Button = UI.Button;
var Input = UI.Input;
var Checkbox = UI.Checkbox;

var SelectBox = React.createFactory(require('react-select-box'));
var div = React.createElement.bind(null,'div');
var option = React.createElement.bind(null,'option');

var SelectBoxNode = React.createClass({
    getInitialState: function () {
        return {
            friends: []
        }
    },
    handleMultiChange: function (friends) {
        this.setState({ friends: friends })
    },
    render: function() {
        var optionNodes = Object.keys(Demo.roster).map(function(name) {
            return (<option value={name} key={name}>{name}</option>);
        });
        return (
            SelectBox(
                {
                    label: Demo.lan.addGroupMember,
                    onChange: this.handleMultiChange,
                    value: this.state.friends,
                    multiple: true,
                    ref:'select'
                },
                optionNodes
            )
        );
    }
});

var AddGroup = React.createClass({
    getInitialState: function () {
        return {
            colors: []
        }
    },
    addSubmit: function () {
        var value = this.refs.input.refs.input.value;
        var info = this.refs.textarea.value;
        var permission_group = this.refs.permission_group.refs.input.checked;
        var permission_member = this.refs.permission_member.refs.input.checked;
        var friendsSelected = this.refs.SelectBoxNode.refs.select.value();
        log(value,info,permission_group,permission_member,friendsSelected);
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
                        <Checkbox text={Demo.lan.groupPermission} ref='permission_group' />
                        <Checkbox text={Demo.lan.groupMemberPermission}  ref='permission_member' />
                    </div>
                    <div>
                        <SelectBoxNode ref='SelectBoxNode'/>
                    </div>
                    <Button text={Demo.lan.add} onClick={this.addSubmit} className='webim-dialog-button' />
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
