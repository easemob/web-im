var React = require("react");


module.exports = React.createClass({

    getInitialState: function () {
        var me = this;

        return null;
    },


    render: function () {
        var src = this.props.src || 'demo/images/default.png';

        var className = this.props.className ? ' ' + this.props.className : '';
        return (
            <div className={'webim-avatar-icon' + className}>
                <img className='w100' src={src} title={this.props.title} />
            </div>
        );
    }
});
