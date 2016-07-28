var React = require("react");


module.exports = React.createClass({

    render: function () {
        var cur = this.props.cur === this.props.name ?  ' base-color' : '';

        var icon;

        switch ( this.props.name ) {
            case 'group': icon = 'N';break;
            case 'stranger': icon = 'O';break;
            case 'chatroom': icon = 'F';break;
            default: icon = 'E';
        };

        return (
            <div id={this.props.name + 's'} className='rel' onClick={this.props.update}>
                <i className={'webim-' + this.props.name + '-icon font bigfont' + cur}>{icon}</i>
                <i ref='count' count='0' className='webim-msg-prompt webim-msg-icon-prompt' style={{display: 'none'}}></i>
            </div>
        );
    }
});
