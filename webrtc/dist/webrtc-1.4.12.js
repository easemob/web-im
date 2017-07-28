/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(251);


/***/ },

/***/ 251:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var Util = __webpack_require__(253);
	var Call = __webpack_require__(254);

	window.WebIM = typeof WebIM !== 'undefined' ? WebIM : {};
	WebIM.WebRTC = WebIM.WebRTC || {};
	WebIM.WebRTC.Call = Call;
	WebIM.WebRTC.Util = Util;

	if (( false ? 'undefined' : _typeof(module)) === 'object' && _typeof(module.exports) === 'object') {
	    module.exports = WebIM.WebRTC;
	} else if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	        return WebIM.WebRTC;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}

	/**
	 * 判断是否支持pranswer
	 */
	if (/Chrome/.test(navigator.userAgent)) {
	    WebIM.WebRTC.supportPRAnswer = navigator.userAgent.split("Chrome/")[1].split(".")[0] >= 50 ? true : false;
	}

	//WebIM.WebRTC.supportPRAnswer = false;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(252)(module)))

/***/ },

/***/ 252:
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },

/***/ 253:
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/*
	 * ! Math.uuid.js (v1.4) http://www.broofa.com mailto:robert@broofa.com
	 * 
	 * Copyright (c) 2010 Robert Kieffer Dual licensed under the MIT and GPL
	 * licenses.
	 */

	/*
	 * Generate a random uuid.
	 * 
	 * USAGE: Math.uuid(length, radix) length - the desired number of characters
	 * radix - the number of allowable values for each character.
	 * 
	 * EXAMPLES: // No arguments - returns RFC4122, version 4 ID >>> Math.uuid()
	 * "92329D39-6F5C-4520-ABFC-AAB64544E172" // One argument - returns ID of the
	 * specified length >>> Math.uuid(15) // 15 character ID (default base=62)
	 * "VcydxgltxrVZSTV" // Two arguments - returns ID of the specified length, and
	 * radix. (Radix must be <= 62) >>> Math.uuid(8, 2) // 8 character ID (base=2)
	 * "01001010" >>> Math.uuid(8, 10) // 8 character ID (base=10) "47473046" >>>
	 * Math.uuid(8, 16) // 8 character ID (base=16) "098F4D35"
	 */
	(function () {
	    // Private array of chars to use
	    var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

	    Math.uuid = function (len, radix) {
	        var chars = CHARS,
	            uuid = [],
	            i;
	        radix = radix || chars.length;

	        if (len) {
	            // Compact form
	            for (i = 0; i < len; i++) {
	                uuid[i] = chars[0 | Math.random() * radix];
	            }
	        } else {
	            // rfc4122, version 4 form
	            var r;

	            // rfc4122 requires these characters
	            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
	            uuid[14] = '4';

	            // Fill in random data. At i==19 set the high bits of clock sequence
	            // as
	            // per rfc4122, sec. 4.1.5
	            for (i = 0; i < 36; i++) {
	                if (!uuid[i]) {
	                    r = 0 | Math.random() * 16;
	                    uuid[i] = chars[i == 19 ? r & 0x3 | 0x8 : r];
	                }
	            }
	        }

	        return uuid.join('');
	    };

	    // A more performant, but slightly bulkier, RFC4122v4 solution. We boost
	    // performance
	    // by minimizing calls to random()
	    Math.uuidFast = function () {
	        var chars = CHARS,
	            uuid = new Array(36),
	            rnd = 0,
	            r;
	        for (var i = 0; i < 36; i++) {
	            if (i == 8 || i == 13 || i == 18 || i == 23) {
	                uuid[i] = '-';
	            } else if (i == 14) {
	                uuid[i] = '4';
	            } else {
	                if (rnd <= 0x02) rnd = 0x2000000 + Math.random() * 0x1000000 | 0;
	                r = rnd & 0xf;
	                rnd = rnd >> 4;
	                uuid[i] = chars[i == 19 ? r & 0x3 | 0x8 : r];
	            }
	        }
	        return uuid.join('');
	    };

	    // A more compact, but less performant, RFC4122v4 solution:
	    Math.uuidCompact = function () {
	        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
	            var r = Math.random() * 16 | 0,
	                v = c == 'x' ? r : r & 0x3 | 0x8;
	            return v.toString(16);
	        });
	    };
	})();

	/**
	 * Util
	 *
	 * @constructor
	 */
	function Util() {}

	/**
	 * Function Logger
	 *
	 * @constructor
	 */
	var Logger = function Logger() {
	    var self = this;

	    var LogLevel = {
	        TRACE: 0,
	        DEBUG: 1,
	        INFO: 2,
	        WARN: 3,
	        ERROR: 4,
	        FATAL: 5
	    };

	    var LogLevelName = ['TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL'];

	    this.log = function () {
	        var level = arguments[0];

	        level = arguments[0] = '[' + LogLevelName[level] + '] ';

	        var text = arguments[1];

	        if (WebIM && WebIM.config && WebIM.config.isDebug) {
	            console.log.apply(console, arguments);
	        }
	    };

	    function callLog(level, args) {
	        var _args = [];

	        _args.push(level);

	        for (var i in args) {
	            _args.push(args[i]);
	        }

	        self.log.apply(self, _args);
	    };

	    this.trace = function () {
	        this.log && callLog(LogLevel.TRACE, arguments);
	    };

	    this.debug = function () {
	        this.log && callLog(LogLevel.DEBUG, arguments);
	    };

	    this.info = function () {
	        this.log && callLog(LogLevel.INFO, arguments);
	    };

	    this.warn = function () {
	        this.log && callLog(LogLevel.WARN, arguments);
	    };

	    this.error = function () {
	        this.log && callLog(LogLevel.ERROR, arguments);
	    };

	    this.fatal = function () {
	        this.log && callLog(LogLevel.FATAL, arguments);
	    };
	};

	Util.prototype.logger = new Logger();

	/**
	 * parse json
	 *
	 * @param jsonString
	 */
	Util.prototype.parseJSON = function (jsonString) {
	    return JSON.parse(jsonString);
	};

	/**
	 * json to string
	 *
	 * @type {Util.stringifyJSON}
	 */
	var stringifyJSON = Util.prototype.stringifyJSON = function (jsonObj) {
	    return JSON.stringify(jsonObj);
	};

	var class2type = {};

	var toString = class2type.toString;

	var hasOwn = class2type.hasOwnProperty;

	var fnToString = hasOwn.toString;

	var ObjectFunctionString = fnToString.call(Object);

	/**
	 * check object type
	 *
	 * @type {Util.isPlainObject}
	 */
	var isPlainObject = Util.prototype.isPlainObject = function (obj) {
	    var proto, Ctor;

	    // Detect obvious negatives
	    // Use toString instead of jQuery.type to catch host objects
	    if (!obj || toString.call(obj) !== "[object Object]") {
	        return false;
	    }

	    proto = Object.getPrototypeOf(obj);

	    // Objects with no prototype (e.g., `Object.create( null )`) are plain
	    if (!proto) {
	        return true;
	    }

	    // Objects with prototype are plain iff they were constructed by a
	    // global Object function
	    Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
	    return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
	};

	Util.prototype.isArray = Array.isArray;

	/**
	 * check empty object
	 *
	 * @param obj
	 * @returns {boolean}
	 */
	Util.prototype.isEmptyObject = function (obj) {
	    var name;
	    for (name in obj) {
	        return false;
	    }
	    return true;
	};

	Util.prototype.type = function (obj) {
	    if (obj == null) {
	        return obj + "";
	    }
	    return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
	};

	/**
	 * Function extend
	 *
	 * @returns {*|{}}
	 */
	Util.prototype.extend = function () {
	    var self = this;
	    var options,
	        name,
	        src,
	        copy,
	        copyIsArray,
	        clone,
	        target = arguments[0] || {},
	        i = 1,
	        length = arguments.length,
	        deep = false;

	    // Handle a deep copy situation
	    if (typeof target === "boolean") {
	        deep = target;

	        // Skip the boolean and the target
	        target = arguments[i] || {};
	        i++;
	    }

	    // Handle case when target is a string or something (possible in deep
	    // copy)
	    if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== "object" && !self.isFunction(target)) {
	        target = {};
	    }

	    // Extend self itself if only one argument is passed
	    if (i === length) {
	        target = this;
	        i--;
	    }

	    for (; i < length; i++) {

	        // Only deal with non-null/undefined values
	        if ((options = arguments[i]) != null) {

	            // Extend the base object
	            for (name in options) {
	                src = target[name];
	                copy = options[name];

	                // Prevent never-ending loop
	                if (target === copy) {
	                    continue;
	                }

	                // Recurse if we're merging plain objects or arrays
	                if (deep && copy && (self.isPlainObject(copy) || (copyIsArray = self.isArray(copy)))) {

	                    if (copyIsArray) {
	                        copyIsArray = false;
	                        clone = src && self.isArray(src) ? src : [];
	                    } else {
	                        clone = src && self.isPlainObject(src) ? src : {};
	                    }

	                    // Never move original objects, clone them
	                    target[name] = self.extend(deep, clone, copy);

	                    // Don't bring in undefined values
	                } else if (copy !== undefined) {
	                    target[name] = copy;
	                }
	            }
	        }
	    }

	    // Return the modified object
	    return target;
	};

	/**
	 * get local cache
	 *
	 * @memberOf tool
	 * @name hasLocalData
	 * @param key{string}
	 *            localStorage的key值
	 * @return boolean
	 */
	Util.prototype.hasLocalStorage = function (key) {
	    // null -> localStorage.removeItem时
	    // '{}' -> collection.models.destroy时
	    if (localStorage.getItem(key) == null || localStorage.getItem(key) == '{}') {
	        return false;
	    }
	    return true;
	};

	Util.prototype.toggleClass = function (node, className) {
	    if (node.hasClass(className)) {
	        node.removeClass(className);
	        return;
	    }
	    node.addClass(className);
	};

	/**
	 * set cookie
	 *
	 * @param name{String}
	 *
	 * @param value{String}
	 *
	 * @param hour{Number}
	 *
	 * @return void
	 */
	Util.prototype.setCookie = function (name, value, hour) {
	    var exp = new Date();
	    exp.setTime(exp.getTime() + hour * 60 * 60 * 1000);
	    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
	};

	/**
	 * read cookie
	 *
	 * @param name(String)
	 *            cookie key
	 * @return cookie value
	 * @memberOf Tool
	 */
	Util.prototype.getCookie = function (name) {
	    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
	    if (arr != null) {
	        return unescape(arr[2]);
	    }
	    return null;
	};

	/**
	 * query parameter from url
	 *
	 * @name parseURL
	 * @memberof C.Tools
	 * @param {string}
	 *
	 * @return {string}
	 * @type function
	 * @public
	 */
	Util.prototype.parseURL = function (name) {
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) {
	        return unescape(r[2]);
	    }
	    return null;
	};

	module.exports = new Util();

