import WebIM from "@/config/WebIM"
import "../common/style/webrtc.less"
import { I18n } from "react-redux-i18n"

var React = require("react")
var ReactDOM = require("react-dom")
var Drag = require("./drag")
var Channel = React.createClass({
    getInitialState: function () {
        return {
            collapsed: this.props.collapsed,
            localFullRemoteCorner: this.props.localFullRemoteCorner,
            full_width: 360,
            full_height: 360,
            toggle_right: 0,
            toggle_top: 0,
            toggle_display: "none",
            close_right: 0,
            close_bottom: 0,
            accept_left: 0,
            accept_bottom: 0,
            accept_display: this.props.hideAccept ? "none" : "block",
            mute_left: 0,
            mute_bottom: 6,
            mute_display: "none"
        }
    },

    close: function () {
        //close stream and camera first
        this.props.close()

        try {
            WebIM.call.endCall()
        } catch (e) {
            console.log("endCall error1:", e)
        }


    },

    accept: function () {
        WebIM.call.acceptCall()
    },

    toggle: function () {
        // console.log("toggle", this.local_width, "*", this.local_height, ",", this.remote_width, "*", this.remote_height)
        if (this.state.full_width == this.local_width && this.state.full_height == this.local_height) {
            this.state.full_width = this.remote_width
            this.state.full_height = this.remote_height
        } else {
            this.state.full_width = this.local_width
            this.state.full_height = this.local_height
        }
        this.setState({
            localFullRemoteCorner: !this.state.localFullRemoteCorner,
            full_width: this.props.collapsed ? this.state.full_width / 2 : this.state.full_width,
            full_height: this.props.collapsed ? this.state.full_height / 2 : this.state.full_height
        })
    },

    mute: function () {
        // var mute = this.refs.remoteVideo.mute;
        this.refs.remoteVideo.muted = !this.refs.remoteVideo.muted
        var muted = this.refs.remoteVideo.muted
        if (muted) {
            this.refs.mute.style.color = "#4eb1f4"
        } else {
            this.refs.mute.style.color = "#eeeeee"
        }
    },

    setStream: function (props) {
        this.refs.remoteVideo.srcObject = props.remoteStream
        this.refs.localVideo.srcObject = props.localStream
    },


    componentWillReceiveProps: function (nextProps) {
        // console.log("componentWillReceiveProps", nextProps)
        this.setStream(nextProps)
    },


    componentDidMount: function () {
        // console.log("did mount", this.props)
        new Drag(this.refs.onAcceptCallrtc)
        this.resetButtonPosition()

        var localVideo = this.refs.localVideo
        var remoteVideo = this.refs.remoteVideo


        remoteVideo.addEventListener("canplay", this.canplayRemoteHandler)

        //caution: |this| differ between addEventListener + anonymous function and addEventListener + non-anonymous function
        localVideo.addEventListener("loadedmetadata", this.loadedmetadataLocalHandler)

        remoteVideo.addEventListener("loadedmetadata", this.loadedmetadataRemoteHandler)

        localVideo.addEventListener("resize", this.resizeLocalHandler)

        remoteVideo.addEventListener("resize", this.resizeRemoteHandler)


    },

    componentWillUnmount: function () {
        var localVideo = this.refs.localVideo
        var remoteVideo = this.refs.remoteVideo


        remoteVideo.removeEventListener("canplay", this.canplayRemoteHandler)

        localVideo.removeEventListener("loadedmetadata", this.loadedmetadataLocalHandler)

        remoteVideo.removeEventListener("loadedmetadata", this.loadedmetadataRemoteHandler)

        localVideo.removeEventListener("resize", this.resizeLocalHandler)

        remoteVideo.removeEventListener("resize", this.resizeRemoteHandler)
    },

    canplayRemoteHandler: function () {

        this.setState({
            toggle_display: "block",
            mute_display: "block",
            accept_display: "none"
        })
    },


    loadedmetadataLocalHandler: function () {
        var video = this.refs.localVideo

        this.local_width = video.videoWidth
        this.local_height = video.videoHeight

        if (this.local_width == 0 && this.local_height == 0) {
            this.setState({
                toggle_display: "none",
                localVideo_display: "none"
            })

            return
        }

        this.setState({
            full_width: video.videoWidth,
            full_height: video.videoHeight,
        })
    },


    loadedmetadataRemoteHandler: function () {
        var video = this.refs.remoteVideo

        var hasVideo = this.props.remoteStream.getVideoTracks()[0] && this.props.remoteStream.getVideoTracks()[0].enabled
        var hasAudio = this.props.remoteStream.getAudioTracks()[0].enabled

        if (hasVideo) { //video + voice
            this.remote_width = video.videoWidth
            this.remote_height = video.videoHeight
            this.setState({
                full_width: video.videoWidth,
                full_height: video.videoHeight,
            })
        }
        if (hasAudio && !hasVideo) { //voice only
            this.setState({
                full_width: 360,
                full_height: 90,
            })
            this.setState({
                toggle_display: "none",
                localVideo_display: "none"
            })
        }
    },


    resizeLocalHandler: function () {
        var video = this.refs.localVideo

        if (this.state.localFullRemoteCorner) {
            this.local_width = this.props.collapsed ? video.videoWidth / 2 : video.videoWidth
            this.local_height = this.props.collapsed ? video.videoHeight / 2 : video.videoHeight
            this.setState({
                full_width: this.props.collapsed ? video.videoWidth / 2 : video.videoWidth,
                full_height: this.props.collapsed ? video.videoHeight / 2 : video.videoHeight,
            })
        }
    },

    resizeRemoteHandler: function () {
        var video = this.refs.remoteVideo

        if (!this.state.localFullRemoteCorner) {
            var hasVideo = this.props.remoteStream.getVideoTracks()[0] && this.props.remoteStream.getVideoTracks()[0].enabled
            var hasAudio = this.props.remoteStream.getAudioTracks()[0].enabled

            if (hasVideo) { //video + voice
                this.remote_width = this.props.collapsed ? video.videoWidth / 2 : video.videoWidth
                this.remote_height = this.props.collapsed ? video.videoHeight / 2 : video.videoHeight
                this.setState({
                    full_width: this.props.collapsed ? video.videoWidth / 2 : video.videoWidth,
                    full_height: this.props.collapsed ? video.videoHeight / 2 : video.videoHeight,
                })
            }
            if (hasAudio && !hasVideo) { //voice only
                this.setState({
                    full_width: 330,
                    full_height: 90,
                })
                this.setState({
                    toggle_display: "none",
                    localVideo_display: "none"
                })
            }
        }
    },


    resetButtonPosition: function () {
        this.setState({
            toggle_right: 6,
            toggle_top: 6,
            close_right: 6,
            close_bottom: 6,
            accept_left: 6,
            accept_bottom: 6
        })
    },

    render: function () {
        var localClassName = this.state.localFullRemoteCorner ? "full" : "corner"
        var remoteClassName = this.state.localFullRemoteCorner ? "corner" : "full"
        return (
            <div ref='rtc' className='webim-rtc-video'
                style={{
                    width: this.state.full_width + "px",
                    height: this.state.full_height + "px"
                }}>
                <video ref='localVideo' className={localClassName} muted autoPlay/>
                <video ref='remoteVideo' className={remoteClassName} autoPlay/>
                <span>{this.props.title}</span>
                <i ref='close' id='webrtc_close' className='font small close' style={{
                    left: "auto",
                    right: this.state.close_right + "px",
                    top: "auto",
                    bottom: this.state.close_bottom + "px"
                }} onClick={this.close}>Q</i>
                <i ref='accept' className='font small accept' style={{
                    display: this.state.accept_display,
                    left: this.state.accept_left + "px",
                    right: "auto",
                    top: "auto",
                    bottom: this.state.accept_bottom + "px"
                }} onClick={this.accept}>z</i>
                <i ref='toggle' className='font small toggle'
                    style={{
                        display: this.state.toggle_display,
                        left: "auto",
                        right: this.state.toggle_right + "px",
                        top: this.state.toggle_top + "px",
                        bottom: "auto"
                    }} onClick={this.toggle}>d</i>
                <i ref='mute' className='font small mute'
                    style={{
                        display: this.state.mute_display,
                        left: this.state.toggle_right + "px",
                        right: "auto",
                        top: "auto",
                        bottom: this.state.mute_bottom + "px"
                    }} onClick={this.mute}>m</i>

            </div>
        )
    }
})

