var React = require("react");
var ReactDOM = require('react-dom');

var componentsNode = document.getElementById('components');
var dom = document.createElement('div');
componentsNode.appendChild(dom);

var UI = require('../common/webim-demo');
var Button = UI.Button;

var ConfirmGroupInfo = React.createClass({

    getInitialState: function () {
        return {
            toNick: '',
            groupName: '',
            reason: ''
        }
    },

    onRefuse: function (e) {
        this.verify(false);
    },

    onAgree: function () {
        this.verify(true);
    },

    verify: function(result){
        var applicant = this.props.from,
            groupId = this.props.gid;
        if(WebIM.config.isWindowSDK){
            //TODO:isWindowSDK
        }else{
            var options = {
                applicant: applicant,
                groupId: groupId,
                success: function(resp){
                    console.log(resp);
                }.bind(this),
                error: function(e){}
            };
            if(result)
                Demo.conn.agreeJoinGroup(options);
            else
                Demo.conn.rejectJoinGroup(options);
            this.close();
        }
    },

    close: function () {
        typeof this.props.onClose === 'function' && this.props.onClose();
    },

    render: function () {
        return (
            <div className='webim-friend-options'>
                <div ref='layer' className='webim-layer'></div>
                <div className='webim-dialog'>
                    <h3>{Demo.lan.groupNotification}</h3>
                    <div className="webim-dialog-body">
                        {this.props.from + " applys to join into group:" + this.props.toNick }
                        <p>{this.props.reason}</p>
                    </div>
                    <div className="webim-dialog-footer">
                        <Button text={Demo.lan.reject} onClick={this.onRefuse} className='webim-dialog-button'/>
                        <Button text={Demo.lan.agree} onClick={this.onAgree} className='webim-dialog-button'/>
                    </div>
                    <span className='font' onClick={this.close}>A</span>
                </div>
            </div>
        );
    }
});

module.exports = {
    show: function (msgInfo) {
        ReactDOM.render(
            <ConfirmGroupInfo {...msgInfo} onClose={this.close}/>,
            dom
        );
    },

    close: function () {
        ReactDOM.unmountComponentAtNode(dom);
    }
};
