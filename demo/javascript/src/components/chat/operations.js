var React = require("react");
//var AddFriend = require("./addFriend");
//var DelFriend = require("./delFriend");
//var AddGroup = require("./addGroup");

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

    groupAddMember: function () {
        log('groupAddMember');
        //DelFriend.show();
    },

    groupChangeName: function () {
        log('groupChangeName');
        //Demo.api.logout();
    },

    cancel: function () {
        log('cancel');
        //AddGroup.show();
    },

    render: function () {
        var className = this.state.hide ? ' ' + this.state.hide : '';
        var cancelName = (this.props.admin == 1) ? Demo.lan.groupDismiss : Demo.lan.groupQuit;
        return (
            <div>
                <i className='webim-operations-icon font xsmaller' onClick={this.update}>M</i>
                <ul className={'webim-operations' + className}>
                    <li onClick={this.groupAddMember}>
                        <i className='font smallest'>F</i>
                        <span>{Demo.lan.groupAddMember}</span>
                    </li>
                    <li onClick={this.groupChangeName}>
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
