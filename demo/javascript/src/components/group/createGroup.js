var React = require("react");
var ReactDOM = require('react-dom');

var componentsNode = document.getElementById('components');
var dom = document.createElement('div');
componentsNode.appendChild(dom);

var UI = require('../common/webim-demo');
var Button = UI.Button;
var Input = UI.Input;
var Checkbox = UI.Checkbox;
var Radio = UI.Radio;
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

var CreateGroup = React.createClass({
    getInitialState: function () {
        return {
            selectedOption: 'option1',
            selectedOption2: 'option3',
            colors: []
        }
    },
    onSubmit: function () {
        var value = this.refs.input.refs.input.value;
        var info = this.refs.textarea.value;
        var permission_group = this.state.selectedOption;
        var permission_member = this.state.selectedOption2;
        var friendsSelected = this.refs.friendList.refs.multiSelected.label();
        log(value, info, permission_group, permission_member, friendsSelected);
        if (!value) {
            Notify.error("群组名不能为空");
            return;
        }
        if (WebIM.config.isWindowSDK) {
            //TODO:@lhr 添加群组提交
            WebIM.doQuery('{"type":"createGroup"}',
                function (response) {
                },
                function (code, msg) {
                    Notify.error("onSubmit:" + code);
                });
        } else {
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
    render: function () {
        return (
            <div className='webim-friend-options'>
                <div ref='layer' className='webim-layer'></div>
                <div className='webim-dialog webim-dialog-2'>
                    <h3>{Demo.lan.createGroup}</h3>
                    <div ref='content'>
                        <Input defaultFocus='true' ref='input' placeholder={Demo.lan.groupSubject} />
                        <br/>
                        <textarea ref='textarea' placeholder={Demo.lan.groupDescription}></textarea>
                        <br/>
                        <br/>
                        <div >
                            <label>
                                {Demo.lan.groupPermission}:
                            </label>
                            <label>
                                <input className="radio" type="radio" value="option1" checked={this.state.selectedOption === 'option1'} onChange={this.handleOptionChange} />
                                <span className="radio_span">公有群</span>
                            </label>
                            <label>
                                <input className="radio" type="radio" value="option2" checked={this.state.selectedOption === 'option2'} onChange={this.handleOptionChange} />
                                <span className="radio_span">私有群</span>
                            </label>
                        </div>
                        <div>
                            <label>
                                {Demo.lan.groupMemberPermission}:
                            </label>
                            <label>
                                <input className="radio" type="radio" value="option3" checked={this.state.selectedOption2 === 'option3'} onChange={this.handleOptionChange2} />
                                <span className="radio_span">{this.state.selectedOption === 'option1' ? '审批' : '不允许邀请'}</span>
                            </label>
                            <label>
                                <input className="radio" type="radio" value="option4" checked={this.state.selectedOption2 === 'option4'} onChange={this.handleOptionChange2} />
                                <span className="radio_span">{this.state.selectedOption === 'option1' ? '随便加' : '允许'}</span>
                            </label>
                        </div>
                    </div>
                    <div>
                        <FridendList ref="friendList" optionData={Demo.roster} />
                    </div>
                    <Button text={Demo.lan.add} onClick={this.onSubmit} className='webim-dialog-button' />
                    <span className='font' onClick={this.close}>A</span>
                </div>
            </div>
        );
    }
});

module.exports = {
    show: function () {
        ReactDOM.render(
            <CreateGroup onClose={this.close} />,
            dom
        );
    },

    close: function () {
        ReactDOM.unmountComponentAtNode(dom);
    }
};
