var React = require("react");
var Notify = require('../common/notify');
var UI = require('../common/webim-demo');

var Input = UI.Input;
var Button = UI.Button;
var Checkbox = UI.Checkbox;

module.exports = React.createClass({

    keyDown: function ( e ) {
        if ( e && e.keyCode === 13 ) {
            this.signin();
        }
    },

    signin: function () {
        var username = this.refs.name.refs.input.value;
        var auth = this.refs.auth.refs.input.value;
        var type = this.refs.token.refs.input.checked;

        if ( !username || !auth ) {
            Notify.error(Demo.lan.notEmpty);
            return false;
        }

        var options = {
            apiUrl : this.props.config.apiURL,
            user : username.toLowerCase(),
            accessToken : auth,
            pwd : auth,
            appKey : this.props.config.appkey
        };

        if ( !type ) {
            delete options.accessToken;
        }
        Demo.user = username;

        this.props.loading('show');
        Demo.conn.open(options);
        
    },

    signup: function () {
        this.props.update({
            signIn: false,
            signUp: true,
            chat: false
        });
    },

    render: function () {

        return (
            <div className={this.props.show ? 'webim-sign' : 'webim-sign hide'}>
                <h2>{Demo.lan.signIn}</h2>
                <Input placeholder={Demo.lan.username} defaultFocus='true' ref='name' keydown={this.keyDown} />
                <Input placeholder={Demo.lan.password} ref='auth' type='password' keydown={this.keyDown} />
                <Checkbox text={Demo.lan.tokenSignin} ref='token' />
                <Button text={Demo.lan.signIn} onClick={this.signin} />
                <p>{Demo.lan.noaccount}, <i onClick={this.signup}>{Demo.lan.signupnow}</i></p>
            </div>
        );
    }
});
