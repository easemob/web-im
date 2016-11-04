var Util = require('./utils');
var RTCIQHandler = require('./iq');
var API = require('./api');
var WebRTC = require('./webrtc');
var CommonPattern = require('./p2p');

var RouteTo = API.RouteTo;
var Api = API.Api;
var _logger = Util.logger;


var _Call = {
    api: null,

    connection: null,

    pattern: null,

    listener: {
        onAcceptCall: function (from, options) {

        },
        onRinging: function (caller) {
        },

        onTermCall: function () {

        }
    },

    mediaStreamConstaints: {
        audio: true,
        video: true
    },

    init: function () {
        var self = this;

        if (typeof self.connection === "undefined") {
            throw "Caller need a instance of Easemob.im.Connection"
        }

        self.api = self.api || new Api({
                imConnection: self.connection,

                rtcHandler: new RTCIQHandler({
                    imConnection: self.connection
                })
            });

        self.api.onInitC = function () {
            self._onInitC.apply(self, arguments);
        }
    },

    makeVideoCall: function (callee) {

        var mediaStreamConstaints = {};
        Util.extend(mediaStreamConstaints, this.mediaStreamConstaints);

        this.call(callee, mediaStreamConstaints);
    },

    makeVoiceCall: function (callee) {
        var self = this;

        var mediaStreamConstaints = {};
        Util.extend(mediaStreamConstaints, self.mediaStreamConstaints);
        self.mediaStreamConstaints.video = false;

        self.call(callee, mediaStreamConstaints);
    },

    acceptCall: function () {
        var self = this;
        self.pattern.accept();
    },

    endCall: function (callee) {
        var self = this;
        self.pattern.termCall();
    },

    call: function (callee, mediaStreamConstaints) {
        var self = this;
        this.callee = this.api.jid(callee);

        var rt = new RouteTo({
            rtKey: "",

            success: function (result) {
                _logger.debug("iq to server success", result);
            },
            fail: function (error) {
                _logger.debug("iq to server error", error);
                self.onError(error);
            }
        });

        this.api.reqP2P(rt, mediaStreamConstaints.video ? 1 : 0, mediaStreamConstaints.audio ? 1 : 0, callee, function (from, rtcOptions) {
            self._onGotServerP2PConfig(from, rtcOptions);

            self.pattern.initC(self.mediaStreamConstaints);
        });
    },

    _onInitC: function (from, options, rtkey, tsxId, fromSid) {
        var self = this;

        self.callee = from;
        self._rtcCfg = options.rtcCfg;
        self._WebRTCCfg = options.WebRTC;

        self.sessId = options.sessId;
        self.rtcId = options.rtcId;

        self.switchPattern();
        self.pattern._onInitC(from, options, rtkey, tsxId, fromSid);
    },

    _onGotServerP2PConfig: function (from, rtcOptions) {
        var self = this;

        if (rtcOptions.result == 0) {
            self._p2pConfig = rtcOptions;
            self._rtcCfg = rtcOptions.rtcCfg;
            self._rtcCfg2 = rtcOptions.rtcCfg2;

            self.sessId = rtcOptions.sessId;
            self.rtcId = "Channel_webIM";

            self._rtKey = self._rtkey = rtcOptions.rtKey || rtcOptions.rtkey;
            self._rtFlag = self._rtflag = rtcOptions.rtFlag || rtcOptions.rtflag;

            self._WebRTCCfg = rtcOptions.WebRTC;
            self.admtok = rtcOptions.admtok;
            self.tkt = rtcOptions.tkt;


            self.switchPattern();
        } else {
            //
        }
    },

    switchPattern: function () {
        var self = this;

        (!self._WebRTCCfg) && (self.pattern = new CommonPattern({
            callee: self.callee,

            _p2pConfig: self._p2pConfig,
            _rtcCfg: self._rtcCfg,
            _rtcCfg2: self._rtcCfg2,

            _rtKey: self._rtKey || self._rtkey,
            _rtFlag: self._rtFlag || self._rtflag,

            _sessId: self.sessId,
            _rtcId: self.rtcId,

            webRtc: new WebRTC({
                onGotLocalStream: self.listener.onGotLocalStream,
                onGotRemoteStream: self.listener.onGotRemoteStream,
                onError: self.listener.onError
            }),

            api: self.api,

            onAcceptCall: (self.listener && self.listener.onAcceptCall) || function () {

            },
            onRinging: (self.listener && self.listener.onRinging) || function () {

            },
            onTermCall: (self.listener && self.listener.onTermCall) || function () {

            }
        }));
    }
}


module.exports = function (initConfigs) {
    Util.extend(true, this, _Call, initConfigs || {});

    this.init();
};
