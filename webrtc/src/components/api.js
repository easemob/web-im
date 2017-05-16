/**
 * API
 */
var _util = require('./utils');
var _logger = _util.logger;


var _RouteTo = {
    // to : null,
    // rtKey: null,
    rtFlag: 1,

    success: function (result) {

    },
    fail: function (error) {

    }
};

var RouteTo = function (extendCfg) {
    if (this instanceof RouteTo) {
        var self = this;
        _util.extend(true, self, _RouteTo, extendCfg || {});

    } else {
        var sub = function (extendCfg) {
            var self = this;
            _util.extend(true, self, extendCfg || {});
        };

        _util.extend(true, sub.prototype, _RouteTo, extendCfg || {});

        return sub;
    }
};
exports.RouteTo = RouteTo;


var _clazz = {
    imConnection: null,
    // webRtc: null,

    rtcHandler: null,

    events: {
        '0': 'onReqP2P',
        '1': 'onNewCfr',
        '2': 'onDelCfr',
        '3': 'onReqTkt',

        '100': 'onPing',
        '101': 'onPong',
        '102': 'onInitC',
        '103': 'onReqC',
        '104': 'onAcptC',
        '105': 'onTcklC',
        '106': 'onAnsC',
        '107': 'onTermC',

        // '200' : 'onEnter',
        // '201' : 'onExit',
        // '202' : 'onInvite',
        // '203' : 'onGetMems',

        // '205' : 'onSubC',
        // '206' : 'onUsubC',

        '300': 'onEvEnter',
        '301': 'onEvExit',
        '302': 'onEvPub',
        '303': 'onEvUnpub',
        '304': 'onEvMems',
        '204': 'onEvClose',
        '400': 'onStreamControl',
        '401': 'onEvJoin',

        'onServerError': 'onServerError'
    },

    register: function (listener) {
        if (typeof listener === "object") {
            for (var event in listener) {
                this.bind(event, listener[event]);
            }
        }
    },

    bind: function (event, func) {
        var self = this;

        var onFunc;
        if ((onFunc = self.events[event])) {
            self[onFunc] = func;
        } else {
            onFunc = self.events[event] = 'on_' + event;
            self[onFunc] = func;
        }
    },

    jid: function (shortUserName) {
        if(/^.+#.+_.+@.+$/g.test(shortUserName)){
            return shortUserName;
        }
        // if (shortUserName.indexOf(this.imConnection.context.appKey) >= 0) {
        //     return shortUserName;
        // }
        return this.imConnection.context.appKey + "_" + shortUserName + "@" + this.imConnection.domain;
    },

    /**
     * ReqP2P 0
     *
     * @param rt
     *            {to: , rtKey: , rtflag: , success(result), fail(error)}
     *
     * @param callback(from, rtcOptions)
     *
     *
     * @param video
     *            1 0
     * @param audio
     *            1 0
     * @param peer
     *
     */
    reqP2P: function (rt, video, audio, peer, callback) {
        _logger.debug("req p2p ...");


        var rtcOptions = {
            data: {
                op: 0,
                video: video,
                audio: audio,
                peer: peer // appKey + "_" + curChatUserId + "@" + this.domain,
            }
        };

        this.rtcHandler.sendRtcMessage(rt, rtcOptions, callback);
    },

    /**
     * NewCfr 1
     *
     * @param rt
     *            {to: , rtKey: , rtflag: , success(result), fail(error)}
     *
     * @param callback(from, rtcOptions)
     *
     *
     * @param reqTkt
     *            1 null
     * @param password
     *            string null
     *
     */
    newCfr: function (rt, reqTkt, password, callback) {
        _logger.debug("newCfr ...");

        var self = this;

        var rtcOptions = {
            data: {
                op: 1
            }
        };

        reqTkt && (rtcOptions.data.reqTkt = reqTkt);
        password && (rtcOptions.data.password = password);

        self.rtcHandler.sendRtcMessage(rt, rtcOptions, callback);
    },

    /**
     * Enter 200
     *
     * @param rt
     *            {to: , rtKey: , rtflag: , success(result), fail(error)}
     *
     * @param callback(from, rtcOptions)
     *
     *
     * @param WebRTCId
     * @param reqMembers !=
     *            0 members
     * @param tkt
     * @param nonce
     * @param digest
     *
     */
    enter: function (rt, WebRTCId, reqMembers, tkt, nonce, digest, callback) {
        _logger.debug("enter ...");

        var self = this;

        var rtcOptions = {
            data: {
                op: 200
            }
        };

        WebRTCId && (rtcOptions.data.WebRTCId = WebRTCId);
        reqMembers && (rtcOptions.data.reqMembers = reqMembers);
        tkt && (rtcOptions.data.tkt = tkt);
        nonce && (rtcOptions.data.nonce = nonce);
        digest && (rtcOptions.data.digest = digest);

        self.rtcHandler.sendRtcMessage(rt, rtcOptions, callback);
    },

    /**
     * Ping 100
     *
     * @param rt
     *            {to: , rtKey: , rtflag: , success(result), fail(error)}
     *
     * @param callback(from, rtcOptions)
     *
     *
     * @param sessId
     *
     */
    ping: function (rt, sessId, callback) {
        _logger.debug("ping ...");

        var self = this;

        var rtcOptions = {
            data: {
                op: 100
            }
        };

        sessId && (rtcOptions.data.sessId = sessId);

        self.rtcHandler.sendRtcMessage(rt, rtcOptions, callback);
    },

    /**
     * 通知对方 我已经关闭/打开 麦卡，摄像头
     *
     * PAUSE_VOICE(0, 0), RESUME_VOICE(1, 1), PAUSE_VIDEO(2, 2), RESUME_VIDEO(3, 3)
     *
     *
     * @param rt
     * @param sessId
     * @param rtcId
     * @param controlType
     * @param callback
     */
    streamControl: function (rt, sessId, rtcId, controlType, callback) {
        _logger.debug("streamControl ...");

        var self = this;

        var rtcOptions = {
            data: {
                op: 400
            }
        };

        sessId && (rtcOptions.data.sessId = sessId);
        rtcId && (rtcOptions.data.rtcId = rtcId);
        (typeof controlType !== 'undefined' &&  controlType != null ) && (rtcOptions.data.controlType = controlType);

        self.rtcHandler.sendRtcMessage(rt, rtcOptions, callback);
    },

    /**
     * ReqTkt 3
     *
     * @param rt
     *            {to: , rtKey: , rtflag: , success(result), fail(error)}
     *
     * @param callback(from, rtcOptions)
     *
     *
     * @param WebRTCId
     * @param success(from,
     *            rtcOptions)
     *
     */
    reqTkt: function (rt, WebRTCId, callback) {
        _logger.debug("reqTkt ...");

        var self = this;

        var rtcOptions = {
            data: {
                op: 3
            }
        };

        WebRTCId && (rtcOptions.data.WebRTCId = WebRTCId);

        self.rtcHandler.sendRtcMessage(rt, rtcOptions, callback);
    },

    /**
     * InitC 102
     *
     * @param rt
     *            {to: , rtKey: , rtflag: , success(result), fail(error)}
     *
     * @param callback(from, rtcOptions)
     *
     *
     * @param WebRTCId
     * @param tkt
     * @param sessId
     * @param rtcId
     * @param pubS
     *            {name: streamName, video:1, audio:1, type: 0}
     * @param subS
     *            {memId: , rtcId: }
     * @param sdp
     *            sdp:sdpstring
     * @param cands [ ]
     *
     */
    initC: function (rt, streamType, WebRTCId, tkt, sessId, rtcId, pubS, subS, sdp, cands, rtcCfg, WebRTC, callback) {
        _logger.debug("initC ...");


        var rtcOptions = {
            data: {
                op: 102
            }
        };

        rtcOptions.streamType = streamType || "VIDEO";

        WebRTCId && (rtcOptions.data.WebRTCId = WebRTCId);
        tkt && (rtcOptions.data.tkt = tkt);
        sessId && (rtcOptions.data.sessId = sessId);
        rtcId && (rtcOptions.data.rtcId = rtcId);
        pubS && (rtcOptions.data.pubS = pubS);
        subS && (rtcOptions.data.subS = subS);
        sdp && (rtcOptions.data.sdp = sdp);
        cands && (rtcOptions.data.cands = cands);
        rtcCfg && (rtcOptions.data.rtcCfg = rtcCfg);
        WebRTC && (rtcOptions.data.WebRTC = WebRTC);

        this.rtcHandler.sendRtcMessage(rt, rtcOptions, callback);
    },

    /**
     * TcklC 105
     *
     * @param rt
     *            {to: , rtKey: , rtflag: , success(result), fail(error)}
     *
     * @param callback(from, rtcOptions)
     *
     *
     * @param sessId
     * @param rtcId
     * @param cands
     * @param success(from,
     *            rtcOptions)
     *
     */
    tcklC: function (rt, sessId, rtcId, sdp, cands, callback) {
        _logger.debug("tcklC ...");

        var self = this;

        var rtcOptions = {
            data: {
                op: 105
            }
        };

        sessId && (rtcOptions.data.sessId = sessId);
        rtcId && (rtcOptions.data.rtcId = rtcId);
        sdp && (rtcOptions.data.sdp = sdp);
        cands && (rtcOptions.data.cands = cands);

        self.rtcHandler.sendRtcMessage(rt, rtcOptions, callback);
    },

    /**
     * AnsC 106
     *
     * @param rt
     *            {to: , rtKey: , rtflag: , success(result), fail(error)}
     *
     * @param callback(from, rtcOptions)
     *
     *
     * @param sessId
     * @param rtcId
     * @param sdp
     * @param cands
     *
     */
    ansC: function (rt, sessId, rtcId, sdp, cands, callback, enableVoice, enableVideo) {
        _logger.debug("ansC ...");

        var self = this;

        var rtcOptions = {
            data: {
                op: 106
            }
        };

        sessId && (rtcOptions.data.sessId = sessId);
        rtcId && (rtcOptions.data.rtcId = rtcId);
        sdp && (rtcOptions.data.sdp = sdp);
        cands && (rtcOptions.data.cands = cands);

        enableVoice === false && (rtcOptions.data.enableVoice = enableVoice);
        enableVideo === false && (rtcOptions.data.enableVideo = enableVideo);



        // rtcOptions.data.enableVoice = false;
        // rtcOptions.data.enableVideo = false;

        self.rtcHandler.sendRtcMessage(rt, rtcOptions, callback);
    },

    /**
     * AcptC 104
     *
     * @param rt
     *            {to: , rtKey: , rtflag: , success(result), fail(error)}
     *
     * @param callback(from, rtcOptions)
     *
     *
     * @param sessId
     * @param rtcId
     * @param sdp
     * @param ans
     *            1
     *
     */
    acptC: function (rt, sessId, rtcId, sdp, cands, ans, callback, enableVoice, enableVideo) {
        _logger.debug("acptC ...");

        var self = this;

        var rtcOptions = {
            data: {
                op: 104
            }
        };

        sessId && (rtcOptions.data.sessId = sessId);
        rtcId && (rtcOptions.data.rtcId = rtcId);
        sdp && (rtcOptions.data.sdp = sdp);
        cands && (rtcOptions.data.cands = cands);
        ans && (rtcOptions.data.ans = ans);

        enableVoice === false && (rtcOptions.data.enableVoice = enableVoice);
        enableVideo === false && (rtcOptions.data.enableVideo = enableVideo);

        // rtcOptions.data.enableVoice = false;
        // rtcOptions.data.enableVideo = false;

        self.rtcHandler.sendRtcMessage(rt, rtcOptions, callback);
    },

    /**
     * GetMems 203
     *
     * @param rt
     *            {to: , rtKey: , rtflag: , success(result), fail(error)}
     *
     * @param callback(from, rtcOptions)
     *
     *
     * @param WebRTCId
     * @param sessId
     * @param success(from,
     *            rtcOptions)
     *
     */
    getMems: function (rt, WebRTCId, sessId, callback) {
        _logger.debug("getMems ...");

        var self = this;

        var rtcOptions = {
            data: {
                op: 203
            }
        };

        WebRTCId && (rtcOptions.data.WebRTCId = WebRTCId);
        sessId && (rtcOptions.data.sessId = sessId);

        self.rtcHandler.sendRtcMessage(rt, rtcOptions, callback);
    },

    /**
     * SubC 205
     *
     * @param rt
     *            {to: , rtKey: , rtflag: , success(result), fail(error)}
     *
     * @param callback(from, rtcOptions)
     *
     *
     * @param sessId
     * @param rtcId
     * @param subS
     *            {memId:m001, rtcId:r001}
     *
     */
    subC: function (rt, sessId, rtcId, subS, callback) {
        _logger.debug("subC ...");

        var self = this;

        var rtcOptions = {
            data: {
                op: 205
            }
        };

        sessId && (rtcOptions.data.sessId = sessId);
        rtcId && (rtcOptions.data.rtcId = rtcId);
        subS && (rtcOptions.data.subS = subS);

        self.rtcHandler.sendRtcMessage(rt, rtcOptions, callback);
    },

    /**
     * UsubC 206
     *
     * @param rt
     *            {to: , rtKey: , rtflag: , success(result), fail(error)}
     *
     * @param callback(from, rtcOptions)
     *
     *
     * @param sessId
     * @param rtcId
     *
     */
    usubC: function (rt, sessId, rtcId, callback) {
        _logger.debug("usubC ...");

        var self = this;

        var rtcOptions = {
            data: {
                op: 206
            }
        };

        sessId && (rtcOptions.data.sessId = sessId);
        rtcId && (rtcOptions.data.rtcId = rtcId);

        self.rtcHandler.sendRtcMessage(rt, rtcOptions, callback);
    },

    /**
     * TermC 107
     *
     * @param rt
     *            {to: , rtKey: , rtflag: , success(result), fail(error)}
     *
     * @param callback(from, rtcOptions)
     *
     *
     * @param sessId
     * @param rtcId
     * @param reason
     *               "ok"      -> 'HANGUP'     "success" -> 'HANGUP'   "timeout"          -> 'NORESPONSE'
     *               "decline" -> 'REJECT'     "busy"    -> 'BUSY'     "failed-transport" -> 'FAIL'
     *
     */
    termC: function (rt, sessId, rtcId, reason, callback) {
        _logger.debug("termC ...");

        var self = this;

        var rtcOptions = {
            data: {
                op: 107
            }
        };

        sessId && (rtcOptions.data.sessId = sessId);
        rtcId && (rtcOptions.data.rtcId = rtcId);
        reason && (rtcOptions.reason = reason);

        self.rtcHandler.sendRtcMessage(rt, rtcOptions, callback);
    },

    /**
     * Exit 201
     *
     * @param rt
     *            {to: , rtKey: , rtflag: , success(result), fail(error)}
     *
     * @param callback(from, rtcOptions)
     *
     *
     * @param WebRTCId
     * @param sessId
     * @param success(from,
     *            rtcOptions)
     *
     */
    exit: function (rt, WebRTCId, sessId, callback) {
        _logger.debug("exit ...");

        var self = this;

        var rtcOptions = {
            data: {
                op: 201
            }
        };

        WebRTCId && (rtcOptions.data.WebRTCId = WebRTCId);
        sessId && (rtcOptions.data.sessId = sessId);

        self.rtcHandler.sendRtcMessage(rt, rtcOptions, callback);
    },

    /**
     * DelCfr 2
     *
     * @param rt
     *            {to: , rtKey: , rtflag: , success(result), fail(error)}
     *
     * @param callback(from, rtcOptions)
     *
     *
     * @param WebRTCId
     * @param admtok
     * @param success(from,
     *            rtcOptions)
     *
     */
    delCfr: function (rt, WebRTCId, admtok, callback) {
        _logger.debug("delCfr ...");

        var self = this;

        var rtcOptions = {
            data: {
                op: 2
            }
        };

        WebRTCId && (rtcOptions.data.WebRTCId = WebRTCId);
        admtok && (rtcOptions.data.admtok = admtok);

        self.rtcHandler.sendRtcMessage(rt, rtcOptions, callback);
    }
};

exports.Api = function (initConfigs) {
    var self = this;

    _util.extend(true, this, _clazz, initConfigs || {});


    function _onRecvRtcMessage(from, rtcOptions, rtkey, tsxId, fromSessionId) {
        if (rtcOptions.result != 0 && self['onServerError']) {
            self['onServerError'].call(self, from, rtcOptions, rtkey, tsxId, fromSessionId);
        } else {
            var onFunction;

            if (self.events[rtcOptions.op] && (onFunction = self[self.events[rtcOptions.op]])) {
                onFunction.call(self, from, rtcOptions, rtkey, tsxId, fromSessionId);
            } else {
                _logger.info("can not handle(recvRtcMessage) the op: " + rtcOptions.op, rtcOptions);
            }
        }
    }

    this.rtcHandler.onRecvRtcMessage = _onRecvRtcMessage;
};
