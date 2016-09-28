var React = require("react");
var ReactDOM = require('react-dom');

var componentsNode = document.getElementById('components');
var dom = document.createElement('div');
componentsNode.appendChild(dom);

var UI = require('../common/webim-demo');
var Button = UI.Button;
var Input = UI.Input;
var Notify = require('../common/notify');

import MultipleSelectBoxList  from '../common/multiSelectBoxList';

var FridendList = React.createClass({

    getInitialState: function () {
        var options = [];
        var id = 0;
        for (var name  in this.props.optionData) {
            options.push({"id": id++, "text": name});
        }
        return {
            options: options,
            value: []
        };
    },
    render: function () {
        return (
            <div className="container">
                <MultipleSelectBoxList
                    ref="multiSelected"
                    options={this.state.options}
                    value={this.state.value}
                    nameText={Demo.lan.groupMemberLabel}
                    label={Demo.lan.addGroupMember}
                    selectedLabel={Demo.lan.selectedLabel}
                />
            </div>
        )
    }
});

var AddGroupMembers = React.createClass({

    onSubmit: function () {

        var value = this.refs.friendList.refs.multiSelected.label();

        if (!value) {
            return;
        }
        log("AddGroupMembers:", value, this.props.roomId);
        if (WebIM.config.isWindowSDK) {
            var friendsSelected = '["' + value.replace(/, /g, '","') + '"]';

            WebIM.doQuery('{"type":"addGroupMembers","welcomeMessage":"","id":"' + this.props.roomId + '","members":' + friendsSelected + '}', function (response) {
            }, function (code, msg) {
                Notify.error("onSubmit:code:" + code+" " + msg);
            });

        } else {}
        this.close();
    },

    close: function () {
        typeof this.props.onClose === 'function' && this.props.onClose();
    },

    render: function () {

        return (
            <div className='webim-friend-options'>
                <div ref='layer' className='webim-layer'></div>
                <div className='webim-dialog'>
                    <h3>{Demo.lan.addGroupMembers}</h3>
                    <div>
                        <FridendList ref="friendList" optionData={Demo.roster}/>
                    </div>
                    <Button text={Demo.lan.confirm} onClick={this.onSubmit} className='webim-dialog-button'/>
                    <span className='font' onClick={this.close}>A</span>
                </div>
            </div>
        );
    }
});

module.exports = {
    show: function (roomId) {
        ReactDOM.render(
            <AddGroupMembers onClose={this.close} roomId={roomId}/>,
            dom
        );
    },

    close: function () {
        ReactDOM.unmountComponentAtNode(dom);
    }
};
