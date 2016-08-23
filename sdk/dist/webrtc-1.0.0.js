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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	__webpack_require__(211);

	var Util = __webpack_require__(212);
	var Call = __webpack_require__(213);

	window.WebIM = WebIM || {};
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(210)(module)))

/***/ },

/***/ 210:
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

/***/ 211:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var require;var require;"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	(function (f) {
	  if (( false ? "undefined" : _typeof(exports)) === "object" && typeof module !== "undefined") {
	    module.exports = f();
	  } else if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (f), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else {
	    var g;if (typeof window !== "undefined") {
	      g = window;
	    } else if (typeof global !== "undefined") {
	      g = global;
	    } else if (typeof self !== "undefined") {
	      g = self;
	    } else {
	      g = this;
	    }g.adapter = f();
	  }
	})(function () {
	  var define, module, exports;return function e(t, n, r) {
	    function s(o, u) {
	      if (!n[o]) {
	        if (!t[o]) {
	          var a = typeof require == "function" && require;if (!u && a) return require(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
	        }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
	          var n = t[o][1][e];return s(n ? n : e);
	        }, l, l.exports, e, t, n, r);
	      }return n[o].exports;
	    }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
	      s(r[o]);
	    }return s;
	  }({ 1: [function (require, module, exports) {
	      /*
	       *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
	       *
	       *  Use of this source code is governed by a BSD-style license
	       *  that can be found in the LICENSE file in the root of the source
	       *  tree.
	       */
	      /* eslint-env node */

	      'use strict';

	      // Shimming starts here.

	      (function () {
	        // Utils.
	        var logging = require('./utils').log;
	        var browserDetails = require('./utils').browserDetails;
	        // Export to the adapter global object visible in the browser.
	        module.exports.browserDetails = browserDetails;
	        module.exports.extractVersion = require('./utils').extractVersion;
	        module.exports.disableLog = require('./utils').disableLog;

	        // Comment out the line below if you want logging to occur, including logging
	        // for the switch statement below. Can also be turned on in the browser via
	        // adapter.disableLog(false), but then logging from the switch statement below
	        // will not appear.
	        require('./utils').disableLog(true);

	        // Browser shims.
	        var chromeShim = require('./chrome/chrome_shim') || null;
	        var edgeShim = require('./edge/edge_shim') || null;
	        var firefoxShim = require('./firefox/firefox_shim') || null;
	        var safariShim = require('./safari/safari_shim') || null;

	        // Shim browser if found.
	        switch (browserDetails.browser) {
	          case 'opera': // fallthrough as it uses chrome shims
	          case 'chrome':
	            if (!chromeShim || !chromeShim.shimPeerConnection) {
	              logging('Chrome shim is not included in this adapter release.');
	              return;
	            }
	            logging('adapter.js shimming chrome.');
	            // Export to the adapter global object visible in the browser.
	            module.exports.browserShim = chromeShim;

	            chromeShim.shimGetUserMedia();
	            chromeShim.shimSourceObject();
	            chromeShim.shimPeerConnection();
	            chromeShim.shimOnTrack();
	            break;
	          case 'firefox':
	            if (!firefoxShim || !firefoxShim.shimPeerConnection) {
	              logging('Firefox shim is not included in this adapter release.');
	              return;
	            }
	            logging('adapter.js shimming firefox.');
	            // Export to the adapter global object visible in the browser.
	            module.exports.browserShim = firefoxShim;

	            firefoxShim.shimGetUserMedia();
	            firefoxShim.shimSourceObject();
	            firefoxShim.shimPeerConnection();
	            firefoxShim.shimOnTrack();
	            break;
	          case 'edge':
	            if (!edgeShim || !edgeShim.shimPeerConnection) {
	              logging('MS edge shim is not included in this adapter release.');
	              return;
	            }
	            logging('adapter.js shimming edge.');
	            // Export to the adapter global object visible in the browser.
	            module.exports.browserShim = edgeShim;

	            edgeShim.shimPeerConnection();
	            break;
	          case 'safari':
	            if (!safariShim) {
	              logging('Safari shim is not included in this adapter release.');
	              return;
	            }
	            logging('adapter.js shimming safari.');
	            // Export to the adapter global object visible in the browser.
	            module.exports.browserShim = safariShim;

	            safariShim.shimGetUserMedia();
	            break;
	          default:
	            logging('Unsupported browser!');
	        }
	      })();
	    }, { "./chrome/chrome_shim": 2, "./edge/edge_shim": 5, "./firefox/firefox_shim": 6, "./safari/safari_shim": 8, "./utils": 9 }], 2: [function (require, module, exports) {
	      /*
	       *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
	       *
	       *  Use of this source code is governed by a BSD-style license
	       *  that can be found in the LICENSE file in the root of the source
	       *  tree.
	       */
	      /* eslint-env node */
	      'use strict';

	      var logging = require('../utils.js').log;
	      var browserDetails = require('../utils.js').browserDetails;

	      var chromeShim = {
	        shimOnTrack: function shimOnTrack() {
	          if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && window.RTCPeerConnection && !('ontrack' in window.RTCPeerConnection.prototype)) {
	            Object.defineProperty(window.RTCPeerConnection.prototype, 'ontrack', {
	              get: function get() {
	                return this._ontrack;
	              },
	              set: function set(f) {
	                var self = this;
	                if (this._ontrack) {
	                  this.removeEventListener('track', this._ontrack);
	                  this.removeEventListener('addstream', this._ontrackpoly);
	                }
	                this.addEventListener('track', this._ontrack = f);
	                this.addEventListener('addstream', this._ontrackpoly = function (e) {
	                  // onaddstream does not fire when a track is added to an existing
	                  // stream. But stream.onaddtrack is implemented so we use that.
	                  e.stream.addEventListener('addtrack', function (te) {
	                    var event = new Event('track');
	                    event.track = te.track;
	                    event.receiver = { track: te.track };
	                    event.streams = [e.stream];
	                    self.dispatchEvent(event);
	                  });
	                  e.stream.getTracks().forEach(function (track) {
	                    var event = new Event('track');
	                    event.track = track;
	                    event.receiver = { track: track };
	                    event.streams = [e.stream];
	                    this.dispatchEvent(event);
	                  }.bind(this));
	                }.bind(this));
	              }
	            });
	          }
	        },

	        shimSourceObject: function shimSourceObject() {
	          if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
	            if (window.HTMLMediaElement && !('srcObject' in window.HTMLMediaElement.prototype)) {
	              // Shim the srcObject property, once, when HTMLMediaElement is found.
	              Object.defineProperty(window.HTMLMediaElement.prototype, 'srcObject', {
	                get: function get() {
	                  return this._srcObject;
	                },
	                set: function set(stream) {
	                  var self = this;
	                  // Use _srcObject as a private property for this shim
	                  this._srcObject = stream;
	                  if (this.src) {
	                    URL.revokeObjectURL(this.src);
	                  }

	                  if (!stream) {
	                    this.src = '';
	                    return;
	                  }
	                  this.src = URL.createObjectURL(stream);
	                  // We need to recreate the blob url when a track is added or
	                  // removed. Doing it manually since we want to avoid a recursion.
	                  stream.addEventListener('addtrack', function () {
	                    if (self.src) {
	                      URL.revokeObjectURL(self.src);
	                    }
	                    self.src = URL.createObjectURL(stream);
	                  });
	                  stream.addEventListener('removetrack', function () {
	                    if (self.src) {
	                      URL.revokeObjectURL(self.src);
	                    }
	                    self.src = URL.createObjectURL(stream);
	                  });
	                }
	              });
	            }
	          }
	        },

	        shimPeerConnection: function shimPeerConnection() {
	          // The RTCPeerConnection object.
	          window.RTCPeerConnection = function (pcConfig, pcConstraints) {
	            // Translate iceTransportPolicy to iceTransports,
	            // see https://code.google.com/p/webrtc/issues/detail?id=4869
	            logging('PeerConnection');
	            if (pcConfig && pcConfig.iceTransportPolicy) {
	              pcConfig.iceTransports = pcConfig.iceTransportPolicy;
	            }

	            var pc = new webkitRTCPeerConnection(pcConfig, pcConstraints);
	            var origGetStats = pc.getStats.bind(pc);
	            pc.getStats = function (selector, successCallback, errorCallback) {
	              var self = this;
	              var args = arguments;

	              // If selector is a function then we are in the old style stats so just
	              // pass back the original getStats format to avoid breaking old users.
	              if (arguments.length > 0 && typeof selector === 'function') {
	                return origGetStats(selector, successCallback);
	              }

	              var fixChromeStats_ = function fixChromeStats_(response) {
	                var standardReport = {};
	                var reports = response.result();
	                reports.forEach(function (report) {
	                  var standardStats = {
	                    id: report.id,
	                    timestamp: report.timestamp,
	                    type: report.type
	                  };
	                  report.names().forEach(function (name) {
	                    standardStats[name] = report.stat(name);
	                  });
	                  standardReport[standardStats.id] = standardStats;
	                });

	                return standardReport;
	              };

	              if (arguments.length >= 2) {
	                var successCallbackWrapper_ = function successCallbackWrapper_(response) {
	                  args[1](fixChromeStats_(response));
	                };

	                return origGetStats.apply(this, [successCallbackWrapper_, arguments[0]]);
	              }

	              // promise-support
	              return new Promise(function (resolve, reject) {
	                if (args.length === 1 && (typeof selector === "undefined" ? "undefined" : _typeof(selector)) === 'object') {
	                  origGetStats.apply(self, [function (response) {
	                    resolve.apply(null, [fixChromeStats_(response)]);
	                  }, reject]);
	                } else {
	                  origGetStats.apply(self, [resolve, reject]);
	                }
	              });
	            };

	            return pc;
	          };
	          window.RTCPeerConnection.prototype = webkitRTCPeerConnection.prototype;

	          // wrap static methods. Currently just generateCertificate.
	          if (webkitRTCPeerConnection.generateCertificate) {
	            Object.defineProperty(window.RTCPeerConnection, 'generateCertificate', {
	              get: function get() {
	                return webkitRTCPeerConnection.generateCertificate;
	              }
	            });
	          }

	          // add promise support
	          ['createOffer', 'createAnswer'].forEach(function (method) {
	            var nativeMethod = webkitRTCPeerConnection.prototype[method];
	            webkitRTCPeerConnection.prototype[method] = function () {
	              var self = this;
	              if (arguments.length < 1 || arguments.length === 1 && _typeof(arguments[0]) === 'object') {
	                var opts = arguments.length === 1 ? arguments[0] : undefined;
	                return new Promise(function (resolve, reject) {
	                  nativeMethod.apply(self, [resolve, reject, opts]);
	                });
	              }
	              return nativeMethod.apply(this, arguments);
	            };
	          });

	          ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(function (method) {
	            var nativeMethod = webkitRTCPeerConnection.prototype[method];
	            webkitRTCPeerConnection.prototype[method] = function () {
	              var args = arguments;
	              var self = this;
	              args[0] = new (method === 'addIceCandidate' ? RTCIceCandidate : RTCSessionDescription)(args[0]);
	              return new Promise(function (resolve, reject) {
	                nativeMethod.apply(self, [args[0], function () {
	                  resolve();
	                  if (args.length >= 2) {
	                    args[1].apply(null, []);
	                  }
	                }, function (err) {
	                  reject(err);
	                  if (args.length >= 3) {
	                    args[2].apply(null, [err]);
	                  }
	                }]);
	              });
	            };
	          });
	        },

	        // Attach a media stream to an element.
	        attachMediaStream: function attachMediaStream(element, stream) {
	          logging('DEPRECATED, attachMediaStream will soon be removed.');
	          if (browserDetails.version >= 43) {
	            element.srcObject = stream;
	          } else if (typeof element.src !== 'undefined') {
	            element.src = URL.createObjectURL(stream);
	          } else {
	            logging('Error attaching stream to element.');
	          }
	        },

	        reattachMediaStream: function reattachMediaStream(to, from) {
	          logging('DEPRECATED, reattachMediaStream will soon be removed.');
	          if (browserDetails.version >= 43) {
	            to.srcObject = from.srcObject;
	          } else {
	            to.src = from.src;
	          }
	        }
	      };

	      // Expose public methods.
	      module.exports = {
	        shimOnTrack: chromeShim.shimOnTrack,
	        shimSourceObject: chromeShim.shimSourceObject,
	        shimPeerConnection: chromeShim.shimPeerConnection,
	        shimGetUserMedia: require('./getusermedia'),
	        attachMediaStream: chromeShim.attachMediaStream,
	        reattachMediaStream: chromeShim.reattachMediaStream
	      };
	    }, { "../utils.js": 9, "./getusermedia": 3 }], 3: [function (require, module, exports) {
	      /*
	       *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
	       *
	       *  Use of this source code is governed by a BSD-style license
	       *  that can be found in the LICENSE file in the root of the source
	       *  tree.
	       */
	      /* eslint-env node */
	      'use strict';

	      var logging = require('../utils.js').log;

	      // Expose public methods.
	      module.exports = function () {
	        var constraintsToChrome_ = function constraintsToChrome_(c) {
	          if ((typeof c === "undefined" ? "undefined" : _typeof(c)) !== 'object' || c.mandatory || c.optional) {
	            return c;
	          }
	          var cc = {};
	          Object.keys(c).forEach(function (key) {
	            if (key === 'require' || key === 'advanced' || key === 'mediaSource') {
	              return;
	            }
	            var r = _typeof(c[key]) === 'object' ? c[key] : { ideal: c[key] };
	            if (r.exact !== undefined && typeof r.exact === 'number') {
	              r.min = r.max = r.exact;
	            }
	            var oldname_ = function oldname_(prefix, name) {
	              if (prefix) {
	                return prefix + name.charAt(0).toUpperCase() + name.slice(1);
	              }
	              return name === 'deviceId' ? 'sourceId' : name;
	            };
	            if (r.ideal !== undefined) {
	              cc.optional = cc.optional || [];
	              var oc = {};
	              if (typeof r.ideal === 'number') {
	                oc[oldname_('min', key)] = r.ideal;
	                cc.optional.push(oc);
	                oc = {};
	                oc[oldname_('max', key)] = r.ideal;
	                cc.optional.push(oc);
	              } else {
	                oc[oldname_('', key)] = r.ideal;
	                cc.optional.push(oc);
	              }
	            }
	            if (r.exact !== undefined && typeof r.exact !== 'number') {
	              cc.mandatory = cc.mandatory || {};
	              cc.mandatory[oldname_('', key)] = r.exact;
	            } else {
	              ['min', 'max'].forEach(function (mix) {
	                if (r[mix] !== undefined) {
	                  cc.mandatory = cc.mandatory || {};
	                  cc.mandatory[oldname_(mix, key)] = r[mix];
	                }
	              });
	            }
	          });
	          if (c.advanced) {
	            cc.optional = (cc.optional || []).concat(c.advanced);
	          }
	          return cc;
	        };

	        var getUserMedia_ = function getUserMedia_(constraints, onSuccess, onError) {
	          constraints = JSON.parse(JSON.stringify(constraints));
	          if (constraints.audio) {
	            constraints.audio = constraintsToChrome_(constraints.audio);
	          }
	          if (constraints.video) {
	            constraints.video = constraintsToChrome_(constraints.video);
	          }
	          logging('chrome: ' + JSON.stringify(constraints));
	          return navigator.webkitGetUserMedia(constraints, onSuccess, onError);
	        };
	        navigator.getUserMedia = getUserMedia_;

	        // Returns the result of getUserMedia as a Promise.
	        var getUserMediaPromise_ = function getUserMediaPromise_(constraints) {
	          return new Promise(function (resolve, reject) {
	            navigator.getUserMedia(constraints, resolve, reject);
	          });
	        };

	        if (!navigator.mediaDevices) {
	          navigator.mediaDevices = {
	            getUserMedia: getUserMediaPromise_,
	            enumerateDevices: function enumerateDevices() {
	              return new Promise(function (resolve) {
	                var kinds = { audio: 'audioinput', video: 'videoinput' };
	                return MediaStreamTrack.getSources(function (devices) {
	                  resolve(devices.map(function (device) {
	                    return { label: device.label,
	                      kind: kinds[device.kind],
	                      deviceId: device.id,
	                      groupId: '' };
	                  }));
	                });
	              });
	            }
	          };
	        }

	        // A shim for getUserMedia method on the mediaDevices object.
	        // TODO(KaptenJansson) remove once implemented in Chrome stable.
	        if (!navigator.mediaDevices.getUserMedia) {
	          navigator.mediaDevices.getUserMedia = function (constraints) {
	            return getUserMediaPromise_(constraints);
	          };
	        } else {
	          // Even though Chrome 45 has navigator.mediaDevices and a getUserMedia
	          // function which returns a Promise, it does not accept spec-style
	          // constraints.
	          var origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
	          navigator.mediaDevices.getUserMedia = function (c) {
	            if (c) {
	              logging('spec:   ' + JSON.stringify(c)); // whitespace for alignment
	              c.audio = constraintsToChrome_(c.audio);
	              c.video = constraintsToChrome_(c.video);
	              logging('chrome: ' + JSON.stringify(c));
	            }
	            return origGetUserMedia(c);
	          }.bind(this);
	        }

	        // Dummy devicechange event methods.
	        // TODO(KaptenJansson) remove once implemented in Chrome stable.
	        if (typeof navigator.mediaDevices.addEventListener === 'undefined') {
	          navigator.mediaDevices.addEventListener = function () {
	            logging('Dummy mediaDevices.addEventListener called.');
	          };
	        }
	        if (typeof navigator.mediaDevices.removeEventListener === 'undefined') {
	          navigator.mediaDevices.removeEventListener = function () {
	            logging('Dummy mediaDevices.removeEventListener called.');
	          };
	        }
	      };
	    }, { "../utils.js": 9 }], 4: [function (require, module, exports) {
	      /*
	       *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
	       *
	       *  Use of this source code is governed by a BSD-style license
	       *  that can be found in the LICENSE file in the root of the source
	       *  tree.
	       */
	      /* eslint-env node */
	      'use strict';

	      // SDP helpers.

	      var SDPUtils = {};

	      // Generate an alphanumeric identifier for cname or mids.
	      // TODO: use UUIDs instead? https://gist.github.com/jed/982883
	      SDPUtils.generateIdentifier = function () {
	        return Math.random().toString(36).substr(2, 10);
	      };

	      // The RTCP CNAME used by all peerconnections from the same JS.
	      SDPUtils.localCName = SDPUtils.generateIdentifier();

	      // Splits SDP into lines, dealing with both CRLF and LF.
	      SDPUtils.splitLines = function (blob) {
	        return blob.trim().split('\n').map(function (line) {
	          return line.trim();
	        });
	      };
	      // Splits SDP into sessionpart and mediasections. Ensures CRLF.
	      SDPUtils.splitSections = function (blob) {
	        var parts = blob.split('\nm=');
	        return parts.map(function (part, index) {
	          return (index > 0 ? 'm=' + part : part).trim() + '\r\n';
	        });
	      };

	      // Returns lines that start with a certain prefix.
	      SDPUtils.matchPrefix = function (blob, prefix) {
	        return SDPUtils.splitLines(blob).filter(function (line) {
	          return line.indexOf(prefix) === 0;
	        });
	      };

	      // Parses an ICE candidate line. Sample input:
	      // candidate:702786350 2 udp 41819902 8.8.8.8 60769 typ relay raddr 8.8.8.8
	      // rport 55996"
	      SDPUtils.parseCandidate = function (line) {
	        var parts;
	        // Parse both variants.
	        if (line.indexOf('a=candidate:') === 0) {
	          parts = line.substring(12).split(' ');
	        } else {
	          parts = line.substring(10).split(' ');
	        }

	        var candidate = {
	          foundation: parts[0],
	          component: parts[1],
	          protocol: parts[2].toLowerCase(),
	          priority: parseInt(parts[3], 10),
	          ip: parts[4],
	          port: parseInt(parts[5], 10),
	          // skip parts[6] == 'typ'
	          type: parts[7]
	        };

	        for (var i = 8; i < parts.length; i += 2) {
	          switch (parts[i]) {
	            case 'raddr':
	              candidate.relatedAddress = parts[i + 1];
	              break;
	            case 'rport':
	              candidate.relatedPort = parseInt(parts[i + 1], 10);
	              break;
	            case 'tcptype':
	              candidate.tcpType = parts[i + 1];
	              break;
	            default:
	              // Unknown extensions are silently ignored.
	              break;
	          }
	        }
	        return candidate;
	      };

	      // Translates a candidate object into SDP candidate attribute.
	      SDPUtils.writeCandidate = function (candidate) {
	        var sdp = [];
	        sdp.push(candidate.foundation);
	        sdp.push(candidate.component);
	        sdp.push(candidate.protocol.toUpperCase());
	        sdp.push(candidate.priority);
	        sdp.push(candidate.ip);
	        sdp.push(candidate.port);

	        var type = candidate.type;
	        sdp.push('typ');
	        sdp.push(type);
	        if (type !== 'host' && candidate.relatedAddress && candidate.relatedPort) {
	          sdp.push('raddr');
	          sdp.push(candidate.relatedAddress); // was: relAddr
	          sdp.push('rport');
	          sdp.push(candidate.relatedPort); // was: relPort
	        }
	        if (candidate.tcpType && candidate.protocol.toLowerCase() === 'tcp') {
	          sdp.push('tcptype');
	          sdp.push(candidate.tcpType);
	        }
	        return 'candidate:' + sdp.join(' ');
	      };

	      // Parses an rtpmap line, returns RTCRtpCoddecParameters. Sample input:
	      // a=rtpmap:111 opus/48000/2
	      SDPUtils.parseRtpMap = function (line) {
	        var parts = line.substr(9).split(' ');
	        var parsed = {
	          payloadType: parseInt(parts.shift(), 10) // was: id
	        };

	        parts = parts[0].split('/');

	        parsed.name = parts[0];
	        parsed.clockRate = parseInt(parts[1], 10); // was: clockrate
	        // was: channels
	        parsed.numChannels = parts.length === 3 ? parseInt(parts[2], 10) : 1;
	        return parsed;
	      };

	      // Generate an a=rtpmap line from RTCRtpCodecCapability or
	      // RTCRtpCodecParameters.
	      SDPUtils.writeRtpMap = function (codec) {
	        var pt = codec.payloadType;
	        if (codec.preferredPayloadType !== undefined) {
	          pt = codec.preferredPayloadType;
	        }
	        return 'a=rtpmap:' + pt + ' ' + codec.name + '/' + codec.clockRate + (codec.numChannels !== 1 ? '/' + codec.numChannels : '') + '\r\n';
	      };

	      // Parses an a=extmap line (headerextension from RFC 5285). Sample input:
	      // a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
	      SDPUtils.parseExtmap = function (line) {
	        var parts = line.substr(9).split(' ');
	        return {
	          id: parseInt(parts[0], 10),
	          uri: parts[1]
	        };
	      };

	      // Generates a=extmap line from RTCRtpHeaderExtensionParameters or
	      // RTCRtpHeaderExtension.
	      SDPUtils.writeExtmap = function (headerExtension) {
	        return 'a=extmap:' + (headerExtension.id || headerExtension.preferredId) + ' ' + headerExtension.uri + '\r\n';
	      };

	      // Parses an ftmp line, returns dictionary. Sample input:
	      // a=fmtp:96 vbr=on;cng=on
	      // Also deals with vbr=on; cng=on
	      SDPUtils.parseFmtp = function (line) {
	        var parsed = {};
	        var kv;
	        var parts = line.substr(line.indexOf(' ') + 1).split(';');
	        for (var j = 0; j < parts.length; j++) {
	          kv = parts[j].trim().split('=');
	          parsed[kv[0].trim()] = kv[1];
	        }
	        return parsed;
	      };

	      // Generates an a=ftmp line from RTCRtpCodecCapability or RTCRtpCodecParameters.
	      SDPUtils.writeFmtp = function (codec) {
	        var line = '';
	        var pt = codec.payloadType;
	        if (codec.preferredPayloadType !== undefined) {
	          pt = codec.preferredPayloadType;
	        }
	        if (codec.parameters && Object.keys(codec.parameters).length) {
	          var params = [];
	          Object.keys(codec.parameters).forEach(function (param) {
	            params.push(param + '=' + codec.parameters[param]);
	          });
	          line += 'a=fmtp:' + pt + ' ' + params.join(';') + '\r\n';
	        }
	        return line;
	      };

	      // Parses an rtcp-fb line, returns RTCPRtcpFeedback object. Sample input:
	      // a=rtcp-fb:98 nack rpsi
	      SDPUtils.parseRtcpFb = function (line) {
	        var parts = line.substr(line.indexOf(' ') + 1).split(' ');
	        return {
	          type: parts.shift(),
	          parameter: parts.join(' ')
	        };
	      };
	      // Generate a=rtcp-fb lines from RTCRtpCodecCapability or RTCRtpCodecParameters.
	      SDPUtils.writeRtcpFb = function (codec) {
	        var lines = '';
	        var pt = codec.payloadType;
	        if (codec.preferredPayloadType !== undefined) {
	          pt = codec.preferredPayloadType;
	        }
	        if (codec.rtcpFeedback && codec.rtcpFeedback.length) {
	          // FIXME: special handling for trr-int?
	          codec.rtcpFeedback.forEach(function (fb) {
	            lines += 'a=rtcp-fb:' + pt + ' ' + fb.type + ' ' + fb.parameter + '\r\n';
	          });
	        }
	        return lines;
	      };

	      // Parses an RFC 5576 ssrc media attribute. Sample input:
	      // a=ssrc:3735928559 cname:something
	      SDPUtils.parseSsrcMedia = function (line) {
	        var sp = line.indexOf(' ');
	        var parts = {
	          ssrc: parseInt(line.substr(7, sp - 7), 10)
	        };
	        var colon = line.indexOf(':', sp);
	        if (colon > -1) {
	          parts.attribute = line.substr(sp + 1, colon - sp - 1);
	          parts.value = line.substr(colon + 1);
	        } else {
	          parts.attribute = line.substr(sp + 1);
	        }
	        return parts;
	      };

	      // Extracts DTLS parameters from SDP media section or sessionpart.
	      // FIXME: for consistency with other functions this should only
	      //   get the fingerprint line as input. See also getIceParameters.
	      SDPUtils.getDtlsParameters = function (mediaSection, sessionpart) {
	        var lines = SDPUtils.splitLines(mediaSection);
	        // Search in session part, too.
	        lines = lines.concat(SDPUtils.splitLines(sessionpart));
	        var fpLine = lines.filter(function (line) {
	          return line.indexOf('a=fingerprint:') === 0;
	        })[0].substr(14);
	        // Note: a=setup line is ignored since we use the 'auto' role.
	        var dtlsParameters = {
	          role: 'auto',
	          fingerprints: [{
	            algorithm: fpLine.split(' ')[0],
	            value: fpLine.split(' ')[1]
	          }]
	        };
	        return dtlsParameters;
	      };

	      // Serializes DTLS parameters to SDP.
	      SDPUtils.writeDtlsParameters = function (params, setupType) {
	        var sdp = 'a=setup:' + setupType + '\r\n';
	        params.fingerprints.forEach(function (fp) {
	          sdp += 'a=fingerprint:' + fp.algorithm + ' ' + fp.value + '\r\n';
	        });
	        return sdp;
	      };
	      // Parses ICE information from SDP media section or sessionpart.
	      // FIXME: for consistency with other functions this should only
	      //   get the ice-ufrag and ice-pwd lines as input.
	      SDPUtils.getIceParameters = function (mediaSection, sessionpart) {
	        var lines = SDPUtils.splitLines(mediaSection);
	        // Search in session part, too.
	        lines = lines.concat(SDPUtils.splitLines(sessionpart));
	        var iceParameters = {
	          usernameFragment: lines.filter(function (line) {
	            return line.indexOf('a=ice-ufrag:') === 0;
	          })[0].substr(12),
	          password: lines.filter(function (line) {
	            return line.indexOf('a=ice-pwd:') === 0;
	          })[0].substr(10)
	        };
	        return iceParameters;
	      };

	      // Serializes ICE parameters to SDP.
	      SDPUtils.writeIceParameters = function (params) {
	        return 'a=ice-ufrag:' + params.usernameFragment + '\r\n' + 'a=ice-pwd:' + params.password + '\r\n';
	      };

	      // Parses the SDP media section and returns RTCRtpParameters.
	      SDPUtils.parseRtpParameters = function (mediaSection) {
	        var description = {
	          codecs: [],
	          headerExtensions: [],
	          fecMechanisms: [],
	          rtcp: []
	        };
	        var lines = SDPUtils.splitLines(mediaSection);
	        var mline = lines[0].split(' ');
	        for (var i = 3; i < mline.length; i++) {
	          // find all codecs from mline[3..]
	          var pt = mline[i];
	          var rtpmapline = SDPUtils.matchPrefix(mediaSection, 'a=rtpmap:' + pt + ' ')[0];
	          if (rtpmapline) {
	            var codec = SDPUtils.parseRtpMap(rtpmapline);
	            var fmtps = SDPUtils.matchPrefix(mediaSection, 'a=fmtp:' + pt + ' ');
	            // Only the first a=fmtp:<pt> is considered.
	            codec.parameters = fmtps.length ? SDPUtils.parseFmtp(fmtps[0]) : {};
	            codec.rtcpFeedback = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-fb:' + pt + ' ').map(SDPUtils.parseRtcpFb);
	            description.codecs.push(codec);
	            // parse FEC mechanisms from rtpmap lines.
	            switch (codec.name.toUpperCase()) {
	              case 'RED':
	              case 'ULPFEC':
	                description.fecMechanisms.push(codec.name.toUpperCase());
	                break;
	              default:
	                // only RED and ULPFEC are recognized as FEC mechanisms.
	                break;
	            }
	          }
	        }
	        SDPUtils.matchPrefix(mediaSection, 'a=extmap:').forEach(function (line) {
	          description.headerExtensions.push(SDPUtils.parseExtmap(line));
	        });
	        // FIXME: parse rtcp.
	        return description;
	      };

	      // Generates parts of the SDP media section describing the capabilities /
	      // parameters.
	      SDPUtils.writeRtpDescription = function (kind, caps) {
	        var sdp = '';

	        // Build the mline.
	        sdp += 'm=' + kind + ' ';
	        sdp += caps.codecs.length > 0 ? '9' : '0'; // reject if no codecs.
	        sdp += ' UDP/TLS/RTP/SAVPF ';
	        sdp += caps.codecs.map(function (codec) {
	          if (codec.preferredPayloadType !== undefined) {
	            return codec.preferredPayloadType;
	          }
	          return codec.payloadType;
	        }).join(' ') + '\r\n';

	        sdp += 'c=IN IP4 0.0.0.0\r\n';
	        sdp += 'a=rtcp:9 IN IP4 0.0.0.0\r\n';

	        // Add a=rtpmap lines for each codec. Also fmtp and rtcp-fb.
	        caps.codecs.forEach(function (codec) {
	          sdp += SDPUtils.writeRtpMap(codec);
	          sdp += SDPUtils.writeFmtp(codec);
	          sdp += SDPUtils.writeRtcpFb(codec);
	        });
	        // FIXME: add headerExtensions, fecMechanismş and rtcp.
	        sdp += 'a=rtcp-mux\r\n';
	        return sdp;
	      };

	      // Parses the SDP media section and returns an array of
	      // RTCRtpEncodingParameters.
	      SDPUtils.parseRtpEncodingParameters = function (mediaSection) {
	        var encodingParameters = [];
	        var description = SDPUtils.parseRtpParameters(mediaSection);
	        var hasRed = description.fecMechanisms.indexOf('RED') !== -1;
	        var hasUlpfec = description.fecMechanisms.indexOf('ULPFEC') !== -1;

	        // filter a=ssrc:... cname:, ignore PlanB-msid
	        var ssrcs = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:').map(function (line) {
	          return SDPUtils.parseSsrcMedia(line);
	        }).filter(function (parts) {
	          return parts.attribute === 'cname';
	        });
	        var primarySsrc = ssrcs.length > 0 && ssrcs[0].ssrc;
	        var secondarySsrc;

	        var flows = SDPUtils.matchPrefix(mediaSection, 'a=ssrc-group:FID').map(function (line) {
	          var parts = line.split(' ');
	          parts.shift();
	          return parts.map(function (part) {
	            return parseInt(part, 10);
	          });
	        });
	        if (flows.length > 0 && flows[0].length > 1 && flows[0][0] === primarySsrc) {
	          secondarySsrc = flows[0][1];
	        }

	        description.codecs.forEach(function (codec) {
	          if (codec.name.toUpperCase() === 'RTX' && codec.parameters.apt) {
	            var encParam = {
	              ssrc: primarySsrc,
	              codecPayloadType: parseInt(codec.parameters.apt, 10),
	              rtx: {
	                ssrc: secondarySsrc
	              }
	            };
	            encodingParameters.push(encParam);
	            if (hasRed) {
	              encParam = JSON.parse(JSON.stringify(encParam));
	              encParam.fec = {
	                ssrc: secondarySsrc,
	                mechanism: hasUlpfec ? 'red+ulpfec' : 'red'
	              };
	              encodingParameters.push(encParam);
	            }
	          }
	        });
	        if (encodingParameters.length === 0 && primarySsrc) {
	          encodingParameters.push({
	            ssrc: primarySsrc
	          });
	        }

	        // we support both b=AS and b=TIAS but interpret AS as TIAS.
	        var bandwidth = SDPUtils.matchPrefix(mediaSection, 'b=');
	        if (bandwidth.length) {
	          if (bandwidth[0].indexOf('b=TIAS:') === 0) {
	            bandwidth = parseInt(bandwidth[0].substr(7), 10);
	          } else if (bandwidth[0].indexOf('b=AS:') === 0) {
	            bandwidth = parseInt(bandwidth[0].substr(5), 10);
	          }
	          encodingParameters.forEach(function (params) {
	            params.maxBitrate = bandwidth;
	          });
	        }
	        return encodingParameters;
	      };

	      SDPUtils.writeSessionBoilerplate = function () {
	        // FIXME: sess-id should be an NTP timestamp.
	        return 'v=0\r\n' + 'o=thisisadapterortc 8169639915646943137 2 IN IP4 127.0.0.1\r\n' + 's=-\r\n' + 't=0 0\r\n';
	      };

	      SDPUtils.writeMediaSection = function (transceiver, caps, type, stream) {
	        var sdp = SDPUtils.writeRtpDescription(transceiver.kind, caps);

	        // Map ICE parameters (ufrag, pwd) to SDP.
	        sdp += SDPUtils.writeIceParameters(transceiver.iceGatherer.getLocalParameters());

	        // Map DTLS parameters to SDP.
	        sdp += SDPUtils.writeDtlsParameters(transceiver.dtlsTransport.getLocalParameters(), type === 'offer' ? 'actpass' : 'active');

	        sdp += 'a=mid:' + transceiver.mid + '\r\n';

	        if (transceiver.rtpSender && transceiver.rtpReceiver) {
	          sdp += 'a=sendrecv\r\n';
	        } else if (transceiver.rtpSender) {
	          sdp += 'a=sendonly\r\n';
	        } else if (transceiver.rtpReceiver) {
	          sdp += 'a=recvonly\r\n';
	        } else {
	          sdp += 'a=inactive\r\n';
	        }

	        // FIXME: for RTX there might be multiple SSRCs. Not implemented in Edge yet.
	        if (transceiver.rtpSender) {
	          var msid = 'msid:' + stream.id + ' ' + transceiver.rtpSender.track.id + '\r\n';
	          sdp += 'a=' + msid;
	          sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc + ' ' + msid;
	        }
	        // FIXME: this should be written by writeRtpDescription.
	        sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc + ' cname:' + SDPUtils.localCName + '\r\n';
	        return sdp;
	      };

	      // Gets the direction from the mediaSection or the sessionpart.
	      SDPUtils.getDirection = function (mediaSection, sessionpart) {
	        // Look for sendrecv, sendonly, recvonly, inactive, default to sendrecv.
	        var lines = SDPUtils.splitLines(mediaSection);
	        for (var i = 0; i < lines.length; i++) {
	          switch (lines[i]) {
	            case 'a=sendrecv':
	            case 'a=sendonly':
	            case 'a=recvonly':
	            case 'a=inactive':
	              return lines[i].substr(2);
	            default:
	            // FIXME: What should happen here?
	          }
	        }
	        if (sessionpart) {
	          return SDPUtils.getDirection(sessionpart);
	        }
	        return 'sendrecv';
	      };

	      // Expose public methods.
	      module.exports = SDPUtils;
	    }, {}], 5: [function (require, module, exports) {
	      /*
	       *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
	       *
	       *  Use of this source code is governed by a BSD-style license
	       *  that can be found in the LICENSE file in the root of the source
	       *  tree.
	       */
	      /* eslint-env node */
	      'use strict';

	      var SDPUtils = require('./edge_sdp');
	      var logging = require('../utils').log;

	      var edgeShim = {
	        shimPeerConnection: function shimPeerConnection() {
	          if (window.RTCIceGatherer) {
	            // ORTC defines an RTCIceCandidate object but no constructor.
	            // Not implemented in Edge.
	            if (!window.RTCIceCandidate) {
	              window.RTCIceCandidate = function (args) {
	                return args;
	              };
	            }
	            // ORTC does not have a session description object but
	            // other browsers (i.e. Chrome) that will support both PC and ORTC
	            // in the future might have this defined already.
	            if (!window.RTCSessionDescription) {
	              window.RTCSessionDescription = function (args) {
	                return args;
	              };
	            }
	          }

	          window.RTCPeerConnection = function (config) {
	            var self = this;

	            var _eventTarget = document.createDocumentFragment();
	            ['addEventListener', 'removeEventListener', 'dispatchEvent'].forEach(function (method) {
	              self[method] = _eventTarget[method].bind(_eventTarget);
	            });

	            this.onicecandidate = null;
	            this.onaddstream = null;
	            this.ontrack = null;
	            this.onremovestream = null;
	            this.onsignalingstatechange = null;
	            this.oniceconnectionstatechange = null;
	            this.onnegotiationneeded = null;
	            this.ondatachannel = null;

	            this.localStreams = [];
	            this.remoteStreams = [];
	            this.getLocalStreams = function () {
	              return self.localStreams;
	            };
	            this.getRemoteStreams = function () {
	              return self.remoteStreams;
	            };

	            this.localDescription = new RTCSessionDescription({
	              type: '',
	              sdp: ''
	            });
	            this.remoteDescription = new RTCSessionDescription({
	              type: '',
	              sdp: ''
	            });
	            this.signalingState = 'stable';
	            this.iceConnectionState = 'new';
	            this.iceGatheringState = 'new';

	            this.iceOptions = {
	              gatherPolicy: 'all',
	              iceServers: []
	            };
	            if (config && config.iceTransportPolicy) {
	              switch (config.iceTransportPolicy) {
	                case 'all':
	                case 'relay':
	                  this.iceOptions.gatherPolicy = config.iceTransportPolicy;
	                  break;
	                case 'none':
	                  // FIXME: remove once implementation and spec have added this.
	                  throw new TypeError('iceTransportPolicy "none" not supported');
	                default:
	                  // don't set iceTransportPolicy.
	                  break;
	              }
	            }
	            if (config && config.iceServers) {
	              // Edge does not like
	              // 1) stun:
	              // 2) turn: that does not have all of turn:host:port?transport=udp
	              this.iceOptions.iceServers = config.iceServers.filter(function (server) {
	                if (server && server.urls) {
	                  server.urls = server.urls.filter(function (url) {
	                    return url.indexOf('turn:') === 0 && url.indexOf('transport=udp') !== -1;
	                  })[0];
	                  return !!server.urls;
	                }
	                return false;
	              });
	            }

	            // per-track iceGathers, iceTransports, dtlsTransports, rtpSenders, ...
	            // everything that is needed to describe a SDP m-line.
	            this.transceivers = [];

	            // since the iceGatherer is currently created in createOffer but we
	            // must not emit candidates until after setLocalDescription we buffer
	            // them in this array.
	            this._localIceCandidatesBuffer = [];
	          };

	          window.RTCPeerConnection.prototype._emitBufferedCandidates = function () {
	            var self = this;
	            var sections = SDPUtils.splitSections(self.localDescription.sdp);
	            // FIXME: need to apply ice candidates in a way which is async but
	            // in-order
	            this._localIceCandidatesBuffer.forEach(function (event) {
	              var end = !event.candidate || Object.keys(event.candidate).length === 0;
	              if (end) {
	                for (var j = 1; j < sections.length; j++) {
	                  if (sections[j].indexOf('\r\na=end-of-candidates\r\n') === -1) {
	                    sections[j] += 'a=end-of-candidates\r\n';
	                  }
	                }
	              } else if (event.candidate.candidate.indexOf('typ endOfCandidates') === -1) {
	                sections[event.candidate.sdpMLineIndex + 1] += 'a=' + event.candidate.candidate + '\r\n';
	              }
	              self.localDescription.sdp = sections.join('');
	              self.dispatchEvent(event);
	              if (self.onicecandidate !== null) {
	                self.onicecandidate(event);
	              }
	              if (!event.candidate && self.iceGatheringState !== 'complete') {
	                var complete = self.transceivers.every(function (transceiver) {
	                  return transceiver.iceGatherer && transceiver.iceGatherer.state === 'completed';
	                });
	                if (complete) {
	                  self.iceGatheringState = 'complete';
	                }
	              }
	            });
	            this._localIceCandidatesBuffer = [];
	          };

	          window.RTCPeerConnection.prototype.addStream = function (stream) {
	            // Clone is necessary for local demos mostly, attaching directly
	            // to two different senders does not work (build 10547).
	            this.localStreams.push(stream.clone());
	            this._maybeFireNegotiationNeeded();
	          };

	          window.RTCPeerConnection.prototype.removeStream = function (stream) {
	            var idx = this.localStreams.indexOf(stream);
	            if (idx > -1) {
	              this.localStreams.splice(idx, 1);
	              this._maybeFireNegotiationNeeded();
	            }
	          };

	          // Determines the intersection of local and remote capabilities.
	          window.RTCPeerConnection.prototype._getCommonCapabilities = function (localCapabilities, remoteCapabilities) {
	            var commonCapabilities = {
	              codecs: [],
	              headerExtensions: [],
	              fecMechanisms: []
	            };
	            localCapabilities.codecs.forEach(function (lCodec) {
	              for (var i = 0; i < remoteCapabilities.codecs.length; i++) {
	                var rCodec = remoteCapabilities.codecs[i];
	                if (lCodec.name.toLowerCase() === rCodec.name.toLowerCase() && lCodec.clockRate === rCodec.clockRate && lCodec.numChannels === rCodec.numChannels) {
	                  // push rCodec so we reply with offerer payload type
	                  commonCapabilities.codecs.push(rCodec);

	                  // FIXME: also need to determine intersection between
	                  // .rtcpFeedback and .parameters
	                  break;
	                }
	              }
	            });

	            localCapabilities.headerExtensions.forEach(function (lHeaderExtension) {
	              for (var i = 0; i < remoteCapabilities.headerExtensions.length; i++) {
	                var rHeaderExtension = remoteCapabilities.headerExtensions[i];
	                if (lHeaderExtension.uri === rHeaderExtension.uri) {
	                  commonCapabilities.headerExtensions.push(rHeaderExtension);
	                  break;
	                }
	              }
	            });

	            // FIXME: fecMechanisms
	            return commonCapabilities;
	          };

	          // Create ICE gatherer, ICE transport and DTLS transport.
	          window.RTCPeerConnection.prototype._createIceAndDtlsTransports = function (mid, sdpMLineIndex) {
	            var self = this;
	            var iceGatherer = new RTCIceGatherer(self.iceOptions);
	            var iceTransport = new RTCIceTransport(iceGatherer);
	            iceGatherer.onlocalcandidate = function (evt) {
	              var event = new Event('icecandidate');
	              event.candidate = { sdpMid: mid, sdpMLineIndex: sdpMLineIndex };

	              var cand = evt.candidate;
	              var end = !cand || Object.keys(cand).length === 0;
	              // Edge emits an empty object for RTCIceCandidateComplete‥
	              if (end) {
	                // polyfill since RTCIceGatherer.state is not implemented in
	                // Edge 10547 yet.
	                if (iceGatherer.state === undefined) {
	                  iceGatherer.state = 'completed';
	                }

	                // Emit a candidate with type endOfCandidates to make the samples
	                // work. Edge requires addIceCandidate with this empty candidate
	                // to start checking. The real solution is to signal
	                // end-of-candidates to the other side when getting the null
	                // candidate but some apps (like the samples) don't do that.
	                event.candidate.candidate = 'candidate:1 1 udp 1 0.0.0.0 9 typ endOfCandidates';
	              } else {
	                // RTCIceCandidate doesn't have a component, needs to be added
	                cand.component = iceTransport.component === 'RTCP' ? 2 : 1;
	                event.candidate.candidate = SDPUtils.writeCandidate(cand);
	              }

	              var complete = self.transceivers.every(function (transceiver) {
	                return transceiver.iceGatherer && transceiver.iceGatherer.state === 'completed';
	              });

	              // Emit candidate if localDescription is set.
	              // Also emits null candidate when all gatherers are complete.
	              switch (self.iceGatheringState) {
	                case 'new':
	                  self._localIceCandidatesBuffer.push(event);
	                  if (end && complete) {
	                    self._localIceCandidatesBuffer.push(new Event('icecandidate'));
	                  }
	                  break;
	                case 'gathering':
	                  self._emitBufferedCandidates();
	                  self.dispatchEvent(event);
	                  if (self.onicecandidate !== null) {
	                    self.onicecandidate(event);
	                  }
	                  if (complete) {
	                    self.dispatchEvent(new Event('icecandidate'));
	                    if (self.onicecandidate !== null) {
	                      self.onicecandidate(new Event('icecandidate'));
	                    }
	                    self.iceGatheringState = 'complete';
	                  }
	                  break;
	                case 'complete':
	                  // should not happen... currently!
	                  break;
	                default:
	                  // no-op.
	                  break;
	              }
	            };
	            iceTransport.onicestatechange = function () {
	              self._updateConnectionState();
	            };

	            var dtlsTransport = new RTCDtlsTransport(iceTransport);
	            dtlsTransport.ondtlsstatechange = function () {
	              self._updateConnectionState();
	            };
	            dtlsTransport.onerror = function () {
	              // onerror does not set state to failed by itself.
	              dtlsTransport.state = 'failed';
	              self._updateConnectionState();
	            };

	            return {
	              iceGatherer: iceGatherer,
	              iceTransport: iceTransport,
	              dtlsTransport: dtlsTransport
	            };
	          };

	          // Start the RTP Sender and Receiver for a transceiver.
	          window.RTCPeerConnection.prototype._transceive = function (transceiver, send, recv) {
	            var params = this._getCommonCapabilities(transceiver.localCapabilities, transceiver.remoteCapabilities);
	            if (send && transceiver.rtpSender) {
	              params.encodings = transceiver.sendEncodingParameters;
	              params.rtcp = {
	                cname: SDPUtils.localCName
	              };
	              if (transceiver.recvEncodingParameters.length) {
	                params.rtcp.ssrc = transceiver.recvEncodingParameters[0].ssrc;
	              }
	              transceiver.rtpSender.send(params);
	            }
	            if (recv && transceiver.rtpReceiver) {
	              params.encodings = transceiver.recvEncodingParameters;
	              params.rtcp = {
	                cname: transceiver.cname
	              };
	              if (transceiver.sendEncodingParameters.length) {
	                params.rtcp.ssrc = transceiver.sendEncodingParameters[0].ssrc;
	              }
	              transceiver.rtpReceiver.receive(params);
	            }
	          };

	          window.RTCPeerConnection.prototype.setLocalDescription = function (description) {
	            var self = this;
	            var sections;
	            var sessionpart;
	            if (description.type === 'offer') {
	              // FIXME: What was the purpose of this empty if statement?
	              // if (!this._pendingOffer) {
	              // } else {
	              if (this._pendingOffer) {
	                // VERY limited support for SDP munging. Limited to:
	                // * changing the order of codecs
	                sections = SDPUtils.splitSections(description.sdp);
	                sessionpart = sections.shift();
	                sections.forEach(function (mediaSection, sdpMLineIndex) {
	                  var caps = SDPUtils.parseRtpParameters(mediaSection);
	                  self._pendingOffer[sdpMLineIndex].localCapabilities = caps;
	                });
	                this.transceivers = this._pendingOffer;
	                delete this._pendingOffer;
	              }
	            } else if (description.type === 'answer') {
	              sections = SDPUtils.splitSections(self.remoteDescription.sdp);
	              sessionpart = sections.shift();
	              sections.forEach(function (mediaSection, sdpMLineIndex) {
	                var transceiver = self.transceivers[sdpMLineIndex];
	                var iceGatherer = transceiver.iceGatherer;
	                var iceTransport = transceiver.iceTransport;
	                var dtlsTransport = transceiver.dtlsTransport;
	                var localCapabilities = transceiver.localCapabilities;
	                var remoteCapabilities = transceiver.remoteCapabilities;
	                var rejected = mediaSection.split('\n', 1)[0].split(' ', 2)[1] === '0';

	                if (!rejected) {
	                  var remoteIceParameters = SDPUtils.getIceParameters(mediaSection, sessionpart);
	                  iceTransport.start(iceGatherer, remoteIceParameters, 'controlled');

	                  var remoteDtlsParameters = SDPUtils.getDtlsParameters(mediaSection, sessionpart);
	                  dtlsTransport.start(remoteDtlsParameters);

	                  // Calculate intersection of capabilities.
	                  var params = self._getCommonCapabilities(localCapabilities, remoteCapabilities);

	                  // Start the RTCRtpSender. The RTCRtpReceiver for this
	                  // transceiver has already been started in setRemoteDescription.
	                  self._transceive(transceiver, params.codecs.length > 0, false);
	                }
	              });
	            }

	            this.localDescription = {
	              type: description.type,
	              sdp: description.sdp
	            };
	            switch (description.type) {
	              case 'offer':
	                this._updateSignalingState('have-local-offer');
	                break;
	              case 'answer':
	                this._updateSignalingState('stable');
	                break;
	              default:
	                throw new TypeError('unsupported type "' + description.type + '"');
	            }

	            // If a success callback was provided, emit ICE candidates after it
	            // has been executed. Otherwise, emit callback after the Promise is
	            // resolved.
	            var hasCallback = arguments.length > 1 && typeof arguments[1] === 'function';
	            if (hasCallback) {
	              var cb = arguments[1];
	              window.setTimeout(function () {
	                cb();
	                if (self.iceGatheringState === 'new') {
	                  self.iceGatheringState = 'gathering';
	                }
	                self._emitBufferedCandidates();
	              }, 0);
	            }
	            var p = Promise.resolve();
	            p.then(function () {
	              if (!hasCallback) {
	                if (self.iceGatheringState === 'new') {
	                  self.iceGatheringState = 'gathering';
	                }
	                // Usually candidates will be emitted earlier.
	                window.setTimeout(self._emitBufferedCandidates.bind(self), 500);
	              }
	            });
	            return p;
	          };

	          window.RTCPeerConnection.prototype.setRemoteDescription = function (description) {
	            var self = this;
	            var stream = new MediaStream();
	            var receiverList = [];
	            var sections = SDPUtils.splitSections(description.sdp);
	            var sessionpart = sections.shift();
	            sections.forEach(function (mediaSection, sdpMLineIndex) {
	              var lines = SDPUtils.splitLines(mediaSection);
	              var mline = lines[0].substr(2).split(' ');
	              var kind = mline[0];
	              var rejected = mline[1] === '0';
	              var direction = SDPUtils.getDirection(mediaSection, sessionpart);

	              var transceiver;
	              var iceGatherer;
	              var iceTransport;
	              var dtlsTransport;
	              var rtpSender;
	              var rtpReceiver;
	              var sendEncodingParameters;
	              var recvEncodingParameters;
	              var localCapabilities;

	              var track;
	              // FIXME: ensure the mediaSection has rtcp-mux set.
	              var remoteCapabilities = SDPUtils.parseRtpParameters(mediaSection);
	              var remoteIceParameters;
	              var remoteDtlsParameters;
	              if (!rejected) {
	                remoteIceParameters = SDPUtils.getIceParameters(mediaSection, sessionpart);
	                remoteDtlsParameters = SDPUtils.getDtlsParameters(mediaSection, sessionpart);
	              }
	              recvEncodingParameters = SDPUtils.parseRtpEncodingParameters(mediaSection);

	              var mid = SDPUtils.matchPrefix(mediaSection, 'a=mid:');
	              if (mid.length) {
	                mid = mid[0].substr(6);
	              } else {
	                mid = SDPUtils.generateIdentifier();
	              }

	              var cname;
	              // Gets the first SSRC. Note that with RTX there might be multiple
	              // SSRCs.
	              var remoteSsrc = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:').map(function (line) {
	                return SDPUtils.parseSsrcMedia(line);
	              }).filter(function (obj) {
	                return obj.attribute === 'cname';
	              })[0];
	              if (remoteSsrc) {
	                cname = remoteSsrc.value;
	              }

	              var isComplete = SDPUtils.matchPrefix(mediaSection, 'a=end-of-candidates').length > 0;
	              var cands = SDPUtils.matchPrefix(mediaSection, 'a=candidate:').map(function (cand) {
	                return SDPUtils.parseCandidate(cand);
	              }).filter(function (cand) {
	                return cand.component === '1';
	              });
	              if (description.type === 'offer' && !rejected) {
	                var transports = self._createIceAndDtlsTransports(mid, sdpMLineIndex);
	                if (isComplete) {
	                  transports.iceTransport.setRemoteCandidates(cands);
	                }

	                localCapabilities = RTCRtpReceiver.getCapabilities(kind);
	                sendEncodingParameters = [{
	                  ssrc: (2 * sdpMLineIndex + 2) * 1001
	                }];

	                rtpReceiver = new RTCRtpReceiver(transports.dtlsTransport, kind);

	                track = rtpReceiver.track;
	                receiverList.push([track, rtpReceiver]);
	                // FIXME: not correct when there are multiple streams but that is
	                // not currently supported in this shim.
	                stream.addTrack(track);

	                // FIXME: look at direction.
	                if (self.localStreams.length > 0 && self.localStreams[0].getTracks().length >= sdpMLineIndex) {
	                  // FIXME: actually more complicated, needs to match types etc
	                  var localtrack = self.localStreams[0].getTracks()[sdpMLineIndex];
	                  rtpSender = new RTCRtpSender(localtrack, transports.dtlsTransport);
	                }

	                self.transceivers[sdpMLineIndex] = {
	                  iceGatherer: transports.iceGatherer,
	                  iceTransport: transports.iceTransport,
	                  dtlsTransport: transports.dtlsTransport,
	                  localCapabilities: localCapabilities,
	                  remoteCapabilities: remoteCapabilities,
	                  rtpSender: rtpSender,
	                  rtpReceiver: rtpReceiver,
	                  kind: kind,
	                  mid: mid,
	                  cname: cname,
	                  sendEncodingParameters: sendEncodingParameters,
	                  recvEncodingParameters: recvEncodingParameters
	                };
	                // Start the RTCRtpReceiver now. The RTPSender is started in
	                // setLocalDescription.
	                self._transceive(self.transceivers[sdpMLineIndex], false, direction === 'sendrecv' || direction === 'sendonly');
	              } else if (description.type === 'answer' && !rejected) {
	                transceiver = self.transceivers[sdpMLineIndex];
	                iceGatherer = transceiver.iceGatherer;
	                iceTransport = transceiver.iceTransport;
	                dtlsTransport = transceiver.dtlsTransport;
	                rtpSender = transceiver.rtpSender;
	                rtpReceiver = transceiver.rtpReceiver;
	                sendEncodingParameters = transceiver.sendEncodingParameters;
	                localCapabilities = transceiver.localCapabilities;

	                self.transceivers[sdpMLineIndex].recvEncodingParameters = recvEncodingParameters;
	                self.transceivers[sdpMLineIndex].remoteCapabilities = remoteCapabilities;
	                self.transceivers[sdpMLineIndex].cname = cname;

	                if (isComplete) {
	                  iceTransport.setRemoteCandidates(cands);
	                }
	                iceTransport.start(iceGatherer, remoteIceParameters, 'controlling');
	                dtlsTransport.start(remoteDtlsParameters);

	                self._transceive(transceiver, direction === 'sendrecv' || direction === 'recvonly', direction === 'sendrecv' || direction === 'sendonly');

	                if (rtpReceiver && (direction === 'sendrecv' || direction === 'sendonly')) {
	                  track = rtpReceiver.track;
	                  receiverList.push([track, rtpReceiver]);
	                  stream.addTrack(track);
	                } else {
	                  // FIXME: actually the receiver should be created later.
	                  delete transceiver.rtpReceiver;
	                }
	              }
	            });

	            this.remoteDescription = {
	              type: description.type,
	              sdp: description.sdp
	            };
	            switch (description.type) {
	              case 'offer':
	                this._updateSignalingState('have-remote-offer');
	                break;
	              case 'answer':
	                this._updateSignalingState('stable');
	                break;
	              default:
	                throw new TypeError('unsupported type "' + description.type + '"');
	            }
	            if (stream.getTracks().length) {
	              self.remoteStreams.push(stream);
	              window.setTimeout(function () {
	                var event = new Event('addstream');
	                event.stream = stream;
	                self.dispatchEvent(event);
	                if (self.onaddstream !== null) {
	                  window.setTimeout(function () {
	                    self.onaddstream(event);
	                  }, 0);
	                }

	                receiverList.forEach(function (item) {
	                  var track = item[0];
	                  var receiver = item[1];
	                  var trackEvent = new Event('track');
	                  trackEvent.track = track;
	                  trackEvent.receiver = receiver;
	                  trackEvent.streams = [stream];
	                  self.dispatchEvent(event);
	                  if (self.ontrack !== null) {
	                    window.setTimeout(function () {
	                      self.ontrack(trackEvent);
	                    }, 0);
	                  }
	                });
	              }, 0);
	            }
	            if (arguments.length > 1 && typeof arguments[1] === 'function') {
	              window.setTimeout(arguments[1], 0);
	            }
	            return Promise.resolve();
	          };

	          window.RTCPeerConnection.prototype.close = function () {
	            this.transceivers.forEach(function (transceiver) {
	              /* not yet
	              if (transceiver.iceGatherer) {
	                transceiver.iceGatherer.close();
	              }
	              */
	              if (transceiver.iceTransport) {
	                transceiver.iceTransport.stop();
	              }
	              if (transceiver.dtlsTransport) {
	                transceiver.dtlsTransport.stop();
	              }
	              if (transceiver.rtpSender) {
	                transceiver.rtpSender.stop();
	              }
	              if (transceiver.rtpReceiver) {
	                transceiver.rtpReceiver.stop();
	              }
	            });
	            // FIXME: clean up tracks, local streams, remote streams, etc
	            this._updateSignalingState('closed');
	          };

	          // Update the signaling state.
	          window.RTCPeerConnection.prototype._updateSignalingState = function (newState) {
	            this.signalingState = newState;
	            var event = new Event('signalingstatechange');
	            this.dispatchEvent(event);
	            if (this.onsignalingstatechange !== null) {
	              this.onsignalingstatechange(event);
	            }
	          };

	          // Determine whether to fire the negotiationneeded event.
	          window.RTCPeerConnection.prototype._maybeFireNegotiationNeeded = function () {
	            // Fire away (for now).
	            var event = new Event('negotiationneeded');
	            this.dispatchEvent(event);
	            if (this.onnegotiationneeded !== null) {
	              this.onnegotiationneeded(event);
	            }
	          };

	          // Update the connection state.
	          window.RTCPeerConnection.prototype._updateConnectionState = function () {
	            var self = this;
	            var newState;
	            var states = {
	              'new': 0,
	              closed: 0,
	              connecting: 0,
	              checking: 0,
	              connected: 0,
	              completed: 0,
	              failed: 0
	            };
	            this.transceivers.forEach(function (transceiver) {
	              states[transceiver.iceTransport.state]++;
	              states[transceiver.dtlsTransport.state]++;
	            });
	            // ICETransport.completed and connected are the same for this purpose.
	            states.connected += states.completed;

	            newState = 'new';
	            if (states.failed > 0) {
	              newState = 'failed';
	            } else if (states.connecting > 0 || states.checking > 0) {
	              newState = 'connecting';
	            } else if (states.disconnected > 0) {
	              newState = 'disconnected';
	            } else if (states.new > 0) {
	              newState = 'new';
	            } else if (states.connected > 0 || states.completed > 0) {
	              newState = 'connected';
	            }

	            if (newState !== self.iceConnectionState) {
	              self.iceConnectionState = newState;
	              var event = new Event('iceconnectionstatechange');
	              this.dispatchEvent(event);
	              if (this.oniceconnectionstatechange !== null) {
	                this.oniceconnectionstatechange(event);
	              }
	            }
	          };

	          window.RTCPeerConnection.prototype.createOffer = function () {
	            var self = this;
	            if (this._pendingOffer) {
	              throw new Error('createOffer called while there is a pending offer.');
	            }
	            var offerOptions;
	            if (arguments.length === 1 && typeof arguments[0] !== 'function') {
	              offerOptions = arguments[0];
	            } else if (arguments.length === 3) {
	              offerOptions = arguments[2];
	            }

	            var tracks = [];
	            var numAudioTracks = 0;
	            var numVideoTracks = 0;
	            // Default to sendrecv.
	            if (this.localStreams.length) {
	              numAudioTracks = this.localStreams[0].getAudioTracks().length;
	              numVideoTracks = this.localStreams[0].getVideoTracks().length;
	            }
	            // Determine number of audio and video tracks we need to send/recv.
	            if (offerOptions) {
	              // Reject Chrome legacy constraints.
	              if (offerOptions.mandatory || offerOptions.optional) {
	                throw new TypeError('Legacy mandatory/optional constraints not supported.');
	              }
	              if (offerOptions.offerToReceiveAudio !== undefined) {
	                numAudioTracks = offerOptions.offerToReceiveAudio;
	              }
	              if (offerOptions.offerToReceiveVideo !== undefined) {
	                numVideoTracks = offerOptions.offerToReceiveVideo;
	              }
	            }
	            if (this.localStreams.length) {
	              // Push local streams.
	              this.localStreams[0].getTracks().forEach(function (track) {
	                tracks.push({
	                  kind: track.kind,
	                  track: track,
	                  wantReceive: track.kind === 'audio' ? numAudioTracks > 0 : numVideoTracks > 0
	                });
	                if (track.kind === 'audio') {
	                  numAudioTracks--;
	                } else if (track.kind === 'video') {
	                  numVideoTracks--;
	                }
	              });
	            }
	            // Create M-lines for recvonly streams.
	            while (numAudioTracks > 0 || numVideoTracks > 0) {
	              if (numAudioTracks > 0) {
	                tracks.push({
	                  kind: 'audio',
	                  wantReceive: true
	                });
	                numAudioTracks--;
	              }
	              if (numVideoTracks > 0) {
	                tracks.push({
	                  kind: 'video',
	                  wantReceive: true
	                });
	                numVideoTracks--;
	              }
	            }

	            var sdp = SDPUtils.writeSessionBoilerplate();
	            var transceivers = [];
	            tracks.forEach(function (mline, sdpMLineIndex) {
	              // For each track, create an ice gatherer, ice transport,
	              // dtls transport, potentially rtpsender and rtpreceiver.
	              var track = mline.track;
	              var kind = mline.kind;
	              var mid = SDPUtils.generateIdentifier();

	              var transports = self._createIceAndDtlsTransports(mid, sdpMLineIndex);

	              var localCapabilities = RTCRtpSender.getCapabilities(kind);
	              var rtpSender;
	              var rtpReceiver;

	              // generate an ssrc now, to be used later in rtpSender.send
	              var sendEncodingParameters = [{
	                ssrc: (2 * sdpMLineIndex + 1) * 1001
	              }];
	              if (track) {
	                rtpSender = new RTCRtpSender(track, transports.dtlsTransport);
	              }

	              if (mline.wantReceive) {
	                rtpReceiver = new RTCRtpReceiver(transports.dtlsTransport, kind);
	              }

	              transceivers[sdpMLineIndex] = {
	                iceGatherer: transports.iceGatherer,
	                iceTransport: transports.iceTransport,
	                dtlsTransport: transports.dtlsTransport,
	                localCapabilities: localCapabilities,
	                remoteCapabilities: null,
	                rtpSender: rtpSender,
	                rtpReceiver: rtpReceiver,
	                kind: kind,
	                mid: mid,
	                sendEncodingParameters: sendEncodingParameters,
	                recvEncodingParameters: null
	              };
	              var transceiver = transceivers[sdpMLineIndex];
	              sdp += SDPUtils.writeMediaSection(transceiver, transceiver.localCapabilities, 'offer', self.localStreams[0]);
	            });

	            this._pendingOffer = transceivers;
	            var desc = new RTCSessionDescription({
	              type: 'offer',
	              sdp: sdp
	            });
	            if (arguments.length && typeof arguments[0] === 'function') {
	              window.setTimeout(arguments[0], 0, desc);
	            }
	            return Promise.resolve(desc);
	          };

	          window.RTCPeerConnection.prototype.createAnswer = function () {
	            var self = this;

	            var sdp = SDPUtils.writeSessionBoilerplate();
	            this.transceivers.forEach(function (transceiver) {
	              // Calculate intersection of capabilities.
	              var commonCapabilities = self._getCommonCapabilities(transceiver.localCapabilities, transceiver.remoteCapabilities);

	              sdp += SDPUtils.writeMediaSection(transceiver, commonCapabilities, 'answer', self.localStreams[0]);
	            });

	            var desc = new RTCSessionDescription({
	              type: 'answer',
	              sdp: sdp
	            });
	            if (arguments.length && typeof arguments[0] === 'function') {
	              window.setTimeout(arguments[0], 0, desc);
	            }
	            return Promise.resolve(desc);
	          };

	          window.RTCPeerConnection.prototype.addIceCandidate = function (candidate) {
	            var mLineIndex = candidate.sdpMLineIndex;
	            if (candidate.sdpMid) {
	              for (var i = 0; i < this.transceivers.length; i++) {
	                if (this.transceivers[i].mid === candidate.sdpMid) {
	                  mLineIndex = i;
	                  break;
	                }
	              }
	            }
	            var transceiver = this.transceivers[mLineIndex];
	            if (transceiver) {
	              var cand = Object.keys(candidate.candidate).length > 0 ? SDPUtils.parseCandidate(candidate.candidate) : {};
	              // Ignore Chrome's invalid candidates since Edge does not like them.
	              if (cand.protocol === 'tcp' && cand.port === 0) {
	                return;
	              }
	              // Ignore RTCP candidates, we assume RTCP-MUX.
	              if (cand.component !== '1') {
	                return;
	              }
	              // A dirty hack to make samples work.
	              if (cand.type === 'endOfCandidates') {
	                cand = {};
	              }
	              transceiver.iceTransport.addRemoteCandidate(cand);

	              // update the remoteDescription.
	              var sections = SDPUtils.splitSections(this.remoteDescription.sdp);
	              sections[mLineIndex + 1] += (cand.type ? candidate.candidate.trim() : 'a=end-of-candidates') + '\r\n';
	              this.remoteDescription.sdp = sections.join('');
	            }
	            if (arguments.length > 1 && typeof arguments[1] === 'function') {
	              window.setTimeout(arguments[1], 0);
	            }
	            return Promise.resolve();
	          };

	          window.RTCPeerConnection.prototype.getStats = function () {
	            var promises = [];
	            this.transceivers.forEach(function (transceiver) {
	              ['rtpSender', 'rtpReceiver', 'iceGatherer', 'iceTransport', 'dtlsTransport'].forEach(function (method) {
	                if (transceiver[method]) {
	                  promises.push(transceiver[method].getStats());
	                }
	              });
	            });
	            var cb = arguments.length > 1 && typeof arguments[1] === 'function' && arguments[1];
	            return new Promise(function (resolve) {
	              var results = {};
	              Promise.all(promises).then(function (res) {
	                res.forEach(function (result) {
	                  Object.keys(result).forEach(function (id) {
	                    results[id] = result[id];
	                  });
	                });
	                if (cb) {
	                  window.setTimeout(cb, 0, results);
	                }
	                resolve(results);
	              });
	            });
	          };
	        },

	        // Attach a media stream to an element.
	        attachMediaStream: function attachMediaStream(element, stream) {
	          logging('DEPRECATED, attachMediaStream will soon be removed.');
	          element.srcObject = stream;
	        },

	        reattachMediaStream: function reattachMediaStream(to, from) {
	          logging('DEPRECATED, reattachMediaStream will soon be removed.');
	          to.srcObject = from.srcObject;
	        }
	      };

	      // Expose public methods.
	      module.exports = {
	        shimPeerConnection: edgeShim.shimPeerConnection,
	        attachMediaStream: edgeShim.attachMediaStream,
	        reattachMediaStream: edgeShim.reattachMediaStream
	      };
	    }, { "../utils": 9, "./edge_sdp": 4 }], 6: [function (require, module, exports) {
	      /*
	       *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
	       *
	       *  Use of this source code is governed by a BSD-style license
	       *  that can be found in the LICENSE file in the root of the source
	       *  tree.
	       */
	      /* eslint-env node */
	      'use strict';

	      var logging = require('../utils').log;
	      var browserDetails = require('../utils').browserDetails;

	      var firefoxShim = {
	        shimOnTrack: function shimOnTrack() {
	          if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && window.RTCPeerConnection && !('ontrack' in window.RTCPeerConnection.prototype)) {
	            Object.defineProperty(window.RTCPeerConnection.prototype, 'ontrack', {
	              get: function get() {
	                return this._ontrack;
	              },
	              set: function set(f) {
	                if (this._ontrack) {
	                  this.removeEventListener('track', this._ontrack);
	                  this.removeEventListener('addstream', this._ontrackpoly);
	                }
	                this.addEventListener('track', this._ontrack = f);
	                this.addEventListener('addstream', this._ontrackpoly = function (e) {
	                  e.stream.getTracks().forEach(function (track) {
	                    var event = new Event('track');
	                    event.track = track;
	                    event.receiver = { track: track };
	                    event.streams = [e.stream];
	                    this.dispatchEvent(event);
	                  }.bind(this));
	                }.bind(this));
	              }
	            });
	          }
	        },

	        shimSourceObject: function shimSourceObject() {
	          // Firefox has supported mozSrcObject since FF22, unprefixed in 42.
	          if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
	            if (window.HTMLMediaElement && !('srcObject' in window.HTMLMediaElement.prototype)) {
	              // Shim the srcObject property, once, when HTMLMediaElement is found.
	              Object.defineProperty(window.HTMLMediaElement.prototype, 'srcObject', {
	                get: function get() {
	                  return this.mozSrcObject;
	                },
	                set: function set(stream) {
	                  this.mozSrcObject = stream;
	                }
	              });
	            }
	          }
	        },

	        shimPeerConnection: function shimPeerConnection() {
	          // The RTCPeerConnection object.
	          if (!window.RTCPeerConnection) {
	            window.RTCPeerConnection = function (pcConfig, pcConstraints) {
	              if (browserDetails.version < 38) {
	                // .urls is not supported in FF < 38.
	                // create RTCIceServers with a single url.
	                if (pcConfig && pcConfig.iceServers) {
	                  var newIceServers = [];
	                  for (var i = 0; i < pcConfig.iceServers.length; i++) {
	                    var server = pcConfig.iceServers[i];
	                    if (server.hasOwnProperty('urls')) {
	                      for (var j = 0; j < server.urls.length; j++) {
	                        var newServer = {
	                          url: server.urls[j]
	                        };
	                        if (server.urls[j].indexOf('turn') === 0) {
	                          newServer.username = server.username;
	                          newServer.credential = server.credential;
	                        }
	                        newIceServers.push(newServer);
	                      }
	                    } else {
	                      newIceServers.push(pcConfig.iceServers[i]);
	                    }
	                  }
	                  pcConfig.iceServers = newIceServers;
	                }
	              }
	              return new mozRTCPeerConnection(pcConfig, pcConstraints);
	            };
	            window.RTCPeerConnection.prototype = mozRTCPeerConnection.prototype;

	            // wrap static methods. Currently just generateCertificate.
	            if (mozRTCPeerConnection.generateCertificate) {
	              Object.defineProperty(window.RTCPeerConnection, 'generateCertificate', {
	                get: function get() {
	                  return mozRTCPeerConnection.generateCertificate;
	                }
	              });
	            }

	            window.RTCSessionDescription = mozRTCSessionDescription;
	            window.RTCIceCandidate = mozRTCIceCandidate;
	          }

	          // shim away need for obsolete RTCIceCandidate/RTCSessionDescription.
	          ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(function (method) {
	            var nativeMethod = RTCPeerConnection.prototype[method];
	            RTCPeerConnection.prototype[method] = function () {
	              arguments[0] = new (method === 'addIceCandidate' ? RTCIceCandidate : RTCSessionDescription)(arguments[0]);
	              return nativeMethod.apply(this, arguments);
	            };
	          });
	        },

	        shimGetUserMedia: function shimGetUserMedia() {
	          // getUserMedia constraints shim.
	          var getUserMedia_ = function getUserMedia_(constraints, onSuccess, onError) {
	            var constraintsToFF37_ = function constraintsToFF37_(c) {
	              if ((typeof c === "undefined" ? "undefined" : _typeof(c)) !== 'object' || c.require) {
	                return c;
	              }
	              var require = [];
	              Object.keys(c).forEach(function (key) {
	                if (key === 'require' || key === 'advanced' || key === 'mediaSource') {
	                  return;
	                }
	                var r = c[key] = _typeof(c[key]) === 'object' ? c[key] : { ideal: c[key] };
	                if (r.min !== undefined || r.max !== undefined || r.exact !== undefined) {
	                  require.push(key);
	                }
	                if (r.exact !== undefined) {
	                  if (typeof r.exact === 'number') {
	                    r.min = r.max = r.exact;
	                  } else {
	                    c[key] = r.exact;
	                  }
	                  delete r.exact;
	                }
	                if (r.ideal !== undefined) {
	                  c.advanced = c.advanced || [];
	                  var oc = {};
	                  if (typeof r.ideal === 'number') {
	                    oc[key] = { min: r.ideal, max: r.ideal };
	                  } else {
	                    oc[key] = r.ideal;
	                  }
	                  c.advanced.push(oc);
	                  delete r.ideal;
	                  if (!Object.keys(r).length) {
	                    delete c[key];
	                  }
	                }
	              });
	              if (require.length) {
	                c.require = require;
	              }
	              return c;
	            };
	            constraints = JSON.parse(JSON.stringify(constraints));
	            if (browserDetails.version < 38) {
	              logging('spec: ' + JSON.stringify(constraints));
	              if (constraints.audio) {
	                constraints.audio = constraintsToFF37_(constraints.audio);
	              }
	              if (constraints.video) {
	                constraints.video = constraintsToFF37_(constraints.video);
	              }
	              logging('ff37: ' + JSON.stringify(constraints));
	            }
	            return navigator.mozGetUserMedia(constraints, onSuccess, onError);
	          };

	          navigator.getUserMedia = getUserMedia_;

	          // Returns the result of getUserMedia as a Promise.
	          var getUserMediaPromise_ = function getUserMediaPromise_(constraints) {
	            return new Promise(function (resolve, reject) {
	              navigator.getUserMedia(constraints, resolve, reject);
	            });
	          };

	          // Shim for mediaDevices on older versions.
	          if (!navigator.mediaDevices) {
	            navigator.mediaDevices = { getUserMedia: getUserMediaPromise_,
	              addEventListener: function addEventListener() {},
	              removeEventListener: function removeEventListener() {}
	            };
	          }
	          navigator.mediaDevices.enumerateDevices = navigator.mediaDevices.enumerateDevices || function () {
	            return new Promise(function (resolve) {
	              var infos = [{ kind: 'audioinput', deviceId: 'default', label: '', groupId: '' }, { kind: 'videoinput', deviceId: 'default', label: '', groupId: '' }];
	              resolve(infos);
	            });
	          };

	          if (browserDetails.version < 41) {
	            // Work around http://bugzil.la/1169665
	            var orgEnumerateDevices = navigator.mediaDevices.enumerateDevices.bind(navigator.mediaDevices);
	            navigator.mediaDevices.enumerateDevices = function () {
	              return orgEnumerateDevices().then(undefined, function (e) {
	                if (e.name === 'NotFoundError') {
	                  return [];
	                }
	                throw e;
	              });
	            };
	          }
	        },

	        // Attach a media stream to an element.
	        attachMediaStream: function attachMediaStream(element, stream) {
	          logging('DEPRECATED, attachMediaStream will soon be removed.');
	          element.srcObject = stream;
	        },

	        reattachMediaStream: function reattachMediaStream(to, from) {
	          logging('DEPRECATED, reattachMediaStream will soon be removed.');
	          to.srcObject = from.srcObject;
	        }
	      };

	      // Expose public methods.
	      module.exports = {
	        shimOnTrack: firefoxShim.shimOnTrack,
	        shimSourceObject: firefoxShim.shimSourceObject,
	        shimPeerConnection: firefoxShim.shimPeerConnection,
	        shimGetUserMedia: require('./getusermedia'),
	        attachMediaStream: firefoxShim.attachMediaStream,
	        reattachMediaStream: firefoxShim.reattachMediaStream
	      };
	    }, { "../utils": 9, "./getusermedia": 7 }], 7: [function (require, module, exports) {
	      /*
	       *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
	       *
	       *  Use of this source code is governed by a BSD-style license
	       *  that can be found in the LICENSE file in the root of the source
	       *  tree.
	       */
	      /* eslint-env node */
	      'use strict';

	      var logging = require('../utils').log;
	      var browserDetails = require('../utils').browserDetails;

	      // Expose public methods.
	      module.exports = function () {
	        // getUserMedia constraints shim.
	        var getUserMedia_ = function getUserMedia_(constraints, onSuccess, onError) {
	          var constraintsToFF37_ = function constraintsToFF37_(c) {
	            if ((typeof c === "undefined" ? "undefined" : _typeof(c)) !== 'object' || c.require) {
	              return c;
	            }
	            var require = [];
	            Object.keys(c).forEach(function (key) {
	              if (key === 'require' || key === 'advanced' || key === 'mediaSource') {
	                return;
	              }
	              var r = c[key] = _typeof(c[key]) === 'object' ? c[key] : { ideal: c[key] };
	              if (r.min !== undefined || r.max !== undefined || r.exact !== undefined) {
	                require.push(key);
	              }
	              if (r.exact !== undefined) {
	                if (typeof r.exact === 'number') {
	                  r.min = r.max = r.exact;
	                } else {
	                  c[key] = r.exact;
	                }
	                delete r.exact;
	              }
	              if (r.ideal !== undefined) {
	                c.advanced = c.advanced || [];
	                var oc = {};
	                if (typeof r.ideal === 'number') {
	                  oc[key] = { min: r.ideal, max: r.ideal };
	                } else {
	                  oc[key] = r.ideal;
	                }
	                c.advanced.push(oc);
	                delete r.ideal;
	                if (!Object.keys(r).length) {
	                  delete c[key];
	                }
	              }
	            });
	            if (require.length) {
	              c.require = require;
	            }
	            return c;
	          };
	          constraints = JSON.parse(JSON.stringify(constraints));
	          if (browserDetails.version < 38) {
	            logging('spec: ' + JSON.stringify(constraints));
	            if (constraints.audio) {
	              constraints.audio = constraintsToFF37_(constraints.audio);
	            }
	            if (constraints.video) {
	              constraints.video = constraintsToFF37_(constraints.video);
	            }
	            logging('ff37: ' + JSON.stringify(constraints));
	          }
	          return navigator.mozGetUserMedia(constraints, onSuccess, onError);
	        };

	        navigator.getUserMedia = getUserMedia_;

	        // Returns the result of getUserMedia as a Promise.
	        var getUserMediaPromise_ = function getUserMediaPromise_(constraints) {
	          return new Promise(function (resolve, reject) {
	            navigator.getUserMedia(constraints, resolve, reject);
	          });
	        };

	        // Shim for mediaDevices on older versions.
	        if (!navigator.mediaDevices) {
	          navigator.mediaDevices = { getUserMedia: getUserMediaPromise_,
	            addEventListener: function addEventListener() {},
	            removeEventListener: function removeEventListener() {}
	          };
	        }
	        navigator.mediaDevices.enumerateDevices = navigator.mediaDevices.enumerateDevices || function () {
	          return new Promise(function (resolve) {
	            var infos = [{ kind: 'audioinput', deviceId: 'default', label: '', groupId: '' }, { kind: 'videoinput', deviceId: 'default', label: '', groupId: '' }];
	            resolve(infos);
	          });
	        };

	        if (browserDetails.version < 41) {
	          // Work around http://bugzil.la/1169665
	          var orgEnumerateDevices = navigator.mediaDevices.enumerateDevices.bind(navigator.mediaDevices);
	          navigator.mediaDevices.enumerateDevices = function () {
	            return orgEnumerateDevices().then(undefined, function (e) {
	              if (e.name === 'NotFoundError') {
	                return [];
	              }
	              throw e;
	            });
	          };
	        }
	      };
	    }, { "../utils": 9 }], 8: [function (require, module, exports) {
	      /*
	       *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
	       *
	       *  Use of this source code is governed by a BSD-style license
	       *  that can be found in the LICENSE file in the root of the source
	       *  tree.
	       */
	      'use strict';

	      var safariShim = {
	        // TODO: DrAlex, should be here, double check against LayoutTests
	        // shimOnTrack: function() { },

	        // TODO: DrAlex
	        // attachMediaStream: function(element, stream) { },
	        // reattachMediaStream: function(to, from) { },

	        // TODO: once the back-end for the mac port is done, add.
	        // TODO: check for webkitGTK+
	        // shimPeerConnection: function() { },

	        shimGetUserMedia: function shimGetUserMedia() {
	          navigator.getUserMedia = navigator.webkitGetUserMedia;
	        }
	      };

	      // Expose public methods.
	      module.exports = {
	        shimGetUserMedia: safariShim.shimGetUserMedia
	        // TODO
	        // shimOnTrack: safariShim.shimOnTrack,
	        // shimPeerConnection: safariShim.shimPeerConnection,
	        // attachMediaStream: safariShim.attachMediaStream,
	        // reattachMediaStream: safariShim.reattachMediaStream
	      };
	    }, {}], 9: [function (require, module, exports) {
	      /*
	       *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
	       *
	       *  Use of this source code is governed by a BSD-style license
	       *  that can be found in the LICENSE file in the root of the source
	       *  tree.
	       */
	      /* eslint-env node */
	      'use strict';

	      var logDisabled_ = false;

	      // Utility methods.
	      var utils = {
	        disableLog: function disableLog(bool) {
	          if (typeof bool !== 'boolean') {
	            return new Error('Argument type: ' + (typeof bool === "undefined" ? "undefined" : _typeof(bool)) + '. Please use a boolean.');
	          }
	          logDisabled_ = bool;
	          return bool ? 'adapter.js logging disabled' : 'adapter.js logging enabled';
	        },

	        log: function log() {
	          if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
	            if (logDisabled_) {
	              return;
	            }
	            if (typeof console !== 'undefined' && typeof console.log === 'function') {
	              console.log.apply(console, arguments);
	            }
	          }
	        },

	        /**
	         * Extract browser version out of the provided user agent string.
	         *
	         * @param {!string} uastring userAgent string.
	         * @param {!string} expr Regular expression used as match criteria.
	         * @param {!number} pos position in the version string to be returned.
	         * @return {!number} browser version.
	         */
	        extractVersion: function extractVersion(uastring, expr, pos) {
	          var match = uastring.match(expr);
	          return match && match.length >= pos && parseInt(match[pos], 10);
	        },

	        /**
	         * Browser detector.
	         *
	         * @return {object} result containing browser, version and minVersion
	         *     properties.
	         */
	        detectBrowser: function detectBrowser() {
	          // Returned result object.
	          var result = {};
	          result.browser = null;
	          result.version = null;
	          result.minVersion = null;

	          // Fail early if it's not a browser
	          if (typeof window === 'undefined' || !window.navigator) {
	            result.browser = 'Not a browser.';
	            return result;
	          }

	          // Firefox.
	          if (navigator.mozGetUserMedia) {
	            result.browser = 'firefox';
	            result.version = this.extractVersion(navigator.userAgent, /Firefox\/([0-9]+)\./, 1);
	            result.minVersion = 31;

	            // all webkit-based browsers
	          } else if (navigator.webkitGetUserMedia) {
	            // Chrome, Chromium, Webview, Opera, all use the chrome shim for now
	            if (window.webkitRTCPeerConnection) {
	              result.browser = 'chrome';
	              result.version = this.extractVersion(navigator.userAgent, /Chrom(e|ium)\/([0-9]+)\./, 2);
	              result.minVersion = 38;

	              // Safari or unknown webkit-based
	              // for the time being Safari has support for MediaStreams but not webRTC
	            } else {
	              // Safari UA substrings of interest for reference:
	              // - webkit version:           AppleWebKit/602.1.25 (also used in Op,Cr)
	              // - safari UI version:        Version/9.0.3 (unique to Safari)
	              // - safari UI webkit version: Safari/601.4.4 (also used in Op,Cr)
	              //
	              // if the webkit version and safari UI webkit versions are equals,
	              // ... this is a stable version.
	              //
	              // only the internal webkit version is important today to know if
	              // media streams are supported
	              //
	              if (navigator.userAgent.match(/Version\/(\d+).(\d+)/)) {
	                result.browser = 'safari';
	                result.version = this.extractVersion(navigator.userAgent, /AppleWebKit\/([0-9]+)\./, 1);
	                result.minVersion = 602;

	                // unknown webkit-based browser
	              } else {
	                result.browser = 'Unsupported webkit-based browser ' + 'with GUM support but no WebRTC support.';
	                return result;
	              }
	            }

	            // Edge.
	          } else if (navigator.mediaDevices && navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)) {
	            result.browser = 'edge';
	            result.version = this.extractVersion(navigator.userAgent, /Edge\/(\d+).(\d+)$/, 2);
	            result.minVersion = 10547;

	            // Default fallthrough: not supported.
	          } else {
	            result.browser = 'Not a supported browser.';
	            return result;
	          }

	          // Warn if version is less than minVersion.
	          if (result.version < result.minVersion) {
	            utils.log('Browser: ' + result.browser + ' Version: ' + result.version + ' < minimum supported version: ' + result.minVersion + '\n some things might not work!');
	          }

	          return result;
	        }
	      };

	      // Export.
	      module.exports = {
	        log: utils.log,
	        disableLog: utils.disableLog,
	        browserDetails: utils.detectBrowser(),
	        extractVersion: utils.extractVersion
	      };
	    }, {}] }, {}, [1])(1);
	});

