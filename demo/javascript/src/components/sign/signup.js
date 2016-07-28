var React = require("react");
var Notify = require('../common/notify');
var UI = require('../common/webim-demo');

var Input = UI.Input;
var Button = UI.Button;

module.exports = React.createClass({

    getInitialState: function () {
        return {
            username: '',
            pwd: '',
            nickname: ''
        };
    },

    getUser: function ( value ) {
        this.setState({username: value});
    },

    getPwd: function ( value ) {
        this.setState({pwd: value});
    },

    getNickname: function ( value ) {
        this.setState({nickname : value});
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

        if ( !this.state.username || !this.state.pwd || !this.state.nickname ) {
            Notify.error('empty');
            return false;
        }

        var options = {
            username : (this.state.username + '').toLowerCase(),
            password : this.state.pwd,
            nickname : this.state.nickname,
            appKey : this.props.config.appkey,
            success : function () {
                Notify.success('注册成功!');
                setTimeout(function () {
                    me.props.update({
                        signIn: true,
                        signUp: false,
                        chat: false
                    });
                }, 1000);
            },
            error : function ( e ) {
                Nootify(e);
            },
            apiUrl : this.props.config.apiURL
        };
        WebIM.utils.registerUser(options);
    },

    render: function () {
        return (
            <div className={this.props.show ? 'webim-sign' : 'webim-sign hide'}>
                <h2>Sign Up</h2>
                <Input placeholder='Email' defaultFocus='true' change={this.getUser} />
                <Input placeholder='Password' change={this.getPwd} />
                <Input placeholder='Nickname' change={this.getNickname} />
                <Button text='Sign up' click={this.signup} />
                <p>i have account, <i onClick={this.signin}>sign in</i></p>
            </div>
        );
    }
});