export default (dom, collapsed) => {
    this.dom = dom
    var me = this
    return {
        setLocal: function (stream, streamType) {
            this.localStream = stream
            var title = ""
            var hideAccept = false
            var localFullRemoteCorner = false
            if (WebIM.conn.context.userId == WebIM.call.caller) {
                title = I18n.t("waiting") + WebIM.call.callee.split("@")[0].split("_")[1] + (streamType == "VOICE" ? I18n.t("waitingVoice") : I18n.t("waitingVideo") )
                hideAccept = true
            } else {
                title = WebIM.call.callee.split("@")[0].split("_")[1]
            }
            ReactDOM.render(
                <Channel collapsed={collapsed} close={this.close} localStream={this.localStream}
                    remoteStream={this.remoteStream}
                    title={title} hideAccept={hideAccept} localFullRemoteCorner={localFullRemoteCorner}/>,
                me.dom
            )
        },
        setRemote: function (stream, streamType) {
            this.remoteStream = stream
            var title = ""
            var localFullRemoteCorner = false
            if (WebIM.call.caller != "" && WebIM.call.caller == WebIM.conn.context.userId) {
                title = WebIM.call.callee.split("@")[0].split("_")[1]
            } else {
                title = WebIM.call.callee.split("@")[0].split("_")[1] + (streamType == "VOICE" ? I18n.t("requestVoice") : I18n.t("requestVideo"))
            }
            ReactDOM.render(
                <Channel collapsed={collapsed} close={this.close} localStream={this.localStream}
                    remoteStream={this.remoteStream}
                    title={title} localFullRemoteCorner={localFullRemoteCorner}/>,
                me.dom
            )
        },
        ringing: function (caller, streamType) {
            var title = ""
            var localFullRemoteCorner = false
            if (WebIM.call.caller != "" && WebIM.call.caller == WebIM.conn.context.userId) {
                title = WebIM.call.callee.split("@")[0].split("_")[1]
            } else {
                title = WebIM.call.callee.split("@")[0].split("_")[1] + (streamType == "VOICE" ? I18n.t("requestVoice") : I18n.t("requestVideo"))
            }
            ReactDOM.render(
                <Channel collapsed={collapsed} close={this.close}
                    title={title} localFullRemoteCorner={localFullRemoteCorner}/>,
                me.dom
            )
        },
        close: function () {
            var local = this.localStream
            var remote = this.remoteStream

            if (remote) {
                remote.getTracks().forEach(function (track) {
                    track.stop()
                })
            }

            if (local) {
                local.getTracks().forEach(function (track) {
                    track.stop()
                })
            }

            // must set video tag's srcObject as null，otherwise firefox will get in trouble.
            var videoObjs = me.dom.getElementsByTagName("video")
            if (videoObjs && videoObjs.length > 0) {
                for (var i = 0; i < videoObjs.length; i++) {
                    videoObjs[i].srcObject = null
                }
            }

            ReactDOM.unmountComponentAtNode(me.dom)
        }
    }
}