/***/ },

/***/ 212:
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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

	        console.log.apply(console, arguments);
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

/***/ 213:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Util = __webpack_require__(212);
	var RTCIQHandler = __webpack_require__(214);
	var API = __webpack_require__(215);
	var WebRTC = __webpack_require__(216);
	var CommonPattern = __webpack_require__(217);

	var RouteTo = API.RouteTo;
	var Api = API.Api;
	var _logger = Util.logger;

	var _Call = {
	    api: null,

	    connection: null,

	    pattern: null,

	    listener: {
	        onAcceptCall: function onAcceptCall(from, options) {},
	        onRinging: function onRinging(caller) {},

	        onTermCall: function onTermCall() {}
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
	        };
	    },

	    makeVideoCall: function makeVideoCall(callee) {
	        var self = this;

	        var mediaStreamConstaints = {};
	        Util.extend(mediaStreamConstaints, self.mediaStreamConstaints);

	        self.call(callee, mediaStreamConstaints);
	    },

	    makeVoiceCall: function makeVoiceCall(callee) {
	        var self = this;

	        var mediaStreamConstaints = {};
	        Util.extend(mediaStreamConstaints, self.mediaStreamConstaints);
	        self.mediaStreamConstaints.video = false;

	        self.call(callee, mediaStreamConstaints);
	    },

	    acceptCall: function acceptCall() {
	        var self = this;
	        self.pattern.accept();
	    },

	    endCall: function endCall(callee) {
	        var self = this;
	        self.pattern.termCall();
	    },

	    call: function call(callee, mediaStreamConstaints) {
	        var self = this;

	        self.callee = self.api.jid(callee);

	        var rt = new RouteTo({
	            rtKey: "",

	            success: function success(result) {
	                _logger.debug("iq to server success", result);
	            },
	            fail: function fail(error) {
	                _logger.debug("iq to server error", error);
	            }
	        });

	        self.api.reqP2P(rt, mediaStreamConstaints.video ? 1 : 0, mediaStreamConstaints.audio ? 1 : 0, callee, function (from, rtcOptions) {
	            self._onGotServerP2PConfig(from, rtcOptions);

	            self.pattern.initC(self.mediaStreamConstaints);
	        });
	    },

	    _onInitC: function _onInitC(from, options, rtkey, tsxId, fromSid) {
	        var self = this;

	        self.callee = from;
	        self._rtcCfg = options.rtcCfg;
	        self._WebRTCCfg = options.WebRTC;

	        self.switchPattern();
	        self.pattern._onInitC(from, options, rtkey, tsxId, fromSid);
	    },

	    _onGotServerP2PConfig: function _onGotServerP2PConfig(from, rtcOptions) {
	        var self = this;

	        if (rtcOptions.result == 0) {
	            self._p2pConfig = rtcOptions;
	            self._rtcCfg = rtcOptions.rtcCfg;
	            self._rtcCfg2 = rtcOptions.rtcCfg2;

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

	    switchPattern: function switchPattern() {
	        var self = this;

	        !self._WebRTCCfg && (self.pattern = new CommonPattern({
	            callee: self.callee,

	            _p2pConfig: self._p2pConfig,
	            _rtcCfg: self._rtcCfg,
	            _rtcCfg2: self._rtcCfg2,

	            _rtKey: self._rtKey || self._rtkey,
	            _rtFlag: self._rtFlag || self._rtflag,

	            webRtc: new WebRTC({
	                onGotLocalStream: self.listener.onGotLocalStream,
	                onGotRemoteStream: self.listener.onGotRemoteStream
	            }),

	            api: self.api,

	            onAcceptCall: self.listener && self.listener.onAcceptCall || function () {},
	            onRinging: self.listener && self.listener.onRinging || function () {},
	            onTermCall: self.listener && self.listener.onTermCall || function () {}
	        }));
	    }
	};

	module.exports = function (initConfigs) {
	    Util.extend(true, this, _Call, initConfigs || {});

	    this.init();
	};

/***/ },

