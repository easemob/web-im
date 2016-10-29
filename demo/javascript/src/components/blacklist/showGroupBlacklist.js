var React = require("react");
var ReactDOM = require('react-dom');
var _ = require('underscore');

var componentsNode = document.getElementById('components');
var dom = document.createElement('div');
componentsNode.appendChild(dom);

var UI = require('../common/webim-demo');
var Button = UI.Button;

var ShowGroupBlacklist = React.createClass({

    getInitialState: function () {
        return {
            list: [],
        };
    },

    componentDidMount: function () {
        var me = this;
        Demo.api.blacklist.getGroupBlacklist({
            roomId: this.props.roomId,
            success: function (list) {
                me.setState({
                    list: list
                })
            }
        });
    },

    onRemoveFromGroupBlackList: function (value) {
        var me = this;
        var list = this.state.list;

        Demo.api.blacklist.removeGroupMemberFromBlacklist({
            roomId: this.props.roomId,
            to: value,
            success: function () {
                delete list[value];
                me.setState({
                    list: list
                })
            }
        });
    },

    close: function () {
        typeof this.props.onClose === 'function' && this.props.onClose();
    },

    render: function () {
        var items = [];
        _.each(this.state.list, (item, k) => {
            items.push(
                (
                    <li className="webim-blacklist-item" key={item.name}>
                        {item.name}
                        <i className="webim-leftbar-icon font smaller"
                           onClick={this.onRemoveFromGroupBlackList.bind(this, item.name)}>d</i>
                    </li>
                )
            )
        });

        return (
            <div className='webim-friend-options'>
                <div ref='layer' className='webim-layer'></div>
                <div className='webim-dialog' style={{height: 'auto'}}>
                    <h3>{Demo.lan.showGroupBlacklist}</h3>
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
    show: function (roomId) {
        ReactDOM.render(
            <ShowGroupBlacklist onClose={this.close} roomId={roomId}/>,
            dom
        );
    },

    close: function () {
        ReactDOM.unmountComponentAtNode(dom);
    }
};
