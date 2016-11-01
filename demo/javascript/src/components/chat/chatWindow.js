var React = require("react");
var ReactDOM = require('react-dom');
var SendWrapper = require('./sendWrapper');
var Avatar = require('../common/avatar');
var OperationsGroups = require('./operationsGroups');
var OperationsFriends = require('./operationsFriends');
var _ = require('underscore');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            settings: '',
            admin: 0,
            owner: [],
            members: [],
            fields: {},
            memberShowStatus: false
        };
    },

    getGroupInfo: function (cb_type) {
        //only group window
        if (this.props.chatType == 'groupChat') {
            var me = this;
            if (WebIM.config.isWindowSDK) {
                WebIM.doQuery('{"type":"groupSpecification","id":"' + me.props.roomId + '"}',
                    function success(str) {
                        if (str == '') {
                            return;
                        }
                        var json = eval('(' + str + ')');
                        var owner = [{jid: json.owner, affiliation: "owner"}];
                        var admin = 0;
                        if (json.owner == Demo.user) {
                            admin = 1;
                        }
                        me.setState({settings: json.style, admin: admin, owner: owner});
                        if (cb_type == 'listMember') {
                            me.listMember();
                        } else {
                            me.refs['operation_div'].refs['switch'].click();
                        }
                    },
                    function failure(errCode, errMessage) {
                        Demo.api.NotifyError("queryRoomInfo:" + errCode);
                    });

            } else {
                Demo.conn.queryRoomInfo({
                    roomId: me.props.roomId,
                    success: function (settings, members, fields) {
                        if (members && members.length > 0) {
                            var jid = members[0].jid;
                            var username = jid.substring(jid.indexOf('_') + 1).split('@')[0];
                            var admin = 0;
                            if (members[0].affiliation == 'owner' && username == Demo.user) {
                                admin = 1;
                            }
                            me.setState({settings: settings, admin: admin, owner: members, fields: fields});
                            if (cb_type == 'listMember') {
                                me.listMember();
                            } else if (cb_type == 'opertion') {
                                me.refs['operation_div'].refs['switch'].click();
                            }
                        }
                    },
                    error: function () {
                        Demo.api.NotifyError('queryRoomInfo error', me.props.roomId);
                    }
                });
            }
        }
    },


    componentWillReceiveProps: function (nextProps) {

    },

    preListMember: function () {
        if (this.state.owner.length == 0) {
            this.getGroupInfo('listMember');
        } else {
            this.listMember();
        }
    },

    listMember: function () {
        if (!this.state.memberShowStatus) {
            var me = this;
            if (WebIM.config.isWindowSDK) {
                WebIM.doQuery('{"type":"groupMembers","id":"' + me.props.roomId + '"}',
                    function success(str) {
                        if (str == '') {
                            return;
                        }
                        var members = eval('(' + str + ')');
                        if (members && members.length > 0) {
                            me.refreshMemberList(members);
                        } else {
                            //trigger adding owner to members
                            me.refreshMemberList([]);
                        }
                    },
                    function failure(errCode, errMessage) {
                        Demo.api.NotifyError("listMember:" + errCode);
                    });
            } else {
                Demo.conn.queryRoomMember({
                    roomId: me.props.roomId,
                    success: function (members) {
                        if (members && members.length > 0) {
                            me.refreshMemberList(members);
                        } else {
                            //trigger adding owner to members
                            me.refreshMemberList([]);
                        }
                    },
                    error: function () {
                    }
                });
            }
        } else {
            this.setState({members: [], memberShowStatus: false});
        }
    },

    addToGroupBlackList: function (username, index) {
        var me = this;
        var members = this.state.members;
        var item = _.find(this.state.members, function (item) {
            return new RegExp(Demo.user).test(item.jid);
        });

        Demo.api.blacklist.addGroupMemberToBlacklist({
            to: username,
            roomId: this.props.roomId,
            affiliation: item.affiliation,
            success: function () {
                log('memebers', members);
                members.splice(index, 1);
                me.setState({
                    members: members
                })
            }
        });
    },

    refreshMemberList: function (members) {
        // this.refs.i.className = 'webim-down-icon font smallest dib webim-up-icon';
        this.setState({members: this.state.owner.concat(members), memberShowStatus: true});
    },

    send: function (msg) {
        msg.chatType = this.props.chatType;
        Demo.conn.send(msg);
        Demo.api.appendMsg(msg, 'txt');
    },

    // hide when blur | bind focus event
    componentDidUpdate: function () {
        // this.state.memberShowStatus && ReactDOM.findDOMNode(this.refs['member']).focus();
    },

    // hide when blur close
    handleOnBlur: function () {
        // this.setState({memberShowStatus: false});
    },

    render: function () {
        var className = this.props.roomId ? ' dib' : ' hide',
            props = {
                chatType: this.props.chatType,
                sendPicture: this.props.sendPicture,
                sendAudio: this.props.sendAudio,
                sendFile: this.props.sendFile
            },
            memberStatus = this.state.memberShowStatus ? '' : ' hide',
            roomMember = [];


        for (var i = 0, l = this.state.members.length; i < l; i++) {
            var jid = this.state.members[i].jid,
                username = jid.substring(jid.indexOf('_') + 1).split('@')[0],
                affiliation = this.state.members[i].affiliation;


            roomMember.push(<li key={i}>
                <Avatar src='demo/images/default.png'/>
                <span>{username}</span>
                <div className="webim-operation-icon" style={ {display: affiliation == 'owner' ? 'none' : ''} }>
                    <i className={"webim-leftbar-icon font smaller " + className}
                       style={{display: this.state.admin != 1 ? 'none' : ''}}
                       onClick={this.addToGroupBlackList.bind(this, username, i)}>n</i>
                </div>
            </li>);
        }

        var operations = [];
        if (Demo.selectedCate == 'friends') {
            operations.push(<OperationsFriends key='operation_div' ref='operation_div' roomId={this.props.roomId}
                                               admin={this.state.admin}
                                               owner={this.state.owner}
                                               settings={this.state.settings}
                                               getGroupInfo={this.getGroupInfo}
                                               onBlur={this.handleOnBlur}
                                               name={this.props.name}
                                               updateNode={this.props.updateNode}
            />);
        } else if (Demo.selectedCate == 'groups') {
            operations.push(<OperationsGroups key='operation_div' ref='operation_div' roomId={this.props.roomId}
                                              admin={this.state.admin}
                                              owner={this.state.owner}
                                              settings={this.state.settings}
                                              fields={this.state.fields}
                                              getGroupInfo={this.getGroupInfo}
                                              onBlur={this.handleOnBlur}
            />);
        }

        return (
            <div className={'webim-chatwindow ' + this.props.className}>
                <div className='webim-chatwindow-title'>
                    {(Demo.selectedCate == 'chatrooms' || Demo.selectedCate == 'groups') ? Demo.lan.groupMemberLabel : this.props.name }
                    <i ref='i'
                       className={'webim-down-icon font smallest ' + className + " " + (this.state.memberShowStatus ? 'webim-up-icon' : 'webim-down-icon')}
                       onClick={this.preListMember}>D</i>
                </div>
                <div className={(operations.length > 0) ? '' : 'hide'}>
                    {operations}
                </div>
                <ul onBlur={this.handleOnBlur} tabIndex="-1" ref='member'
                    className={'webim-group-memeber' + memberStatus}>{roomMember}</ul>
                <div id={this.props.id} ref='wrapper' className='webim-chatwindow-msg'></div>
                <SendWrapper send={this.send} {...props} />
            </div>
        );
    }
});