/***/ 214:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * IQ Message，IM -> CMServer --> IM
	 */

	var _util = __webpack_require__(212);
	var _logger = _util.logger;

	var CONFERENCE_XMLNS = "urn:xmpp:media-conference";

	var _RtcHandler = {
	    _apiCallbacks: {},

	    imConnection: null,

	    init: function init() {
	        var self = this;

	        var _conn = self.imConnection;

	        var handleConferenceIQ;

	        _conn.addHandler = function (handler, ns, name, type, id, from, options) {
	            if (typeof handleConferenceIQ !== 'function') {

	                handleConferenceIQ = function handleConferenceIQ(msginfo) {
	                    try {
	                        self.handleRtcMessage(msginfo);
	                    } catch (error) {
	                        _logger.error(error.stack || error);
	                        throw error;
	                    }

	                    return true;
	                };
	                _conn.addHandler(handleConferenceIQ, CONFERENCE_XMLNS, 'iq', "set", null, null);
	                _conn.addHandler(handleConferenceIQ, CONFERENCE_XMLNS, 'iq', "get", null, null);
	            }

	            _conn.context.stropheConn.addHandler(handler, ns, name, type, id, from, options);
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
	        var tsxId = content.tsxId;

	        _logger.debug("Recv [op = " + rtcOptions.op + "]\r\n json :", msginfo);

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

	        var sid = rt.sid || self._fromSessionID && self._fromSessionID[to] || _conn.getUniqueId("CONFR_");

	        var rtKey = rt.rtKey || rt.rtkey;
	        // rtKey && delete rt.rtKey;
	        rtKey || (rtKey = "");

	        var rtflag = rt.rtflag;
	        // rtflag && delete rt.rtflag;
	        rtflag || (rtflag = 1);

	        options.data || (options.data = {});
	        options.data.tsxId = tsxId;

	        self.convertRtcOptions(options);

	        var id = rt.id || _conn.getUniqueId("CONFR_");
	        var iq = $iq({
	            // xmlns: CONFERENCE_XMLNS,
	            id: id,
	            to: to,
	            from: _conn.context.jid,
	            type: rt.type || "get"
	        }).c("query", {
	            xmlns: CONFERENCE_XMLNS
	        }).c("MediaReqExt").c('rtkey').t(rtKey).up().c('rtflag').t(rtflag).up().c('sid').t(sid).up().c('content').t(_util.stringifyJSON(options.data));

	        _logger.debug("Send IQ [op = " + options.data.op + "] : \r\n", iq.tree());

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
	    }
	};

	var RTCIQHandler = function RTCIQHandler(initConfigs) {
	    _util.extend(true, this, _RtcHandler, initConfigs || {});

	    this.init();
	};
	module.exports = RTCIQHandler;

/***/ },

