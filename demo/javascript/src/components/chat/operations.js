var React = require("react");

var ChangeName = require("../group/changeName");
var InviteMember = require("../group/inviteMember");

module.exports = React.createClass({

    getInitialState: function () {
        var me = this;

        return {hide: 'hide'};
    },

    update: function () {
        this.setState({
            hide: this.state.hide ? '' : ' hide'
        });
    },

    inviteMember: function () {
        log('inviteMember');
        InviteMember.show();
        this.update();
    },

    changeName: function () {
        ChangeName.show();
        this.update();
    },

    destroyGroup: function () {
        log('destroyGroup');
        if (WebIM.config.isWindowSDK) {
            //TODO:@lhr 解散群组
            WebIM.doQuery('{"type":"destroyGroup"}',
                function (response) {
                },
                function (code, msg) {
                    Notify.error("destroyGroup:" + msg);
                });
        } else {
        }
        this.update();
    },

    leaveGroup: function () {
        log('leaveGroup');
        if (WebIM.config.isWindowSDK) {
            //TODO:@lhr 退出群组
            WebIM.doQuery('{"type":"leaveGroup"}',
                function (response) {
                },
                function (code, msg) {
                    Notify.error("leaveGroup:" + msg);
                });
        } else {
        }
        this.update();
    },


    render: function () {
        var className = this.state.hide ? ' ' + this.state.hide : '';
        //var acttionName = (this.props.admin == 1) ? Demo.lan.destroyGroup : Demo.lan.leaveGroup;
        //var actionMethod = (this.props.admin == 1) ? this.destroyGroup : this.leaveGroup;
        /*
         <li onClick={actionMethod}>
         <i className='font smallest'>Q</i>
         <span>{acttionName}</span>
         </li>
         * */
        return (
            <div>
                <i className='webim-operations-icon font xsmaller' onClick={this.update}>M</i>
                <ul className={'webim-operations' + className}>
                    <li onClick={this.inviteMember}>
                        <i className='font smallest'>F</i>
                        <span>{Demo.lan.groupInviteMember}</span>
                    </li>
                    <li onClick={this.changeName}>
                        <i className='font smallest'>B</i>
                        <span>{Demo.lan.groupChangeName}</span>
                    </li>
                    <li onClick={this.destroyGroup}>
                        <i className='font smallest'>Q</i>
                        <span>{Demo.lan.destroyGroup}</span>
                    </li>
                    <li onClick={this.leaveGroup}>
                        <i className='font smallest'>Q</i>
                        <span>{Demo.lan.leaveGroup}</span>
                    </li>
                </ul>
            </div>
        );
    }
});
