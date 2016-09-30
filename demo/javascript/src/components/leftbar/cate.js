var React = require("react");


module.exports = React.createClass({

    render: function () {
        var cur = this.props.cur === this.props.name ? ' selected' : '';
        var topClass = '';

        var icon,
            describe = '';

        switch (this.props.name) {
            case 'group':
                icon = 'N';
                describe = Demo.lan.groups;
                break;
            case 'stranger':
                icon = 'O';
                describe = Demo.lan.strangers;
                break;
            case 'chatroom':
                icon = 'F';
                describe = Demo.lan.chatrooms;
                break;
            default:
                icon = 'E';
                topClass = ' top50';
                describe = Demo.lan.friends;
                break;
        }

        return (
            <div id={this.props.name + 's'} className={'rel' + topClass} onClick={this.props.update}>
                <i title={describe} className={'webim-leftbar-icon font small' + cur}>{icon}</i>
                <i className='webim-msg-prompt webim-msg-icon-prompt' style={{display: 'none'}}></i>
            </div>
        );
    }
});
