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
        if (this.props.chatType == 'groupChat'
            || this.props.chatType == 'chatRoom') {
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
                        Demo.api.NotifyError("queryRoomInfo:" + errCode + ' ' + errMessage);
                    });

            } else {
                Demo.conn.queryRoomInfo({
                    roomId: me.props.roomId,
                    success: function (settings, members, fields) {
                        if (members && members.length > 0) {
                            var jid = members[0].jid;
                            var username = jid.substr(0, jid.lastIndexOf("@"));
                            var admin = 0;
                            if (members[0].affiliation == 'owner' && username.toLowerCase() == Demo.user) {
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
                        Demo.api.NotifyError("listMember:" + errCode + ' ' + errMessage);
                    });
            } else {
                var requestData = [];
                requestData['pagenum'] = 1;
                requestData['pagesize'] = 1000;
                var options = {
                    url: WebIM.config.apiURL + '/' + Demo.orgName + '/' + Demo.appName + '/chatgroups'
                        + '/' + Demo.selected + '/users',
                    dataType: 'json',
                    type: 'GET',
                    data: requestData,
                    headers: {
                        'Authorization': 'Bearer ' + Demo.token,
                        'Content-Type': 'application/json'
                    },
                    success: function (resp) {
                        var data = resp.data, admin;
                        for(var i in data){
                            if(data[i]['owner']){
                                if(data[i]['owner'] === Demo.user){
                                    this.getAdmin(data);
                                    admin = true;
                                }
                            }
                        }
                        if(!admin){
                            this.refreshMemberList(data);
                        }
                    }.bind(this),
                    error: function(e){}
                };
                WebIM.utils.ajax(options);
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
                members.splice(index, 1);
                me.setState({
                    members: members
                })
            }
        });
    },

    // TODO: 群禁言、群升降级
    ban: function (username) {
        var requestData = {
            "usernames":[username],
            "mute_duration":86400000
        };
        var options = {
            url: WebIM.config.apiURL + '/' + Demo.orgName + '/' + Demo.appName + '/' + 'chatgroups'
            + '/' + Demo.selected + '/' + 'mute',
            dataType: 'json',
            type: 'POST',
            headers: {
                'Authorization': 'Bearer ' + Demo.token,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(requestData),
            success: function (resp) {
                var members = this.state.members;
                for(var i in members){
                    if(members[i]['member']){
                        if(members[i]['member'] === username){
                            members[i]['muted'] = true;
                            break;
                        }
                    }
                }
                this.setState({members: members});
            }.bind(this),
            error: function(e){}
        };
        WebIM.utils.ajax(options);
    },

    // 移除禁言
    removeBan: function(username){
        var options = {
            url: WebIM.config.apiURL + '/' + Demo.orgName + '/' + Demo.appName + '/' + 'chatgroups'
            + '/' + Demo.selected + '/' + 'mute' + '/' + username,
            dataType: 'json',
            type: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + Demo.token,
                'Content-Type': 'application/json'
            },
            success: function(resp){
                var members = this.state.members;
                for(var i in members){
                    if(members[i]['member']){
                        if(members[i]['member'] === username){
                            members[i]['muted'] && delete members[i]['muted'];
                            break;
                        }
                    }
                }
                this.setState({members: members});
            }.bind(this),
            error: function (e) {

            }
        };
        WebIM.utils.ajax(options);
    },

    getAdmin: function(data){
        var options = {
            url: WebIM.config.apiURL + '/' + Demo.orgName + '/' + Demo.appName + '/chatgroups'
            + '/' + Demo.selected + '/admin',
            dataType: 'json',
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + Demo.token,
                'Content-Type': 'application/json'
            },
            success: function (resp) {
                var admin = resp.data;
                for(var j in admin){
                    admin[admin[j]] = true;
                    delete admin[j];
                }
                for(var i in data){
                    if(data[i]['member']){
                        var username = data[i]['member'];
                        if(admin[username]){
                            data[i]['admin'] = true;
                        }
                    }
                }
                this.getBanned(data);
            }.bind(this),
            error: function(e){}
        };
        WebIM.utils.ajax(options);
    },

    getBanned: function(data){
        var options = {
            url: WebIM.config.apiURL + '/' + Demo.orgName + '/' + Demo.appName + '/chatgroups'
            + '/' + Demo.selected + '/mute',
            dataType: 'json',
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + Demo.token,
                'Content-Type': 'application/json'
            },
            success: function (resp) {
                var muted = resp.data;
                for(var i in muted){
                    var user = muted[i]['user']
                    muted[user] = true;
                    delete muted[i];
                }
                for(var j in data){
                    if(data[j]['member']){
                        var username = data[j]['member'];
                        if(muted[username]){
                            data[j]['muted'] = true;
                        }
                    }
                }
                this.refreshMemberList(data);
            }.bind(this),
            error: function(e){}
        };
        WebIM.utils.ajax(options);
    },

    setAdmin: function (username) {
        var appName = Demo.appName,
            orgName = Demo.orgName,
            token = Demo.token;

        var requestData = {
            newadmin: username
        };

        // 设置管理员
        var options = {
            url: WebIM.config.apiURL + '/' + orgName + '/' + appName + '/'+ 'chatgroups'
                + '/' + Demo.selected + '/' + 'admin',
            type: "POST",
            dataType: 'json',
            data: JSON.stringify(requestData),
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            success: function(resp){
                var members = this.state.members;
                for(var i in members){
                    if(members[i]['member']){
                        if(members[i]['member'] === username){
                            members[i]['admin'] = true;
                            break;
                        }
                    }
                }
                this.setState({members: members});
            }.bind(this),
            error: function(e){
            }.bind(this)
        };
        WebIM.utils.ajax(options);
    },

    removeAdmin: function (username) {

        var me = this;
        // 取消管理员
        var options = {
            url: WebIM.config.apiURL + '/' + Demo.orgName + '/' + Demo.appName + '/'+ 'chatgroups'
            + '/' + Demo.selected + '/' + 'admin' + '/' + username,
            type: 'DELETE',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + Demo.token,
                'Content-Type': 'application/json'
            },
            success: function(resp){
                var members = me.state.members;
                for(var i in members){
                    if(members[i]['member']){
                        if(members[i]['member'] === username){
                            if(members[i]['admin']){
                                delete members[i]['admin'];
                            }
                            break;
                        }
                    }
                }
                me.setState({members: members});
            },
            error: function (e) {
            }
        };

        WebIM.utils.ajax(options);
    },

    refreshMemberList: function (members) {
        this.setState({members: members, memberShowStatus: true});
    },

    send: function (msg) {
        msg.chatType = this.props.chatType;
        Demo.conn.send(msg);
        Demo.api.addToChatRecord(msg, 'txt', 'Undelivered');
        Demo.api.appendMsg(msg, 'txt');
        console.log("Send ScareCrow: ", msg);
    },

    // hide when blur | bind focus event
    componentDidUpdate: function () {
        // this.state.memberShowStatus && ReactDOM.findDOMNode(this.refs['member']).focus();
    },

    componentDidMount: function () {
        Demo.api.releaseChatRecord();
    },

    // hide when blur close
    handleOnBlur: function () {
        this.setState({memberShowStatus: false});
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

        for(var i in this.state.members){
            var affiliation = i, username = this.state.members[i], isAdmin=false, isMuted=false;
            var item = this.state.members[i];
            if(item['member']){
                affiliation = 'member';
                isAdmin = item['admin'];
                isMuted = item['muted'];
            }else{
                affiliation = 'owner';
            }
            username = item[affiliation];

            if(isAdmin){
                roomMember.push(<li key={i}>
                    <Avatar src='demo/images/default.png'/>
                    <span className="webim-group-name">
                    {username}
                    </span>
                    <div className="webim-operation-icon"
                        style={{display: affiliation == 'owner' ? 'none' : ''}}>
                        <i className={"webim-leftbar-icon font smaller " + className}
                            style={{display: this.state.admin != 1 ? 'none' : ''}}
                            onClick={this.addToGroupBlackList.bind(this, username, i)}
                            title={Demo.lan.addToGroupBlackList}>n</i>
                            </div>
                            <div className="webim-operation-icon"
                            style={{display: affiliation == 'owner' ? 'none' : ''}}>
                        <i className={"webim-leftbar-icon font smaller " + className}
                            style={{display: this.state.admin != 1 ? 'none' : ''}}
                            onClick={isMuted?this.removeBan.bind(this, username) : this.ban.bind(this, username)}
                            title={Demo.lan.ban}>{isMuted?'e':'f'}</i>
                            </div>
                            <div className="webim-operation-icon"
                            style={{display: affiliation == 'owner' ? 'none' : ''}}>
                        <i className={"webim-leftbar-icon font smaller " + className}
                            style={{display: this.state.admin != 1 ? 'none' : ''}}
                            onClick={isAdmin ? this.removeAdmin.bind(this, username) : this.setAdmin.bind(this, username)}
                            title={Demo.lan.rmAdministrator}>&darr;</i>
                    </div>
                </li>);
            }else{
                roomMember.push(<li key={i}>
                    <Avatar src='demo/images/default.png'/>
                    <span className="webim-group-name">
                    {username}
                    </span>
                    <div className="webim-operation-icon"
                        style={{display: affiliation == 'owner' ? 'none' : ''}}>
                        <i className={"webim-leftbar-icon font smaller " + className}
                            style={{display: this.state.admin != 1 ? 'none' : ''}}
                            onClick={this.addToGroupBlackList.bind(this, username, i)}
                            title={Demo.lan.addToGroupBlackList}>n</i>
                            </div>
                            <div className="webim-operation-icon"
                            style={{display: affiliation == 'owner' ? 'none' : ''}}>
                        <i className={"webim-leftbar-icon font smaller " + className}
                            style={{display: this.state.admin != 1 ? 'none' : ''}}
                            onClick={isMuted?this.removeBan.bind(this, username) : this.ban.bind(this, username)}
                            title={Demo.lan.ban}>{isMuted?'e':'f'}</i>
                            </div>
                            <div className="webim-operation-icon"
                            style={{display: affiliation == 'owner' ? 'none' : ''}}>
                        <i className={"webim-leftbar-icon font smaller " + className}
                            style={{display: this.state.admin != 1 ? 'none' : ''}}
                            onClick={isAdmin ? this.removeAdmin.bind(this, username) : this.setAdmin.bind(this, username)}
                            title={Demo.lan.administrator}>&uarr;</i>
                    </div>
                </li>);
            }


        }

        var operations = [];
        if (Demo.selectedCate == 'friends') {
            operations.push(< OperationsFriends
                key='operation_div'
                ref='operation_div'
                roomId={this.props.roomId}
                admin={this.state.admin}
                owner={this.state.owner}
                settings={this.state.settings}
                getGroupInfo={this.getGroupInfo}
                onBlur={this.handleOnBlur}
                name={this.props.name}
                updateNode={this.props.updateNode}
                delFriend={this.props.delFriend}
            />);
        } else if (Demo.selectedCate == 'groups') {
            operations.push(< OperationsGroups
                key='operation_div'
                ref='operation_div'
                name={this.props.name}
                roomId={this.props.roomId}
                admin={this.state.admin}
                owner={this.state.owner}
                settings={this.state.settings}
                fields={this.state.fields}
                getGroupInfo={this.getGroupInfo}
                onBlur={this.handleOnBlur}
                leaveGroup={this.props.leaveGroup}
                destroyGroup={this.props.destroyGroup}
            />);
        }

        return (
            <div className={'webim-chatwindow ' + this.props.className}>
                <div className='webim-chatwindow-title'>
                    {(Demo.selectedCate == 'chatrooms' || Demo.selectedCate == 'groups') ? Demo.lan.groupMemberLabel : this.props.name}
                    <i ref='i'
                       className={'webim-down-icon font smallest ' + className + " " + (this.state.memberShowStatus ? 'webim-up-icon' : 'webim-down-icon')}
                       onClick={this.preListMember}>D
                    </i>
                </div>
                <div className={(operations.length > 0) ? '' : 'hide'}>
                    {operations}
                </div>
                <ul onBlur={this.handleOnBlur}
                    tabIndex="-1"
                    ref='member'
                    className={'webim-group-memeber' + memberStatus}> {roomMember}
                </ul>
                <div id={this.props.id}
                     ref='wrapper'
                     className='webim-chatwindow-msg'>
                </div>
                <SendWrapper send={this.send}{...props}/>
            </div>
        );
    }
});
