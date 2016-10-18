var React = require("react");

module.exports = React.createClass({
    render: function () {
        var msg = (this.props.msg) ? this.props.msg : Demo.lan.loading;
        return (
            <div className={'webim-loading' + (this.props.show === 'show' ? '' : ' hide')}>
                <img src='demo/images/loading.gif'/>
                <span>{msg}</span>
            </div>
        );
    }
});
