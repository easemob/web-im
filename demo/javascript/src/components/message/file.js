var React = require("react");
var ReactDOM = require('react-dom');
var Avatar = require('../common/avatar');


var FileMsg = React.createClass({

    render: function () {
        var icon = this.props.className === 'left' ? 'H' : 'I';

        return (
            <div className={'rel ' + this.props.className}>
                <Avatar src={this.props.src} className={this.props.className} />
                <p className={this.props.className}>{this.props.name} {this.props.time}</p>
                <div className='webim-msg-value'>
                    <span className='webim-msg-icon font'>{icon}</span>
                    <div>
                        <p className='webim-msg-header'>File</p>
                        <div>
                            <span className='webim-msg-header-icon font'>S</span>
                            <span className='webim-msg-name'>{this.props.filename}</span>
                            <a target='_blank' href={this.props.value}>点击下载</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = function ( options, sentByMe ) {
    var props = {
        src: options.avatar || 'demo/images/group_user.png',
        time: options.time || new Date().toLocaleDateString(),
        value: options.value || '',
        name: options.name,
        filename: options.filename || ''
    };

    var node = document.createElement('div');
    node.className = 'webim-msg-container rel';
    options.wrapper.appendChild(node);

    return ReactDOM.render(
		<FileMsg {...props} className={sentByMe ? 'right' : 'left'} />,
	    node	
	);
};
