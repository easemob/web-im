/**
 * IQ Message，IM -> CMServer --> IM
 */

var _util = require('./utils');
var _logger = _util.logger;
var API = require('./api');
var RouteTo = API.RouteTo;

var CONFERENCE_XMLNS = "urn:xmpp:media-conference";


var _RtcHandler = {
    _apiCallbacks: {},

    imConnection: null,

    _connectedSid: '',


    init: function () {
        var self = this;

        var _conn = self.imConnection;

        _conn.registerConfrIQHandler = function(){
            var handleConferenceIQ = function (msginfo) {
                try {
                    self.handleRtcMessage(msginfo);
                } catch (error) {
                    _logger.error(error.stack || error);
                    throw error;
                }

                return true;
            };

            _conn.addHandler(handleConferenceIQ, CONFERENCE_XMLNS, 'iq', "set");
            _conn.addHandler(handleConferenceIQ, CONFERENCE_XMLNS, 'iq', "get");

            _logger.warn("Conference iq handler. registered.");
        }
    },

    handleRtcMessage: function (msginfo) {
        var self = this;

        var id = msginfo.getAttribute('id');
        var from = msginfo.getAttribute('from') || '';

        // remove resource
        from.lastIndexOf("/") >= 0 && (from = from.substring(0, from.lastIndexOf("/")));


        var rtkey = msginfo.getElementsByTagName('rtkey')[0].innerHTML;

        var fromSessionId = msginfo.getElementsByTagName('sid')[0].innerHTML;

        (self._fromSessionID || (self._fromSessionID = {}))[from] = fromSessionId;

        var contentTags = msginfo.getElementsByTagName('content');



        var contentString = contentTags[0].innerHTML;

        var content = _util.parseJSON(contentString);

        var rtcOptions = content;

        var streamType = msginfo.getElementsByTagName('stream_type')[0].innerHTML; //VOICE, VIDEO

        if(streamType == ""){
            streamType = "VOICE";
        }

        rtcOptions.streamType = streamType;

        if(rtcOptions.op == 102){
            self.singalStreamType = streamType;
        }


        var tsxId = content.tsxId;

        self.ctx = content.ctx;

        _logger.debug("Recv [op = " + rtcOptions.op + "] [tsxId=" + tsxId + "]\r\n json :", msginfo);


        //if a->b already, c->a/b should be termiated with 'busy' reason
        if (from.indexOf("@") >= 0) {
            if (self._connectedSid == '' && rtcOptions.op == 102) {
                self._connectedSid = fromSessionId;
            } else {
                if (self._connectedSid != fromSessionId) {
                    _logger.debug("Error recv [op = " + rtcOptions.op + "] [tsxId=" + tsxId + "]. caused by _connectedSid != fromSessionId :",
                        self._connectedSid, fromSessionId);

                    //onInitC
                    if (rtcOptions.op == 102) {
                        var rt = new RouteTo({
                            to: from,
                            rtKey: rtkey,
                            sid: fromSessionId,
                            success: function (result) {
                                _logger.debug("iq to server success", result);
                            },
                            fail: function (error) {
                                _logger.debug("iq to server error", error);
                                self.onError(error);
                            }
                        });

                        var options = {
                            data: {
                                op: 107,
                                sessId: rtcOptions.sessId,
                                rtcId: rtcOptions.rtcId,
                                reason: 'busy'

                            },
                            reason: 'busy'
                        };
                        self.sendRtcMessage(rt, options)
                    }
                    return;
                }
            }
        }

        //onTermC
        if (rtcOptions.op == 107) {
            self._connectedSid = '';
            self._fromSessionID = {};

            var reasonObj = msginfo.getElementsByTagName('reason');
            //var endReason = msginfo.getElementsByTagName('reason')[0].innerHTML;
            reasonObj && reasonObj.length > 0 && (rtcOptions.reason = reasonObj[0].innerHTML);
        }

        if (rtcOptions.sdp) {
            if (typeof rtcOptions.sdp === 'string') {
                rtcOptions.sdp = _util.parseJSON(rtcOptions.sdp);
            }
            rtcOptions.sdp.type && (rtcOptions.sdp.type = rtcOptions.sdp.type.toLowerCase());
        }
        if (rtcOptions.cands) {
            if (typeof rtcOptions.cands === 'string') {
                rtcOptions.cands = _util.parseJSON(rtcOptions.cands);
            }

            for (var i = 0; i < rtcOptions.cands.length; i++) {
                typeof rtcOptions.cands[i] === 'string' && (rtcOptions.cands[i] = _util.parseJSON(rtcOptions.cands[i]));

                rtcOptions.cands[i].sdpMLineIndex = rtcOptions.cands[i].mlineindex;
                rtcOptions.cands[i].sdpMid = rtcOptions.cands[i].mid;

                delete rtcOptions.cands[i].mlineindex;
                delete rtcOptions.cands[i].mid;
            }
        }

        rtcOptions.rtcCfg && (typeof rtcOptions.rtcCfg === 'string') && (rtcOptions.rtcCfg = _util.parseJSON(rtcOptions.rtcCfg));
        rtcOptions.rtcCfg2 && (typeof rtcOptions.rtcCfg2 === 'string') && (rtcOptions.rtcCfg2 = _util.parseJSON(rtcOptions.rtcCfg2));
        rtcOptions.WebRTC && (typeof rtcOptions.WebRTC === 'string') && (rtcOptions.WebRTC = _util.parseJSON(rtcOptions.WebRTC));

        if (tsxId && self._apiCallbacks[tsxId]) {
            try {
                self._apiCallbacks[tsxId].callback && self._apiCallbacks[tsxId].callback(from, rtcOptions);
            } catch (err) {
                throw err;
            } finally {
                delete self._apiCallbacks[tsxId]
            }
        } else {
            self.onRecvRtcMessage(from, rtcOptions, rtkey, tsxId, fromSessionId);
        }

        return true;
    },


    onRecvRtcMessage: function (from, rtcOptions, rtkey, tsxId, fromSessionId) {
        _logger.debug(' form : ' + from + " \r\n json :" + _util.stringifyJSON(rtcJSON));
    },

    convertRtcOptions: function (options) {
        var sdp = options.data.sdp;
        if (sdp) {
            var _sdp = {
                type: sdp.type,
                sdp: sdp.sdp
            };

            sdp = _sdp;

            sdp.type = sdp.type.toUpperCase();
            sdp = _util.stringifyJSON(sdp);

            options.data.sdp = sdp;
        }


        var cands = options.data.cands;

        if (cands) {
            if (_util.isArray(cands)) {

            } else {
                var _cands = [];
                _cands.push(cands);
                cands = _cands;
            }

            for (var i in cands) {
                if (cands[i] instanceof RTCIceCandidate) {
                    var _cand = {
                        type: "candidate",
                        candidate: cands[i].candidate,
                        mlineindex: cands[i].sdpMLineIndex,
                        mid: cands[i].sdpMid,
                        // seq: i
                    };

                    cands[i] = _util.stringifyJSON(_cand);
                }
            }

            options.data.cands = cands;
        } else {
            // options.data.cands = [];
        }

        var rtcCfg = options.data.rtcCfg;
        if (rtcCfg) {
            typeof rtcCfg !== 'string' && (options.data.rtcCfg = _util.stringifyJSON(rtcCfg));
        }

        var _webrtc = options.data.WebRTC;
        if (_webrtc) {
            typeof _webrtc !== 'string' && (options.data.WebRTC = _util.stringifyJSON(_webrtc));
        }
    },

    /**
     * rt: { id: , to: , rtKey: , rtflag: , sid: , tsxId: , type: , }
     *
     * rtcOptions: { data : { op : 'reqP2P', video : 1, audio : 1, peer :
     * curChatUserId, //appKey + "_" + curChatUserId + "@" + this.domain, } }
     *
     */
    sendRtcMessage: function (rt, options, callback) {
        var self = this;

        var _conn = self.imConnection;

        var tsxId = rt.tsxId || _conn.getUniqueId();

        var to = rt.to || _conn.domain;

        var sid = rt.sid || self._fromSessionID && self._fromSessionID[to];
        //sid = sid || ((self._fromSessionID || (self._fromSessionID = {}))[to] = _conn.getUniqueId("CONFR_"));
        sid = sid || _conn.getUniqueId("CONFR_");
        (self._fromSessionID || (self._fromSessionID = {}))[to] = sid;

        if (to.indexOf("@") >= 0) {
            if (self._connectedSid == '' && options.data.op == 102) {
                self._connectedSid = sid;
            }
        }
        var rtKey = rt.rtKey || rt.rtkey;
        // rtKey && delete rt.rtKey;
        rtKey || (rtKey = "");

        var rtflag = rt.rtflag;
        // rtflag && delete rt.rtflag;
        rtflag || (rtflag = 1);

        options.data || (options.data = {});
        options.data.tsxId = tsxId;

        self.ctx && (options.data.ctx = self.ctx);
        self.convertRtcOptions(options);

        var streamType = options.streamType || self.singalStreamType || "VIDEO"; // "VIDEO"; //VOICE, VIDEO
        if (options.data.op == 102) {
            self.singalStreamType = streamType;
        }


        var id = rt.id || _conn.getUniqueId("CONFR_");
        var iq = $iq({
            // xmlns: CONFERENCE_XMLNS,
            id: id,
            to: to,
            from: _conn.context.jid,
            type: rt.type || "get"
        }).c("query", {
            xmlns: CONFERENCE_XMLNS
        }).c("MediaReqExt").c('rtkey').t(rtKey)
            .up().c('rtflag').t(rtflag)
            .up().c('stream_type').t(streamType)
            .up().c('sid').t(sid)
            .up().c('content').t(_util.stringifyJSON(options.data));

        if (options.data.op == 107 && options.reason) {
            iq.up().c('reason').t(options.reason);
        }
        _logger.debug("Send [op = " + options.data.op + "] : \r\n", iq.tree());


        callback && (
            self._apiCallbacks[tsxId] = {
                callback: callback
            }
        );

        var completeFn = function (result) {
                rt.success(result);
            } || function (result) {
                _logger.debug("send result. op:" + options.data.op + ".", result);
            };

        var errFn = function (ele) {
                rt.fail(ele);
            } || function (ele) {
                _logger.debug(ele);
            };

        _conn.context.stropheConn.sendIQ(iq.tree(), completeFn, errFn);

        //onTermC
        if (options.data.op == 107 && self._connectedSid) {
            if (!rt.sid || self._connectedSid == rt.sid) {
                self._connectedSid = '';
                self._fromSessionID = {};
            }
        }
    }
};


var RTCIQHandler = function (initConfigs) {
    _util.extend(true, this, _RtcHandler, initConfigs || {});

    this.init();
};
module.exports = RTCIQHandler;
