/**
 * Created by clock on 2017/7/4.
 */
var React = require("react");
var ReactDOM = require('react-dom');

var componentsNode = document.getElementById('components');
var dom = document.createElement('div');
componentsNode.appendChild(dom);

var UI = require('../common/webim-demo');
var Button = UI.Button;
var Input = UI.Input;

var AddGroupMember = React.createClass({

    getInitialState: function () {
        return {
            username: ''
        }
    },

    onInputChange: function (e) {
        this.setState({
            username: e.target.value
        });
    },

    onSubmit: function () {
        var username = this.state.username,
            groupId = Demo.selected,
            userArr = [];
        userArr.push(username);
        var options = {
                groupId: groupId,
                users: userArr,
                success: function () {
                    Demo.api.NotifySuccess('Invite succeed!');
                },
                error: function(e){
                    Demo.api.NotifyError(e.data);
                }
            };
        Demo.conn.inviteToGroup(options);
    },

    close: function () {
        typeof this.props.onClose === 'function' && this.props.onClose();
    },

    render: function () {
        return (
            <div className='webim-friend-options'>
                <div ref='layer' className='webim-layer'></div>
                <div className='webim-dialog'>
                    <h3>{Demo.lan.addGroupMember}</h3>
                    <div ref='content'>
                        <Input defaultFocus='true' placeholder={Demo.lan.username} onChange={this.onInputChange}/>
                        <Button text={Demo.lan.add} onClick={this.onSubmit} className='webim-dialog-button-search'/>
                    </div>
                    <span className='font' onClick={this.close}>A</span>
                </div>
            </div>
        );
    }
});

module.exports = {
    show: function (roomId) {
        ReactDOM.render(
            <AddGroupMember onClose={this.close} roomId={roomId}/>,
            dom
        );
    },

    close: function () {
        ReactDOM.unmountComponentAtNode(dom);
    }
};
