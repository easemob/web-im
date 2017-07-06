var React = require("react");
var ReactDOM = require('react-dom');

var componentsNode = document.getElementById('components');
var dom = document.createElement('div');
componentsNode.appendChild(dom);

var UI = require('../common/webim-demo');
var Button = UI.Button;
var Input = UI.Input;

var ChangeGroupSubject = React.createClass({

    getInitialState: function () {
        return {
            subject: this.props.fields.name || '',
            description: this.props.fields.description || ''
        }
    },

    onSubjectChange: function (e) {
        this.setState({subject: e.target.value});
    },

    onDescriptionChange: function (e) {
        this.setState({description: e.target.value});
    },

    onSubmit: function () {

        var value = this.state.subject;
        if (!value) {
            Demo.api.NotifyError("Group subject couldn't be null.");
            return;
        }

        if (WebIM.config.isWindowSDK) {
            WebIM.doQuery('{"type":"changeGroupSubject", "id":"' + this.props.roomId + '", "subject":"' + this.state.subject + '"}',
                function (response) {
                    var json = eval('(' + str + ')');
                    Demo.api.changeGroupSubjectCallBack(json.id, json.subject);
                },
                function (code, msg) {
                    Demo.api.NotifyError("changeGroupSubject:" + code);
                });

            WebIM.doQuery('{"type":"changeGroupDescription", "id":"' + this.props.roomId + '", "description":"' + this.state.description + '"}',
                function (response) {
                },
                function (code, msg) {
                    Demo.api.NotifyError("changeGroupDescription:" + code);
                });
        } else {
            // Demo.conn.changeGroupSubject({
            //     roomId: this.props.roomId,
            //     subject: this.state.subject,
            //     description: this.state.description,
            //     success: () => {
            //         Demo.api.changeGroupSubjectCallBack(this.props.roomId, value);
            //         typeof this.props.getGroupInfo == 'function' && this.props.getGroupInfo('groupChat');
            //     }
            // });
            var options = {
                groupId: this.props.roomId,
                groupName: this.state.subject,
                description: this.state.description,
                success: () => {
                    Demo.api.changeGroupSubjectCallBack(this.props.roomId, value);
                    typeof this.props.getGroupInfo == 'function' && this.props.getGroupInfo('groupChat');
                }
            };
            console.log(options);
            Demo.conn.modifyGroup(options);
        }
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
                    <h3>{Demo.lan.changeGroupInfo}</h3>
                    <div className="webim-dialog-body">
                        <Input defaultFocus='true' placeholder={Demo.lan.groupSubject}
                               value={this.state.subject} onChange={this.onSubjectChange}/>
                        <Input defaultFocus='false' placeholder={Demo.lan.groupDescription}
                               value={this.state.description} onChange={this.onDescriptionChange}/>
                    </div>
                    <div className="webim-dialog-footer">
                        <Button text={Demo.lan.confirm} onClick={this.onSubmit} className='webim-dialog-button'/>
                    </div>
                    <span className='font' onClick={this.close}>A</span>
                </div>
            </div>
        );
    }
});

module.exports = {
    show: function (roomId, fields, getGroupInfo) {
        ReactDOM.render(
            <ChangeGroupSubject onClose={this.close} roomId={roomId} fields={fields} getGroupInfo={getGroupInfo}/>,
            dom
        );
    },

    close: function () {
        ReactDOM.unmountComponentAtNode(dom);
    }
};
