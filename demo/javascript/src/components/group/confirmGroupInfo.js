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
        var orgName = Demo.orgName,
            appName = Demo.appName,
            token = Demo.token,
            gid = this.props.gid,
            applicant = this.props.from,
            requestData = {
                "applicant": this.props.from,
                "verifyResult": result,
                "reason": "no clue"
            };
        console.log(orgName, appName, token, gid, applicant, result);
        var options = {
            url: WebIM.config.apiURL + '/' + orgName + '/' + appName
                    + '/' + 'chatgroups' + '/' + gid + '/' + 'apply_verify',
            type: 'POST',
            dataType: "json",
            data: JSON.stringify(requestData),
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            success: function(resp){
                console.log(resp);
            }.bind(this),
            error: function(e){}
        };
        WebIM.utils.ajax(options);
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
        console.log("Message info: ", msgInfo);
        ReactDOM.render(
            <ConfirmGroupInfo {...msgInfo} onClose={this.close}/>,
            dom
        );
    },

    close: function () {
        ReactDOM.unmountComponentAtNode(dom);
    }
};
