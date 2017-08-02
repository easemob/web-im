var React = require("react");
var ReactDOM = require('react-dom');
var ChangeGroupInfo = require("../group/changeGroupInfo");
var AddGroupMember = require("../group/addGroupMember");
var AdminGroupMembers = require("../group/adminGroupMembers");
var ShowGroupBlacklist = require("../blacklist/showGroupBlacklist");

module.exports = React.createClass({

    getInitialState: function () {
        return {
            // the operations list whether show or not
            admin: false,
            hide: true
        };
    },

    update: function () {
        if (this.props.owner.length == 0) {
            this.props.getGroupInfo('opertion');
            return;
        }

        var admin = false;
        var jid = this.props.owner[0].jid;
        var owner = jid.substr(0, jid.lastIndexOf("@"));
        if (owner == Demo.user) {
            admin = true;
            this.setState({
                hide: !this.state.hide,
                admin: admin
            });
        } else {
            if(!this.state.admin){
                var options = {
                    groupId: Demo.selected,
                    success: function(resp){
                        for(var i in resp.data){
                            if(resp.data[i] == Demo.user){
                                admin = true;
                                break;
                            }
                        }
                        this.setState({
                            hide: !this.state.hide,
                            admin: admin
                        });
                    }.bind(this)
                };
                Demo.conn.getGroupAdmin(options);
            }else{
                this.setState({
                    hide: !this.state.hide
                });
            }
        }
    },

    // hide when blur | bind focus event
    componentDidUpdate: function () {
        !this.state.hide && ReactDOM.findDOMNode(this.refs['webim-operations']).focus();
    },

    // hide when blur close
    handleOnBlur: function () {
        this.setState({hide: true});
    },

    adminGroupMembers: function () {
        AdminGroupMembers.show(this.props.name, this.props.roomId, this.props.settings);
        this.update();
    },

    changeGroupInfo: function () {
        ChangeGroupInfo.show(this.props.roomId, this.props.fields, this.props.getGroupInfo);
        this.update();
    },

    showGroupBlacklist: function () {
        ShowGroupBlacklist.show(this.props.roomId);
        this.update();
    },

    addGroupMember: function () {
        AddGroupMember.show(this.props.roomId);
        this.update();
    },

    destroyGroup: function () {
        var roomId = this.props.roomId;
        if (WebIM.config.isWindowSDK) {
            WebIM.doQuery('{"type":"destroyGroup","id":"' + this.props.roomId + '"}',
                function () {
                    Demo.api.updateGroup();
                },
                function (code, msg) {
                    Demo.api.NotifyError("destroyGroup:" + code + " " + msg);
                });
        } else {
            var groupId = this.props.roomId;
            var options = {
                groupId: groupId,
                success: function (respData) {
                    Demo.api.NotifySuccess(`You just dissolved group ${groupId}`);
                    Demo.api.updateGroup();
                },
                error: function (code, msg) {
                    Demo.api.NotifyError("destroyGroup:" + code + " " + msg);
                }
            };
            Demo.conn.dissolveGroup(options);
        }
        this.props.destroyGroup();
        this.update();
    },

    leaveGroupBySelf: function () {
        if (WebIM.config.isWindowSDK) {
            WebIM.doQuery('{"type":"leaveGroup","id":"' + this.props.roomId + '"}',
                function (response) {
                    Demo.api.updateGroup();
                },
                function (code, msg) {
                    Demo.api.NotifyError("leaveGroup:" + code + " " + msg);
                });
        } else {
            var groupId = this.props.roomId;
            var options = {
                groupId: groupId,
                success: function () {
                    Demo.selected = '';
                    Demo.api.updateGroup();
                    delete Demo.chatRecord[groupId];
                    Demo.api.NotifySuccess("You have been out of the group " + groupId);
                },
                error: function (code, msg) {
                    Demo.api.NotifyError("leaveGroup:" + code + " " + msg);
                }
            };
            Demo.conn.quitGroup(options);
        }
        this.props.leaveGroup();
        this.update();
    },

    shield: function () {
        var groupId = this.props.roomId;
        if (WebIM.config.isWindowSDK) {
            //TODO:isWindowSDK
        } else {
            var options = {
                groupId: groupId,
                success: function () {
                },
                error: function () {
                }
            };
            Demo.conn.blockGroup(options);
        }
    },

    render: function () {
        var actionName = (this.state.admin == 1) ? Demo.lan.destroyGroup : Demo.lan.leaveGroup;
        var actionMethod = (this.state.admin == 1) ? this.destroyGroup : this.leaveGroupBySelf;
        var adminMemberLabel = '';
        if (this.state.admin) {
            adminMemberLabel = Demo.lan.adminGroupMembers;
        } else if (this.props.settings == "PRIVATE_MEMBER_INVITE") {
            adminMemberLabel = Demo.lan.inviteGroupMembers;
        }
        return (<div>
                <i ref='switch'
                   className='webim-operations-icon font xsmaller'
                   onClick={this.update}>
                    M</i>
                <ul
                    tabIndex="-1"
                    ref="webim-operations"
                    className={'webim-operations ' + (this.state.hide ? 'hide' : '')}
                    onBlur={this.handleOnBlur}>
                    <li onClick={this.adminGroupMembers}
                        className={this.state.admin ? '' : 'hide'}>
                        <i className='font smallest'>F</i>
                        <span>{adminMemberLabel}</span>
                    </li>
                    <li onClick={this.addGroupMember}>
                        <i className='font smallest'>L</i>
                        <span>{Demo.lan.addGroupMember}</span >
                    </li>
                    <li onClick={this.changeGroupInfo}
                        className={this.state.admin ? '' : 'hide'}>
                        <i className='font smallest'>B</i>
                        <span>{Demo.lan.changeGroupInfo}</span >
                    </li>
                    <li onClick={this.showGroupBlacklist}
                        className={this.state.admin ? '' : 'hide'}>
                        <i className='font smallest'>n</i>
                        <span>{Demo.lan.groupBlacklist}</span>
                    </li>
                    <li
                        onClick={actionMethod}>
                        <i className='font smallest'>Q</i>
                        <span> {actionName}</span>
                    </li>
                </ul>
            </div>
        );
    }
});
