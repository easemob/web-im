var React = require("react");
var Notify = require('../common/notify');
var UI = require('../common/webim-demo');

var Input = UI.Input;
var Button = UI.Button;
var submiting = false;

module.exports = React.createClass({
    keyDown: function ( e ) {
        if ( e && e.keyCode === 13 ) {
            this.signup();
        }
    },

    signin: function () {
        this.props.update({
            signIn: true,
            signUp: false,
            chat: false
        });
    },

    signup: function () {
        var me = this;

        if ( submiting ) { return false; }

        var username = this.refs.name.refs.input.value;
        var pwd = this.refs.auth.refs.input.value;
        var nickname = this.refs.nickname.refs.input.value;

        if ( !username || !pwd || !nickname ) {
            Notify.error(Demo.lan.notEmpty);
            return false;
        }

        submiting = true;
        var options = {
            username: username.toLowerCase(),
            password: pwd,
            nickname: nickname,
            appKey: this.props.config.appkey,
            success: function () {
                submiting = false;
                Notify.success(Demo.lan.signUpSuccessfully);
                setTimeout(function () {
                    me.props.update({
                        signIn: true,
                        signUp: false,
                        chat: false
                    });
                }, 1000);
            },
            error: function ( e ) {
                submiting = false;
                Notify.error(e.data);
            },
            apiUrl: this.props.config.apiURL
        };
        WebIM.utils.registerUser(options);
    },

    render: function () {
        return (
            <div className={this.props.show ? 'webim-sign webim-signup' : 'webim-sign webim-signup hide'}>
                <h2>{Demo.lan.signUp}</h2>
                <Input ref='name' placeholder={Demo.lan.username} defaultFocus='true' keydown={this.keyDown} />
                <Input ref='auth' placeholder={Demo.lan.password} type='password' keydown={this.keyDown} />
                <Input ref='nickname' placeholder={Demo.lan.nickname} keydown={this.keyDown} />
                <Button text={Demo.lan.signUp} onClick={this.signup} />
                <p>{Demo.lan.haveaccount}, <i onClick={this.signin}>{Demo.lan.signIn}</i></p>
            </div>
        );
    }
});
