var React = require("react");
var ReactDOM = require('react-dom');
var Drag = require('./drag');

var Channel = React.createClass({
    getInitialState: function () {
        return {
            local: false,
            remote: true
        };
    },

    close: function () {
        var local = this.props.localStream;
        var remote = this.props.remoteStream;

        if ( remote ) {
            remote.getAudioTracks()[0].stop();
            remote.getVideoTracks()[0].stop();
        }

        if ( local ) {
            local.getAudioTracks()[0].stop();
            local.getVideoTracks()[0].stop();
        }

        try {
            Demo.call.endCall();
        } catch ( e ) {}

        this.props.close();
    },

    toggle: function () {
        if ( this.state.local ) {
            this.setState({local: false, remote: true});
        } else {
            this.setState({local: true, remote: false});
        }
    },

    setStream: function () {
        var me = this;

        me.refs.remoteVideo.srcObject = me.props.remoteStream;
        me.refs.localVideo.srcObject = me.props.localStream;
        
        me.refs.localVideo.oncanplay = function () {
            me.refs.localVideo.play();
        };

        me.refs.remoteVideo.oncanplay = function () {
            me.refs.remoteVideo.play();
        };
    },

    componentDidUpdate: function () {
        this.setStream();
    },

    componentDidMount: function () {
        new Drag(this.refs.rtc);

        this.setStream();
    },

    render: function () {

        var localClassName = this.state.local ? 'webim-rtc-video-full': 'webim-rtc-video-corner';
        var remoteClassName = this.state.remote ? 'webim-rtc-video-full': 'webim-rtc-video-corner';

        return (
            <div ref='rtc' className='webim-rtc-video'>
                <video ref='localVideo' className={localClassName} onClick={this.toggle}/>
                <video ref='remoteVideo' className={remoteClassName} onClick={this.toggle}/>
                <i className='font small' onClick={this.close}>Q</i>
            </div>
        );
    }
});

module.exports = function ( dom ) {
    var me = this;
    me.dom = dom;

    return {
        setLocal: function ( stream) {
            this.localStream = stream;

            ReactDOM.render(
                <Channel close={this.close} localStream={this.localStream} remoteStream={this.remoteStream}/>,
                me.dom 
            ); 
        },
        setRemote: function ( stream ) {
            this.remoteStream = stream;

            ReactDOM.render(
                <Channel close={this.close} localStream={this.localStream} remoteStream={this.remoteStream}/>,
                me.dom 
            ); 
        },
        close: function () {
            var local = this.localStream;
            var remote = this.remoteStream;

            if ( remote ) {
                remote.getAudioTracks()[0].stop();
                remote.getVideoTracks()[0].stop();
            }

            if ( local ) {
                local.getAudioTracks()[0].stop();
                local.getVideoTracks()[0].stop();
            }

            ReactDOM.unmountComponentAtNode(me.dom);
        }
    };
};
