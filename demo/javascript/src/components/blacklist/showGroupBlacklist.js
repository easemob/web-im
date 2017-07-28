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
            groupId: this.props.roomId,
            success: function (list) {
                me.setState({
                    list: list
                })
            }
        });
    },

    onRemoveFromGroupBlackList: function (value) {
        var list = this.state.list;

        if (WebIM.config.isWindowSDK) {
            //TODO:isWindowSDK
        } else {
            var options = {
                groupId: Demo.selected,
                username: value,
                success: function () {
                    for(var i in list){
                        if(list[i] == value){
                            delete list[i];
                        }
                    }
                    this.setState({list: list});
                }.bind(this)
            };
            Demo.conn.removeGroupBlockSingle(options);
        }

        // value = ['zzf2', 'zzf3'];
        // var options = {
        //     groupId: Demo.selected,
        //     username: value,
        //     success: function(){
        //         delete list[value];
        //         this.setState({list: list});
        //     }.bind(this)
        // };
        // Demo.conn.removeGroupBlockMulti(options);
    },

    close: function () {
        typeof this.props.onClose === 'function' && this.props.onClose();
    },

    render: function () {
        var items = [];
        _.each(this.state.list, (item, k) => {
            if(item){
                items.push(
                    (
                        <li className="webim-blacklist-item" key={item}>
                            {item}
                            <i className="webim-leftbar-icon font smaller"
                               onClick={this.onRemoveFromGroupBlackList.bind(this, item)}>d</i>
                        </li>
                    )
                )
            }
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
