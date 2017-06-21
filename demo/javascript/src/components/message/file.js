var React = require("react");
var ReactDOM = require('react-dom');
var Avatar = require('../common/avatar');
var _utils = require('../../../../../sdk/src/utils').utils;

var FileMsg = React.createClass({
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

    download: function () {
        var suc = function (data, xhr) {
            // console.log(data);
        };
        var error = function (res, xhr, msg) {
            // console.log(res)
        };
        var options = {
            url: this.props.value,
            dataType: 'json',
            type: 'GET',
            headers: {'Authorization': 'Bearer ' + Demo.conn.context.accessToken},
            success: suc || _utils.emptyfn,
            error: error || _utils.emptyfn
        };
        _utils.ajax(options);
    },
    render: function () {
        var icon = this.props.className === 'left' ? 'H' : 'I';
        var links = [];
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
                links.push(<a key='0' href="javascript:void(0)">{Demo.lan.FileLoading}</a>);
            } else {
                var dirPath = this.state.value.replace("file:", "location:");
                links.push(<a target='_blank' key='0' href={this.state.value}>{Demo.lan.openFile}</a>);
                links.push(<a target='_blank' key='1' href={dirPath} className='dir'>{Demo.lan.openDir}</a>);
            }

        } else {
            links.push(<a target='_blank' key='0' href={this.props.value}>{Demo.lan.download}</a>);
        }

        return (
            <div className={'rel ' + this.props.className}>
                <Avatar src={this.props.src} className={this.props.className + ' small'}/>
                <p className={this.props.className}>{this.props.name} {this.props.time}</p>
                <div className="clearfix" style={{minWidth: '280px'}}>
                    <div className={"webim-msg-delivered " + statusClass} id={id} name={nid}>
                        {status}
                    </div>
                    <div className='webim-msg-value' style={{minWidth: '200px'}}>
                        <span className='webim-msg-icon font'>{icon}</span>
                        <div>
                            <p className='webim-msg-header'>{Demo.lan.file}</p>
                            <div id={'file_' + this.props.id}>
                                <span className='webim-msg-header-icon font small'>S</span>
                                <span className='webim-msg-name'> {this.props.filename}</span>
                                <span className='webim-msg-fileSize'>{this.props.fileSize}</span>
                                {links}
                            </div>
                        </div>
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
        filename: options.filename || '',
        error: options.error,
        errorText: options.errorText,
        status: options.status || 'Undelivered',
        nid: options.nid || ''
    };

    if(options.fileSize){
        props.fileSize = options.fileSize;
    }

    var node = document.createElement('div');
    node.className = 'webim-msg-container rel';
    options.wrapper.appendChild(node);

    Demo.api.scrollIntoView(node);

    return ReactDOM.render(
        <FileMsg {...props} className={sentByMe ? 'right' : 'left'}/>,
        node
    );
};