/***/ 215:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * API 
	 */
	var _util = __webpack_require__(212);
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
	        if (shortUserName.indexOf(this.imConnection.context.appKey) >= 0) {
	            return shortUserName;
	        }
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

	        var self = this;

	        var rtcOptions = {
	            data: {
	                op: 0,
	                video: video,
	                audio: audio,
	                peer: peer // appKey + "_" + curChatUserId + "@" +
	                // this.domain,
	            }
	        };

	        self.rtcHandler.sendRtcMessage(rt, rtcOptions, callback);
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
	    initC: function initC(rt, WebRTCId, tkt, sessId, rtcId, pubS, subS, sdp, cands, rtcCfg, WebRTC, callback) {
	        _logger.debug("initC ...");

	        var self = this;

	        var rtcOptions = {
	            data: {
	                op: 102
	            }
	        };

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

	        self.rtcHandler.sendRtcMessage(rt, rtcOptions, callback);
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
	    ansC: function ansC(rt, sessId, rtcId, sdp, cands, callback) {
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
	    acptC: function acptC(rt, sessId, rtcId, sdp, cands, ans, callback) {
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
	     * 
	     */
	    termC: function termC(rt, sessId, rtcId, callback) {
	        _logger.debug("termC ...");

	        var self = this;

	        var rtcOptions = {
	            data: {
	                op: 107
	            }
	        };

	        sessId && (rtcOptions.data.sessId = sessId);
	        rtcId && (rtcOptions.data.rtcId = rtcId);

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

/***/ 216:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * WebRTC
	 * 
	 * A | B | 1.createMedia:got streamA | 1.createMedia:got streamB 2.new
	 * RTCPeerConnection: APeerConnection | 2.new RTCPeerConnection: BPeerConnection
	 * 3.APeerConnection.createOffer:got offerA |
	 * APeerConnection.setLocalDescription(offerA) | send offerA ---> ---> ---> --->
	 * ---> | |---> 3.got offerA | offerA = new RTCSessionDescription(offerA); |
	 * BPeerConnection.setRemoteDescription(offerA) | | |
	 * 4.BPeerConnection.createAnswer: got answerB |
	 * BPeerConnection.setLocalDescription(answerB) | <---- send answerB | 5.got
	 * answerB <--- <--- <--- <--- | answerB = new RTCSessionDescription(answerB) |
	 * APeerConnection.setRemoteDescription(answerB) | | 6.got candidateA ---> --->
	 * ---> ---> | ---> got candidateA | BPeerConnection.addIceCandidate(new
	 * RTCIceCandidate(candidateA)) | | | got candidateB <--- <--- <--- <--- | <---
	 * 6.got candidateB APeerConnection.addIceCandidate(candidateB) | | | 7.
	 * APeerConnection.addStream(streamA) | 7.BPeerConnection.addStream(streamB) |
	 * streamA >>>>>>>>>>> | <<<<< see A seeB <<<<<<<<<<< | <<<<<
	 * streamB |
	 */
	var _util = __webpack_require__(212);
	var _logger = _util.logger;

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

	        self.audioSection && (self.audioSection = self.removeSSRC(self.audioSection) + self.ssrcSection(ssrc, cname, msid, label));
	    },

	    updateVideoSSRCSection: function updateVideoSSRCSection(ssrc, cname, msid, label) {
	        var self = this;

	        self.videoSection && (self.videoSection = self.removeSSRC(self.videoSection) + self.ssrcSection(ssrc, cname, msid, label));
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

	        var regexp = /a=msid\-semantic: WMS (\S+)/ig;
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

	        _logger.debug(' begin create media ......');

	        function gotStream(stream) {
	            _logger.debug(' got local stream');

	            self.localStream = stream;

	            var videoTracks = self.localStream.getVideoTracks();
	            var audioTracks = self.localStream.getAudioTracks();

	            if (videoTracks.length > 0) {
	                _logger.debug(' Using video device: ' + videoTracks[0].label);
	            }
	            if (audioTracks.length > 0) {
	                _logger.debug(' Using audio device: ' + audioTracks[0].label);
	            }

	            onGotStream ? onGotStream(self, stream) : self.onGotStream(stream);
	        }

	        return navigator.mediaDevices.getUserMedia(constaints || self.mediaStreamConstaints).then(gotStream).then(self.onCreateMedia).catch(function (e) {
	            _logger.debug('getUserMedia() error: ', e);
	        });
	    },

	    setLocalVideoSrcObject: function setLocalVideoSrcObject(stream) {
	        this.onGotLocalStream(stream);
	        _logger.debug(' you can see yourself !');
	    },

	    createRtcPeerConnection: function createRtcPeerConnection(iceServerConfig) {
	        var self = this;

	        if (iceServerConfig && iceServerConfig.iceServers) {} else {
	            iceServerConfig = null;
	        }

	        _logger.debug(' begin create RtcPeerConnection ......');

	        self.startTime = window.performance.now();

	        var rtcPeerConnection = self.rtcPeerConnection = new RTCPeerConnection(iceServerConfig);
	        _logger.debug(' Created local peer connection object', rtcPeerConnection);

	        rtcPeerConnection.onicecandidate = function (event) {
	            self.onIceCandidate(event);
	        };

	        rtcPeerConnection.onicestatechange = function (event) {
	            self.onIceStateChange(event);
	        };

	        rtcPeerConnection.oniceconnectionstatechange = function (event) {
	            self.onIceStateChange(event);
	        };

	        rtcPeerConnection.onaddstream = function (event) {
	            self._onGotRemoteStream(event);
	        };
	    },

	    _uploadLocalStream: function _uploadLocalStream() {
	        this.rtcPeerConnection.addStream(this.localStream);
	        _logger.debug('Added local stream to RtcPeerConnection');
	    },

	    createOffer: function createOffer(onCreateOfferSuccess, onCreateOfferError) {
	        var self = this;

	        self._uploadLocalStream();

	        _logger.debug(' createOffer start...');

	        return self.rtcPeerConnection.createOffer(self.offerOptions).then(function (desc) {
	            self.offerDescription = desc;

	            _logger.debug(' Offer from \n' + desc.sdp);
	            _logger.debug(' setLocalDescription start');

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
	            _logger.debug(' _____________PRAnswer from :\n' + desc.sdp);

	            desc.type = "pranswer";
	            desc.sdp = desc.sdp.replace(/a=recvonly/g, 'a=inactive');

	            self.prAnswerDescription = desc;

	            _logger.debug(' inactive PRAnswer from :\n' + desc.sdp);
	            _logger.debug(' setLocalDescription start');

	            self.rtcPeerConnection.setLocalDescription(desc).then(self.onSetLocalSuccess, self.onSetSessionDescriptionError).then(function () {
	                var sdpSection = new SDPSection(desc.sdp);
	                sdpSection.updateHeaderMsidSemantic("MS_0000");
	                sdpSection.updateAudioSSRCSection(1000, "CHROME0000", "MS_0000", "LABEL_AUDIO_1000");
	                sdpSection.updateVideoSSRCSection(2000, "CHROME0000", "MS_0000", "LABEL_VIDEO_2000");

	                desc.sdp = sdpSection.getUpdatedSDP();

	                _logger.debug(' Send PRAnswer from :\n' + desc.sdp);

	                (onCreatePRAnswerSuccess || self.onCreatePRAnswerSuccess)(desc);
	            });
	        }, onCreatePRAnswerError || self.onCreateSessionDescriptionError);
	    },

	    createAnswer: function createAnswer(onCreateAnswerSuccess, onCreateAnswerError) {
	        var self = this;

	        self._uploadLocalStream();

	        _logger.info(' createAnswer start');
	        // Since the 'remote' side has no media stream we need
	        // to pass in the right constraints in order for it to
	        // accept the incoming offer of audio and video.
	        return self.rtcPeerConnection.createAnswer().then(function (desc) {
	            _logger.debug(' _____________________Answer from :\n' + desc.sdp);

	            desc.type = 'answer';

	            var sdpSection = new SDPSection(desc.sdp);
	            var ms = sdpSection.parseMsidSemantic(sdpSection.headerSection);

	            var audioSSRC = sdpSection.parseSSRC(sdpSection.audioSection);
	            var videoSSRC = sdpSection.parseSSRC(sdpSection.videoSection);

	            sdpSection.updateAudioSSRCSection(1000, "CHROME0000", ms.WMS, audioSSRC.label);
	            sdpSection.updateVideoSSRCSection(2000, "CHROME0000", ms.WMS, videoSSRC.label);
	            // mslabel cname


	            desc.sdp = sdpSection.getUpdatedSDP();

	            self.answerDescription = desc;

	            _logger.debug(' Answer from :\n' + desc.sdp);
	            _logger.debug(' setLocalDescription start');

	            self.rtcPeerConnection.setLocalDescription(desc).then(self.onSetLocalSuccess, self.onSetSessionDescriptionError).then(function () {
	                var sdpSection = new SDPSection(desc.sdp);
	                sdpSection.updateHeaderMsidSemantic("MS_0000");
	                sdpSection.updateAudioSSRCSection(1000, "CHROME0000", "MS_0000", "LABEL_AUDIO_1000");
	                sdpSection.updateVideoSSRCSection(2000, "CHROME0000", "MS_0000", "LABEL_VIDEO_2000");

	                desc.sdp = sdpSection.getUpdatedSDP();

	                _logger.debug(' Send Answer from :\n' + desc.sdp);

	                (onCreateAnswerSuccess || self.onCreateAnswerSuccess)(desc);
	            });
	        }, onCreateAnswerError || self.onCreateSessionDescriptionError);
	    },

	    close: function close() {
	        var self = this;
	        try {
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

	        _logger.debug(' Add ICE candidate: \n', candidate);

	        var _cands = _util.isArray(candidate) ? candidate : [];
	        !_util.isArray(candidate) && _cands.push(candidate);

	        for (var i = 0; i < _cands.length; i++) {
	            candidate = _cands[i];

	            self.rtcPeerConnection.addIceCandidate(new RTCIceCandidate(candidate)).then(self.onAddIceCandidateSuccess, self.onAddIceCandidateError);
	        }
	    },

	    setRemoteDescription: function setRemoteDescription(desc) {
	        var self = this;

	        _logger.debug(' setRemoteDescription start. ');

	        desc = new RTCSessionDescription(desc);

	        return self.rtcPeerConnection.setRemoteDescription(desc).then(self.onSetRemoteSuccess, self.onSetSessionDescriptionError);
	    },

	    iceConnectionState: function iceConnectionState() {
	        var self = this;

	        return self.rtcPeerConnection.iceConnectionState;
	    },

	    onCreateMedia: function onCreateMedia() {
	        _logger.debug('media created.');
	    },

	    _onGotRemoteStream: function _onGotRemoteStream(event) {
	        _logger.debug('onGotRemoteStream.', event);

	        this.onGotRemoteStream(event.stream);
	        _logger.debug('received remote stream, you will see the other.');
	    },

	    onGotStream: function onGotStream(stream) {
	        _logger.debug('on got a local stream');
	    },

	    onSetRemoteSuccess: function onSetRemoteSuccess() {
	        _logger.info(' onSetRemoteSuccess complete');
	    },

	    onSetLocalSuccess: function onSetLocalSuccess() {
	        _logger.info(' setLocalDescription complete');
	    },

	    onAddIceCandidateSuccess: function onAddIceCandidateSuccess() {
	        _logger.debug(' addIceCandidate success');
	    },

	    onAddIceCandidateError: function onAddIceCandidateError(error) {
	        _logger.debug(' failed to add ICE Candidate: ' + error.toString());
	    },

	    onIceCandidate: function onIceCandidate(event) {
	        _logger.debug(' onIceCandidate : ICE candidate: \n' + event.candidate);
	    },

	    onIceStateChange: function onIceStateChange(event) {
	        _logger.debug(' onIceStateChange : ICE state change event: ', event);
	    },

	    onCreateSessionDescriptionError: function onCreateSessionDescriptionError(error) {
	        _logger.error(' Failed to create session description: ' + error.toString());
	    },

	    onCreateOfferSuccess: function onCreateOfferSuccess(desc) {
	        _logger.debug(' create offer success');
	    },

	    onCreatePRAnswerSuccess: function onCreatePRAnswerSuccess(desc) {
	        _logger.debug(' create answer success');
	    },

	    onCreateAnswerSuccess: function onCreateAnswerSuccess(desc) {
	        _logger.debug(' create answer success');
	    },

	    onSetSessionDescriptionError: function onSetSessionDescriptionError(error) {
	        _logger.error(' onSetSessionDescriptionError : Failed to set session description: ' + error.toString());
	    },

	    onSetLocalSessionDescriptionSuccess: function onSetLocalSessionDescriptionSuccess() {
	        _logger.debug(' onSetLocalSessionDescriptionSuccess : setLocalDescription complete');
	    }
	};

	module.exports = function (initConfigs) {
	    _util.extend(true, this, _WebRTC, initConfigs || {});
	};

/***/ },

/***/ 217:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * P2P
	 */
	var _util = __webpack_require__(212);
	var RouteTo = __webpack_require__(215).RouteTo;
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
	    _p2pConfig: null,
	    _rtcCfg: null,
	    _rtcCfg2: null,
	    _rtKey: null,
	    _rtFlag: null,

	    webRtc: null,
	    api: null,

	    callee: null,

	    consult: false,

	    init: function init() {
	        var self = this;

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

	        self.webRtc.onIceCandidate = function () {
	            self._onIceCandidate.apply(self, arguments);
	        };
	        self.webRtc.onIceStateChange = function () {
	            self._onIceStateChange.apply(self, arguments);
	        };
	    },

	    initC: function initC(mediaStreamConstaints) {
	        var self = this;

	        self.createLocalMedia(mediaStreamConstaints);
	    },

	    createLocalMedia: function createLocalMedia(mediaStreamConstaints) {
	        var self = this;

	        self.consult = false;

	        self.webRtc.createMedia(mediaStreamConstaints, function (webrtc, stream) {
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
	            to: self.callee,
	            rtKey: self._rtKey
	        });

	        self.api.initC(rt, null, null, null, null, null, null, offer, null, self._rtcCfg2, null, function (from, rtcOptions) {
	            _logger.debug("initc result", rtcOptions);
	        });
	    },

	    _onAcptC: function _onAcptC(from, options) {
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

	    onAcceptCall: function onAcceptCall(from, options) {},

	    _onAnsC: function _onAnsC(from, options) {
	        // answer
	        var self = this;

	        _logger.info("_onAnsC : recv answer. ");

	        options.sdp && self.webRtc.setRemoteDescription(options.sdp);
	    },

	    _onInitC: function _onInitC(from, options, rtkey, tsxId, fromSid) {
	        var self = this;

	        self.consult = false;

	        self.callee = from;
	        self._rtcCfg2 = options.rtcCfg;
	        self._rtKey = rtkey;
	        self._tsxId = tsxId;
	        self._fromSid = fromSid;

	        self._rtcId = options.rtcId;

	        self.webRtc.createRtcPeerConnection(self._rtcCfg2);
	        options.sdp && self.webRtc.setRemoteDescription(options.sdp);
	        options.cands && self._onTcklC(from, options);

	        self.webRtc.createPRAnswer(function (prAnswer) {
	            self._onGotWebRtcPRAnswer(prAnswer);
	        });
	    },

	    _onGotWebRtcPRAnswer: function _onGotWebRtcPRAnswer(prAnswer) {
	        var self = this;

	        var rt = new P2PRouteTo({
	            tsxId: self._tsxId,
	            to: self.callee,
	            rtKey: self._rtKey
	        });

	        self._onHandShake();

	        self.api.acptC(rt, null, self._rtcId, prAnswer, null, 1);

	        setTimeout(function () {
	            self.onRinging(self.callee);
	        }, 2000);
	    },

	    onRinging: function onRinging(caller) {},

	    accept: function accept() {
	        var self = this;

	        function createAndSendAnswer() {
	            _logger.info("createAndSendAnswer : ...... ");

	            self.webRtc.createAnswer(function (desc) {
	                var rt = new P2PRouteTo({
	                    tsxId: self._tsxId,
	                    to: self.callee,
	                    rtKey: self._rtKey
	                });

	                self.api.ansC(rt, null, self._rtcId, desc, null);
	            });
	        }

	        self.webRtc.createMedia(function (webrtc, stream) {
	            webrtc.setLocalVideoSrcObject(stream);

	            createAndSendAnswer();
	        });
	    },

	    _onHandShake: function _onHandShake(from, options) {
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

	    _onTcklC: function _onTcklC(from, options) {
	        // offer
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

	    _onIceStateChange: function _onIceStateChange(event) {
	        var self = this;

	        event && _logger.debug(self.webRtc.iceConnectionState() + " |||| ice state is " + event.target.iceConnectionState);
	    },

	    _onIceCandidate: function _onIceCandidate(event) {
	        var self = this;

	        if (self.consult) {
	            var sendIceCandidate = function sendIceCandidate(candidate) {
	                _logger.debug("send ice candidate...");

	                var rt = new P2PRouteTo({
	                    to: self.callee,
	                    rtKey: self._rtKey
	                });

	                if (candidate) {
	                    self.api.tcklC(rt, null, self._rtcId, null, candidate);
	                }
	            };

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

	    termCall: function termCall() {
	        var self = this;

	        var rt = new P2PRouteTo({
	            to: self.callee,
	            rtKey: self._rtKey
	        });

	        self.hangup || self.api.termC(rt, self._fromSid, self._rtcId);

	        self.webRtc.close();

	        self.hangup = true;

	        self.onTermCall();
	    },

	    _onTermC: function _onTermC() {
	        var self = this;

	        self.hangup = true;
	        self.termCall();
	    },

	    onTermCall: function onTermCall() {}
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