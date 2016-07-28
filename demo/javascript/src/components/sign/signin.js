var React = require("react");
var Notify = require('../common/notify');
var UI = require('../common/webim-demo');

var Input = UI.Input;
var Button = UI.Button;
var Checkbox = UI.Checkbox;

module.exports = React.createClass({

    getInitialState: function () {
        return {
            username: '',
            auth: '',
            type: ''
        };
    },

    getUser: function ( value ) {
        this.setState({username: value});
    },

    getAuth: function ( value ) {
        this.setState({auth: value});
    },

    getAuthType: function ( value ) {
        this.setState({type: value ? 'token' : 'pwd'});
    },

    keyDown: function ( e ) {
        if ( e && e.keyCode === 13 ) {
            this.signin();
        }
    },

    signin: function () {
        if ( !this.state.username || !this.state.auth ) {
            Notify.error('empty');
            return false;
        }

        var options = {
            apiUrl : this.props.config.apiURL,
            user : (this.state.username + '').toLowerCase(),
            accessToken : this.state.auth,
            pwd : this.state.auth,
            appKey : this.props.config.appkey
        };

        if ( this.state.type !== 'token' ) {
            delete options.accessToken;
        }
        Demo.user = this.state.username;

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
                <h2>Sign In</h2>
                <Input placeholder='Username' defaultFocus='true' ref='email' change={this.getUser} keydown={this.keyDown} />
                <Input placeholder='Password' ref='auth' type='password' change={this.getAuth} keydown={this.keyDown} />
                <Checkbox text='use token signin' ref='token' change={this.getAuthType} />
                <Button text='Sign in' click={this.signin} />
                <p>no account, <i onClick={this.signup}>sign up now</i></p>
            </div>
        );
    }
});
