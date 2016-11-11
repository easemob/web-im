var React = require("react");
var ReactDOM = require('react-dom');
var ChangeGroupInfo = require("../group/changeGroupInfo");
var AdminGroupMembers = require("../group/adminGroupMembers");
var ShowGroupBlacklist = require("../blacklist/showGroupBlacklist");

module.exports = React.createClass({

    getInitialState: function () {
        return {
            // the operations list whether show or not
            hide: true
        };
    },

    update: function () {
        if (this.props.owner.length == 0) {
            this.props.getGroupInfo('opertion');
            return;
        }

        this.setState({hide: !this.state.hide});
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
        AdminGroupMembers.show(this.props.roomId, this.props.settings);
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

    destroyGroup: function () {
        log('destroyGroup:' + this.props.roomId);
        if (WebIM.config.isWindowSDK) {
            WebIM.doQuery('{"type":"destroyGroup","id":"' + this.props.roomId + '"}',
                function () {
                    Demo.api.updateGroup();
                },
                function (code, msg) {
                    Demo.api.NotifyError("destroyGroup:" + code + " " + msg);
                });
        } else {
            // success update on chat.js async msg `deleteGroupChat`
            Demo.conn.destroyGroup({
                roomId: this.props.roomId,
                error: function (code, msg) {
                    Demo.api.NotifyError("destroyGroup:" + code + " " + msg);
                }
            })
        }
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
            // success update on chat.js async msg `deleteGroupChat`
            Demo.conn.leaveGroupBySelf({
                to: Demo.user,
                roomId: this.props.roomId,
                success: function () {
                    Demo.api.updateGroup();
                },
                error: function (code, msg) {
                    Demo.api.NotifyError("leaveGroup:" + code + " " + msg);
                }
            })
        }
        this.update();
    },

    render: function () {
        var actionName = (this.props.admin == 1) ? Demo.lan.destroyGroup : Demo.lan.leaveGroup;
        var actionMethod = (this.props.admin == 1) ? this.destroyGroup : this.leaveGroupBySelf;
        var adminMemberLabel = '';
        if (this.props.admin) {
            adminMemberLabel = Demo.lan.adminGroupMembers;
        } else if (this.props.settings == "PRIVATE_MEMBER_INVITE") {
            adminMemberLabel = Demo.lan.inviteGroupMembers;
        }
        return (
            <div>
                <i ref='switch' className='webim-operations-icon font xsmaller' onClick={this.update}>M</i>
                <ul tabIndex="-1" ref="webim-operations"
                    className={'webim-operations ' + (this.state.hide ? 'hide' : '')}
                    onBlur={this.handleOnBlur}>
                    {/*<li onClick={this.adminGroupMembers}*/}
                    {/*className={(this.props.settings == "PRIVATE_MEMBER_INVITE") && !this.props.admin ? '' : 'hide'}>*/}
                    {/*<i className='font smallest'>F</i>*/}
                    {/*<span>{Demo.lan.memberInvite}</span>*/}
                    {/*</li>*/}
                    <li onClick={this.adminGroupMembers} className={this.props.admin ? '' : 'hide'}>
                        <i className='font smallest'>F</i>
                        <span>{adminMemberLabel}</span>
                    </li>
                    <li onClick={this.changeGroupInfo} className={this.props.admin ? '' : 'hide'}>
                        <i className='font smallest'>B</i>
                        <span>{Demo.lan.changeGroupInfo}</span>
                    </li>
                    <li onClick={this.showGroupBlacklist} className={this.props.admin ? '' : 'hide'}>
                        <i className='font smallest'>n</i>
                        <span>{Demo.lan.groupBlacklist}</span>
                    </li>
                    {/* destroy or leave group */}
                    <li onClick={actionMethod}>
                        <i className='font smallest'>Q</i>
                        <span>{actionName}</span>
                    </li>
                </ul>
            </div>
        );
    }
});