/***/ },

/***/ 254:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Util = __webpack_require__(253);
	var RTCIQHandler = __webpack_require__(255);
	var API = __webpack_require__(256);
	var WebRTC = __webpack_require__(257);
	var CommonPattern = __webpack_require__(258);

	var RouteTo = API.RouteTo;
	var Api = API.Api;
	var _logger = Util.logger;

	var _Call = {
	    api: null,
	    caller: '',
	    connection: null,

	    pattern: null,

	    listener: {
	        onAcceptCall: function onAcceptCall(from, options) {},

	        onRinging: function onRinging(caller) {},

	        onTermCall: function onTermCall() {},

	        onIceConnectionStateChange: function onIceConnectionStateChange(iceState) {}
	    },

	    mediaStreamConstaints: {
	        audio: true,
	        video: true
	    },

	    init: function init() {
	        var self = this;

	        if (typeof self.connection === "undefined") {
	            throw "Caller need a instance of Easemob.im.Connection";
	        }

	        self.api = self.api || new Api({
	            imConnection: self.connection,

	            rtcHandler: new RTCIQHandler({
	                imConnection: self.connection
	            })
	        });

	        self.api.onInitC = function () {
	            self._onInitC.apply(self, arguments);
	        }, self.api.onIceConnectionStateChange = function () {
	            self.listener.onIceConnectionStateChange.apply(self, arguments);
	        };
	    },

	    makeVideoCall: function makeVideoCall(callee, accessSid) {
	        var self = this;

	        var mediaStreamConstaints = {};
	        Util.extend(mediaStreamConstaints, self.mediaStreamConstaints);
	        self.mediaStreamConstaints.video = true;

	        this.call(callee, mediaStreamConstaints, accessSid);
	    },

	    makeVoiceCall: function makeVoiceCall(callee, accessSid) {
	        console.log('ScareCrow');
	        var self = this;

	        var mediaStreamConstaints = {};
	        Util.extend(mediaStreamConstaints, self.mediaStreamConstaints);
	        self.mediaStreamConstaints.video = false;

	        self.call(callee, mediaStreamConstaints, accessSid);
	    },

	    acceptCall: function acceptCall() {
	        var self = this;
	        self.pattern.accept();
	    },

	    endCall: function endCall(callee) {
	        var self = this;
	        self.caller = '';
	        self.pattern.termCall();
	    },

	    call: function call(callee, mediaStreamConstaints, accessSid) {
	        var self = this;
	        this.callee = this.api.jid(callee);

	        var rt = new RouteTo({
	            rtKey: "",
	            sid: accessSid,

	            success: function success(result) {
	                _logger.debug("iq to server success", result);
	            },
	            fail: function fail(error) {
	                _logger.debug("iq to server error", error);
	                self.onError(error);
	            }
	        });

	        this.api.reqP2P(rt, mediaStreamConstaints.video ? 1 : 0, mediaStreamConstaints.audio ? 1 : 0, this.api.jid(callee), function (from, rtcOptions) {
	            if (rtcOptions.online == "0") {
	                self.listener.onError({ message: "callee is not online!" });
	                return;
	            }
	            self._onGotServerP2PConfig(from, rtcOptions);
	            self.pattern.initC(self.mediaStreamConstaints, accessSid);
	        });
	    },

	    _onInitC: function _onInitC(from, options, rtkey, tsxId, fromSid) {
	        var self = this;

	        self.callee = from;
	        self._rtcCfg = options.rtcCfg;
	        self._WebRTCCfg = options.WebRTC;

	        self.sessId = options.sessId;
	        self.rtcId = options.rtcId;

	        self.switchPattern(options.streamType == "VIDEO" ? "VIDEO" : "VOICE");
	        self.pattern._onInitC(from, options, rtkey, tsxId, fromSid);
	    },

	    _onGotServerP2PConfig: function _onGotServerP2PConfig(from, rtcOptions) {
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

	            self.switchPattern(self.mediaStreamConstaints.audio && self.mediaStreamConstaints.video ? "VIDEO" : "VOICE");
	        } else {
	            //
	        }
	    },

	    switchPattern: function switchPattern(streamType) {
	        var self = this;

	        !self._WebRTCCfg && (self.pattern = new CommonPattern({
	            callee: self.callee,

	            _p2pConfig: self._p2pConfig,
	            _rtcCfg: self._rtcCfg,
	            _rtcCfg2: self._rtcCfg2,

	            _rtKey: self._rtKey || self._rtkey,
	            _rtFlag: self._rtFlag || self._rtflag,

	            _sessId: self.sessId,
	            _rtcId: self.rtcId,

	            webRtc: new WebRTC({
	                streamType: streamType,
	                onGotLocalStream: self.listener.onGotLocalStream,
	                onGotRemoteStream: self.listener.onGotRemoteStream,
	                onError: self.listener.onError
	            }),

	            api: self.api,

	            onAcceptCall: self.listener && self.listener.onAcceptCall || function () {},
	            onRinging: self.listener && self.listener.onRinging || function () {},
	            onTermCall: self.listener && self.listener.onTermCall || function () {},
	            onOtherUserOpenVoice: self.listener && self.listener.onOtherUserOpenVoice || function () {},
	            onOtherUserOpenVideo: self.listener && self.listener.onOtherUserOpenVideo || function () {}
	        }));
	    }
	};

	module.exports = function (initConfigs) {
	    Util.extend(true, this, _Call, initConfigs || {});

	    this.init();
	};

