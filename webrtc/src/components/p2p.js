/**
 * P2P
 */
var _util = require('./utils');
var RouteTo = require('./api').RouteTo;
var _logger = _util.logger;


var P2PRouteTo = RouteTo({
    success: function (result) {
        _logger.debug("iq to server success", result);
    },
    fail: function (error) {
        _logger.debug("iq to server error", error);
    }
});


var CommonPattern = {
    _pingIntervalId: null,
    _p2pConfig: null,
    _rtcCfg: null,
    _rtcCfg2: null,
    _rtKey: null,
    _rtFlag: null,


    webRtc: null,
    api: null,

    callee: null,


    isCaller: false,
    accepted: false,

    setLocalSDP: false,
    setRemoteSDP: false,

    hangup: false,


    init: function () {
        var self = this;

        self.api.onPing = function () {
            self._onPing.apply(self, arguments);
        };
        self.api.onTcklC = function () {
            self._onTcklC.apply(self, arguments);
        };
        self.api.onAcptC = function () {
            self._onAcptC.apply(self, arguments);
        };
        self.api.onAnsC = function () {
            self._onAnsC.apply(self, arguments);
        };
        self.api.onTermC = function () {
            self._onTermC.apply(self, arguments);
        };
        self.api.onEvJoin = function() {
            self._onEvJoin.apply(self, arguments);
        };
        self.api.onStreamControl = function() {
            self._onStreamControl.apply(self, arguments);
        };
        self.webRtc.onIceCandidate = function () {
            self._onIceCandidate.apply(self, arguments);
        };
        self.webRtc.onIceStateChange = function () {
            self._onIceStateChange.apply(self, arguments);
        };
    },

    _ping: function () {
        var self = this;

        var index = 0;

        function ping() {
            var rt = new P2PRouteTo({
                to: self.callee,
                rtKey: self._rtKey
            });

            self.api.ping(rt, self._sessId, function (from, rtcOptions) {
                _logger.debug("ping result", rtcOptions);

            });
            // self.api.streamControl(rt, self._sessId, "rtcId", (index++) % 4, function (from, rtcOptions) {
            //     _logger.debug("streamControl result", rtcOptions);
            //
            // });
        }

        self._pingIntervalId = window.setInterval(ping, 50000);
    },

    _onPing: function (from, options, rtkey, tsxId, fromSid) {
        _logger.debug('_onPing from', fromSid);
    },

    initC: function (mediaStreamConstaints, accessSid) {
        var self = this;
        self.sid = accessSid;

        self.isCaller = true;
        self.accepted = false;
        self.setLocalSDP = false;
        self.setRemoteSDP = false;
        self.hangup = false;

        self.streamType = mediaStreamConstaints.audio && mediaStreamConstaints.video ? "VIDEO" : "VOICE";

        self.createLocalMedia(mediaStreamConstaints);
    },

    createLocalMedia: function (mediaStreamConstaints) {
        var self = this;

        this.webRtc.createMedia(mediaStreamConstaints, function (webrtc, stream) {
            webrtc.setLocalVideoSrcObject(stream);

            self.webRtc.createRtcPeerConnection(self._rtcCfg);

            self.webRtc.createOffer(function (offer) {
                self._onGotWebRtcOffer(offer);
            });
        });
    },

    _onGotWebRtcOffer: function (offer) {
        var self = this;

        var rt = new P2PRouteTo({
            sid: self.sid,
            to: self.callee,
            rtKey: self._rtKey
        });

        self.api.initC(rt, self.streamType, null, null, self._sessId, self._rtcId, null, null, offer, null, self._rtcCfg2, null, function (from, rtcOptions) {
            _logger.debug("initc result", rtcOptions);
        });

        self.setLocalSDP = true;

        self._ping();
    },

    _onAcptC: function (from, options) {
        var self = this;

        if (options.ans && options.ans == 1) {
            _logger.info("[WebRTC-API] _onAcptC : 104, ans = 1, it is a answer. will onAcceptCall");
            self.onAcceptCall(from, options, options.enableVoice !== false, options.enableVideo !== false);
            self._onAnsC(from, options);
        } else if (!WebIM.WebRTC.supportPRAnswer) {
            _logger.info("[WebRTC-API] _onAcptC : not supported pranswer. drop it. will onAcceptCall");

            self.setRemoteSDP = false;
            self._handRecvCandsOrSend(from, options);

            self.onAcceptCall(from, options, options.enableVoice !== false, options.enableVideo !== false);
        } else {
            _logger.info("[WebRTC-API] _onAcptC : recv pranswer. ");

            if (options.sdp || options.cands) {
                // options.sdp && (options.sdp.type = "pranswer");
                options.sdp && self.webRtc.setRemoteDescription(options.sdp);

                self.setRemoteSDP = true;
                self._handRecvCandsOrSend(from, options);

                self.onAcceptCall(from, options, options.enableVoice !== false, options.enableVideo !== false);
            }
        }
    },

    _onEvJoin: function (from, options, rtkey, tsxId, fromSid) {
        var self = this;

        _logger.debug('_onEvJoin from', fromSid, from);

        self.onAcceptCall(from, options, options.enableVoice !== false, options.enableVideo !== false);
    },

    onAcceptCall: function (from, options, enableVoice, enableVideo) {

    },

    __onVoiceOrVideo: function(from, options, fromSid){
        var self = this;

        options.enableVoice === false ? (self.onOtherUserOpenVoice(from, false)) : (self.onOtherUserOpenVoice(from, true));
        options.enableVideo === false ? (self.onOtherUserOpenVideo(from, false)) : (self.onOtherUserOpenVideo(from, true));
    },

    /*
     * { verison : MSYNC_V1, compress_algorimth : 0, command : SYNC, payload : { meta : { id : 2326, to : easemob-demo#chatdemoui_xyj002@easemob.com, ns : CONFERENCE, payload : { session_id : xyj0011494320598055, operation : MEDIA_REQUEST, peer_name : xyj001, route_flag : 1, route_key : --X--, content : {"op":400,"callVersion":"2.0.0","sessId":"128542826909667328","rtcId":"Channel1494320598056","tsxId":"1494320622866-6","controlType":0}, control_type : PAUSE_VOICE } } } }
     * PAUSE_VOICE(0, 0), RESUME_VOICE(1, 1), PAUSE_VIDEO(2, 2), RESUME_VIDEO(3, 3)
     *
     */
    _onStreamControl: function (from, options, rtkey, tsxId, fromSid){
        var self = this;
        var controlType = options.controlType;

        controlType === 0 && (self.onOtherUserOpenVoice(from, false));
        controlType === 1 && (self.onOtherUserOpenVoice(from, true));
        controlType === 2 && (self.onOtherUserOpenVideo(from, false));
        controlType === 3 && (self.onOtherUserOpenVideo(from, true));

        self.onStreamControl(from, options, rtkey, tsxId, fromSid);
    },
    onStreamControl: function (from, options, rtkey, tsxId, fromSid){

    },

    onOtherUserOpenVoice: function (from, opened){
        _logger.debug("from open:", opened, " voice .", from)
    },
    onOtherUserOpenVideo: function (from, opened){
        _logger.debug("from open:", opened, " voideo .", from)
    },


    _onAnsC: function (from, options) { // answer
        var self = this;

        _logger.info("[WebRTC-API] _onAnsC : recv answer. ");

        self.accepted = true;

        options.sdp && self.webRtc.setRemoteDescription(options.sdp);

        self.setRemoteSDP = true;
        self._handRecvCandsOrSend(from, options);


        self.__onVoiceOrVideo(from, options);
    },


    _onInitC: function (from, options, rtkey, tsxId, fromSid) {
        var self = this;

        self.isCaller = false;
        self.accepted = false;
        self.setLocalSDP = false;
        self.setRemoteSDP = false;
        self.hangup = false;

        self.callee = from;
        self._rtcCfg2 = options.rtcCfg;
        self._rtKey = rtkey;
        self._tsxId = tsxId;
        self._fromSid = fromSid;

        self._rtcId = options.rtcId;
        self._sessId = options.sessId;

        self.streamType = options.streamType;

        self.webRtc.createRtcPeerConnection(self._rtcCfg2);

        options.sdp && _logger.debug(options.sdp.sdp);

        options.sdp && (self.webRtc.setRemoteDescription(options.sdp).then(function () {

            self.setRemoteSDP = true;
            self._handRecvCandsOrSend(from, options);

            /*
             * chrome 版本 大于 50时，可以使用pranswer。
             * 小于50 不支持pranswer，此时处理逻辑是，直接进入振铃状态
             *
             */
            if (WebIM.WebRTC.supportPRAnswer) {
                self.webRtc.createPRAnswer(function (prAnswer) {
                    self._onGotWebRtcPRAnswer(prAnswer);

                    setTimeout(function () { //由于 chrome 在 pranswer时，ice状态只是 checking，并不能像sdk那样 期待 connected 振铃；所以目前改为 发送完pranswer后，直接振铃
                        _logger.info("[WebRTC-API] onRinging : after send pranswer. ", self.callee);
                        self.onRinging(self.callee, self.streamType);
                    }, 500);
                });
            } else {
                setTimeout(function () {
                    _logger.info("[WebRTC-API] onRinging : After iniC, cause by: not supported pranswer. ", self.callee);
                    self.onRinging(self.callee, self.streamType);
                }, 500)
                self._ping();
            }
        }));
    },


    _onGotWebRtcPRAnswer: function (prAnswer) {
        var self = this;

        var rt = new P2PRouteTo({
            //tsxId: self._tsxId,
            to: self.callee,
            rtKey: self._rtKey
        });

        //self.api.acptC(rt, self._sessId, self._rtcId, prAnswer, null, 1);
        self.api.acptC(rt, self._sessId, self._rtcId, prAnswer);

        self.setLocalSDP = true;
        self._handRecvCandsOrSend();

        self._ping();
    },

    onRinging: function (caller, streamType) {
    },

    accept: function () {
        var self = this;

        function createAndSendAnswer() {
            _logger.info("createAndSendAnswer : ...... ");

            self.webRtc.createAnswer(function (answer) {
                var rt = new P2PRouteTo({
                    //tsxId: self._tsxId,
                    to: self.callee,
                    rtKey: self._rtKey
                });

                if (WebIM.WebRTC.supportPRAnswer) {
                    self.api.ansC(rt, self._sessId, self._rtcId, answer);
                } else {
                    self.api.acptC(rt, self._sessId, self._rtcId, answer, null, 1);
                }

                if (!WebIM.WebRTC.supportPRAnswer) {
                    self.setLocalSDP = true;
                }
                self._handRecvCandsOrSend();

                self.accepted = true;
            });
        }

        var constaints = {
            audio: true
        };
        if(self.streamType == "VIDEO"){
            constaints.video = true;
        }

        self.webRtc.createMedia(constaints, function (webrtc, stream) {
            webrtc.setLocalVideoSrcObject(stream);

            createAndSendAnswer();
        });
    },

    _handRecvCandsOrSend: function (from, options) {
        var self = this;

        setTimeout(function () {
            self._onTcklC(from, options);
        }, 50);

        setTimeout(function () {
            self._onIceCandidate();
        }, 50);
    },

    _onTcklC: function (from, options) { // setRemoteSDP，才可以添加 添加 对方 cands
        var self = this;

        // options.sdp && self.webRtc.setRemoteDescription(options.sdp);

        if (self.setRemoteSDP) {
            _logger.info("[WebRTC-API] recv and add cands.");

            self._recvCands && self._recvCands.length > 0 && self.webRtc.addIceCandidate(self._recvCands);
            self._recvCands && self._recvCands.length > 0 && (self._recvCands = []);
            options && options.cands && self.webRtc.addIceCandidate(options.cands);
        } else if (options && options.cands && options.cands.length > 0) {
            for (var i = 0; i < options.cands.length; i++) {
                (self._recvCands || (self._recvCands = [])).push(options.cands[i]);
            }
            _logger.debug("[_onTcklC] temporary memory[recv] ice candidate. util setRemoteSDP = true");
        }
    },

    _onIceStateChange: function (event) {
        var self = this;
        event && _logger.debug("[WebRTC-API] " + self.webRtc.iceConnectionState() + " |||| ice state is " + event.target.iceConnectionState);


        if(event && event.target.iceConnectionState == "closed"){
            self.setLocalSDP = false;
            self.setRemoteSDP = false;
        }

        self.api.onIceConnectionStateChange(self.webRtc.iceConnectionState());
    },

    _onIceCandidate: function (event) { //在本地sdp set 发送完成后，发送 cands
        var self = this;

        if (self.setLocalSDP) {
            function sendIceCandidate(candidate) {
                _logger.debug("send ice candidate...");

                var rt = new P2PRouteTo({
                    to: self.callee,
                    rtKey: self._rtKey
                });

                if (candidate) {
                    self.api.tcklC(rt, self._sessId, self._rtcId, null, candidate);
                }
            }

            if (self._cands && self._cands.length > 0) {

                sendIceCandidate(self._cands);

                self._cands = [];
            }
            event && event.candidate && sendIceCandidate(event.candidate);
        } else {
            event && event.candidate && (self._cands || (self._cands = [])).push(event.candidate);
            _logger.debug("[_onIceCandidate] temporary memory[send] ice candidate. util setLocalSDP = true");
        }
    },


    termCall: function (reason) {
        var self = this;

        self._pingIntervalId && window.clearInterval(self._pingIntervalId);

        var rt = new P2PRouteTo({
            to: self.callee,
            rtKey: self._rtKey
        });

        var sendReason;
        reason || (!self.isCaller && !self.accepted && (sendReason = 'decline')) || (sendReason = 'success');

        self.hangup || self.api.termC(rt, self._sessId, self._rtcId, sendReason);

        self.webRtc.close();

        self.hangup = true;

        self.setLocalSDP = false;
        self.setRemoteSDP = false;

        self.onTermCall(reason);
    },

    /**
     *
     * @param from
     * @param options
     * @param options.reason
     *               "ok"      -> 'HANGUP'     "success" -> 'HANGUP'   "timeout"          -> 'NORESPONSE'
     *               "decline" -> 'REJECT'     "busy"    -> 'BUSY'     "failed-transport" -> 'FAIL'
     * @private
     */
    _onTermC: function (from, options) {
        _logger.debug("[_onTermC] options.reason = " + options.reason);

        var self = this;

        self.hangup = true;

        self.setLocalSDP = false;
        self.setRemoteSDP = false;

        self.termCall(options.reason);

    },

    onTermCall: function () {
        //to be overwrited by call.listener.onTermCall
    }
};

module.exports = function (initConfigs) {
    var self = this;

    _util.extend(true, this, CommonPattern, initConfigs || {});

    self.init();
};

/**
 * TODO: Conference
 */
