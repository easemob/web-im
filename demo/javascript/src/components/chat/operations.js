var React = require("react");

var ChangeGroupSubject = require("../group/changeGroupSubject");
var ChangeGroupDescription = require("../group/changeGroupDescription");
var AdminGroupMembers = require("../group/adminGroupMembers");
var Notify = require('../common/notify');

module.exports = React.createClass({

    getInitialState: function () {
        var me = this;

        return {hide: 'hide'};
    },

    update: function () {
        var me = this;
        if (this.props.owner.length == 0) {
            this.props.getGroupOwner('opertion');
            return;
        }
        this.setState({
            hide: this.state.hide ? '' : ' hide'
        });
    },

    adminGroupMembers: function () {
        log('addGroupMembers');
        AdminGroupMembers.show(this.props.roomId);
        this.update();
    },

    changeGroupSubject: function () {
        ChangeGroupSubject.show(this.props.roomId);
        this.update();
    },
    changeGroupDescription: function () {
        ChangeGroupDescription.show(this.props.roomId);
        this.update();
    },

    destroyGroup: function () {
        log('destroyGroup:' + this.props.roomId);
        if (WebIM.config.isWindowSDK) {
            WebIM.doQuery('{"type":"destroyGroup","id":"' + this.props.roomId + '"}',
                function (response) {
                    Demo.api.updateGroup();
                },
                function (code, msg) {
                    Notify.error("destroyGroup:" + code);
                });
        } else {
        }
        this.update();
    },

    leaveGroup: function () {
        log('leaveGroup:' + this.props.roomId);
        if (WebIM.config.isWindowSDK) {
            WebIM.doQuery('{"type":"leaveGroup","id":"' + this.props.roomId + '"}',
                function (response) {
                    Demo.api.updateGroup();
                },
                function (code, msg) {
                    Notify.error("leaveGroup:" + code);
                });
        } else {
        }
        this.update();
    },


    render: function () {
        var className = this.state.hide ? ' ' + this.state.hide : '';
        var acttionName = (this.props.admin == 1) ? Demo.lan.destroyGroup : Demo.lan.leaveGroup;
        var actionMethod = (this.props.admin == 1) ? this.destroyGroup : this.leaveGroup;

        return (
            <div>
                <i ref='switch' className='webim-operations-icon font xsmaller' onClick={this.update}>M</i>
                <ul className={'webim-operations' + className}>
                    <li onClick={this.adminGroupMembers} className={this.props.admin ? '' : 'hide'}>
                        <i className='font smallest'>F</i>
                        <span>{Demo.lan.adminGroupMembers}</span>
                    </li>
                    <li onClick={this.changeGroupSubject} className={this.props.admin ? '' : 'hide'}>
                        <i className='font smallest'>B</i>
                        <span>{Demo.lan.changeGroupSubject}</span>
                    </li>
                    <li onClick={this.changeGroupDescription} className={this.props.admin ? '' : 'hide'}>
                        <i className='font smallest'>B</i>
                        <span>{Demo.lan.changeGroupDescription}</span>
                    </li>
                    <li onClick={actionMethod}>
                        <i className='font smallest'>Q</i>
                        <span>{acttionName}</span>
                    </li>
                </ul>
            </div>
        );
    }
});