/***/ },

/***/ 255:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * IQ Message，IM -> CMServer --> IM
	 */

	var _util = __webpack_require__(253);
	var _logger = _util.logger;
	var API = __webpack_require__(256);
	var RouteTo = API.RouteTo;

	var CONFERENCE_XMLNS = "urn:xmpp:media-conference";

	var _RtcHandler = {
	    _apiCallbacks: {},

	    imConnection: null,

	    _connectedSid: '',

	    init: function init() {
	        var self = this;

	        var _conn = self.imConnection;

	        _conn.registerConfrIQHandler = function () {
	            var handleConferenceIQ = function handleConferenceIQ(msginfo) {
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
	        };
	    },

	    handleRtcMessage: function handleRtcMessage(msginfo) {
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

	        if (streamType == "") {
	            streamType = "VOICE";
	        }

	        rtcOptions.streamType = streamType;

	        if (rtcOptions.op == 102) {
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
	                    _logger.debug("Error recv [op = " + rtcOptions.op + "] [tsxId=" + tsxId + "]. caused by _connectedSid != fromSessionId :", self._connectedSid, fromSessionId);

	                    //onInitC
	                    if (rtcOptions.op == 102) {
	                        var rt = new RouteTo({
	                            to: from,
	                            rtKey: rtkey,
	                            sid: fromSessionId,
	                            success: function success(result) {
	                                _logger.debug("iq to server success", result);
	                            },
	                            fail: function fail(error) {
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
	                        self.sendRtcMessage(rt, options);
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

	        rtcOptions.rtcCfg && typeof rtcOptions.rtcCfg === 'string' && (rtcOptions.rtcCfg = _util.parseJSON(rtcOptions.rtcCfg));
	        rtcOptions.rtcCfg2 && typeof rtcOptions.rtcCfg2 === 'string' && (rtcOptions.rtcCfg2 = _util.parseJSON(rtcOptions.rtcCfg2));
	        rtcOptions.WebRTC && typeof rtcOptions.WebRTC === 'string' && (rtcOptions.WebRTC = _util.parseJSON(rtcOptions.WebRTC));

	        if (tsxId && self._apiCallbacks[tsxId]) {
	            try {
	                self._apiCallbacks[tsxId].callback && self._apiCallbacks[tsxId].callback(from, rtcOptions);
	            } catch (err) {
	                throw err;
	            } finally {
	                delete self._apiCallbacks[tsxId];
	            }
	        } else {
	            self.onRecvRtcMessage(from, rtcOptions, rtkey, tsxId, fromSessionId);
	        }

	        return true;
	    },

	    onRecvRtcMessage: function onRecvRtcMessage(from, rtcOptions, rtkey, tsxId, fromSessionId) {
	        _logger.debug(' form : ' + from + " \r\n json :" + _util.stringifyJSON(rtcJSON));
	    },

	    convertRtcOptions: function convertRtcOptions(options) {
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
	            if (_util.isArray(cands)) {} else {
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
	                        mid: cands[i].sdpMid
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
	    sendRtcMessage: function sendRtcMessage(rt, options, callback) {
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
	        }).c("MediaReqExt").c('rtkey').t(rtKey).up().c('rtflag').t(rtflag).up().c('stream_type').t(streamType).up().c('sid').t(sid).up().c('content').t(_util.stringifyJSON(options.data));

	        if (options.data.op == 107 && options.reason) {
	            iq.up().c('reason').t(options.reason);
	        }
	        _logger.debug("Send [op = " + options.data.op + "] : \r\n", iq.tree());

	        callback && (self._apiCallbacks[tsxId] = {
	            callback: callback
	        });

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

	var RTCIQHandler = function RTCIQHandler(initConfigs) {
	    _util.extend(true, this, _RtcHandler, initConfigs || {});

	    this.init();
	};
	module.exports = RTCIQHandler;

/***/ },

/***/ 256:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/**
	 * API
	 */
	var _util = __webpack_require__(253);
	var _logger = _util.logger;

	var _RouteTo = {
	    // to : null,
	    // rtKey: null,
	    rtFlag: 1,

	    success: function success(result) {},
	    fail: function fail(error) {}
	};

	var RouteTo = function RouteTo(extendCfg) {
	    if (this instanceof RouteTo) {
	        var self = this;
	        _util.extend(true, self, _RouteTo, extendCfg || {});
	    } else {
	        var sub = function sub(extendCfg) {
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

	    register: function register(listener) {
	        if ((typeof listener === 'undefined' ? 'undefined' : _typeof(listener)) === "object") {
	            for (var event in listener) {
	                this.bind(event, listener[event]);
	            }
	        }
	    },

	    bind: function bind(event, func) {
	        var self = this;

	        var onFunc;
	        if (onFunc = self.events[event]) {
	            self[onFunc] = func;
	        } else {
	            onFunc = self.events[event] = 'on_' + event;
	            self[onFunc] = func;
	        }
	    },

	    jid: function jid(shortUserName) {
	        if (/^.+#.+_.+@.+$/g.test(shortUserName)) {
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
	    reqP2P: function reqP2P(rt, video, audio, peer, callback) {
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
	    newCfr: function newCfr(rt, reqTkt, password, callback) {
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
	    enter: function enter(rt, WebRTCId, reqMembers, tkt, nonce, digest, callback) {
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
	    ping: function ping(rt, sessId, callback) {
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
	    streamControl: function streamControl(rt, sessId, rtcId, controlType, callback) {
	        _logger.debug("streamControl ...");

	        var self = this;

	        var rtcOptions = {
	            data: {
	                op: 400
	            }
	        };

	        sessId && (rtcOptions.data.sessId = sessId);
	        rtcId && (rtcOptions.data.rtcId = rtcId);
	        typeof controlType !== 'undefined' && controlType != null && (rtcOptions.data.controlType = controlType);

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
	    reqTkt: function reqTkt(rt, WebRTCId, callback) {
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
	    initC: function initC(rt, streamType, WebRTCId, tkt, sessId, rtcId, pubS, subS, sdp, cands, rtcCfg, WebRTC, callback) {
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
	    tcklC: function tcklC(rt, sessId, rtcId, sdp, cands, callback) {
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
	    ansC: function ansC(rt, sessId, rtcId, sdp, cands, callback, enableVoice, enableVideo) {
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
	    acptC: function acptC(rt, sessId, rtcId, sdp, cands, ans, callback, enableVoice, enableVideo) {
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
	    getMems: function getMems(rt, WebRTCId, sessId, callback) {
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
	    subC: function subC(rt, sessId, rtcId, subS, callback) {
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
	    usubC: function usubC(rt, sessId, rtcId, callback) {
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
	    termC: function termC(rt, sessId, rtcId, reason, callback) {
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
	    exit: function exit(rt, WebRTCId, sessId, callback) {
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
	    delCfr: function delCfr(rt, WebRTCId, admtok, callback) {
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

/***/ },

/***/ 257:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/**
	 * WebRTC
	 *
	 *                              A                   |                                       B
	 *                                                  |
	 *   1.createMedia:got streamA                      | 1.createMedia:got streamB
	 *   2.new RTCPeerConnection: APeerConnection       | 2.new RTCPeerConnection: BPeerConnection
	 *   3.APeerConnection.createOffer:got offerA       |
	 *      APeerConnection.setLocalDescription(offerA) |
	 *      send offerA ---> ---> ---> --->        ---> |
	 *                                                  | ---> 3.got offerA | offerA = new RTCSessionDescription(offerA);
	 *                                                  | BPeerConnection.setRemoteDescription(offerA)
	 *                                                  |
	 *                                                  |
	 *                                                  | 4.BPeerConnection.createAnswer: got answerB
	 *                                                  | BPeerConnection.setLocalDescription(answerB)
	 *                                                  | <---- send answerB
	 *                                                  | 5.got answerB <--- <--- <--- <---
	 *                                                  | answerB = new RTCSessionDescription(answerB)
	 *                                                  |
	 * APeerConnection.setRemoteDescription(answerB)    |
	 *                                                  |
	 * 6.got candidateA ---> --->  ---> --->            | ---> got candidateA
	 *                                                  | BPeerConnection.addIceCandidate(new RTCIceCandidate(candidateA))
	 *                                                  |
	 *                                                  |
	 *                                                  | got candidateB <--- <--- <--- <---
	 *                                                  | <--- 6.got candidateB APeerConnection.addIceCandidate(candidateB)
	 *                                                  |
	 *                                                  |
	 *                                                  | 7. APeerConnection.addStream(streamA)
	 *                                                  | 7.BPeerConnection.addStream(streamB)
	 *                                                  |
	 *                              streamA >>>>>>>>>>> |  <<<<< see A
	 *                              seeB <<<<<<<<<<<    | <<<<< streamB
	 *                                                  |
	 *
	 */
	var _util = __webpack_require__(253);
	var _logger = _util.logger;

	var _WebrtcStatistics = {
	    bytesPrev: null,
	    timestampPrev: null,
	    sentBytesPrev: null,
	    sentTimestampPrev: null,

	    printStats: function printStats(rtcPeerConnection) {
	        var self = this;

	        rtcPeerConnection.getStats(null, function (results) {
	            self.parseRecvStatistics(results, function (name, value) {
	                _logger.info(new Date(), "RECV ", name, value);
	            }, function (name, value) {
	                _logger.info(new Date(), "SEND ", name, value);
	            });
	        });
	    },

	    stopIntervalPrintStats: function stopIntervalPrintStats() {
	        var self = this;

	        self._printIntervalId && window.clearInterval(self._printIntervalId);
	        self._printIntervalId = null;
	    },

	    intervalPrintStats: function intervalPrintStats(rtcPeerConnection, seconds) {},

	    _intervalPrintStats: function _intervalPrintStats(rtcPeerConnection, seconds) {
	        var self = this;

	        self._printIntervalId && window.clearInterval(self._printIntervalId);
	        self._printIntervalId = window.setInterval(function () {
	            self.printStats(rtcPeerConnection);
	        }, seconds * 1000);
	    },

	    parseRecvStatistics: function parseRecvStatistics(results, callback, callbackSent) {
	        var self = this;

	        // calculate video bitrate
	        var bitrate;
	        var remoteWidth;
	        var remoteHeight;

	        var activeCandidatePair = null;
	        var remoteCandidate = null;

	        Object.keys(results).forEach(function (result) {
	            var report = results[result];
	            var now = report.timestamp;

	            if (report.type === 'inboundrtp' && report.mediaType === 'audio') {
	                // firefox calculates the bitrate for us
	                // https://bugzilla.mozilla.org/show_bug.cgi?id=951496
	                bitrate = Math.floor(report.bitrateMean / 1024);
	            } else if (report.type === 'ssrc' && report.bytesReceived) {
	                if (report.mediaType === 'video') {
	                    // remoteWidth = report.googFrameWidthReceived;
	                    // remoteHeight = report.googFrameHeightReceived;
	                    // // chrome does not so we need to do it ourselves
	                    // var bytes = report.bytesReceived;
	                    // if (self.timestampPrev) {
	                    //     bitrate = 8 * (bytes - self.bytesPrev) / (now - self.timestampPrev);
	                    //     bitrate = Math.floor(bitrate);
	                    // }
	                    // self.bytesPrev = bytes;
	                    // self.timestampPrev = now;
	                } else {
	                    // chrome does not so we need to do it ourselves
	                    var bytes = report.bytesReceived;
	                    if (self.timestampPrev) {
	                        bitrate = 8 * (bytes - self.bytesPrev) / (now - self.timestampPrev);
	                        bitrate = Math.floor(bitrate);
	                    }
	                    self.bytesPrev = bytes;
	                    self.timestampPrev = now;
	                }
	            }

	            if (report.type === 'candidatepair' && report.selected || report.type === 'googCandidatePair' && report.googActiveConnection === 'true') {
	                activeCandidatePair = report;
	            }

	            if (report.type === 'outboundrtp' && report.mediaType === 'audio') {
	                callbackSent('audio Bitrate', Math.floor(report.bitrateMean / 1024) + ' kbps');
	            } else if (report.type === 'ssrc' && report.bytesSent && report.googFrameHeightSent) {
	                // chrome does not so we need to do it ourselves
	                var bytes = report.bytesSent;
	                if (self.sentTimestampPrev) {
	                    var br = 8 * (bytes - self.sentBytesPrev) / (now - self.sentTimestampPrev);
	                    br = Math.floor(br);
	                    callbackSent('audio Bitrate', br + ' kbps');
	                    callbackSent('audio Size', report.googFrameWidthSent + 'x' + report.googFrameHeightSent);
	                }
	                self.sentBytesPrev = bytes;
	                self.sentTimestampPrev = now;
	            }
	        });

	        if (activeCandidatePair && activeCandidatePair.remoteCandidateId) {
	            remoteCandidate = results[activeCandidatePair.remoteCandidateId];
	        }
	        if (remoteCandidate && remoteCandidate.ipAddress && remoteCandidate.portNumber) {
	            callback('Peer', remoteCandidate.ipAddress + ':' + remoteCandidate.portNumber);
	        }

	        callback('audio Bitrate', bitrate + ' kbps');

	        if (remoteHeight) {
	            callback('audio Size', remoteWidth + 'x' + remoteHeight);
	        }
	    }
	};

	var WebrtcStatisticsHelper = function WebrtcStatisticsHelper(cfg) {
	    _util.extend(this, _WebrtcStatistics, cfg || {});
	};

	var webrtcStatisticsHelper = new WebrtcStatisticsHelper();

	var _SDPSection = {
	    headerSection: null,

	    audioSection: null,
	    videoSection: null,

	    _parseHeaderSection: function _parseHeaderSection(sdp) {
	        var index = sdp.indexOf('m=audio');
	        if (index >= 0) {
	            return sdp.slice(0, index);
	        }

	        index = sdp.indexOf('m=video');
	        if (index >= 0) {
	            return sdp.slice(0, index);
	        }

	        return sdp;
	    },

	    _parseAudioSection: function _parseAudioSection(sdp) {
	        var index = sdp.indexOf('m=audio');
	        if (index >= 0) {
	            var endIndex = sdp.indexOf('m=video');
	            return sdp.slice(index, endIndex < 0 ? sdp.length : endIndex);
	        }
	    },

	    _parseVideoSection: function _parseVideoSection(sdp) {
	        var index = sdp.indexOf('m=video');
	        if (index >= 0) {
	            return sdp.slice(index);
	        }
	    },

	    spiltSection: function spiltSection(sdp) {
	        var self = this;

	        self.headerSection = self._parseHeaderSection(sdp);
	        self.audioSection = self._parseAudioSection(sdp);
	        self.videoSection = self._parseVideoSection(sdp);
	    },

	    removeSSRC: function removeSSRC(section) {
	        var arr = [];

	        var _arr = section.split(/a=ssrc:[^\n]+/g);
	        for (var i = 0; i < _arr.length; i++) {
	            _arr[i] != '\n' && arr.push(_arr[i]);
	        }
	        // arr.push('');

	        return arr.join('\n');
	    },

	    removeField_msid: function removeField_msid(section) {
	        var arr = [];

	        var _arr = section.split(/a=msid:[^\n]+/g);
	        for (var i = 0; i < _arr.length; i++) {
	            _arr[i] != '\n' && arr.push(_arr[i]);
	        }
	        // arr.push('');

	        section = arr.join('\n');
	        arr = [];

	        _arr = section.split(/[\n]+/g);
	        for (var i = 0; i < _arr.length; i++) {
	            _arr[i] != '\n' && arr.push(_arr[i]);
	        }

	        return arr.join('\n');
	    },

	    updateHeaderMsidSemantic: function updateHeaderMsidSemantic(wms) {

	        var self = this;

	        var line = "a=msid-semantic: WMS " + wms;

	        var _arr = self.headerSection.split(/a=msid\-semantic: WMS.*/g);
	        var arr = [];
	        switch (_arr.length) {
	            case 1:
	                arr.push(_arr[0]);
	                break;
	            case 2:
	                arr.push(_arr[0]);
	                arr.push(line);
	                arr.push('\n');
	                break;
	            case 3:
	                arr.push(_arr[0]);
	                arr.push(line);
	                arr.push('\n');
	                arr.push(_arr[2]);
	                arr.push('\n');
	                break;
	        }

	        return self.headerSection = arr.join('');
	    },

	    updateAudioSSRCSection: function updateAudioSSRCSection(ssrc, cname, msid, label) {
	        var self = this;

	        self.audioSection && (self.audioSection = self.removeSSRC(self.audioSection));
	        self.audioSection && (self.audioSection = self.removeField_msid(self.audioSection));
	        self.audioSection && (self.audioSection = self.audioSection + self.ssrcSection(ssrc, cname, msid, label));
	    },

	    updateVideoSSRCSection: function updateVideoSSRCSection(ssrc, cname, msid, label) {
	        var self = this;

	        self.videoSection && (self.videoSection = self.removeSSRC(self.videoSection));
	        self.videoSection && (self.videoSection = self.removeField_msid(self.videoSection));
	        self.videoSection && (self.videoSection = self.videoSection + self.ssrcSection(ssrc, cname, msid, label));
	    },

	    getUpdatedSDP: function getUpdatedSDP() {
	        var self = this;

	        var sdp = "";

	        self.headerSection && (sdp += self.headerSection);
	        self.audioSection && (sdp += self.audioSection);
	        self.videoSection && (sdp += self.videoSection);

	        return sdp;
	    },

	    parseMsidSemantic: function parseMsidSemantic(header) {
	        var self = this;

	        var regexp = /a=msid\-semantic:\s*WMS (\S+)/ig;
	        var arr = self._parseLine(header, regexp);

	        arr && arr.length == 2 && (self.msidSemantic = {
	            line: arr[0],
	            WMS: arr[1]
	        });

	        return self.msidSemantic;
	    },

	    ssrcSection: function ssrcSection(ssrc, cname, msid, label) {
	        var lines = ['a=ssrc:' + ssrc + ' cname:' + cname, 'a=ssrc:' + ssrc + ' msid:' + msid + ' ' + label, 'a=ssrc:' + ssrc + ' mslabel:' + msid, 'a=ssrc:' + ssrc + ' label:' + label, ''];

	        return lines.join('\n');
	    },

	    parseSSRC: function parseSSRC(section) {
	        var self = this;

	        var regexp = new RegExp("a=(ssrc):(\\d+) (\\S+):(\\S+)", "ig");

	        var arr = self._parseLine(section, regexp);
	        if (arr) {
	            var ssrc = {
	                lines: [],
	                updateSSRCSection: self.ssrcSection
	            };

	            for (var i = 0; i < arr.length; i++) {
	                var e = arr[i];
	                if (e.indexOf("a=ssrc") >= 0) {
	                    ssrc.lines.push(e);
	                } else {
	                    switch (e) {
	                        case 'ssrc':
	                        case 'cname':
	                        case 'msid':
	                        case 'mslabel':
	                        case 'label':
	                            ssrc[e] = arr[++i];
	                    }
	                }
	            }

	            return ssrc;
	        }
	    },

	    _parseLine: function _parseLine(str, regexp) {
	        var arr = [];

	        var _arr;
	        while ((_arr = regexp.exec(str)) != null) {
	            for (var i = 0; i < _arr.length; i++) {
	                arr.push(_arr[i]);
	            }
	        }

	        if (arr.length > 0) {
	            return arr;
	        }
	    }
	};

	var SDPSection = function SDPSection(sdp) {
	    _util.extend(this, _SDPSection);
	    this.spiltSection(sdp);
	};

	/**
	 * Abstract
	 */
	var _WebRTC = {
	    streamType: "VIDEO", // VIDEO or VOICE

	    mediaStreamConstaints: {
	        audio: true,
	        video: true
	    },

	    localStream: null,
	    rtcPeerConnection: null,

	    offerOptions: {
	        offerToReceiveAudio: 1,
	        offerToReceiveVideo: 1
	    },

	    createMedia: function createMedia(constaints, onGotStream) {
	        var self = this;

	        if (constaints && typeof constaints === "function") {
	            onGotStream = constaints;
	            constaints = null;
	        }

	        _logger.debug('[WebRTC-API] begin create media ......');

	        function gotStream(stream) {
	            _logger.debug('[WebRTC-API] got local stream');

	            self.localStream = stream;

	            var videoTracks = self.localStream.getVideoTracks();
	            var audioTracks = self.localStream.getAudioTracks();

	            if (videoTracks.length > 0) {
	                _logger.debug('[WebRTC-API] Using video device: ' + videoTracks[0].label);
	            }
	            if (audioTracks.length > 0) {
	                _logger.debug('[WebRTC-API] Using audio device: ' + audioTracks[0].label);
	            }

	            onGotStream ? onGotStream(self, stream, self.streamType) : self.onGotStream(stream, self.streamType);
	        }

	        return navigator.mediaDevices.getUserMedia(constaints || self.mediaStreamConstaints).then(gotStream).then(self.onCreateMedia).catch(function (e) {
	            _logger.debug('[WebRTC-API] getUserMedia() error: ', e);
	            self.onError(e);
	        });
	    },

	    setLocalVideoSrcObject: function setLocalVideoSrcObject(stream) {
	        this.onGotLocalStream(stream, this.streamType);
	        _logger.debug('[WebRTC-API] you can see yourself !');
	    },

	    createRtcPeerConnection: function createRtcPeerConnection(iceServerConfig) {
	        _logger.debug('[WebRTC-API] begin create RtcPeerConnection ......');

	        var self = this;

	        // if (iceServerConfig && iceServerConfig.iceServers) {
	        // } else {
	        //     iceServerConfig = null;
	        // }

	        if (iceServerConfig) {
	            //reduce icecandidate number:add default value
	            !iceServerConfig.iceServers && (iceServerConfig.iceServers = []);

	            iceServerConfig.rtcpMuxPolicy = "require";
	            iceServerConfig.bundlePolicy = "max-bundle";

	            //iceServerConfig.iceTransportPolicy = 'relay';
	            if (iceServerConfig.relayOnly) {
	                iceServerConfig.iceTransportPolicy = 'relay';
	            }
	        } else {
	            iceServerConfig = null;
	        }
	        _logger.debug('[WebRTC-API] RtcPeerConnection config:', iceServerConfig);

	        self.startTime = window.performance.now();

	        var rtcPeerConnection = self.rtcPeerConnection = new RTCPeerConnection(iceServerConfig);
	        _logger.debug('[WebRTC-API] Created local peer connection object', rtcPeerConnection);

	        rtcPeerConnection.onicecandidate = function (event) {
	            //reduce icecandidate number: don't deal with tcp, udp only
	            if (event.type == "icecandidate" && (event.candidate == null || / tcp /.test(event.candidate.candidate))) {
	                return;
	            }
	            self.onIceCandidate(event);
	        };

	        rtcPeerConnection.onicestatechange = function (event) {
	            self.onIceStateChange(event);
	        };

	        rtcPeerConnection.oniceconnectionstatechange = function (event) {
	            self.onIceStateChange(event);

	            if ("connected" == event.target.iceConnectionState) {
	                webrtcStatisticsHelper.intervalPrintStats(rtcPeerConnection, 1);
	            }

	            if ("closed" == event.target.iceConnectionState) {
	                webrtcStatisticsHelper.stopIntervalPrintStats();
	            }
	        };

	        rtcPeerConnection.onaddstream = function (event) {
	            self._onGotRemoteStream(event);
	        };
	    },

	    _uploadLocalStream: function _uploadLocalStream() {
	        this.rtcPeerConnection.addStream(this.localStream);
	        _logger.debug('[WebRTC-API] Added local stream to RtcPeerConnection');
	    },

	    createOffer: function createOffer(onCreateOfferSuccess, onCreateOfferError) {
	        var self = this;

	        self._uploadLocalStream();

	        _logger.debug('[WebRTC-API] createOffer start...');

	        return self.rtcPeerConnection.createOffer(self.offerOptions).then(function (desc) {
	            self.offerDescription = desc;

	            _logger.debug('[WebRTC-API] Offer '); //_logger.debug('from \n' + desc.sdp);
	            _logger.debug('[WebRTC-API] setLocalDescription start');

	            self.rtcPeerConnection.setLocalDescription(desc).then(self.onSetLocalSessionDescriptionSuccess, self.onSetSessionDescriptionError).then(function () {
	                (onCreateOfferSuccess || self.onCreateOfferSuccess)(desc);
	            });
	        }, onCreateOfferError || self.onCreateSessionDescriptionError);
	    },

	    createPRAnswer: function createPRAnswer(onCreatePRAnswerSuccess, onCreatePRAnswerError) {
	        var self = this;

	        _logger.info(' createPRAnswer start');
	        // Since the 'remote' side has no media stream we need
	        // to pass in the right constraints in order for it to
	        // accept the incoming offer of audio and video.
	        return self.rtcPeerConnection.createAnswer().then(function (desc) {
	            _logger.debug('[WebRTC-API] _____________PRAnswer ', desc.sdp); //_logger.debug('from :\n' + desc.sdp);

	            desc.type = "pranswer";
	            desc.sdp = desc.sdp.replace(/a=recvonly/g, 'a=inactive');

	            self.prAnswerDescription = desc;

	            _logger.debug('[WebRTC-API] inactive PRAnswer ', desc.sdp); //_logger.debug('from :\n' + desc.sdp);
	            _logger.debug('[WebRTC-API] setLocalDescription start');

	            self.rtcPeerConnection.setLocalDescription(desc).then(self.onSetLocalSuccess, self.onSetSessionDescriptionError).then(function () {
	                var sdpSection = new SDPSection(desc.sdp);
	                sdpSection.updateHeaderMsidSemantic("MS_0000");
	                sdpSection.updateAudioSSRCSection(1000, "CHROME0000", "MS_0000", "LABEL_AUDIO_1000");
	                sdpSection.updateVideoSSRCSection(2000, "CHROME0000", "MS_0000", "LABEL_VIDEO_2000");

	                desc.sdp = sdpSection.getUpdatedSDP();

	                _logger.debug('[WebRTC-API] Send PRAnswer ', desc.sdp); //_logger.debug('from :\n' + desc.sdp);

	                (onCreatePRAnswerSuccess || self.onCreatePRAnswerSuccess)(desc);
	            });
	        }, onCreatePRAnswerError || self.onCreateSessionDescriptionError);
	    },

	    createAnswer: function createAnswer(onCreateAnswerSuccess, onCreateAnswerError) {
	        var self = this;

	        self._uploadLocalStream();

	        _logger.info('[WebRTC-API] createAnswer start');
	        // Since the 'remote' side has no media stream we need
	        // to pass in the right constraints in order for it to
	        // accept the incoming offer of audio and video.
	        return self.rtcPeerConnection.createAnswer().then(function (desc) {
	            _logger.debug('[WebRTC-API] _____________________Answer ', desc.sdp); //_logger.debug('from :\n' + desc.sdp);

	            desc.type = 'answer';

	            if (WebIM.WebRTC.supportPRAnswer) {
	                var sdpSection = new SDPSection(desc.sdp);
	                var ms = sdpSection.parseMsidSemantic(sdpSection.headerSection);
	                if (ms.WMS == '*') {
	                    sdpSection.updateHeaderMsidSemantic(ms.WMS = "MS_0000");
	                }
	                var audioSSRC = sdpSection.parseSSRC(sdpSection.audioSection);
	                var videoSSRC = sdpSection.parseSSRC(sdpSection.videoSection);

	                sdpSection.updateAudioSSRCSection(1000, "CHROME0000", ms.WMS, audioSSRC.label || "LABEL_AUDIO_1000");
	                if (videoSSRC) {
	                    sdpSection.updateVideoSSRCSection(2000, "CHROME0000", ms.WMS, videoSSRC.label || "LABEL_VIDEO_2000");
	                }
	                // mslabel cname

	                desc.sdp = sdpSection.getUpdatedSDP();
	            }

	            self.answerDescription = desc;

	            _logger.debug('[WebRTC-API] Answer ', desc.sdp); //_logger.debug('from :\n' + desc.sdp);
	            _logger.debug('[WebRTC-API] setLocalDescription start');

	            self.rtcPeerConnection.setLocalDescription(desc).then(self.onSetLocalSuccess, self.onSetSessionDescriptionError).then(function () {
	                if (WebIM.WebRTC.supportPRAnswer) {
	                    var sdpSection = new SDPSection(desc.sdp);

	                    sdpSection.updateHeaderMsidSemantic("MS_0000");
	                    sdpSection.updateAudioSSRCSection(1000, "CHROME0000", "MS_0000", "LABEL_AUDIO_1000");
	                    sdpSection.updateVideoSSRCSection(2000, "CHROME0000", "MS_0000", "LABEL_VIDEO_2000");

	                    desc.sdp = sdpSection.getUpdatedSDP();
	                }

	                _logger.debug('[WebRTC-API] Send Answer ', desc.sdp); //_logger.debug('from :\n' + desc.sdp);

	                (onCreateAnswerSuccess || self.onCreateAnswerSuccess)(desc);
	            });
	        }, onCreateAnswerError || self.onCreateSessionDescriptionError);
	    },

	    close: function close() {
	        var self = this;
	        try {
	            webrtcStatisticsHelper.stopIntervalPrintStats();

	            self.rtcPeerConnection && self.rtcPeerConnection.close();
	        } catch (e) {}

	        if (self.localStream) {
	            self.localStream.getTracks().forEach(function (track) {
	                track.stop();
	            });
	        }
	        self.localStream = null;
	    },

	    addIceCandidate: function addIceCandidate(candidate) {
	        var self = this;

	        if (!self.rtcPeerConnection) {
	            return;
	        }

	        _logger.debug('[WebRTC-API] Add ICE candidate: \n', candidate);

	        var _cands = _util.isArray(candidate) ? candidate : [];
	        !_util.isArray(candidate) && _cands.push(candidate);

	        for (var i = 0; i < _cands.length; i++) {
	            candidate = _cands[i];

	            self.rtcPeerConnection.addIceCandidate(new RTCIceCandidate(candidate)).then(self.onAddIceCandidateSuccess, self.onAddIceCandidateError);
	        }
	    },

	    setRemoteDescription: function setRemoteDescription(desc) {
	        var self = this;

	        _logger.debug('[WebRTC-API] setRemoteDescription start. ');

	        desc.sdp = desc.sdp.replace(/UDP\/TLS\/RTP\/SAVPF/g, "RTP/SAVPF");
	        _logger.debug('[WebRTC-API] setRemoteDescription.', desc);

	        desc = new RTCSessionDescription(desc);

	        return self.rtcPeerConnection.setRemoteDescription(desc).then(self.onSetRemoteSuccess, self.onSetSessionDescriptionError);
	    },

	    iceConnectionState: function iceConnectionState() {
	        var self = this;

	        return self.rtcPeerConnection.iceConnectionState;
	    },

	    onCreateMedia: function onCreateMedia() {
	        _logger.debug('[WebRTC-API] media created.');
	    },

	    _onGotRemoteStream: function _onGotRemoteStream(event) {
	        _logger.debug('[WebRTC-API] onGotRemoteStream.', event);

	        event.stream.getAudioTracks()[0].enabled = true;
	        event.stream.getVideoTracks()[0] && (event.stream.getVideoTracks()[0].enabled = this.streamType == "VIDEO");

	        this.onGotRemoteStream(event.stream, this.streamType);
	        _logger.debug('[WebRTC-API] received remote stream, you will see the other.');
	    },

	    onGotStream: function onGotStream(stream, streamType) {
	        _logger.debug('[WebRTC-API] on got a local stream : ' + streamType);
	    },

	    onSetRemoteSuccess: function onSetRemoteSuccess() {
	        _logger.info('[WebRTC-API] onSetRemoteSuccess complete');
	    },

	    onSetLocalSuccess: function onSetLocalSuccess() {
	        _logger.info('[WebRTC-API] setLocalDescription complete');
	    },

	    onAddIceCandidateSuccess: function onAddIceCandidateSuccess() {
	        _logger.debug('[WebRTC-API] addIceCandidate success');
	    },

	    onAddIceCandidateError: function onAddIceCandidateError(error) {
	        _logger.debug('[WebRTC-API] failed to add ICE Candidate: ' + error.toString());
	    },

	    onIceCandidate: function onIceCandidate(event) {
	        _logger.debug('[WebRTC-API] onIceCandidate : ICE candidate: \n' + event.candidate);
	    },

	    onIceStateChange: function onIceStateChange(event) {
	        _logger.debug('[WebRTC-API] onIceStateChange : ICE state change event: ', event);
	    },

	    onCreateSessionDescriptionError: function onCreateSessionDescriptionError(error) {
	        _logger.error('[WebRTC-API] Failed to create session description: ' + error.toString());
	    },

	    onCreateOfferSuccess: function onCreateOfferSuccess(desc) {
	        _logger.debug('[WebRTC-API] create offer success');
	    },

	    onCreatePRAnswerSuccess: function onCreatePRAnswerSuccess(desc) {
	        _logger.debug('[WebRTC-API] create answer success');
	    },

	    onCreateAnswerSuccess: function onCreateAnswerSuccess(desc) {
	        _logger.debug('[WebRTC-API] create answer success');
	    },

	    onSetSessionDescriptionError: function onSetSessionDescriptionError(error) {
	        _logger.error('[WebRTC-API] onSetSessionDescriptionError : Failed to set session description: ' + error.toString());
	    },

	    onSetLocalSessionDescriptionSuccess: function onSetLocalSessionDescriptionSuccess() {
	        _logger.debug('[WebRTC-API] onSetLocalSessionDescriptionSuccess : setLocalDescription complete');
	    }

	};

	module.exports = function (initConfigs) {
	    _util.extend(true, this, _WebRTC, initConfigs || {});
	};

/***/ },

/***/ 258:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * P2P
	 */
	var _util = __webpack_require__(253);
	var RouteTo = __webpack_require__(256).RouteTo;
	var _logger = _util.logger;

	var P2PRouteTo = RouteTo({
	    success: function success(result) {
	        _logger.debug("iq to server success", result);
	    },
	    fail: function fail(error) {
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

	    init: function init() {
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
	        self.api.onEvJoin = function () {
	            self._onEvJoin.apply(self, arguments);
	        };
	        self.api.onStreamControl = function () {
	            self._onStreamControl.apply(self, arguments);
	        };
	        self.webRtc.onIceCandidate = function () {
	            self._onIceCandidate.apply(self, arguments);
	        };
	        self.webRtc.onIceStateChange = function () {
	            self._onIceStateChange.apply(self, arguments);
	        };
	    },

	    _ping: function _ping() {
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

	    _onPing: function _onPing(from, options, rtkey, tsxId, fromSid) {
	        _logger.debug('_onPing from', fromSid);
	    },

	    initC: function initC(mediaStreamConstaints, accessSid) {
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

	    createLocalMedia: function createLocalMedia(mediaStreamConstaints) {
	        var self = this;

	        this.webRtc.createMedia(mediaStreamConstaints, function (webrtc, stream) {
	            webrtc.setLocalVideoSrcObject(stream);

	            self.webRtc.createRtcPeerConnection(self._rtcCfg);

	            self.webRtc.createOffer(function (offer) {
	                self._onGotWebRtcOffer(offer);
	            });
	        });
	    },

	    _onGotWebRtcOffer: function _onGotWebRtcOffer(offer) {
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

	    _onAcptC: function _onAcptC(from, options) {
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

	    _onEvJoin: function _onEvJoin(from, options, rtkey, tsxId, fromSid) {
	        var self = this;

	        _logger.debug('_onEvJoin from', fromSid, from);

	        self.onAcceptCall(from, options, options.enableVoice !== false, options.enableVideo !== false);
	    },

	    onAcceptCall: function onAcceptCall(from, options, enableVoice, enableVideo) {},

	    __onVoiceOrVideo: function __onVoiceOrVideo(from, options, fromSid) {
	        var self = this;

	        options.enableVoice === false ? self.onOtherUserOpenVoice(from, false) : self.onOtherUserOpenVoice(from, true);
	        options.enableVideo === false ? self.onOtherUserOpenVideo(from, false) : self.onOtherUserOpenVideo(from, true);
	    },

	    /*
	     * { verison : MSYNC_V1, compress_algorimth : 0, command : SYNC, payload : { meta : { id : 2326, to : easemob-demo#chatdemoui_xyj002@easemob.com, ns : CONFERENCE, payload : { session_id : xyj0011494320598055, operation : MEDIA_REQUEST, peer_name : xyj001, route_flag : 1, route_key : --X--, content : {"op":400,"callVersion":"2.0.0","sessId":"128542826909667328","rtcId":"Channel1494320598056","tsxId":"1494320622866-6","controlType":0}, control_type : PAUSE_VOICE } } } }
	     * PAUSE_VOICE(0, 0), RESUME_VOICE(1, 1), PAUSE_VIDEO(2, 2), RESUME_VIDEO(3, 3)
	     *
	     */
	    _onStreamControl: function _onStreamControl(from, options, rtkey, tsxId, fromSid) {
	        var self = this;
	        var controlType = options.controlType;

	        controlType === 0 && self.onOtherUserOpenVoice(from, false);
	        controlType === 1 && self.onOtherUserOpenVoice(from, true);
	        controlType === 2 && self.onOtherUserOpenVideo(from, false);
	        controlType === 3 && self.onOtherUserOpenVideo(from, true);

	        self.onStreamControl(from, options, rtkey, tsxId, fromSid);
	    },
	    onStreamControl: function onStreamControl(from, options, rtkey, tsxId, fromSid) {},

	    onOtherUserOpenVoice: function onOtherUserOpenVoice(from, opened) {
	        _logger.debug("from open:", opened, " voice .", from);
	    },
	    onOtherUserOpenVideo: function onOtherUserOpenVideo(from, opened) {
	        _logger.debug("from open:", opened, " voideo .", from);
	    },

	    _onAnsC: function _onAnsC(from, options) {
	        // answer
	        var self = this;

	        _logger.info("[WebRTC-API] _onAnsC : recv answer. ");

	        self.accepted = true;

	        options.sdp && self.webRtc.setRemoteDescription(options.sdp);

	        self.setRemoteSDP = true;
	        self._handRecvCandsOrSend(from, options);

	        self.__onVoiceOrVideo(from, options);
	    },

	    _onInitC: function _onInitC(from, options, rtkey, tsxId, fromSid) {
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

	        options.sdp && self.webRtc.setRemoteDescription(options.sdp).then(function () {

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

	                    setTimeout(function () {
	                        //由于 chrome 在 pranswer时，ice状态只是 checking，并不能像sdk那样 期待 connected 振铃；所以目前改为 发送完pranswer后，直接振铃
	                        _logger.info("[WebRTC-API] onRinging : after send pranswer. ", self.callee);
	                        self.onRinging(self.callee, self.streamType);
	                    }, 500);
	                });
	            } else {
	                setTimeout(function () {
	                    _logger.info("[WebRTC-API] onRinging : After iniC, cause by: not supported pranswer. ", self.callee);
	                    self.onRinging(self.callee, self.streamType);
	                }, 500);
	                self._ping();
	            }
	        });
	    },

	    _onGotWebRtcPRAnswer: function _onGotWebRtcPRAnswer(prAnswer) {
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

	    onRinging: function onRinging(caller, streamType) {},

	    accept: function accept() {
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
	        if (self.streamType == "VIDEO") {
	            constaints.video = true;
	        }

	        self.webRtc.createMedia(constaints, function (webrtc, stream) {
	            webrtc.setLocalVideoSrcObject(stream);

	            createAndSendAnswer();
	        });
	    },

	    _handRecvCandsOrSend: function _handRecvCandsOrSend(from, options) {
	        var self = this;

	        setTimeout(function () {
	            self._onTcklC(from, options);
	        }, 50);

	        setTimeout(function () {
	            self._onIceCandidate();
	        }, 50);
	    },

	    _onTcklC: function _onTcklC(from, options) {
	        // setRemoteSDP，才可以添加 添加 对方 cands
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

	    _onIceStateChange: function _onIceStateChange(event) {
	        var self = this;
	        event && _logger.debug("[WebRTC-API] " + self.webRtc.iceConnectionState() + " |||| ice state is " + event.target.iceConnectionState);

	        if (event && event.target.iceConnectionState == "closed") {
	            self.setLocalSDP = false;
	            self.setRemoteSDP = false;
	        }

	        self.api.onIceConnectionStateChange(self.webRtc.iceConnectionState());
	    },

	    _onIceCandidate: function _onIceCandidate(event) {
	        //在本地sdp set 发送完成后，发送 cands
	        var self = this;

	        if (self.setLocalSDP) {
	            var sendIceCandidate = function sendIceCandidate(candidate) {
	                _logger.debug("send ice candidate...");

	                var rt = new P2PRouteTo({
	                    to: self.callee,
	                    rtKey: self._rtKey
	                });

	                if (candidate) {
	                    self.api.tcklC(rt, self._sessId, self._rtcId, null, candidate);
	                }
	            };

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

	    termCall: function termCall(reason) {
	        var self = this;

	        self._pingIntervalId && window.clearInterval(self._pingIntervalId);

	        var rt = new P2PRouteTo({
	            to: self.callee,
	            rtKey: self._rtKey
	        });

	        var sendReason;
	        reason || !self.isCaller && !self.accepted && (sendReason = 'decline') || (sendReason = 'success');

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
	    _onTermC: function _onTermC(from, options) {
	        _logger.debug("[_onTermC] options.reason = " + options.reason);

	        var self = this;

	        self.hangup = true;

	        self.setLocalSDP = false;
	        self.setRemoteSDP = false;

	        self.termCall(options.reason);
	    },

	    onTermCall: function onTermCall() {
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

/***/ }

/******/ });