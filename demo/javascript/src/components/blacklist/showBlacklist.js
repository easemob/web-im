var React = require("react");
var ReactDOM = require('react-dom');

var componentsNode = document.getElementById('components');
var dom = document.createElement('div');
componentsNode.appendChild(dom);

var UI = require('../common/webim-demo');
var Button = UI.Button;

var ShowBlacklist = React.createClass({

    // used for blacklist
    onRemoveFromBlackList: function (value) {
        var me = this;
        if (WebIM.config.isWindowSDK) {
            //TODO 取消屏蔽

        } else {
            if (value in Demo.blacklist) {
                delete Demo.blacklist[value];
            }
            Demo.conn.removeFromBlackList({
                // must the whole new blacklist
                list: Demo.blacklist || {},
                success: function () {
                    // TODO  动态更新
                    me.close();
                },
                error: function (e) {
                    Demo.api.NotifyError("ShowBlacklist error:" + e);
                }
            });
        }
    },

    close: function () {
        typeof this.props.onClose === 'function' && this.props.onClose();
    },

    render: function () {

        var items = [];
        for (var i  in Demo.blacklist) {
            var item = Demo.blacklist[i];
            items.push(
                (
                    <li className="webim-blacklist-item" key={i}>
                        {item.name}
                        <i className="webim-leftbar-icon font smaller"
                           onClick={this.onRemoveFromBlackList.bind(this, item.name)}>A</i>
                    </li>
                )
            )
        }
        return (
            <div className='webim-friend-options'>
                <div ref='layer' className='webim-layer'></div>
                <div className='webim-dialog' style={{height: 'auto'}}>
                    <h3>{Demo.lan.ShowBlacklist}</h3>
                    <div ref='content'>
                        <ul className="webim-blacklist-wrapper">
                            {items}
                        </ul>
                    </div>
                    <Button text={Demo.lan.confirm} onClick={this.close} className='webim-dialog-button'/>
                    <span className='font' onClick={this.close}>A</span>
                </div>
            </div>
        );
    }
});

module.exports = {
    show: function () {
        ReactDOM.render(
            <ShowBlacklist onClose={this.close}/>,
            dom
        );
    },

    close: function () {
        ReactDOM.unmountComponentAtNode(dom);
    }
};
