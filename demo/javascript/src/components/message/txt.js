var React = require("react");
var ReactDOM = require('react-dom');
var Avatar = require('../common/avatar');


var TextMsg = React.createClass({

    render: function () {
        var icon = this.props.className === 'left' ? 'H' : 'I';
        var statusClass = this.props.className == 'left'
            || Demo.selectedCate !== 'friends'
            || !WebIM.config.msgStatus ? 'hide' : '';
        var id = this.props.id;
        var status = this.props.status;
        var nid = this.props.nid;
        switch(status){
            case 'Undelivered':
                status = '未送达';
                break;
            case 'Delivered':
                status = '已送达';
                break;
            case 'Read':
                status = '已读';
            default:

        }

        return (
            <div className={'rel ' + this.props.className}>
                <Avatar src={this.props.src} className={this.props.className + ' small'}/>
                <p className={this.props.className}>{this.props.name} {this.props.time}</p>
                <div className="clearfix">
                    <div className={"webim-msg-delivered " + statusClass} id={id} name={nid}>
                        {status}
                    </div>
                    <div className='webim-msg-value'>
                        <span className='webim-msg-icon font'>{icon}</span>
                        <pre dangerouslySetInnerHTML={{__html: this.props.value}}></pre>
                    </div>
                    <div className={"webim-msg-error " + (this.props.error ? ' ' : 'hide')}>
                        <span className='webim-file-icon font smaller red' title={this.props.errorText}>k</span>
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
        errorText: options.errorText,
        id: options.id || '',
        status: options.status || 'Undelivered',
        nid: options.nid || ''
    };

    var node = document.createElement('div');
    node.className = 'webim-msg-container rel';
    options.wrapper.appendChild(node);

    Demo.api.scrollIntoView(node);

    return ReactDOM.render(
        <TextMsg {...props} className={sentByMe ? 'right' : 'left'}/>,
        node
    );
};
