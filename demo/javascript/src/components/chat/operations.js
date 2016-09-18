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

    cancel: function () {
        log('cancel');
        //TODO:发送退出群组指令
        this.update();
    },

    render: function () {
        var className = this.state.hide ? ' ' + this.state.hide : '';
        var cancelName = (this.props.admin == 1) ? Demo.lan.groupDismiss : Demo.lan.groupQuit;
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
                    <li onClick={this.cancel}>
                        <i className='font smallest'>Q</i>
                        <span>{cancelName}</span>
                    </li>
                </ul>
            </div>
        );
    }
});
