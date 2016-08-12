var React = require("react");
var ReactDOM = require('react-dom');
var Avatar = require('../common/avatar');


var ImgMsg = React.createClass({

    show: function () {
        var dom = document.createElement('div');
        dom.className = 'webim-img-expand';
        dom.onclick = function () {
            this.parentNode.removeChild(this);
        };
        dom.innerHTML = '<img src="' + this.refs.img.getAttribute('src') + '" />';
        document.body.appendChild(dom);
    },

    render: function () {
        var icon = this.props.className === 'left' ? 'H' : 'I';

        return (
            <div className={'rel ' + this.props.className}>
                <Avatar src={this.props.src} className={this.props.className + ' small'} />
                <p className={this.props.className}>{this.props.name} {this.props.time}</p>
                <div className='webim-msg-value webim-img-msg-wrapper'>
                    <span className='webim-msg-icon font'>{icon}</span>
                    <div><img ref='img' className='webim-msg-img' src={this.props.value} onClick={this.show} /></div>
                </div>
            </div>
        );
    }
});

module.exports = function ( options, sentByMe ) {
    var props = {
        src: options.avatar || 'demo/images/default.png',
        time: options.time || new Date().toLocaleString(),
        value: options.value || '',
        name: options.name
    };

    var node = document.createElement('div');
    node.className = 'webim-msg-container rel';
    options.wrapper.appendChild(node);

    Demo.api.scrollIntoView(node);

    return ReactDOM.render(
		<ImgMsg {...props} className={sentByMe ? 'right' : 'left'} />,
	    node	
	);
};
