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

    consult: false,


    init: function () {
        var self = this;

        self.api.onTcklC = function () {
            self._onTcklC.apply(self, arguments);
        }
        self.api.onAcptC = function () {
            self._onAcptC.apply(self, arguments);
        }
        self.api.onAnsC = function () {
            self._onAnsC.apply(self, arguments);
        }
        self.api.onTermC = function () {
            self._onTermC.apply(self, arguments);
        }

        self.webRtc.onIceCandidate = function () {
            self._onIceCandidate.apply(self, arguments);
        }
        self.webRtc.onIceStateChange = function () {
            self._onIceStateChange.apply(self, arguments);
        }
    },

    _ping: function () {
        var self = this;

        function ping() {
            var rt = new P2PRouteTo({
                to: self.callee,
                rtKey: self._rtKey
            });

            self.api.ping(rt, self._sessId, function (from, rtcOptions) {
                _logger.debug("ping result", rtcOptions);
            });
        }

        self._pingIntervalId = window.setInterval(ping, 59000);
    },

    initC: function (mediaStreamConstaints) {
        var self = this;

        self.createLocalMedia(mediaStreamConstaints);
    },

    createLocalMedia: function (mediaStreamConstaints) {
        var self = this;

        self.consult = false;

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
            to: self.callee,
            rtKey: self._rtKey
        });

        self.api.initC(rt, null, null, self._sessId, self._rtcId, null, null, offer, null, self._rtcCfg2, null, function (from, rtcOptions) {
            _logger.debug("initc result", rtcOptions);
        });

        self._ping();
    },

    _onAcptC: function (from, options) {
        var self = this;

        _logger.info("_onAcptC : recv pranswer. ");

        if (options.sdp || options.cands) {
            // options.sdp && (options.sdp.type = "pranswer");
            options.sdp && self.webRtc.setRemoteDescription(options.sdp);
            options.cands && self._onTcklC(from, options);

            self._onHandShake(from, options);

            self.onAcceptCall(from, options);
        }
    },

    onAcceptCall: function (from, options) {

    },

    _onAnsC: function (from, options) { // answer
        var self = this;

        _logger.info("_onAnsC : recv answer. ");

        options.sdp && self.webRtc.setRemoteDescription(options.sdp);
    },


    _onInitC: function (from, options, rtkey, tsxId, fromSid) {
        var self = this;

        self.consult = false;

        self.callee = from;
        self._rtcCfg2 = options.rtcCfg;
        self._rtKey = rtkey;
        self._tsxId = tsxId;
        self._fromSid = fromSid;

        self._rtcId = options.rtcId;
        self._sessId = options.sessId;

        self.webRtc.createRtcPeerConnection(self._rtcCfg2);
        options.sdp && self.webRtc.setRemoteDescription(options.sdp);
        options.cands && self._onTcklC(from, options);

        self.webRtc.createPRAnswer(function (prAnswer) {
            self._onGotWebRtcPRAnswer(prAnswer);
        });
    },


    _onGotWebRtcPRAnswer: function (prAnswer) {
        var self = this;

        var rt = new P2PRouteTo({
            tsxId: self._tsxId,
            to: self.callee,
            rtKey: self._rtKey
        });


        self._onHandShake();

        self.api.acptC(rt, self._sessId, self._rtcId, prAnswer, null, 1);

        self._ping();

        setTimeout(function () {
            self.onRinging(self.callee);
        }, 2000);
    },

    onRinging: function (caller) {
    },

    accept: function () {
        var self = this;

        function createAndSendAnswer() {
            _logger.info("createAndSendAnswer : ...... ");

            self.webRtc.createAnswer(function (desc) {
                var rt = new P2PRouteTo({
                    tsxId: self._tsxId,
                    to: self.callee,
                    rtKey: self._rtKey
                });

                self.api.ansC(rt, self._sessId, self._rtcId, desc, null);
            });
        }

        self.webRtc.createMedia(function (webrtc, stream) {
            webrtc.setLocalVideoSrcObject(stream);

            createAndSendAnswer();
        });
    },

    _onHandShake: function (from, options) {
        var self = this;

        self.consult = true;
        _logger.info("hand shake over. may switch cands.");


        setTimeout(function () {
            self._onTcklC(from, options);
        }, 100);

        setTimeout(function () {
            self._onIceCandidate();
        }, 100);
    },

    _onTcklC: function (from, options) { // offer
        var self = this;

        // options.sdp && self.webRtc.setRemoteDescription(options.sdp);

        if (self.consult) {
            _logger.info("recv and add cands.");

            self._recvCands && self._recvCands.length > 0 && self.webRtc.addIceCandidate(self._recvCands);
            options && options.cands && self.webRtc.addIceCandidate(options.cands);
        } else if (options && options.cands && options.cands.length > 0) {
            for (var i = 0; i < options.cands.length; i++) {
                (self._recvCands || (self._recvCands = [])).push(options.cands[i]);
            }
            _logger.debug("[_onTcklC] temporary memory[recv] ice candidate. util consult = true");
        }
    },

    _onIceStateChange: function (event) {
        var self = this;

        event && _logger.debug(self.webRtc.iceConnectionState() + " |||| ice state is " + event.target.iceConnectionState);
    },

    _onIceCandidate: function (event) {
        var self = this;

        if (self.consult) {
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
            _logger.debug("[_onIceCandidate] temporary memory[send] ice candidate. util consult = true");
        }
    },


    termCall: function () {
        var self = this;

        self._pingIntervalId && window.clearInterval(self._pingIntervalId);

        var rt = new P2PRouteTo({
            to: self.callee,
            rtKey: self._rtKey
        });

        self.hangup || self.api.termC(rt, self._sessId, self._rtcId);

        self.webRtc.close();

        self.hangup = true;

        self.onTermCall();
    },

    _onTermC: function () {
        var self = this;

        self.hangup = true;
        self.termCall();
    },

    onTermCall: function () {

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
