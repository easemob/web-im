
var React = require("react");


module.exports = React.createClass({

    // getInitialState: function () {
    //     var name = this.props.name + 's';
    //     var count = Demo.chatState[name].count;
    //     count = Math.max(0, count);
    //     var display = count == 0 ? 'none' : 'block';
    //     return {
    //         count: count,
    //         display: display
    //     };
    // },

    update: function () {
        var dom = this.refs.icon;
        var count = dom.getAttribute('data-count');
        if(count == 0){
            dom.style.display = 'none';
        }
        this.props.update();
    },

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
            <div id={this.props.name + 's'} className={'rel' + topClass} onClick={this.update}>
                <i title={describe} className={'webim-leftbar-icon font small' + cur}>{icon}</i>
                <i ref='icon' className='webim-msg-prompt webim-msg-icon-prompt'
                    data-count='0'
                    style={{display: 'none'}}></i>
            </div>
        );
    }
});
