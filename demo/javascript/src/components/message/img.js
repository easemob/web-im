var React = require("react");
var ReactDOM = require('react-dom');
var Avatar = require('../common/avatar');


var ImgMsg = React.createClass({
    getInitialState: function () {
        var me = this;
        var options = {};
        options['onUpdateFileUrl' + this.props.id] = function (options) {
            me.updateFileUrl(options);
        };
        Demo.api.listen(options);

        return {
            value: this.props.value
        };
    },
    updateFileUrl: function (options) {
        this.setState({value: options.url});
    },
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
        var imgs = [];
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
        if (WebIM.config.isWindowSDK) {
            if (this.state.value == "") {
                imgs.push(<span key='0'>{Demo.lan.image}{Demo.lan.FileLoading}</span>);
            } else {
                imgs.push(<img key='0' ref='img' className='webim-msg-img' src={this.state.value}
                               onClick={this.show}/>);
            }

        } else {
            imgs.push(<img key='0' ref='img' className='webim-msg-img' src={this.props.value} onClick={this.show}/>);
        }
        return (
            <div className={'rel ' + this.props.className}>
                <Avatar src={this.props.src} className={this.props.className + ' small'}/>
                <p className={this.props.className}>{this.props.name} {this.props.time}</p>
                <div className="clearfix">
                    <div className={"webim-msg-delivered " + statusClass} id={id} name={nid}>
                        {status}
                    </div>
                    <div className='webim-msg-value webim-img-msg-wrapper'>
                        <span className='webim-msg-icon font'>{icon}</span>
                        <div id={'file_' + this.props.id}>{imgs}</div>
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
        id: options.id,
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
        <ImgMsg {...props} className={sentByMe ? 'right' : 'left'}/>,
        node
    );
};
