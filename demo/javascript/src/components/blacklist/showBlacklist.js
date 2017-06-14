var React = require("react");
var ReactDOM = require('react-dom');

var componentsNode = document.getElementById('components');
var dom = document.createElement('div');
componentsNode.appendChild(dom);

var UI = require('../common/webim-demo');
var Button = UI.Button;

var ShowBlacklist = React.createClass({

    getInitialState: function () {
        return {
            change: false,
        }
    },

    // used for blacklist
    onRemoveFromBlackList: function (value) {
        var me = this;
        if (WebIM.config.isWindowSDK) {
            WebIM.doQuery('{"type":"removeFromBlackList", "username": "' + value + '"}',
                function success(str) {
                    Demo.api.blacklist.remove(value);
                    me.setState({change: true});
                    Demo.api.updateRoster();
                },
                function failure(errCode, errMessage) {
                    Demo.api.NotifyError('getRoster:' + errCode);
                });
        } else {
            var list = Demo.api.blacklist.remove(value);
            Demo.conn.removeFromBlackList({
                // must the whole new blacklist
                list: list,
                success: function () {
                    me.setState({change: true});
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
                           onClick={this.onRemoveFromBlackList.bind(this, item.name)}>d</i>
                    </li>
                )
            )
        }
        return (
            <div className='webim-friend-options'>
                <div ref='layer' className='webim-layer'></div>
                <div className='webim-dialog' style={{height: 'auto'}}>
                    <h3>{Demo.lan.ShowBlacklist}</h3>
                    <div ref='content' className="webim-dialog-body">
                        <ul className="webim-blacklist-wrapper">
                            {items}
                        </ul>
                    </div>
                    <div className="webim-dialog-footer">
                        <Button text={Demo.lan.confirm} onClick={this.close} className='webim-dialog-button'/>
                    </div>
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
