var React = require("react");
var ReactDOM = require('react-dom');
var Avatar = require('../common/avatar');


var FileMsg = React.createClass({

    render: function () {
        var icon = this.props.className === 'left' ? 'H' : 'I';
        var links = [];
        if (WebIM.config.isWindowSDK) {
            var dirPath = this.props.value.replace("file:", "location:");
            links.push(<a target='_blank' href={this.props.value} key='0'>{Demo.lan.openFile}</a>);
            links.push(<a target='_blank' href={dirPath} key='1' className='dir'>{Demo.lan.openDir}</a>);
        } else {
            links.push(<a target='_blank' href={this.props.value}>{Demo.lan.download}</a>);
        }

        return (
            <div className={'rel ' + this.props.className}>
                <Avatar src={this.props.src} className={this.props.className + ' small'}/>
                <p className={this.props.className}>{this.props.name} {this.props.time}</p>
                <div className='webim-msg-value' style={{minWidth: '200px'}}>
                    <span className='webim-msg-icon font'>{icon}</span>
                    <div>
                        <p className='webim-msg-header'>{Demo.lan.file}</p>
                        <div>
                            <span className='webim-msg-header-icon font small'>S</span>
                            <span className='webim-msg-name'>{this.props.filename}</span>
                            {links}
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
        filename: options.filename || ''
    };

    var node = document.createElement('div');
    node.className = 'webim-msg-container rel';
    options.wrapper.appendChild(node);

    Demo.api.scrollIntoView(node);

    return ReactDOM.render(
        <FileMsg {...props} className={sentByMe ? 'right' : 'left'}/>,
        node
    );
};
