var React = require("react");
var ReactDOM = require('react-dom');
var _ = require('underscore');

var componentsNode = document.getElementById('components');
var dom = document.createElement('div');
componentsNode.appendChild(dom);

var UI = require('../common/webim-demo');
var Button = UI.Button;
var Input = UI.Input;

import MultipleSelectBoxList  from '../common/multiSelectBoxList';

var FridendList = React.createClass({

    getInitialState: function () {
        var me = this;
        if (WebIM.config.isWindowSDK) {
            WebIM.doQuery('{"type":"groupMembers","id":"' + me.props.roomId + '"}',
                function success(str) {
                    var members = eval('(' + str + ')');
                    if (members && members.length > 0) {
                        var values = [];
                        var values_old = [];
                        for (var i = 0, l = members.length; i < l; i++) {
                            var jid = members[i].jid,
                                username = jid.substring(jid.indexOf('_') + 1).split('@')[0];
                            values.push({"id": username, "text": username});
                            values_old.push(username);
                        }
                        me.setState({value: values, value_old: values_old});
                    }
                },
                function failure(errCode, errMessage) {
                    Demo.api.NotifyError("FridendList queryRoomMember:" + errCode + ' ' + errMessage);
                });
        } else {
            Demo.conn.queryRoomMember({
                roomId: me.props.roomId,
                success: function (members) {
                    if (members && members.length > 0) {
                        var values = [];
                        var values_old = [];
                        for (var i = 0, l = members.length; i < l; i++) {
                            var jid = members[i].jid,
                                username = jid.substring(jid.indexOf('_') + 1).split('@')[0];
                            values.push({"id": username, "text": username});
                            values_old.push(username);
                        }

                        me.setState({value: values, value_old: values_old});
                    }
                },
                error: function (e) {
                    Demo.api.NotifyError("FridendList queryRoomMember:" + e);
                }
            });
        }

        var options = [];
        for (var name  in this.props.optionData) {
            options.push({"id": name, "text": name});
        }
        return {
            options: options,
            value: [],
            value_old: []
        };
    },
    getValueOld: function () {
        return this.state.value_old;
    },
    render: function () {
        return (
            <div className="container">
                <MultipleSelectBoxList
                    ref="multiSelected"
                    options={this.state.options}
                    value={this.state.value}
                    nameText={Demo.lan.groupMemberLabel}
                    label={Demo.lan.chooseGroupMember}
                    selectedLabel={Demo.lan.selectedLabel}
                    value_old={this.state.value_old}
                />
            </div>
        )
    }
});

var AdminGroupMembers = React.createClass({

    onSubmit: function () {

        var friendsSelected = [];//this.refs.friendList.refs.multiSelected.label();
        var friendsValues = this.refs.friendList.refs.multiSelected.value();

        _.each(friendsValues, function (v, k) {
            friendsSelected.push(v.text)
        });

        // log("AdminGroupMembers:", value, this.props.roomId);
        var value_old = this.refs.friendList.getValueOld();
        var value_new = friendsSelected;
        var value_add = [];
        var value_del = [];
        for (var i = 0, l = value_new.length; i < l; i++) {
            if (!value_old.includes(value_new[i])) {
                value_add.push(value_new[i]);
            }
        }
        for (var i = 0, l = value_old.length; i < l; i++) {
            if (!value_new.includes(value_old[i])) {
                value_del.push(value_old[i]);
            }
        }


        if (this.props.value == "PRIVATE_MEMBER_INVITE" && value_del.length > 0) {
            Demo.api.NotifyError(Demo.lan.deletePrivateGroupMember);
            return;
        }
        //TODO:@lhr  value_add 和 value_del 需要分成两个doQuery 处理
        if (WebIM.config.isWindowSDK) {
            if (value_add.length > 0) {
                var value_add = '["' + value_add.join('","') + '"]';
                WebIM.doQuery('{"type":"addGroupMembers","welcomeMessage":"","id":"' + this.props.roomId + '","members":' + value_add + '}', function (response) {
                }, function (code, msg) {
                    Demo.api.NotifyError("onSubmit:code:" + code + " " + msg);
                });
            }
            if (value_del.length > 0) {
                var value_del = '["' + value_del.join('","') + '"]';
                WebIM.doQuery('{"type":"removeGroupMembers","welcomeMessage":"","id":"' + this.props.roomId + '","members":' + value_del + '}', function (response) {
                }, function (code, msg) {
                    Demo.api.NotifyError("onSubmit:code:" + code + " " + msg);
                });
            }

        } else {
            if (value_add.length > 0) {
                Demo.conn.addGroupMembers({
                    list: value_add,
                    roomId: this.props.roomId,
                    reason: Demo.user + " invite you to join group '" + this.props.name + "'",
                    success: function (msgInfo) {
                        var members = value_add.join(', ');
                        var str = WebIM.utils.sprintf(Demo.lan.inviteGroup, members);
                        Demo.api.NotifySuccess(str);
                    }
                });
            }
            if (value_del.length > 0) {
                Demo.conn.leaveGroup({
                    list: value_del,
                    roomId: this.props.roomId
                })
            }
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
                    <h3>{Demo.lan.adminGroupMembers}</h3>
                    <div>
                        <FridendList ref="friendList" optionData={Demo.roster} roomId={this.props.roomId}/>
                    </div>
                    <Button text={Demo.lan.confirm} onClick={this.onSubmit} className='webim-dialog-button'/>
                    <span className='font' onClick={this.close}>A</span>
                </div>
            </div>
        );
    }
});

module.exports = {
    show: function (name, roomId, settings) {
        ReactDOM.render(
            <AdminGroupMembers onClose={this.close} name={name} roomId={roomId} settings={settings}/>,
            dom
        );
    },

    close: function () {
        ReactDOM.unmountComponentAtNode(dom);
    }
};
