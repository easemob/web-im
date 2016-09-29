var React = require("react");
var ReactDOM = require('react-dom');

var componentsNode = document.getElementById('components');
var dom = document.createElement('div');
componentsNode.appendChild(dom);

var UI = require('../common/webim-demo');
var Button = UI.Button;
var Input = UI.Input;
var Notify = require('../common/notify');

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
                        for (var i = 0, l = members.length; i < l; i++) {
                            var jid = members[i].jid,
                                username = jid.substring(jid.indexOf('_') + 1).split('@')[0];
                            values.push({"id": username, "text": username});
                        }
                        me.setState({value: values});
                    }
                },
                function failure(errCode, errMessage) {
                    Notify.error("FridendList queryRoomMember:" + errCode);
                });
        } else {
            Demo.conn.queryRoomMember({
                roomId: me.props.roomId,
                success: function (members) {
                    if (members && members.length > 0) {
                        var values = [];
                        for (var i = 0, l = members.length; i < l; i++) {
                            var jid = members[i].jid,
                                username = jid.substring(jid.indexOf('_') + 1).split('@')[0];
                            values.push({"id": username, "text": username});
                        }

                        me.setState({value: values});
                    }
                },
                error: function (e) {
                    Notify.error("FridendList queryRoomMember:" + e);
                }
            });
        }

        var options = [];
        for (var name  in this.props.optionData) {
            options.push({"id": name, "text": name});
        }
        return {
            options: options,
            value: []
        };
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
                />
            </div>
        )
    }
});

var AdminGroupMembers = React.createClass({

    onSubmit: function () {

        var value = this.refs.friendList.refs.multiSelected.label();

        if (!value) {
            return;
        }
        log("AdminGroupMembers:", value, this.props.roomId);
        if (WebIM.config.isWindowSDK) {
            var friendsSelected = '["' + value.replace(/, /g, '","') + '"]';

            WebIM.doQuery('{"type":"addGroupMembers","welcomeMessage":"","id":"' + this.props.roomId + '","members":' + friendsSelected + '}', function (response) {
            }, function (code, msg) {
                Notify.error("onSubmit:code:" + code + " " + msg);
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
    show: function (roomId) {
        ReactDOM.render(
            <AdminGroupMembers onClose={this.close} roomId={roomId}/>,
            dom
        );
    },

    close: function () {
        ReactDOM.unmountComponentAtNode(dom);
    }
};
