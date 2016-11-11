var React = require("react");
var ReactDOM = require('react-dom');
var Avatar = require('../common/avatar');


var LocMsg = React.createClass({

    render: function () {
        var icon = this.props.className === 'left' ? 'H' : 'I';

        return (
            <div className={'rel ' + this.props.className}>
                <Avatar src={this.props.src} className={this.props.className + ' small'}/>
                <p className={this.props.className}>{this.props.name} {this.props.time}</p>
                <div className='webim-msg-value' style={{minWidth: '200px'}}>
                    <span className='webim-msg-icon font'>{icon}</span>
                    <div>
                        <p className='webim-msg-header'>Location</p>
                        <div>
                            <span className='webim-msg-header-icon font small'>U</span>
                            <span title={this.props.value} style={{lineHeight: '40px'}}
                                  className='webim-msg-name'>{this.props.value}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = function (options, sentByMe) {
    var props = {
        src: options.avatar || 'demo/images/default.png',
        time: options.time || new Date().toLocaleString(),
        value: options.value || '',
        name: options.name,

        error: options.error,
        errorText: options.errorText
    };

    var node = document.createElement('div');
    node.className = 'webim-msg-container rel';
    options.wrapper.appendChild(node);

    Demo.api.scrollIntoView(node);

    return ReactDOM.render(
        <LocMsg {...props} className={sentByMe ? 'right' : 'left'}/>,
        node
    );
};
