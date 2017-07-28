var React = require("react");
var ReactDOM = require('react-dom');
var _ = require('underscore');

var componentsNode = document.getElementById('components');
var dom = document.createElement('div');
componentsNode.appendChild(dom);

var UI = require('../common/webim-demo');
var Button = UI.Button;
var Input = UI.Input;
var Checkbox = UI.Checkbox;
var Radio = UI.Radio;

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
                    label={Demo.lan.chooseGroupMember}
                    selectedLabel={Demo.lan.selectedLabel}
                />
            </div>
        )
    }
});

var CreateGroup = React.createClass({
    getInitialState: function () {
        return {
            selectedOption: 'option1',
            selectedOption2: 'option3',
            allowInvite: true,
            colors: []
        }
    },
    onSubmit: function () {
        var value = this.refs.input.refs.input.value;
        var info = this.refs.textarea.value;
        var permission_group = this.state.selectedOption;
        var permission_member = this.state.selectedOption2;
        var friendsSelected = [];
        var friendsValues = this.refs.friendList.refs.multiSelected.value();
        var allowInvite = this.state.allowInvite;
        if (!value) {
            Demo.api.NotifyError(Demo.lan.groupNameNotEmpty);
            return;
        }

        _.each(friendsValues, function (v, k) {
            friendsSelected.push(v.text)
        });

        var styles = ["PUBLIC_JOIN_APPROVAL", "PUBLIC_JOIN_OPEN", "PRIVATE_OWNER_INVITE", "PRIVATE_MEMBER_INVITE"];
        var option1 = permission_group == "option1" ? 0 : 1;
        var option2 = permission_member == "option3" ? 0 : 1;
        var style = styles[option1 * 2 + option2];

        if (WebIM.config.isWindowSDK) {
            WebIM.doQuery('{"type":"createGroup","subject":"' + value + '","description":"' + info + '","welcomeMessage":"","style":"' + style + '","maxUserCount":"200","members":' + JSON.stringify(friendsSelected) + '}',
                function (response) {
                    Demo.api.NotifySuccess('createGroup successfully');
                },
                function (code, msg) {
                    Demo.api.NotifyError("onSubmit:" + code);
                });
        } else {
            Demo.createGroupName = value;
            var pub = false;
            if (style == 'PUBLIC_JOIN_OPEN'
                || style == 'PUBLIC_JOIN_APPROVAL')
                pub = true;
            var approval = option2 == 0;
            var options = {
                data: {
                    groupname: value,
                    desc: info,
                    members: friendsSelected,
                    public: pub,
                    approval: approval,
                    allowinvites: allowInvite
                },
                success: function (respData) {

                },
                error: function () {

                }
            };
            Demo.conn.createGroupNew(options);
        }
        this.close();
    },

    close: function () {
        typeof this.props.onClose === 'function' && this.props.onClose();
    },
    handleOptionChange: function (changeEvent) {
        this.setState({
            selectedOption: changeEvent.target.value
        });
    },
    handleOptionChange2: function (changeEvent) {
        this.setState({
            selectedOption2: changeEvent.target.value
        });
    },
    handleInviteChange: function (e) {
        var checked = e.target.checked;
        this.setState({
            allowInvite: checked
        });
    },
    render: function () {
        return (
            <div className='webim-friend-options'>
                <div ref='layer' className='webim-layer'></div>
                <div className='webim-dialog webim-dialog-2'>
                    <h3>{Demo.lan.createGroup}</h3>
                    <div ref='content'>
                        <Input defaultFocus='true' ref='input' placeholder={Demo.lan.groupSubject}/>
                        <br/>
                        <textarea ref='textarea' placeholder={Demo.lan.groupDescription}></textarea>
                        <br/>
                        <br/>
                        <div>
                            <label>
                                {Demo.lan.groupPermission}:
                            </label>
                            <label>
                                <input className="radio" type="radio" value="option1"
                                       checked={this.state.selectedOption === 'option1'}
                                       onChange={this.handleOptionChange}/>
                                <span className="radio_span">公有群</span>
                            </label>
                            <label>
                                <input className="radio" type="radio" value="option2"
                                       checked={this.state.selectedOption === 'option2'}
                                       onChange={this.handleOptionChange}/>
                                <span className="radio_span">私有群</span>
                            </label>
                        </div>
                        <div className={this.state.selectedOption === 'option1' ? '' : 'hide'}>
                            <label>
                                {Demo.lan.groupMemberPermission}:
                            </label>
                            <label>
                                <input className="radio" type="radio" value="option3"
                                       checked={this.state.selectedOption2 === 'option3'}
                                       onChange={this.handleOptionChange2}/>
                                <span
                                    className="radio_span">{this.state.selectedOption === 'option1' ? '审批' : '不允许邀请'}</span>
                            </label>
                            <label>
                                <input className="radio" type="radio" value="option4"
                                       checked={this.state.selectedOption2 === 'option4'}
                                       onChange={this.handleOptionChange2}/>
                                <span
                                    className="radio_span">{this.state.selectedOption === 'option1' ? '随便加' : '允许'}</span>
                            </label>
                        </div>
                        <div className={this.state.selectedOption === 'option1' ? 'hide' : ''}>
                            <label>
                                {Demo.lan.allowInvite}:
                            </label>
                            <label>
                                <input className="checkbox" type="checkbox"
                                       defaultChecked='checked'
                                       onChange={this.handleInviteChange}/>
                            </label>
                        </div>
                    </div>
                    <div>
                        <FridendList ref="friendList" optionData={Demo.roster}/>
                    </div>
                    <Button text={Demo.lan.add} onClick={this.onSubmit} className='webim-dialog-button-left'/>
                    <Button text={Demo.lan.cancel} onClick={this.close} className='webim-dialog-button'/>
                    <span className='font' onClick={this.close}>A</span>
                </div>
            </div>
        );
    }
});

module.exports = {
    show: function () {
        ReactDOM.render(
            <CreateGroup onClose={this.close}/>,
            dom
        );
    },

    close: function () {
        ReactDOM.unmountComponentAtNode(dom);
    }
};
