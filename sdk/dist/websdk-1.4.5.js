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

	module.exports = __webpack_require__(224);


/***/ },

/***/ 217:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	;
	(function () {

	    var EMPTYFN = function EMPTYFN() {};
	    var _code = __webpack_require__(218).code;
	    var WEBIM_FILESIZE_LIMIT = 10485760;

	    var _createStandardXHR = function _createStandardXHR() {
	        try {
	            return new window.XMLHttpRequest();
	        } catch (e) {
	            return false;
	        }
	    };

	    var _createActiveXHR = function _createActiveXHR() {
	        try {
	            return new window.ActiveXObject('Microsoft.XMLHTTP');
	        } catch (e) {
	            return false;
	        }
	    };

	    var _xmlrequest = function _xmlrequest(crossDomain) {
	        crossDomain = crossDomain || true;
	        var temp = _createStandardXHR() || _createActiveXHR();

	        if ('withCredentials' in temp) {
	            return temp;
	        }
	        if (!crossDomain) {
	            return temp;
	        }
	        if (typeof window.XDomainRequest === 'undefined') {
	            return temp;
	        }
	        var xhr = new XDomainRequest();
	        xhr.readyState = 0;
	        xhr.status = 100;
	        xhr.onreadystatechange = EMPTYFN;
	        xhr.onload = function () {
	            xhr.readyState = 4;
	            xhr.status = 200;

	            var xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
	            xmlDoc.async = 'false';
	            xmlDoc.loadXML(xhr.responseText);
	            xhr.responseXML = xmlDoc;
	            xhr.response = xhr.responseText;
	            xhr.onreadystatechange();
	        };
	        xhr.ontimeout = xhr.onerror = function () {
	            xhr.readyState = 4;
	            xhr.status = 500;
	            xhr.onreadystatechange();
	        };
	        return xhr;
	    };

	    var _hasFlash = function () {
	        if ('ActiveXObject' in window) {
	            try {
	                return new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
	            } catch (ex) {
	                return 0;
	            }
	        } else {
	            if (navigator.plugins && navigator.plugins.length > 0) {
	                return navigator.plugins['Shockwave Flash'];
	            }
	        }
	        return 0;
	    }();

	    var _tmpUtilXHR = _xmlrequest(),
	        _hasFormData = typeof FormData !== 'undefined',
	        _hasBlob = typeof Blob !== 'undefined',
	        _isCanSetRequestHeader = _tmpUtilXHR.setRequestHeader || false,
	        _hasOverrideMimeType = _tmpUtilXHR.overrideMimeType || false,
	        _isCanUploadFileAsync = _isCanSetRequestHeader && _hasFormData,
	        _isCanUploadFile = _isCanUploadFileAsync || _hasFlash,
	        _isCanDownLoadFile = _isCanSetRequestHeader && (_hasBlob || _hasOverrideMimeType);

	    if (!Object.keys) {
	        Object.keys = function () {
	            'use strict';

	            var hasOwnProperty = Object.prototype.hasOwnProperty,
	                hasDontEnumBug = !{ toString: null }.propertyIsEnumerable('toString'),
	                dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'],
	                dontEnumsLength = dontEnums.length;

	            return function (obj) {
	                if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' && (typeof obj !== 'function' || obj === null)) {
	                    throw new TypeError('Object.keys called on non-object');
	                }

	                var result = [],
	                    prop,
	                    i;

	                for (prop in obj) {
	                    if (hasOwnProperty.call(obj, prop)) {
	                        result.push(prop);
	                    }
	                }

	                if (hasDontEnumBug) {
	                    for (i = 0; i < dontEnumsLength; i++) {
	                        if (hasOwnProperty.call(obj, dontEnums[i])) {
	                            result.push(dontEnums[i]);
	                        }
	                    }
	                }
	                return result;
	            };
	        }();
	    }

	    var utils = {
	        hasFormData: _hasFormData,

	        hasBlob: _hasBlob,

	        emptyfn: EMPTYFN,

	        isCanSetRequestHeader: _isCanSetRequestHeader,

	        hasOverrideMimeType: _hasOverrideMimeType,

	        isCanUploadFileAsync: _isCanUploadFileAsync,

	        isCanUploadFile: _isCanUploadFile,

	        isCanDownLoadFile: _isCanDownLoadFile,

	        isSupportWss: function () {
	            var notSupportList = [
	            //1: QQ browser X5 core
	            /MQQBrowser[\/]5([.]\d+)?\sTBS/

	            //2: etc.
	            //...
	            ];

	            if (!window.WebSocket) {
	                return false;
	            }

	            var ua = window.navigator.userAgent;
	            for (var i = 0, l = notSupportList.length; i < l; i++) {
	                if (notSupportList[i].test(ua)) {
	                    return false;
	                }
	            }
	            return true;
	        }(),

	        getIEVersion: function () {
	            var ua = navigator.userAgent,
	                matches,
	                tridentMap = { '4': 8, '5': 9, '6': 10, '7': 11 };

	            matches = ua.match(/MSIE (\d+)/i);

	            if (matches && matches[1]) {
	                return +matches[1];
	            }
	            matches = ua.match(/Trident\/(\d+)/i);
	            if (matches && matches[1]) {
	                return tridentMap[matches[1]] || null;
	            }
	            return null;
	        }(),

	        stringify: function stringify(json) {
	            if (typeof JSON !== 'undefined' && JSON.stringify) {
	                return JSON.stringify(json);
	            } else {
	                var s = '',
	                    arr = [];

	                var iterate = function iterate(json) {
	                    var isArr = false;

	                    if (Object.prototype.toString.call(json) === '[object Array]') {
	                        arr.push(']', '[');
	                        isArr = true;
	                    } else if (Object.prototype.toString.call(json) === '[object Object]') {
	                        arr.push('}', '{');
	                    }

	                    for (var o in json) {
	                        if (Object.prototype.toString.call(json[o]) === '[object Null]') {
	                            json[o] = 'null';
	                        } else if (Object.prototype.toString.call(json[o]) === '[object Undefined]') {
	                            json[o] = 'undefined';
	                        }

	                        if (json[o] && _typeof(json[o]) === 'object') {
	                            s += ',' + (isArr ? '' : '"' + o + '":' + (isArr ? '"' : '')) + iterate(json[o]) + '';
	                        } else {
	                            s += ',"' + (isArr ? '' : o + '":"') + json[o] + '"';
	                        }
	                    }

	                    if (s != '') {
	                        s = s.slice(1);
	                    }

	                    return arr.pop() + s + arr.pop();
	                };
	                return iterate(json);
	            }
	        },
	        registerUser: function registerUser(options) {
	            if (location.protocol != 'https:' && WebIM.config.isHttpDNS) {
	                Demo.conn.dnsIndex = 0;
	                Demo.conn.getHttpDNS(options, 'signup');
	            } else {
	                Demo.conn.signup(options);
	            }
	        },
	        login: function login(options) {
	            var options = options || {};
	            var suc = options.success || EMPTYFN;
	            var err = options.error || EMPTYFN;

	            var appKey = options.appKey || '';
	            var devInfos = appKey.split('#');
	            if (devInfos.length !== 2) {
	                err({
	                    type: _code.WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR
	                });
	                return false;
	            }

	            var orgName = devInfos[0];
	            var appName = devInfos[1];
	            var https = https || options.https;
	            var user = options.user || '';
	            var pwd = options.pwd || '';

	            var apiUrl = options.apiUrl;

	            var loginJson = {
	                grant_type: 'password',
	                username: user,
	                password: pwd,
	                timestamp: +new Date()
	            };
	            var loginfo = utils.stringify(loginJson);

	            var options = {
	                url: apiUrl + '/' + orgName + '/' + appName + '/token',
	                dataType: 'json',
	                data: loginfo,
	                success: suc,
	                error: err
	            };
	            return utils.ajax(options);
	        },

	        getFileUrl: function getFileUrl(fileInputId) {
	            var uri = {
	                url: '',
	                filename: '',
	                filetype: '',
	                data: ''
	            };

	            var fileObj = typeof fileInputId === 'string' ? document.getElementById(fileInputId) : fileInputId;

	            if (!utils.isCanUploadFileAsync || !fileObj) {
	                return uri;
	            }
	            try {
	                if (window.URL.createObjectURL) {
	                    var fileItems = fileObj.files;
	                    if (fileItems.length > 0) {
	                        var u = fileItems.item(0);
	                        uri.data = u;
	                        uri.url = window.URL.createObjectURL(u);
	                        uri.filename = u.name || '';
	                    }
	                } else {
	                    // IE
	                    var u = document.getElementById(fileInputId).value;
	                    uri.url = u;
	                    var pos1 = u.lastIndexOf('/');
	                    var pos2 = u.lastIndexOf('\\');
	                    var pos = Math.max(pos1, pos2);
	                    if (pos < 0) uri.filename = u;else uri.filename = u.substring(pos + 1);
	                }
	                var index = uri.filename.lastIndexOf('.');
	                if (index != -1) {
	                    uri.filetype = uri.filename.substring(index + 1).toLowerCase();
	                }
	                return uri;
	            } catch (e) {
	                throw e;
	            }
	        },

	        getFileSize: function getFileSize(fileInputId) {
	            var file = document.getElementById(fileInputId);
	            var fileSize = 0;
	            if (file) {
	                if (file.files) {
	                    if (file.files.length > 0) {
	                        fileSize = file.files[0].size;
	                    }
	                } else if (file.select && 'ActiveXObject' in window) {
	                    file.select();
	                    var fileobject = new ActiveXObject('Scripting.FileSystemObject');
	                    var file = fileobject.GetFile(file.value);
	                    fileSize = file.Size;
	                }
	            }
	            return fileSize;
	        },

	        hasFlash: _hasFlash,

	        trim: function trim(str) {

	            str = typeof str === 'string' ? str : '';

	            return str.trim ? str.trim() : str.replace(/^\s|\s$/g, '');
	        },

	        parseEmoji: function parseEmoji(msg) {
	            if (typeof WebIM.Emoji === 'undefined' || typeof WebIM.Emoji.map === 'undefined') {
	                return msg;
	            } else {
	                var emoji = WebIM.Emoji,
	                    reg = null;

	                for (var face in emoji.map) {
	                    if (emoji.map.hasOwnProperty(face)) {
	                        while (msg.indexOf(face) > -1) {
	                            msg = msg.replace(face, '<img class="emoji" src="' + emoji.path + emoji.map[face] + '" />');
	                        }
	                    }
	                }
	                return msg;
	            }
	        },

	        parseLink: function parseLink(msg) {

	            var reg = /(https?\:\/\/|www\.)([a-zA-Z0-9-]+(\.[a-zA-Z0-9]+)+)(\:[0-9]{2,4})?\/?((\.[:_0-9a-zA-Z-]+)|[:_0-9a-zA-Z-]*\/?)*\??[:_#@*&%0-9a-zA-Z-/=]*/gm;

	            msg = msg.replace(reg, function (v) {

	                var prefix = /^https?/gm.test(v);

	                return "<a href='" + (prefix ? v : '//' + v) + "' target='_blank'>" + v + "</a>";
	            });

	            return msg;
	        },

	        parseJSON: function parseJSON(data) {

	            if (window.JSON && window.JSON.parse) {
	                return window.JSON.parse(data + '');
	            }

	            var requireNonComma,
	                depth = null,
	                str = utils.trim(data + '');

	            return str && !utils.trim(str.replace(/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g, function (token, comma, open, close) {

	                if (requireNonComma && comma) {
	                    depth = 0;
	                }

	                if (depth === 0) {
	                    return token;
	                }

	                requireNonComma = open || comma;
	                depth += !close - !open;
	                return '';
	            })) ? Function('return ' + str)() : Function('Invalid JSON: ' + data)();
	        },

	        parseUploadResponse: function parseUploadResponse(response) {
	            return response.indexOf('callback') > -1 ? //lte ie9
	            response.slice(9, -1) : response;
	        },

	        parseDownloadResponse: function parseDownloadResponse(response) {
	            return response && response.type && response.type === 'application/json' || 0 > Object.prototype.toString.call(response).indexOf('Blob') ? this.url + '?token=' : window.URL.createObjectURL(response);
	        },

	        uploadFile: function uploadFile(options) {
	            var options = options || {};
	            options.onFileUploadProgress = options.onFileUploadProgress || EMPTYFN;
	            options.onFileUploadComplete = options.onFileUploadComplete || EMPTYFN;
	            options.onFileUploadError = options.onFileUploadError || EMPTYFN;
	            options.onFileUploadCanceled = options.onFileUploadCanceled || EMPTYFN;

	            var acc = options.accessToken || this.context.accessToken;
	            if (!acc) {
	                options.onFileUploadError({
	                    type: _code.WEBIM_UPLOADFILE_NO_LOGIN,
	                    id: options.id
	                });
	                return;
	            }

	            var orgName, appName, devInfos;
	            var appKey = options.appKey || this.context.appKey || '';

	            if (appKey) {
	                devInfos = appKey.split('#');
	                orgName = devInfos[0];
	                appName = devInfos[1];
	            }

	            if (!orgName && !appName) {
	                options.onFileUploadError({
	                    type: _code.WEBIM_UPLOADFILE_ERROR,
	                    id: options.id
	                });
	                return;
	            }

	            var apiUrl = options.apiUrl;
	            var uploadUrl = apiUrl + '/' + orgName + '/' + appName + '/chatfiles';

	            if (!utils.isCanUploadFileAsync) {
	                if (utils.hasFlash && typeof options.flashUpload === 'function') {
	                    options.flashUpload && options.flashUpload(uploadUrl, options);
	                } else {
	                    options.onFileUploadError({
	                        type: _code.WEBIM_UPLOADFILE_BROWSER_ERROR,
	                        id: options.id
	                    });
	                }
	                return;
	            }

	            var fileSize = options.file.data ? options.file.data.size : undefined;
	            if (fileSize > WEBIM_FILESIZE_LIMIT) {
	                options.onFileUploadError({
	                    type: _code.WEBIM_UPLOADFILE_ERROR,
	                    id: options.id
	                });
	                return;
	            } else if (fileSize <= 0) {
	                options.onFileUploadError({
	                    type: _code.WEBIM_UPLOADFILE_ERROR,
	                    id: options.id
	                });
	                return;
	            }

	            var xhr = utils.xmlrequest();
	            var onError = function onError(e) {
	                options.onFileUploadError({
	                    type: _code.WEBIM_UPLOADFILE_ERROR,
	                    id: options.id,
	                    xhr: xhr
	                });
	            };
	            if (xhr.upload) {
	                xhr.upload.addEventListener('progress', options.onFileUploadProgress, false);
	            }
	            if (xhr.addEventListener) {
	                xhr.addEventListener('abort', options.onFileUploadCanceled, false);
	                xhr.addEventListener('load', function (e) {
	                    try {
	                        var json = utils.parseJSON(xhr.responseText);
	                        try {
	                            options.onFileUploadComplete(json);
	                        } catch (e) {
	                            options.onFileUploadError({
	                                type: _code.WEBIM_CONNCTION_CALLBACK_INNER_ERROR,
	                                data: e
	                            });
	                        }
	                    } catch (e) {
	                        options.onFileUploadError({
	                            type: _code.WEBIM_UPLOADFILE_ERROR,
	                            data: xhr.responseText,
	                            id: options.id,
	                            xhr: xhr
	                        });
	                    }
	                }, false);
	                xhr.addEventListener('error', onError, false);
	            } else if (xhr.onreadystatechange) {
	                xhr.onreadystatechange = function () {
	                    if (xhr.readyState === 4) {
	                        if (ajax.status === 200) {
	                            try {
	                                var json = utils.parseJSON(xhr.responseText);
	                                options.onFileUploadComplete(json);
	                            } catch (e) {
	                                options.onFileUploadError({
	                                    type: _code.WEBIM_UPLOADFILE_ERROR,
	                                    data: xhr.responseText,
	                                    id: options.id,
	                                    xhr: xhr
	                                });
	                            }
	                        } else {
	                            options.onFileUploadError({
	                                type: _code.WEBIM_UPLOADFILE_ERROR,
	                                data: xhr.responseText,
	                                id: options.id,
	                                xhr: xhr
	                            });
	                        }
	                    } else {
	                        xhr.abort();
	                        options.onFileUploadCanceled();
	                    }
	                };
	            }

	            xhr.open('POST', uploadUrl);

	            xhr.setRequestHeader('restrict-access', 'true');
	            xhr.setRequestHeader('Accept', '*/*'); // Android QQ browser has some problem with this attribute.
	            xhr.setRequestHeader('Authorization', 'Bearer ' + acc);

	            var formData = new FormData();
	            formData.append('file', options.file.data);
	            xhr.send(formData);
	        },

	        download: function download(options) {
	            options.onFileDownloadComplete = options.onFileDownloadComplete || EMPTYFN;
	            options.onFileDownloadError = options.onFileDownloadError || EMPTYFN;

	            var accessToken = options.accessToken || this.context.accessToken;
	            if (!accessToken) {
	                options.onFileDownloadError({
	                    type: _code.WEBIM_DOWNLOADFILE_NO_LOGIN,
	                    id: options.id
	                });
	                return;
	            }

	            var onError = function onError(e) {
	                options.onFileDownloadError({
	                    type: _code.WEBIM_DOWNLOADFILE_ERROR,
	                    id: options.id,
	                    xhr: xhr
	                });
	            };

	            if (!utils.isCanDownLoadFile) {
	                options.onFileDownloadComplete();
	                return;
	            }
	            var xhr = utils.xmlrequest();
	            if ('addEventListener' in xhr) {
	                xhr.addEventListener('load', function (e) {
	                    options.onFileDownloadComplete(xhr.response, xhr);
	                }, false);
	                xhr.addEventListener('error', onError, false);
	            } else if ('onreadystatechange' in xhr) {
	                xhr.onreadystatechange = function () {
	                    if (xhr.readyState === 4) {
	                        if (ajax.status === 200) {
	                            options.onFileDownloadComplete(xhr.response, xhr);
	                        } else {
	                            options.onFileDownloadError({
	                                type: _code.WEBIM_DOWNLOADFILE_ERROR,
	                                id: options.id,
	                                xhr: xhr
	                            });
	                        }
	                    } else {
	                        xhr.abort();
	                        options.onFileDownloadError({
	                            type: _code.WEBIM_DOWNLOADFILE_ERROR,
	                            id: options.id,
	                            xhr: xhr
	                        });
	                    }
	                };
	            }

	            var method = options.method || 'GET';
	            var resType = options.responseType || 'blob';
	            var mimeType = options.mimeType || 'text/plain; charset=x-user-defined';
	            xhr.open(method, options.url);
	            if (typeof Blob !== 'undefined') {
	                xhr.responseType = resType;
	            } else {
	                xhr.overrideMimeType(mimeType);
	            }

	            var innerHeaer = {
	                'X-Requested-With': 'XMLHttpRequest',
	                'Accept': 'application/octet-stream',
	                'share-secret': options.secret,
	                'Authorization': 'Bearer ' + accessToken
	            };
	            var headers = options.headers || {};
	            for (var key in headers) {
	                innerHeaer[key] = headers[key];
	            }
	            for (var key in innerHeaer) {
	                if (innerHeaer[key]) {
	                    xhr.setRequestHeader(key, innerHeaer[key]);
	                }
	            }
	            xhr.send(null);
	        },

	        parseTextMessage: function parseTextMessage(message, faces) {
	            if (typeof message !== 'string') {
	                return;
	            }

	            if (Object.prototype.toString.call(faces) !== '[object Object]') {
	                return {
	                    isemoji: false,
	                    body: [{
	                        type: 'txt',
	                        data: message
	                    }]
	                };
	            }

	            var receiveMsg = message;
	            var emessage = [];
	            var expr = /\[[^[\]]{2,3}\]/mg;
	            var emoji = receiveMsg.match(expr);

	            if (!emoji || emoji.length < 1) {
	                return {
	                    isemoji: false,
	                    body: [{
	                        type: 'txt',
	                        data: message
	                    }]
	                };
	            }
	            var isemoji = false;
	            for (var i = 0; i < emoji.length; i++) {
	                var tmsg = receiveMsg.substring(0, receiveMsg.indexOf(emoji[i])),
	                    existEmoji = WebIM.Emoji.map[emoji[i]];

	                if (tmsg) {
	                    emessage.push({
	                        type: 'txt',
	                        data: tmsg
	                    });
	                }
	                if (!existEmoji) {
	                    emessage.push({
	                        type: 'txt',
	                        data: emoji[i]
	                    });
	                    continue;
	                }
	                var emojiStr = WebIM.Emoji.map ? WebIM.Emoji.path + existEmoji : null;

	                if (emojiStr) {
	                    isemoji = true;
	                    emessage.push({
	                        type: 'emoji',
	                        data: emojiStr
	                    });
	                } else {
	                    emessage.push({
	                        type: 'txt',
	                        data: emoji[i]
	                    });
	                }
	                var restMsgIndex = receiveMsg.indexOf(emoji[i]) + emoji[i].length;
	                receiveMsg = receiveMsg.substring(restMsgIndex);
	            }
	            if (receiveMsg) {
	                emessage.push({
	                    type: 'txt',
	                    data: receiveMsg
	                });
	            }
	            if (isemoji) {
	                return {
	                    isemoji: isemoji,
	                    body: emessage
	                };
	            }
	            return {
	                isemoji: false,
	                body: [{
	                    type: 'txt',
	                    data: message
	                }]
	            };
	        },

	        xmlrequest: _xmlrequest,

	        getXmlFirstChild: function getXmlFirstChild(data, tagName) {
	            var children = data.getElementsByTagName(tagName);
	            if (children.length == 0) {
	                return null;
	            } else {
	                return children[0];
	            }
	        },
	        ajax: function ajax(options) {
	            var dataType = options.dataType || 'text';
	            var suc = options.success || EMPTYFN;
	            var error = options.error || EMPTYFN;
	            var xhr = utils.xmlrequest();

	            xhr.onreadystatechange = function () {
	                if (xhr.readyState === 4) {
	                    var status = xhr.status || 0;
	                    if (status === 200) {
	                        try {
	                            switch (dataType) {
	                                case 'text':
	                                    suc(xhr.responseText);
	                                    return;
	                                case 'json':
	                                    var json = utils.parseJSON(xhr.responseText);
	                                    suc(json, xhr);
	                                    return;
	                                case 'xml':
	                                    if (xhr.responseXML && xhr.responseXML.documentElement) {
	                                        suc(xhr.responseXML.documentElement, xhr);
	                                    } else {
	                                        error({
	                                            type: _code.WEBIM_CONNCTION_AJAX_ERROR,
	                                            data: xhr.responseText
	                                        });
	                                    }
	                                    return;
	                            }
	                            suc(xhr.response || xhr.responseText, xhr);
	                        } catch (e) {
	                            error({
	                                type: _code.WEBIM_CONNCTION_AJAX_ERROR,
	                                data: e
	                            });
	                        }
	                        return;
	                    } else {
	                        error({
	                            type: _code.WEBIM_CONNCTION_AJAX_ERROR,
	                            data: xhr.responseText
	                        });
	                        return;
	                    }
	                }
	                if (xhr.readyState === 0) {
	                    error({
	                        type: _code.WEBIM_CONNCTION_AJAX_ERROR,
	                        data: xhr.responseText
	                    });
	                }
	            };

	            if (options.responseType) {
	                if (xhr.responseType) {
	                    xhr.responseType = options.responseType;
	                }
	            }
	            if (options.mimeType) {
	                if (utils.hasOverrideMimeType) {
	                    xhr.overrideMimeType(options.mimeType);
	                }
	            }

	            var type = options.type || 'POST',
	                data = options.data || null,
	                tempData = '';

	            if (type.toLowerCase() === 'get' && data) {
	                for (var o in data) {
	                    if (data.hasOwnProperty(o)) {
	                        tempData += o + '=' + data[o] + '&';
	                    }
	                }
	                tempData = tempData ? tempData.slice(0, -1) : tempData;
	                options.url += (options.url.indexOf('?') > 0 ? '&' : '?') + (tempData ? tempData + '&' : tempData) + '_v=' + new Date().getTime();
	                data = null;
	                tempData = null;
	            }
	            xhr.open(type, options.url);

	            if (utils.isCanSetRequestHeader) {
	                var headers = options.headers || {};
	                for (var key in headers) {
	                    if (headers.hasOwnProperty(key)) {
	                        xhr.setRequestHeader(key, headers[key]);
	                    }
	                }
	            }

	            xhr.send(data);
	            return xhr;
	        },
	        ts: function ts() {
	            var d = new Date();
	            var Hours = d.getHours(); //获取当前小时数(0-23)
	            var Minutes = d.getMinutes(); //获取当前分钟数(0-59)
	            var Seconds = d.getSeconds(); //获取当前秒数(0-59)
	            var Milliseconds = d.getMilliseconds(); //获取当前毫秒
	            return (Hours < 10 ? "0" + Hours : Hours) + ':' + (Minutes < 10 ? "0" + Minutes : Minutes) + ':' + (Seconds < 10 ? "0" + Seconds : Seconds) + ':' + Milliseconds + ' ';
	        },

	        getObjectKey: function getObjectKey(obj, val) {
	            for (var key in obj) {
	                if (obj[key] == val) {
	                    return key;
	                }
	            }
	            return '';
	        }

	    };

	    exports.utils = utils;
	})();

/***/ },

/***/ 218:
/***/ function(module, exports) {

	"use strict";

	;
	(function () {
	    var connIndex = 0,
	        uploadIndex = 100,
	        downloadIndex = 200,
	        msgIndex = 300,
	        statusIndex = 400;

	    exports.code = {
	        WEBIM_CONNCTION_USER_NOT_ASSIGN_ERROR: connIndex++,
	        WEBIM_CONNCTION_OPEN_ERROR: connIndex++,
	        WEBIM_CONNCTION_AUTH_ERROR: connIndex++,
	        WEBIM_CONNCTION_OPEN_USERGRID_ERROR: connIndex++,
	        WEBIM_CONNCTION_ATTACH_ERROR: connIndex++,
	        WEBIM_CONNCTION_ATTACH_USERGRID_ERROR: connIndex++,
	        WEBIM_CONNCTION_REOPEN_ERROR: connIndex++,
	        WEBIM_CONNCTION_SERVER_CLOSE_ERROR: connIndex++, //7: client-side network offline (net::ERR_INTERNET_DISCONNECTED)
	        WEBIM_CONNCTION_SERVER_ERROR: connIndex++, //8: offline by multi login
	        WEBIM_CONNCTION_IQ_ERROR: connIndex++,

	        WEBIM_CONNCTION_PING_ERROR: connIndex++,
	        WEBIM_CONNCTION_NOTIFYVERSION_ERROR: connIndex++,
	        WEBIM_CONNCTION_GETROSTER_ERROR: connIndex++,
	        WEBIM_CONNCTION_CROSSDOMAIN_ERROR: connIndex++,
	        WEBIM_CONNCTION_LISTENING_OUTOF_MAXRETRIES: connIndex++,
	        WEBIM_CONNCTION_RECEIVEMSG_CONTENTERROR: connIndex++,
	        WEBIM_CONNCTION_DISCONNECTED: connIndex++, //16: server-side close the websocket connection
	        WEBIM_CONNCTION_AJAX_ERROR: connIndex++,
	        WEBIM_CONNCTION_JOINROOM_ERROR: connIndex++,
	        WEBIM_CONNCTION_GETROOM_ERROR: connIndex++,

	        WEBIM_CONNCTION_GETROOMINFO_ERROR: connIndex++,
	        WEBIM_CONNCTION_GETROOMMEMBER_ERROR: connIndex++,
	        WEBIM_CONNCTION_GETROOMOCCUPANTS_ERROR: connIndex++,
	        WEBIM_CONNCTION_LOAD_CHATROOM_ERROR: connIndex++,
	        WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR: connIndex++,
	        WEBIM_CONNCTION_JOINCHATROOM_ERROR: connIndex++,
	        WEBIM_CONNCTION_QUITCHATROOM_ERROR: connIndex++,
	        WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR: connIndex++,
	        WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR: connIndex++,
	        WEBIM_CONNCTION_SESSIONID_NOT_ASSIGN_ERROR: connIndex++,

	        WEBIM_CONNCTION_RID_NOT_ASSIGN_ERROR: connIndex++,
	        WEBIM_CONNCTION_CALLBACK_INNER_ERROR: connIndex++,
	        WEBIM_CONNCTION_CLIENT_OFFLINE: connIndex++, //32: client offline
	        WEBIM_CONNCTION_CLIENT_LOGOUT: connIndex++, //33: client logout
	        WEBIM_CONNCTION_CLIENT_TOO_MUCH_ERROR: connIndex++, // Over amount of the tabs a user opened in the same browser


	        WEBIM_UPLOADFILE_BROWSER_ERROR: uploadIndex++,
	        WEBIM_UPLOADFILE_ERROR: uploadIndex++,
	        WEBIM_UPLOADFILE_NO_LOGIN: uploadIndex++,
	        WEBIM_UPLOADFILE_NO_FILE: uploadIndex++,

	        WEBIM_DOWNLOADFILE_ERROR: downloadIndex++,
	        WEBIM_DOWNLOADFILE_NO_LOGIN: downloadIndex++,
	        WEBIM_DOWNLOADFILE_BROWSER_ERROR: downloadIndex++,

	        WEBIM_MESSAGE_REC_TEXT: msgIndex++,
	        WEBIM_MESSAGE_REC_TEXT_ERROR: msgIndex++,
	        WEBIM_MESSAGE_REC_EMOTION: msgIndex++,
	        WEBIM_MESSAGE_REC_PHOTO: msgIndex++,
	        WEBIM_MESSAGE_REC_AUDIO: msgIndex++,
	        WEBIM_MESSAGE_REC_AUDIO_FILE: msgIndex++,
	        WEBIM_MESSAGE_REC_VEDIO: msgIndex++,
	        WEBIM_MESSAGE_REC_VEDIO_FILE: msgIndex++,
	        WEBIM_MESSAGE_REC_FILE: msgIndex++,
	        WEBIM_MESSAGE_SED_TEXT: msgIndex++,
	        WEBIM_MESSAGE_SED_EMOTION: msgIndex++,
	        WEBIM_MESSAGE_SED_PHOTO: msgIndex++,
	        WEBIM_MESSAGE_SED_AUDIO: msgIndex++,
	        WEBIM_MESSAGE_SED_AUDIO_FILE: msgIndex++,
	        WEBIM_MESSAGE_SED_VEDIO: msgIndex++,
	        WEBIM_MESSAGE_SED_VEDIO_FILE: msgIndex++,
	        WEBIM_MESSAGE_SED_FILE: msgIndex++,

	        STATUS_INIT: statusIndex++,
	        STATUS_DOLOGIN_USERGRID: statusIndex++,
	        STATUS_DOLOGIN_IM: statusIndex++,
	        STATUS_OPENED: statusIndex++,
	        STATUS_CLOSING: statusIndex++,
	        STATUS_CLOSED: statusIndex++,
	        STATUS_ERROR: statusIndex++
	    };
	})();

/***/ },

/***/ 224:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(225);

/***/ },

/***/ 225:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _version = '1.4.2';
	var _code = __webpack_require__(218).code;
	var _utils = __webpack_require__(217).utils;
	var _msg = __webpack_require__(226);
	var _message = _msg._msg;
	var _msgHash = {};
	var Queue = __webpack_require__(227).Queue;

	window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

	if (window.XDomainRequest) {
	    XDomainRequest.prototype.oldsend = XDomainRequest.prototype.send;
	    XDomainRequest.prototype.send = function () {
	        XDomainRequest.prototype.oldsend.apply(this, arguments);
	        this.readyState = 2;
	    };
	}

	Strophe.Request.prototype._newXHR = function () {
	    var xhr = _utils.xmlrequest(true);
	    if (xhr.overrideMimeType) {
	        xhr.overrideMimeType('text/xml');
	    }
	    // use Function.bind() to prepend ourselves as an argument
	    xhr.onreadystatechange = this.func.bind(null, this);
	    return xhr;
	};

	Strophe.Websocket.prototype._closeSocket = function () {
	    if (this.socket) {
	        var me = this;
	        setTimeout(function () {
	            try {
	                me.socket.close();
	            } catch (e) {}
	        }, 0);
	    } else {
	        this.socket = null;
	    }
	};

	/**
	 *
	 * Strophe.Websocket has a bug while logout:
	 * 1.send: <presence xmlns='jabber:client' type='unavailable'/> is ok;
	 * 2.send: <close xmlns='urn:ietf:params:xml:ns:xmpp-framing'/> will cause a problem,log as follows:
	 * WebSocket connection to 'ws://im-api.easemob.com/ws/' failed: Data frame received after close_connect @ strophe.js:5292connect @ strophe.js:2491_login @ websdk-1.1.2.js:278suc @ websdk-1.1.2.js:636xhr.onreadystatechange @ websdk-1.1.2.js:2582
	 * 3 "Websocket error [object Event]"
	 * _changeConnectStatus
	 * onError Object {type: 7, msg: "The WebSocket connection could not be established or was disconnected.", reconnect: true}
	 *
	 * this will trigger socket.onError, therefore _doDisconnect again.
	 * Fix it by overide  _onMessage
	 */
	Strophe.Websocket.prototype._onMessage = function (message) {
	    WebIM && WebIM.config.isDebug && console.log(WebIM.utils.ts() + 'recv:', message.data);
	    var elem, data;
	    // check for closing stream
	    // var close = '<close xmlns="urn:ietf:params:xml:ns:xmpp-framing" />';
	    // if (message.data === close) {
	    //     this._conn.rawInput(close);
	    //     this._conn.xmlInput(message);
	    //     if (!this._conn.disconnecting) {
	    //         this._conn._doDisconnect();
	    //     }
	    //     return;
	    //
	    // send and receive close xml: <close xmlns='urn:ietf:params:xml:ns:xmpp-framing'/>
	    // so we can't judge whether message.data equals close by === simply.
	    if (message.data.indexOf("<close ") === 0) {
	        elem = new DOMParser().parseFromString(message.data, "text/xml").documentElement;
	        var see_uri = elem.getAttribute("see-other-uri");
	        if (see_uri) {
	            this._conn._changeConnectStatus(Strophe.Status.REDIRECT, "Received see-other-uri, resetting connection");
	            this._conn.reset();
	            this._conn.service = see_uri;
	            this._connect();
	        } else {
	            // if (!this._conn.disconnecting) {
	            this._conn._doDisconnect("receive <close> from server");
	            // }
	        }
	        return;
	    } else if (message.data.search("<open ") === 0) {
	        // This handles stream restarts
	        elem = new DOMParser().parseFromString(message.data, "text/xml").documentElement;
	        if (!this._handleStreamStart(elem)) {
	            return;
	        }
	    } else {
	        data = this._streamWrap(message.data);
	        elem = new DOMParser().parseFromString(data, "text/xml").documentElement;
	    }

	    if (this._check_streamerror(elem, Strophe.Status.ERROR)) {
	        return;
	    }

	    //handle unavailable presence stanza before disconnecting
	    if (this._conn.disconnecting && elem.firstChild.nodeName === "presence" && elem.firstChild.getAttribute("type") === "unavailable") {
	        this._conn.xmlInput(elem);
	        this._conn.rawInput(Strophe.serialize(elem));
	        // if we are already disconnecting we will ignore the unavailable stanza and
	        // wait for the </stream:stream> tag before we close the connection
	        return;
	    }
	    this._conn._dataRecv(elem, message.data);
	};

	var _listenNetwork = function _listenNetwork(onlineCallback, offlineCallback) {

	    if (window.addEventListener) {
	        window.addEventListener('online', onlineCallback);
	        window.addEventListener('offline', offlineCallback);
	    } else if (window.attachEvent) {
	        if (document.body) {
	            document.body.attachEvent('ononline', onlineCallback);
	            document.body.attachEvent('onoffline', offlineCallback);
	        } else {
	            window.attachEvent('load', function () {
	                document.body.attachEvent('ononline', onlineCallback);
	                document.body.attachEvent('onoffline', offlineCallback);
	            });
	        }
	    } else {
	        /*var onlineTmp = window.ononline;
	         var offlineTmp = window.onoffline;
	          window.attachEvent('ononline', function () {
	         try {
	         typeof onlineTmp === 'function' && onlineTmp();
	         } catch ( e ) {}
	         onlineCallback();
	         });
	         window.attachEvent('onoffline', function () {
	         try {
	         typeof offlineTmp === 'function' && offlineTmp();
	         } catch ( e ) {}
	         offlineCallback();
	         });*/
	    }
	};

	var _parseRoom = function _parseRoom(result) {
	    var rooms = [];
	    var items = result.getElementsByTagName('item');
	    if (items) {
	        for (var i = 0; i < items.length; i++) {
	            var item = items[i];
	            var roomJid = item.getAttribute('jid');
	            var tmp = roomJid.split('@')[0];
	            var room = {
	                jid: roomJid,
	                name: item.getAttribute('name'),
	                roomId: tmp.split('_')[1]
	            };
	            rooms.push(room);
	        }
	    }
	    return rooms;
	};

	var _parseRoomOccupants = function _parseRoomOccupants(result) {
	    var occupants = [];
	    var items = result.getElementsByTagName('item');
	    if (items) {
	        for (var i = 0; i < items.length; i++) {
	            var item = items[i];
	            var room = {
	                jid: item.getAttribute('jid'),
	                name: item.getAttribute('name')
	            };
	            occupants.push(room);
	        }
	    }
	    return occupants;
	};

	var _parseResponseMessage = function _parseResponseMessage(msginfo) {
	    var parseMsgData = { errorMsg: true, data: [] };

	    var msgBodies = msginfo.getElementsByTagName('body');
	    if (msgBodies) {
	        for (var i = 0; i < msgBodies.length; i++) {
	            var msgBody = msgBodies[i];
	            var childNodes = msgBody.childNodes;
	            if (childNodes && childNodes.length > 0) {
	                var childNode = msgBody.childNodes[0];
	                if (childNode.nodeType == Strophe.ElementType.TEXT) {
	                    var jsondata = childNode.wholeText || childNode.nodeValue;
	                    jsondata = jsondata.replace('\n', '<br>');
	                    try {
	                        var data = eval('(' + jsondata + ')');
	                        parseMsgData.errorMsg = false;
	                        parseMsgData.data = [data];
	                    } catch (e) {}
	                }
	            }
	        }

	        var delayTags = msginfo.getElementsByTagName('delay');
	        if (delayTags && delayTags.length > 0) {
	            var delayTag = delayTags[0];
	            var delayMsgTime = delayTag.getAttribute('stamp');
	            if (delayMsgTime) {
	                parseMsgData.delayTimeStamp = delayMsgTime;
	            }
	        }
	    } else {
	        var childrens = msginfo.childNodes;
	        if (childrens && childrens.length > 0) {
	            var child = msginfo.childNodes[0];
	            if (child.nodeType == Strophe.ElementType.TEXT) {
	                try {
	                    var data = eval('(' + child.nodeValue + ')');
	                    parseMsgData.errorMsg = false;
	                    parseMsgData.data = [data];
	                } catch (e) {}
	            }
	        }
	    }
	    return parseMsgData;
	};

	var _parseNameFromJidFn = function _parseNameFromJidFn(jid, domain) {
	    domain = domain || '';
	    var tempstr = jid;
	    var findex = tempstr.indexOf('_');

	    if (findex !== -1) {
	        tempstr = tempstr.substring(findex + 1);
	    }
	    var atindex = tempstr.indexOf('@' + domain);
	    if (atindex !== -1) {
	        tempstr = tempstr.substring(0, atindex);
	    }
	    return tempstr;
	};

	var _parseFriend = function _parseFriend(queryTag, conn, from) {
	    var rouster = [];
	    var items = queryTag.getElementsByTagName('item');
	    if (items) {
	        for (var i = 0; i < items.length; i++) {
	            var item = items[i];
	            var jid = item.getAttribute('jid');
	            if (!jid) {
	                continue;
	            }
	            var subscription = item.getAttribute('subscription');
	            var friend = {
	                subscription: subscription,
	                jid: jid
	            };
	            var ask = item.getAttribute('ask');
	            if (ask) {
	                friend.ask = ask;
	            }
	            var name = item.getAttribute('name');
	            if (name) {
	                friend.name = name;
	            } else {
	                var n = _parseNameFromJidFn(jid);
	                friend.name = n;
	            }
	            var groups = [];
	            Strophe.forEachChild(item, 'group', function (group) {
	                groups.push(Strophe.getText(group));
	            });
	            friend.groups = groups;
	            rouster.push(friend);
	            // B同意之后 -> B订阅A
	            if (conn && subscription == 'from') {
	                conn.subscribe({
	                    toJid: jid
	                });
	            }

	            if (conn && subscription == 'to') {
	                conn.subscribed({
	                    toJid: jid
	                });
	            }
	        }
	    }
	    return rouster;
	};

	var _login = function _login(options, conn) {
	    var accessToken = options.access_token || '';
	    if (accessToken == '') {
	        var loginfo = _utils.stringify(options);
	        conn.onError({
	            type: _code.WEBIM_CONNCTION_OPEN_USERGRID_ERROR,
	            data: options
	        });
	        return;
	    }
	    conn.context.accessToken = options.access_token;
	    conn.context.accessTokenExpires = options.expires_in;
	    var stropheConn = null;
	    if (conn.isOpening() && conn.context.stropheConn) {
	        stropheConn = conn.context.stropheConn;
	    } else if (conn.isOpened() && conn.context.stropheConn) {
	        // return;
	        stropheConn = conn.getStrophe();
	    } else {
	        stropheConn = conn.getStrophe();
	    }
	    var callback = function callback(status, msg) {
	        _loginCallback(status, msg, conn);
	    };

	    conn.context.stropheConn = stropheConn;
	    if (conn.route) {
	        stropheConn.connect(conn.context.jid, '$t$' + accessToken, callback, conn.wait, conn.hold, conn.route);
	    } else {
	        stropheConn.connect(conn.context.jid, '$t$' + accessToken, callback, conn.wait, conn.hold);
	    }
	};

	var _parseMessageType = function _parseMessageType(msginfo) {
	    var msgtype = 'normal';
	    var receiveinfo = msginfo.getElementsByTagName('received');
	    if (receiveinfo && receiveinfo.length > 0 && receiveinfo[0].namespaceURI === 'urn:xmpp:receipts') {
	        msgtype = 'received';
	    } else {
	        var inviteinfo = msginfo.getElementsByTagName('invite');
	        if (inviteinfo && inviteinfo.length > 0) {
	            msgtype = 'invite';
	        }
	    }
	    return msgtype;
	};

	var _handleMessageQueue = function _handleMessageQueue(conn) {
	    for (var i in _msgHash) {
	        if (_msgHash.hasOwnProperty(i)) {
	            _msgHash[i].send(conn);
	        }
	    }
	};

	var _loginCallback = function _loginCallback(status, msg, conn) {
	    var conflict, error;

	    if (msg === 'conflict') {
	        conflict = true;
	    }

	    if (status == Strophe.Status.CONNFAIL) {
	        //client offline, ping/pong timeout, server quit, server offline
	        error = {
	            type: _code.WEBIM_CONNCTION_SERVER_CLOSE_ERROR,
	            msg: msg,
	            reconnect: true
	        };

	        conflict && (error.conflict = true);
	        conn.onError(error);
	    } else if (status == Strophe.Status.ATTACHED || status == Strophe.Status.CONNECTED) {
	        // client should limit the speed of sending ack messages  up to 5/s
	        conn.intervalId = setInterval(function () {
	            conn.handelSendQueue();
	        }, 200);
	        var handleMessage = function handleMessage(msginfo) {
	            var type = _parseMessageType(msginfo);

	            if ('received' === type) {
	                conn.handleReceivedMessage(msginfo);
	                return true;
	            } else if ('invite' === type) {
	                conn.handleInviteMessage(msginfo);
	                return true;
	            } else {
	                conn.handleMessage(msginfo);
	                return true;
	            }
	        };
	        var handlePresence = function handlePresence(msginfo) {
	            conn.handlePresence(msginfo);
	            return true;
	        };
	        var handlePing = function handlePing(msginfo) {
	            conn.handlePing(msginfo);
	            return true;
	        };
	        var handleIqRoster = function handleIqRoster(msginfo) {
	            conn.handleIqRoster(msginfo);
	            return true;
	        };
	        var handleIqPrivacy = function handleIqPrivacy(msginfo) {
	            conn.handleIqPrivacy(msginfo);
	            return true;
	        };
	        var handleIq = function handleIq(msginfo) {
	            conn.handleIq(msginfo);
	            return true;
	        };

	        conn.addHandler(handleMessage, null, 'message', null, null, null);
	        conn.addHandler(handlePresence, null, 'presence', null, null, null);
	        conn.addHandler(handlePing, 'urn:xmpp:ping', 'iq', 'get', null, null);
	        conn.addHandler(handleIqRoster, 'jabber:iq:roster', 'iq', 'set', null, null);
	        conn.addHandler(handleIqPrivacy, 'jabber:iq:privacy', 'iq', 'set', null, null);
	        conn.addHandler(handleIq, null, 'iq', null, null, null);

	        conn.context.status = _code.STATUS_OPENED;

	        var supportRecMessage = [_code.WEBIM_MESSAGE_REC_TEXT, _code.WEBIM_MESSAGE_REC_EMOJI];

	        if (_utils.isCanDownLoadFile) {
	            supportRecMessage.push(_code.WEBIM_MESSAGE_REC_PHOTO);
	            supportRecMessage.push(_code.WEBIM_MESSAGE_REC_AUDIO_FILE);
	        }
	        var supportSedMessage = [_code.WEBIM_MESSAGE_SED_TEXT];
	        if (_utils.isCanUploadFile) {
	            supportSedMessage.push(_code.WEBIM_MESSAGE_REC_PHOTO);
	            supportSedMessage.push(_code.WEBIM_MESSAGE_REC_AUDIO_FILE);
	        }
	        conn.notifyVersion();
	        conn.retry && _handleMessageQueue(conn);
	        conn.heartBeat();
	        conn.isAutoLogin && conn.setPresence();
	        conn.onOpened({
	            canReceive: supportRecMessage,
	            canSend: supportSedMessage,
	            accessToken: conn.context.accessToken
	        });
	    } else if (status == Strophe.Status.DISCONNECTING) {
	        if (conn.isOpened()) {
	            conn.stopHeartBeat();
	            conn.context.status = _code.STATUS_CLOSING;

	            error = {
	                type: _code.WEBIM_CONNCTION_SERVER_CLOSE_ERROR,
	                msg: msg,
	                reconnect: true
	            };

	            conflict && (error.conflict = true);
	            conn.onError(error);
	        }
	    } else if (status == Strophe.Status.DISCONNECTED) {
	        if (conn.isOpened()) {
	            if (Demo.conn.autoReconnectNumTotal < Demo.conn.autoReconnectNumMax) {
	                Demo.conn.reconnect();
	                return;
	            } else {
	                error = {
	                    type: _code.WEBIM_CONNCTION_DISCONNECTED
	                };
	                conn.onError(error);
	            }
	        }
	        conn.context.status = _code.STATUS_CLOSED;
	        conn.clear();
	        conn.onClosed();
	    } else if (status == Strophe.Status.AUTHFAIL) {
	        error = {
	            type: _code.WEBIM_CONNCTION_AUTH_ERROR
	        };

	        conflict && (error.conflict = true);
	        conn.onError(error);
	        conn.clear();
	    } else if (status == Strophe.Status.ERROR) {
	        conn.context.status = _code.STATUS_ERROR;
	        error = {
	            type: _code.WEBIM_CONNCTION_SERVER_ERROR
	        };

	        conflict && (error.conflict = true);
	        conn.onError(error);
	    }
	    conn.context.status_now = status;
	};

	var _getJid = function _getJid(options, conn) {
	    var jid = options.toJid || '';

	    if (jid === '') {
	        var appKey = conn.context.appKey || '';
	        var toJid = appKey + '_' + options.to + '@' + conn.domain;

	        if (options.resource) {
	            toJid = toJid + '/' + options.resource;
	        }
	        jid = toJid;
	    }
	    return jid;
	};

	var _getJidByName = function _getJidByName(name, conn) {
	    var options = {
	        to: name
	    };
	    return _getJid(options, conn);
	};

	var _validCheck = function _validCheck(options, conn) {
	    options = options || {};

	    if (options.user == '') {
	        conn.onError({
	            type: _code.WEBIM_CONNCTION_USER_NOT_ASSIGN_ERROR
	        });
	        return false;
	    }

	    var user = options.user + '' || '';
	    var appKey = options.appKey || '';
	    var devInfos = appKey.split('#');

	    if (devInfos.length !== 2) {
	        conn.onError({
	            type: _code.WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR
	        });
	        return false;
	    }
	    var orgName = devInfos[0];
	    var appName = devInfos[1];

	    if (!orgName) {
	        conn.onError({
	            type: _code.WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR
	        });
	        return false;
	    }
	    if (!appName) {
	        conn.onError({
	            type: _code.WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR
	        });
	        return false;
	    }

	    var jid = appKey + '_' + user.toLowerCase() + '@' + conn.domain,
	        resource = options.resource || 'webim';

	    if (conn.isMultiLoginSessions) {
	        resource += user + new Date().getTime() + Math.floor(Math.random().toFixed(6) * 1000000);
	    }
	    conn.context.jid = jid + '/' + resource;
	    /*jid: {appkey}_{username}@domain/resource*/
	    conn.context.userId = user;
	    conn.context.appKey = appKey;
	    conn.context.appName = appName;
	    conn.context.orgName = orgName;

	    return true;
	};

	var _getXmppUrl = function _getXmppUrl(baseUrl, https) {
	    if (/^(ws|http)s?:\/\/?/.test(baseUrl)) {
	        return baseUrl;
	    }

	    var url = {
	        prefix: 'http',
	        base: '://' + baseUrl,
	        suffix: '/http-bind/'
	    };

	    if (https && _utils.isSupportWss) {
	        url.prefix = 'wss';
	        url.suffix = '/ws/';
	    } else {
	        if (https) {
	            url.prefix = 'https';
	        } else if (window.WebSocket) {
	            url.prefix = 'ws';
	            url.suffix = '/ws/';
	        }
	    }

	    return url.prefix + url.base + url.suffix;
	};

	//class
	var connection = function connection(options) {
	    if (!this instanceof connection) {
	        return new connection(options);
	    }

	    var options = options || {};

	    this.isMultiLoginSessions = options.isMultiLoginSessions || false;
	    this.wait = options.wait || 30;
	    this.retry = options.retry || false;
	    this.https = options.https || location.protocol === 'https:';
	    this.url = _getXmppUrl(options.url, this.https);
	    this.hold = options.hold || 1;
	    this.route = options.route || null;
	    this.domain = options.domain || 'easemob.com';
	    this.inactivity = options.inactivity || 30;
	    this.heartBeatWait = options.heartBeatWait || 4500;
	    this.maxRetries = options.maxRetries || 5;
	    this.isAutoLogin = options.isAutoLogin === false ? false : true;
	    this.pollingTime = options.pollingTime || 800;
	    this.stropheConn = false;
	    this.autoReconnectNumMax = options.autoReconnectNumMax || 0;
	    this.autoReconnectNumTotal = 0;
	    this.autoReconnectInterval = options.autoReconnectInterval || 0;
	    this.context = { status: _code.STATUS_INIT };
	    this.sendQueue = new Queue(); //instead of sending message immediately,cache them in this queue
	    this.intervalId = null; //clearInterval return value

	    this.dnsArr = ['https://rs.easemob.com', 'https://rsbak.easemob.com', 'http://182.92.174.78', 'http://112.126.66.111']; //http dns server hosts
	    this.dnsIndex = 0; //the dns ip used in dnsArr currently
	    this.dnsTotal = this.dnsArr.length; //max number of getting dns retries
	    this.restHosts = null; //rest server ips
	    this.restIndex = 0; //the rest ip used in restHosts currently
	    this.restTotal = 0; //max number of getting rest token retries
	    this.xmppHosts = null; //xmpp server ips
	    this.xmppIndex = 0; //the xmpp ip used in xmppHosts currently
	    this.xmppTotal = 0; //max number of creating xmpp server connection(ws/bosh) retries
	};

	connection.prototype.handelSendQueue = function () {
	    var options = this.sendQueue.pop();
	    if (options !== null) {
	        this.sendReceiptsMessage(options);
	    }
	};
	connection.prototype.listen = function (options) {
	    this.onOpened = options.onOpened || _utils.emptyfn;
	    this.onClosed = options.onClosed || _utils.emptyfn;
	    this.onTextMessage = options.onTextMessage || _utils.emptyfn;
	    this.onEmojiMessage = options.onEmojiMessage || _utils.emptyfn;
	    this.onPictureMessage = options.onPictureMessage || _utils.emptyfn;
	    this.onAudioMessage = options.onAudioMessage || _utils.emptyfn;
	    this.onVideoMessage = options.onVideoMessage || _utils.emptyfn;
	    this.onFileMessage = options.onFileMessage || _utils.emptyfn;
	    this.onLocationMessage = options.onLocationMessage || _utils.emptyfn;
	    this.onCmdMessage = options.onCmdMessage || _utils.emptyfn;
	    this.onPresence = options.onPresence || _utils.emptyfn;
	    this.onRoster = options.onRoster || _utils.emptyfn;
	    this.onError = options.onError || _utils.emptyfn;
	    this.onReceivedMessage = options.onReceivedMessage || _utils.emptyfn;
	    this.onInviteMessage = options.onInviteMessage || _utils.emptyfn;
	    this.onOffline = options.onOffline || _utils.emptyfn;
	    this.onOnline = options.onOnline || _utils.emptyfn;
	    this.onConfirmPop = options.onConfirmPop || _utils.emptyfn;
	    //for WindowSDK start
	    this.onUpdateMyGroupList = options.onUpdateMyGroupList || _utils.emptyfn;
	    this.onUpdateMyRoster = options.onUpdateMyRoster || _utils.emptyfn;
	    //for WindowSDK end
	    this.onBlacklistUpdate = options.onBlacklistUpdate || _utils.emptyfn;

	    _listenNetwork(this.onOnline, this.onOffline);
	};

	connection.prototype.heartBeat = function () {
	    var me = this;
	    //IE8: strophe auto switch from ws to BOSH, need heartbeat
	    var isNeed = !/^ws|wss/.test(me.url) || /mobile/.test(navigator.userAgent);

	    if (this.heartBeatID || !isNeed) {
	        return;
	    }

	    var options = {
	        toJid: this.domain,
	        type: 'normal'
	    };
	    this.heartBeatID = setInterval(function () {
	        me.ping(options);
	    }, this.heartBeatWait);
	};

	connection.prototype.stopHeartBeat = function () {
	    if (typeof this.heartBeatID == "number") {
	        this.heartBeatID = clearInterval(this.heartBeatID);
	    }
	};

	connection.prototype.sendReceiptsMessage = function (options) {
	    var dom = $msg({
	        from: this.context.jid || '',
	        to: this.domain,
	        id: options.id || ''
	    }).c('received', {
	        xmlns: 'urn:xmpp:receipts',
	        id: options.id || ''
	    });
	    this.sendCommand(dom.tree());
	};

	connection.prototype.cacheReceiptsMessage = function (options) {
	    this.sendQueue.push(options);
	};

	connection.prototype.getStrophe = function () {
	    if (location.protocol != 'https:' && WebIM.config.isHttpDNS) {
	        //TODO: try this.xmppTotal times on fail
	        var url = '';
	        var host = this.xmppHosts[this.xmppIndex];
	        var domain = _utils.getXmlFirstChild(host, 'domain');
	        var ip = _utils.getXmlFirstChild(host, 'ip');
	        if (ip) {
	            url = ip.textContent;
	            var port = _utils.getXmlFirstChild(host, 'port');
	            if (port.textContent != '80') {
	                url += ':' + port.textContent;
	            }
	        } else {
	            url = domain.textContent;
	        }

	        if (url != '') {
	            var parter = /(.+\/\/).+(\/.+)/;
	            this.url = this.url.replace(parter, "$1" + url + "$2");
	        }
	    }

	    var stropheConn = new Strophe.Connection(this.url, {
	        inactivity: this.inactivity,
	        maxRetries: this.maxRetries,
	        pollingTime: this.pollingTime
	    });
	    return stropheConn;
	};
	connection.prototype.getHostsByTag = function (data, tagName) {
	    var tag = _utils.getXmlFirstChild(data, tagName);
	    if (!tag) {
	        console.log(tagName + ' hosts error');
	        return null;
	    }
	    var hosts = tag.getElementsByTagName('hosts');
	    if (hosts.length == 0) {
	        console.log(tagName + ' hosts error2');
	        return null;
	    }
	    return hosts[0].getElementsByTagName('host');
	};
	connection.prototype.getRestFromHttpDNS = function (options, type) {
	    if (this.restIndex > this.restTotal) {
	        console.log('rest hosts all tried,quit');
	        return;
	    }
	    var url = '';
	    var host = this.restHosts[this.restIndex];
	    var domain = _utils.getXmlFirstChild(host, 'domain');
	    var ip = _utils.getXmlFirstChild(host, 'ip');
	    if (ip) {
	        var port = _utils.getXmlFirstChild(host, 'port');
	        url = (location.protocol === 'https:' ? 'https:' : 'http:') + '//' + ip.textContent + ':' + port.textContent;
	    } else {
	        url = (location.protocol === 'https:' ? 'https:' : 'http:') + '//' + domain.textContent;
	    }

	    if (url != '') {
	        WebIM.config.apiURL = url;
	        options.apiUrl = url;
	    }

	    if (type == 'login') {
	        this.login(options);
	    } else {
	        this.signup(options);
	    }
	};

	connection.prototype.getHttpDNS = function (options, type) {
	    if (this.restHosts) {
	        this.getRestFromHttpDNS(options, type);
	        return;
	    }
	    var self = this;
	    var suc = function suc(data, xhr) {
	        data = new DOMParser().parseFromString(data, "text/xml").documentElement;
	        //get rest ips
	        var restHosts = self.getHostsByTag(data, 'rest');
	        if (!restHosts) {
	            console.log('rest hosts error3');
	            return;
	        }
	        self.restHosts = restHosts;
	        self.restTotal = restHosts.length;

	        //get xmpp ips
	        var xmppHosts = self.getHostsByTag(data, 'xmpp');
	        if (!xmppHosts) {
	            console.log('xmpp hosts error3');
	            return;
	        }
	        self.xmppHosts = xmppHosts;
	        self.xmppTotal = xmppHosts.length;

	        self.getRestFromHttpDNS(options, type);
	    };
	    var error = function error(res, xhr, msg) {

	        console.log('getHttpDNS error', res, msg);
	        self.dnsIndex++;
	        if (self.dnsIndex < self.dnsTotal) {
	            self.getHttpDNS(options, type);
	        }
	    };
	    var options2 = {
	        url: this.dnsArr[this.dnsIndex] + '/easemob/server.xml',
	        dataType: 'text',
	        type: 'GET',

	        // url: 'http://www.easemob.com/easemob/server.xml',
	        // dataType: 'xml',
	        data: { app_key: encodeURIComponent(options.appKey) },
	        success: suc || _utils.emptyfn,
	        error: error || _utils.emptyfn
	    };
	    _utils.ajax(options2);
	};

	connection.prototype.signup = function (options) {
	    var self = this;
	    var orgName = options.orgName || '';
	    var appName = options.appName || '';
	    var appKey = options.appKey || '';
	    var suc = options.success || EMPTYFN;
	    var err = options.error || EMPTYFN;

	    if (!orgName && !appName && appKey) {
	        var devInfos = appKey.split('#');
	        if (devInfos.length === 2) {
	            orgName = devInfos[0];
	            appName = devInfos[1];
	        }
	    }
	    if (!orgName && !appName) {
	        err({
	            type: _code.WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR
	        });
	        return;
	    }

	    var error = function error(res, xhr, msg) {
	        if (location.protocol != 'https:' && WebIM.config.isHttpDNS) {
	            if (self.restIndex + 1 < self.restTotal) {
	                self.restIndex++;
	                self.getRestFromHttpDNS(options, 'signup');
	                return;
	            }
	        }
	        self.clear();
	        err(res);
	    };
	    var https = options.https || https;
	    var apiUrl = options.apiUrl;
	    var restUrl = apiUrl + '/' + orgName + '/' + appName + '/users';

	    var userjson = {
	        username: options.username,
	        password: options.password,
	        nickname: options.nickname || ''
	    };

	    var userinfo = _utils.stringify(userjson);
	    var options2 = {
	        url: restUrl,
	        dataType: 'json',
	        data: userinfo,
	        success: suc,
	        error: error
	    };
	    _utils.ajax(options2);
	};

	connection.prototype.open = function (options) {
	    if (location.protocol != 'https:' && WebIM.config.isHttpDNS) {
	        this.dnsIndex = 0;
	        this.getHttpDNS(options, 'login');
	    } else {
	        this.login(options);
	    }
	};

	connection.prototype.login = function (options) {
	    var pass = _validCheck(options, this);

	    if (!pass) {
	        return;
	    }

	    var conn = this;

	    if (conn.isOpened()) {
	        return;
	    }

	    if (options.accessToken) {
	        options.access_token = options.accessToken;
	        _login(options, conn);
	    } else {
	        var apiUrl = options.apiUrl;
	        var userId = this.context.userId;
	        var pwd = options.pwd || '';
	        var appName = this.context.appName;
	        var orgName = this.context.orgName;

	        var suc = function suc(data, xhr) {
	            conn.context.status = _code.STATUS_DOLOGIN_IM;
	            conn.context.restTokenData = data;
	            _login(data, conn);
	        };
	        var error = function error(res, xhr, msg) {
	            if (location.protocol != 'https:' && WebIM.config.isHttpDNS) {
	                if (conn.restIndex + 1 < conn.restTotal) {
	                    conn.restIndex++;
	                    conn.getRestFromHttpDNS(options, 'login');
	                    return;
	                }
	            }
	            conn.clear();
	            if (res.error && res.error_description) {
	                conn.onError({
	                    type: _code.WEBIM_CONNCTION_OPEN_USERGRID_ERROR,
	                    data: res,
	                    xhr: xhr
	                });
	            } else {
	                conn.onError({
	                    type: _code.WEBIM_CONNCTION_OPEN_ERROR,
	                    data: res,
	                    xhr: xhr
	                });
	            }
	        };

	        this.context.status = _code.STATUS_DOLOGIN_USERGRID;

	        var loginJson = {
	            grant_type: 'password',
	            username: userId,
	            password: pwd,
	            timestamp: +new Date()
	        };
	        var loginfo = _utils.stringify(loginJson);

	        var options2 = {
	            url: apiUrl + '/' + orgName + '/' + appName + '/token',
	            dataType: 'json',
	            data: loginfo,
	            success: suc || _utils.emptyfn,
	            error: error || _utils.emptyfn
	        };
	        _utils.ajax(options2);
	    }
	};

	// attach to xmpp server for BOSH
	connection.prototype.attach = function (options) {
	    var pass = _validCheck(options, this);

	    if (!pass) {
	        return;
	    }

	    options = options || {};

	    var accessToken = options.accessToken || '';
	    if (accessToken == '') {
	        this.onError({
	            type: _code.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR
	        });
	        return;
	    }

	    var sid = options.sid || '';
	    if (sid === '') {
	        this.onError({
	            type: _code.WEBIM_CONNCTION_SESSIONID_NOT_ASSIGN_ERROR
	        });
	        return;
	    }

	    var rid = options.rid || '';
	    if (rid === '') {
	        this.onError({
	            type: _code.WEBIM_CONNCTION_RID_NOT_ASSIGN_ERROR
	        });
	        return;
	    }

	    var stropheConn = this.getStrophe();

	    this.context.accessToken = accessToken;
	    this.context.stropheConn = stropheConn;
	    this.context.status = _code.STATUS_DOLOGIN_IM;

	    var conn = this;
	    var callback = function callback(status, msg) {
	        _loginCallback(status, msg, conn);
	    };

	    var jid = this.context.jid;
	    var wait = this.wait;
	    var hold = this.hold;
	    var wind = this.wind || 5;
	    stropheConn.attach(jid, sid, rid, callback, wait, hold, wind);
	};

	connection.prototype.close = function (reason) {
	    this.stopHeartBeat();

	    var status = this.context.status;
	    if (status == _code.STATUS_INIT) {
	        return;
	    }

	    if (this.isClosed() || this.isClosing()) {
	        return;
	    }

	    this.context.status = _code.STATUS_CLOSING;
	    this.context.stropheConn.disconnect(reason);
	};

	connection.prototype.addHandler = function (handler, ns, name, type, id, from, options) {
	    this.context.stropheConn.addHandler(handler, ns, name, type, id, from, options);
	};

	connection.prototype.notifyVersion = function (suc, fail) {
	    var jid = _getJid({}, this);
	    var dom = $iq({
	        from: this.context.jid || '',
	        to: this.domain,
	        type: 'result'
	    }).c('query', { xmlns: 'jabber:iq:version' }).c('name').t('easemob').up().c('version').t(_version).up().c('os').t('webim');

	    var suc = suc || _utils.emptyfn;
	    var error = fail || this.onError;
	    var failFn = function failFn(ele) {
	        error({
	            type: _code.WEBIM_CONNCTION_NOTIFYVERSION_ERROR,
	            data: ele
	        });
	    };
	    this.context.stropheConn.sendIQ(dom.tree(), suc, failFn);
	    return;
	};

	// handle all types of presence message
	connection.prototype.handlePresence = function (msginfo) {
	    if (this.isClosed()) {
	        return;
	    }
	    var from = msginfo.getAttribute('from') || '';
	    var to = msginfo.getAttribute('to') || '';
	    var type = msginfo.getAttribute('type') || '';
	    var presence_type = msginfo.getAttribute('presence_type') || '';
	    var fromUser = _parseNameFromJidFn(from);
	    var toUser = _parseNameFromJidFn(to);
	    var info = {
	        from: fromUser,
	        to: toUser,
	        fromJid: from,
	        toJid: to,
	        type: type,
	        chatroom: msginfo.getElementsByTagName('roomtype').length ? true : false
	    };

	    var showTags = msginfo.getElementsByTagName('show');
	    if (showTags && showTags.length > 0) {
	        var showTag = showTags[0];
	        info.show = Strophe.getText(showTag);
	    }
	    var statusTags = msginfo.getElementsByTagName('status');
	    if (statusTags && statusTags.length > 0) {
	        var statusTag = statusTags[0];
	        info.status = Strophe.getText(statusTag);
	        info.code = statusTag.getAttribute('code');
	    }

	    var priorityTags = msginfo.getElementsByTagName('priority');
	    if (priorityTags && priorityTags.length > 0) {
	        var priorityTag = priorityTags[0];
	        info.priority = Strophe.getText(priorityTag);
	    }

	    var error = msginfo.getElementsByTagName('error');
	    if (error && error.length > 0) {
	        var error = error[0];
	        info.error = {
	            code: error.getAttribute('code')
	        };
	    }

	    var destroy = msginfo.getElementsByTagName('destroy');
	    if (destroy && destroy.length > 0) {
	        var destroy = destroy[0];
	        info.destroy = true;

	        var reason = destroy.getElementsByTagName('reason');
	        if (reason && reason.length > 0) {
	            info.reason = Strophe.getText(reason[0]);
	        }
	    }

	    // <item affiliation="member" jid="easemob-demo#chatdemoui_lwz2@easemob.com" role="none">
	    //     <actor nick="liuwz"/>
	    // </item>
	    // one record once a time
	    // kick info: actor / member
	    var members = msginfo.getElementsByTagName('item');
	    if (members && members.length > 0) {
	        var member = members[0];
	        var role = member.getAttribute('role');
	        var jid = member.getAttribute('jid');
	        // dismissed by group
	        if (role == 'none' && jid) {
	            var kickedMember = _parseNameFromJidFn(jid);
	            var actor = member.getElementsByTagName('actor')[0];
	            var actorNick = actor.getAttribute('nick');
	            info.actor = actorNick;
	            info.kicked = kickedMember;
	        }
	        // Service Acknowledges Room Creation `createGroupACK`
	        if (role == 'moderator' && info.code == '201') {
	            // info.type = 'createGroupACK';
	            info.type = 'joinPublicGroupSuccess';
	        }
	    }

	    // from message : apply to join group
	    // <message from="easemob-demo#chatdemoui_lwz4@easemob.com/mobile" id="259151681747419640" to="easemob-demo#chatdemoui_liuwz@easemob.com" xmlns="jabber:client">
	    //     <x xmlns="http://jabber.org/protocol/muc#user">
	    //         <apply from="easemob-demo#chatdemoui_lwz4@easemob.com" to="easemob-demo#chatdemoui_1477733677560@conference.easemob.com" toNick="lwzlwzlwz">
	    //             <reason>qwe</reason>
	    //         </apply>
	    //     </x>
	    // </message>
	    var apply = msginfo.getElementsByTagName('apply');
	    if (apply && apply.length > 0) {
	        apply = apply[0];
	        var toNick = apply.getAttribute('toNick');
	        var groupJid = apply.getAttribute('to');
	        var userJid = apply.getAttribute('from');
	        var groupName = _parseNameFromJidFn(groupJid);
	        var userName = _parseNameFromJidFn(userJid);
	        info.toNick = toNick;
	        info.groupName = groupName;
	        info.type = 'joinGroupNotifications';
	        var reason = apply.getElementsByTagName('reason');
	        if (reason && reason.length > 0) {
	            info.reason = Strophe.getText(reason[0]);
	        }
	    }

	    if (info.chatroom) {
	        // diff the
	        info.presence_type = presence_type;
	        info.original_type = info.type;
	        var reflectUser = from.slice(from.lastIndexOf('/') + 1);

	        if (reflectUser === this.context.userId) {
	            if (info.type === '' && !info.code) {
	                info.type = 'joinChatRoomSuccess';
	            } else if (presence_type === 'unavailable' || info.type === 'unavailable') {
	                if (!info.status) {
	                    // logout successfully.
	                    info.type = 'leaveChatRoom';
	                } else if (info.code == 110) {
	                    // logout or dismissied by admin.
	                    info.type = 'leaveChatRoom';
	                } else if (info.error && info.error.code == 406) {
	                    // The chat room is full.
	                    info.type = 'reachChatRoomCapacity';
	                }
	            }
	        }
	    } else {
	        info.presence_type = presence_type;
	        info.original_type = type;

	        if (/subscribe/.test(info.type)) {
	            //subscribe | subscribed | unsubscribe | unsubscribed
	        } else if (type == "" && !info.status && !info.error) {
	            info.type = 'joinPublicGroupSuccess';
	        } else if (presence_type === 'unavailable' || type === 'unavailable') {
	            // There is no roomtype when a chat room is deleted.
	            if (info.destroy) {
	                // Group or Chat room Deleted.
	                info.type = 'deleteGroupChat';
	            } else if (info.code == 307 || info.code == 321) {
	                // Dismissed by group.
	                info.type = 'leaveGroup';
	            }
	        }
	    }
	    this.onPresence(info, msginfo);
	};

	connection.prototype.handlePing = function (e) {
	    if (this.isClosed()) {
	        return;
	    }
	    var id = e.getAttribute('id');
	    var from = e.getAttribute('from');
	    var to = e.getAttribute('to');
	    var dom = $iq({
	        from: to,
	        to: from,
	        id: id,
	        type: 'result'
	    });
	    this.sendCommand(dom.tree());
	};

	connection.prototype.handleIq = function (iq) {
	    return true;
	};

	connection.prototype.handleIqPrivacy = function (msginfo) {
	    var list = msginfo.getElementsByTagName('list');
	    if (list.length == 0) {
	        return;
	    }
	    this.getBlacklist();
	};

	connection.prototype.handleIqRoster = function (e) {
	    var id = e.getAttribute('id');
	    var from = e.getAttribute('from') || '';
	    var name = _parseNameFromJidFn(from);
	    var curJid = this.context.jid;
	    var curUser = this.context.userId;

	    var iqresult = $iq({ type: 'result', id: id, from: curJid });
	    this.sendCommand(iqresult.tree());

	    var msgBodies = e.getElementsByTagName('query');
	    if (msgBodies && msgBodies.length > 0) {
	        var queryTag = msgBodies[0];
	        var rouster = _parseFriend(queryTag, this, from);
	        this.onRoster(rouster);
	    }
	    return true;
	};

	connection.prototype.handleMessage = function (msginfo) {
	    if (this.isClosed()) {
	        return;
	    }

	    var id = msginfo.getAttribute('id') || '';

	    // cache ack into sendQueue first , handelSendQueue will do the send thing with the speed of  5/s
	    this.cacheReceiptsMessage({
	        id: id
	    });
	    var parseMsgData = _parseResponseMessage(msginfo);
	    if (parseMsgData.errorMsg) {
	        this.handlePresence(msginfo);
	        return;
	    }
	    // send error
	    var error = msginfo.getElementsByTagName('error');
	    var errorCode = '';
	    var errorText = '';
	    var errorBool = false;
	    if (error.length > 0) {
	        errorBool = true;
	        errorCode = error[0].getAttribute('code');
	        var textDOM = error[0].getElementsByTagName('text');
	        errorText = textDOM[0].textContent || textDOM[0].text;
	        log('handle error', errorCode, errorText);
	    }

	    var msgDatas = parseMsgData.data;
	    for (var i in msgDatas) {
	        if (!msgDatas.hasOwnProperty(i)) {
	            continue;
	        }
	        var msg = msgDatas[i];
	        if (!msg.from || !msg.to) {
	            continue;
	        }

	        var from = (msg.from + '').toLowerCase();
	        var too = (msg.to + '').toLowerCase();
	        var extmsg = msg.ext || {};
	        var chattype = '';
	        var typeEl = msginfo.getElementsByTagName('roomtype');
	        if (typeEl.length) {
	            chattype = typeEl[0].getAttribute('type') || 'chat';
	        } else {
	            chattype = msginfo.getAttribute('type') || 'chat';
	        }

	        var msgBodies = msg.bodies;
	        if (!msgBodies || msgBodies.length == 0) {
	            continue;
	        }
	        var msgBody = msg.bodies[0];
	        var type = msgBody.type;

	        try {
	            switch (type) {
	                case 'txt':
	                    var receiveMsg = msgBody.msg;
	                    var emojibody = _utils.parseTextMessage(receiveMsg, WebIM.Emoji);
	                    if (emojibody.isemoji) {
	                        var msg = {
	                            id: id,
	                            type: chattype,
	                            from: from,
	                            to: too,
	                            delay: parseMsgData.delayTimeStamp,
	                            data: emojibody.body,
	                            ext: extmsg
	                        };
	                        !msg.delay && delete msg.delay;
	                        msg.error = errorBool;
	                        msg.errorText = errorText;
	                        msg.errorCode = errorCode;
	                        this.onEmojiMessage(msg);
	                    } else {
	                        var msg = {
	                            id: id,
	                            type: chattype,
	                            from: from,
	                            to: too,
	                            delay: parseMsgData.delayTimeStamp,
	                            data: receiveMsg,
	                            ext: extmsg
	                        };
	                        !msg.delay && delete msg.delay;
	                        msg.error = errorBool;
	                        msg.errorText = errorText;
	                        msg.errorCode = errorCode;
	                        this.onTextMessage(msg);
	                    }
	                    break;
	                case 'img':
	                    var rwidth = 0;
	                    var rheight = 0;
	                    if (msgBody.size) {
	                        rwidth = msgBody.size.width;
	                        rheight = msgBody.size.height;
	                    }
	                    var msg = {
	                        id: id,
	                        type: chattype,
	                        from: from,
	                        to: too,

	                        url: location.protocol != 'https:' && WebIM.config.isHttpDNS ? WebIM.config.apiURL + msgBody.url.substr(msgBody.url.indexOf("/", 9)) : msgBody.url,
	                        secret: msgBody.secret,
	                        filename: msgBody.filename,
	                        thumb: msgBody.thumb,
	                        thumb_secret: msgBody.thumb_secret,
	                        file_length: msgBody.file_length || '',
	                        width: rwidth,
	                        height: rheight,
	                        filetype: msgBody.filetype || '',
	                        accessToken: this.context.accessToken || '',
	                        ext: extmsg,
	                        delay: parseMsgData.delayTimeStamp
	                    };
	                    !msg.delay && delete msg.delay;
	                    msg.error = errorBool;
	                    msg.errorText = errorText;
	                    msg.errorCode = errorCode;
	                    this.onPictureMessage(msg);
	                    break;
	                case 'audio':
	                    var msg = {
	                        id: id,
	                        type: chattype,
	                        from: from,
	                        to: too,

	                        url: location.protocol != 'https:' && WebIM.config.isHttpDNS ? WebIM.config.apiURL + msgBody.url.substr(msgBody.url.indexOf("/", 9)) : msgBody.url,
	                        secret: msgBody.secret,
	                        filename: msgBody.filename,
	                        length: msgBody.length || '',
	                        file_length: msgBody.file_length || '',
	                        filetype: msgBody.filetype || '',
	                        accessToken: this.context.accessToken || '',
	                        ext: extmsg,
	                        delay: parseMsgData.delayTimeStamp
	                    };
	                    !msg.delay && delete msg.delay;
	                    msg.error = errorBool;
	                    msg.errorText = errorText;
	                    msg.errorCode = errorCode;
	                    this.onAudioMessage(msg);
	                    break;
	                case 'file':
	                    var msg = {
	                        id: id,
	                        type: chattype,
	                        from: from,
	                        to: too,

	                        url: location.protocol != 'https:' && WebIM.config.isHttpDNS ? WebIM.config.apiURL + msgBody.url.substr(msgBody.url.indexOf("/", 9)) : msgBody.url,
	                        secret: msgBody.secret,
	                        filename: msgBody.filename,
	                        file_length: msgBody.file_length,
	                        accessToken: this.context.accessToken || '',
	                        ext: extmsg,
	                        delay: parseMsgData.delayTimeStamp
	                    };
	                    !msg.delay && delete msg.delay;
	                    msg.error = errorBool;
	                    msg.errorText = errorText;
	                    msg.errorCode = errorCode;
	                    this.onFileMessage(msg);
	                    break;
	                case 'loc':
	                    var msg = {
	                        id: id,
	                        type: chattype,
	                        from: from,
	                        to: too,
	                        addr: msgBody.addr,
	                        lat: msgBody.lat,
	                        lng: msgBody.lng,
	                        ext: extmsg,
	                        delay: parseMsgData.delayTimeStamp
	                    };
	                    !msg.delay && delete msg.delay;
	                    msg.error = errorBool;
	                    msg.errorText = errorText;
	                    msg.errorCode = errorCode;
	                    this.onLocationMessage(msg);
	                    break;
	                case 'video':
	                    var msg = {
	                        id: id,
	                        type: chattype,
	                        from: from,
	                        to: too,

	                        url: location.protocol != 'https:' && WebIM.config.isHttpDNS ? WebIM.config.apiURL + msgBody.url.substr(msgBody.url.indexOf("/", 9)) : msgBody.url,
	                        secret: msgBody.secret,
	                        filename: msgBody.filename,
	                        file_length: msgBody.file_length,
	                        accessToken: this.context.accessToken || '',
	                        ext: extmsg,
	                        delay: parseMsgData.delayTimeStamp
	                    };
	                    !msg.delay && delete msg.delay;
	                    msg.error = errorBool;
	                    msg.errorText = errorText;
	                    msg.errorCode = errorCode;
	                    this.onVideoMessage(msg);
	                    break;
	                case 'cmd':
	                    var msg = {
	                        id: id,
	                        from: from,
	                        to: too,
	                        action: msgBody.action,
	                        ext: extmsg,
	                        delay: parseMsgData.delayTimeStamp
	                    };
	                    !msg.delay && delete msg.delay;
	                    msg.error = errorBool;
	                    msg.errorText = errorText;
	                    msg.errorCode = errorCode;
	                    this.onCmdMessage(msg);
	                    break;
	            }
	            ;
	        } catch (e) {
	            this.onError({
	                type: _code.WEBIM_CONNCTION_CALLBACK_INNER_ERROR,
	                data: e
	            });
	        }
	    }
	};

	connection.prototype.handleReceivedMessage = function (message) {
	    try {
	        this.onReceivedMessage(message);
	    } catch (e) {
	        this.onError({
	            type: _code.WEBIM_CONNCTION_CALLBACK_INNER_ERROR,
	            data: e
	        });
	    }

	    var rcv = message.getElementsByTagName('received'),
	        id,
	        mid;

	    if (rcv.length > 0) {
	        if (rcv[0].childNodes && rcv[0].childNodes.length > 0) {
	            id = rcv[0].childNodes[0].nodeValue;
	        } else {
	            id = rcv[0].innerHTML || rcv[0].innerText;
	        }
	        mid = rcv[0].getAttribute('mid');
	    }

	    if (_msgHash[id]) {
	        try {
	            _msgHash[id].msg.success instanceof Function && _msgHash[id].msg.success(id, mid);
	        } catch (e) {
	            this.onError({
	                type: _code.WEBIM_CONNCTION_CALLBACK_INNER_ERROR,
	                data: e
	            });
	        }
	        delete _msgHash[id];
	    }
	};

	connection.prototype.handleInviteMessage = function (message) {
	    var form = null;
	    var invitemsg = message.getElementsByTagName('invite');
	    var reasonDom = message.getElementsByTagName('reason')[0];
	    var reasonMsg = reasonDom.textContent;
	    var id = message.getAttribute('id') || '';
	    this.sendReceiptsMessage({
	        id: id
	    });

	    if (invitemsg && invitemsg.length > 0) {
	        var fromJid = invitemsg[0].getAttribute('from');
	        form = _parseNameFromJidFn(fromJid);
	    }
	    var xmsg = message.getElementsByTagName('x');
	    var roomid = null;
	    if (xmsg && xmsg.length > 0) {
	        for (var i = 0; i < xmsg.length; i++) {
	            if ('jabber:x:conference' === xmsg[i].namespaceURI) {
	                var roomjid = xmsg[i].getAttribute('jid');
	                roomid = _parseNameFromJidFn(roomjid);
	            }
	        }
	    }
	    this.onInviteMessage({
	        type: 'invite',
	        from: form,
	        roomid: roomid,
	        reason: reasonMsg
	    });
	};

	connection.prototype.sendCommand = function (dom, id) {
	    if (this.isOpened()) {
	        this.context.stropheConn.send(dom);
	    } else {
	        this.onError({
	            type: _code.WEBIM_CONNCTION_DISCONNECTED,
	            reconnect: true
	        });
	    }
	};

	connection.prototype.getUniqueId = function (prefix) {
	    var cdate = new Date();
	    var offdate = new Date(2010, 1, 1);
	    var offset = cdate.getTime() - offdate.getTime();
	    var hexd = parseInt(offset).toString(16);

	    if (typeof prefix === 'string' || typeof prefix === 'number') {
	        return prefix + '_' + hexd;
	    } else {
	        return 'WEBIM_' + hexd;
	    }
	};

	connection.prototype.send = function (message) {
	    if (WebIM.config.isWindowSDK) {
	        WebIM.doQuery('{"type":"sendMessage","to":"' + message.to + '","message_type":"' + message.type + '","msg":"' + encodeURI(message.msg) + '","chatType":"' + message.chatType + '"}', function (response) {}, function (code, msg) {
	            Demo.api.NotifyError('send:' + code + " - " + msg);
	        });
	    } else {
	        if (Object.prototype.toString.call(message) === '[object Object]') {
	            var appKey = this.context.appKey || '';
	            var toJid = appKey + '_' + message.to + '@' + this.domain;

	            if (message.group) {
	                toJid = appKey + '_' + message.to + '@conference.' + this.domain;
	            }
	            if (message.resource) {
	                toJid = toJid + '/' + message.resource;
	            }

	            message.toJid = toJid;
	            message.id = message.id || this.getUniqueId();
	            _msgHash[message.id] = new _message(message);
	            _msgHash[message.id].send(this);
	        } else if (typeof message === 'string') {
	            _msgHash[message] && _msgHash[message].send(this);
	        }
	    }
	};

	connection.prototype.addRoster = function (options) {
	    var jid = _getJid(options, this);
	    var name = options.name || '';
	    var groups = options.groups || '';

	    var iq = $iq({ type: 'set' });
	    iq.c('query', { xmlns: 'jabber:iq:roster' });
	    iq.c('item', { jid: jid, name: name });

	    if (groups) {
	        for (var i = 0; i < groups.length; i++) {
	            iq.c('group').t(groups[i]).up();
	        }
	    }
	    var suc = options.success || _utils.emptyfn;
	    var error = options.error || _utils.emptyfn;
	    this.context.stropheConn.sendIQ(iq.tree(), suc, error);
	};

	connection.prototype.removeRoster = function (options) {
	    var jid = _getJid(options, this);
	    var iq = $iq({ type: 'set' }).c('query', { xmlns: 'jabber:iq:roster' }).c('item', {
	        jid: jid,
	        subscription: 'remove'
	    });

	    var suc = options.success || _utils.emptyfn;
	    var error = options.error || _utils.emptyfn;
	    this.context.stropheConn.sendIQ(iq, suc, error);
	};

	connection.prototype.getRoster = function (options) {
	    var conn = this;
	    var dom = $iq({
	        type: 'get'
	    }).c('query', { xmlns: 'jabber:iq:roster' });

	    var options = options || {};
	    var suc = options.success || this.onRoster;
	    var completeFn = function completeFn(ele) {
	        var rouster = [];
	        var msgBodies = ele.getElementsByTagName('query');
	        if (msgBodies && msgBodies.length > 0) {
	            var queryTag = msgBodies[0];
	            rouster = _parseFriend(queryTag);
	        }
	        suc(rouster, ele);
	    };
	    var error = options.error || this.onError;
	    var failFn = function failFn(ele) {
	        error({
	            type: _code.WEBIM_CONNCTION_GETROSTER_ERROR,
	            data: ele
	        });
	    };
	    if (this.isOpened()) {
	        this.context.stropheConn.sendIQ(dom.tree(), completeFn, failFn);
	    } else {
	        error({
	            type: _code.WEBIM_CONNCTION_DISCONNECTED
	        });
	    }
	};

	connection.prototype.subscribe = function (options) {
	    var jid = _getJid(options, this);
	    var pres = $pres({ to: jid, type: 'subscribe' });
	    if (options.message) {
	        pres.c('status').t(options.message).up();
	    }
	    if (options.nick) {
	        pres.c('nick', { 'xmlns': 'http://jabber.org/protocol/nick' }).t(options.nick);
	    }
	    this.sendCommand(pres.tree());
	};

	connection.prototype.subscribed = function (options) {
	    var jid = _getJid(options, this);
	    var pres = $pres({ to: jid, type: 'subscribed' });

	    if (options.message) {
	        pres.c('status').t(options.message).up();
	    }
	    this.sendCommand(pres.tree());
	};

	connection.prototype.unsubscribe = function (options) {
	    var jid = _getJid(options, this);
	    var pres = $pres({ to: jid, type: 'unsubscribe' });

	    if (options.message) {
	        pres.c('status').t(options.message);
	    }
	    this.sendCommand(pres.tree());
	};

	connection.prototype.unsubscribed = function (options) {
	    var jid = _getJid(options, this);
	    var pres = $pres({ to: jid, type: 'unsubscribed' });

	    if (options.message) {
	        pres.c('status').t(options.message).up();
	    }
	    this.sendCommand(pres.tree());
	};

	connection.prototype.createRoom = function (options) {
	    var suc = options.success || _utils.emptyfn;
	    var err = options.error || _utils.emptyfn;
	    var roomiq;

	    roomiq = $iq({
	        to: options.roomName,
	        type: 'set'
	    }).c('query', { xmlns: Strophe.NS.MUC_OWNER }).c('x', { xmlns: 'jabber:x:data', type: 'submit' });

	    return this.context.stropheConn.sendIQ(roomiq.tree(), suc, err);
	};

	connection.prototype.joinPublicGroup = function (options) {
	    var roomJid = this.context.appKey + '_' + options.roomId + '@conference.' + this.domain;
	    var room_nick = roomJid + '/' + this.context.userId;
	    var suc = options.success || _utils.emptyfn;
	    var err = options.error || _utils.emptyfn;
	    var errorFn = function errorFn(ele) {
	        err({
	            type: _code.WEBIM_CONNCTION_JOINROOM_ERROR,
	            data: ele
	        });
	    };
	    var iq = $pres({
	        from: this.context.jid,
	        to: room_nick
	    }).c('x', { xmlns: Strophe.NS.MUC });

	    this.context.stropheConn.sendIQ(iq.tree(), suc, errorFn);
	};

	connection.prototype.listRooms = function (options) {
	    var iq = $iq({
	        to: options.server || 'conference.' + this.domain,
	        from: this.context.jid,
	        type: 'get'
	    }).c('query', { xmlns: Strophe.NS.DISCO_ITEMS });

	    var suc = options.success || _utils.emptyfn;
	    var error = options.error || this.onError;
	    var completeFn = function completeFn(result) {
	        var rooms = [];
	        rooms = _parseRoom(result);
	        try {
	            suc(rooms);
	        } catch (e) {
	            error({
	                type: _code.WEBIM_CONNCTION_GETROOM_ERROR,
	                data: e
	            });
	        }
	    };
	    var err = options.error || _utils.emptyfn;
	    var errorFn = function errorFn(ele) {
	        err({
	            type: _code.WEBIM_CONNCTION_GETROOM_ERROR,
	            data: ele
	        });
	    };
	    this.context.stropheConn.sendIQ(iq.tree(), completeFn, errorFn);
	};

	connection.prototype.queryRoomMember = function (options) {
	    var domain = this.domain;
	    var members = [];
	    var iq = $iq({
	        to: this.context.appKey + '_' + options.roomId + '@conference.' + this.domain,
	        type: 'get'
	    }).c('query', { xmlns: Strophe.NS.MUC + '#admin' }).c('item', { affiliation: 'member' });

	    var suc = options.success || _utils.emptyfn;
	    var completeFn = function completeFn(result) {
	        var items = result.getElementsByTagName('item');

	        if (items) {
	            for (var i = 0; i < items.length; i++) {
	                var item = items[i];
	                var mem = {
	                    jid: item.getAttribute('jid'),
	                    affiliation: 'member'
	                };
	                members.push(mem);
	            }
	        }
	        suc(members);
	    };
	    var err = options.error || _utils.emptyfn;
	    var errorFn = function errorFn(ele) {
	        err({
	            type: _code.WEBIM_CONNCTION_GETROOMMEMBER_ERROR,
	            data: ele
	        });
	    };
	    this.context.stropheConn.sendIQ(iq.tree(), completeFn, errorFn);
	};

	connection.prototype.queryRoomInfo = function (options) {
	    var domain = this.domain;
	    var iq = $iq({
	        to: this.context.appKey + '_' + options.roomId + '@conference.' + domain,
	        type: 'get'
	    }).c('query', { xmlns: Strophe.NS.DISCO_INFO });

	    var suc = options.success || _utils.emptyfn;
	    var members = [];

	    var completeFn = function completeFn(result) {
	        var settings = '';
	        var features = result.getElementsByTagName('feature');
	        if (features) {
	            settings = features[1].getAttribute('var') + '|' + features[3].getAttribute('var') + '|' + features[4].getAttribute('var');
	        }
	        switch (settings) {
	            case 'muc_public|muc_membersonly|muc_notallowinvites':
	                settings = 'PUBLIC_JOIN_APPROVAL';
	                break;
	            case 'muc_public|muc_open|muc_notallowinvites':
	                settings = 'PUBLIC_JOIN_OPEN';
	                break;
	            case 'muc_hidden|muc_membersonly|muc_allowinvites':
	                settings = 'PRIVATE_MEMBER_INVITE';
	                break;
	            case 'muc_hidden|muc_membersonly|muc_notallowinvites':
	                settings = 'PRIVATE_OWNER_INVITE';
	                break;
	        }
	        var owner = '';
	        var fields = result.getElementsByTagName('field');
	        var fieldValues = {};
	        if (fields) {
	            for (var i = 0; i < fields.length; i++) {
	                var field = fields[i];
	                var fieldVar = field.getAttribute('var');
	                var fieldSimplify = fieldVar.split('_')[1];
	                switch (fieldVar) {
	                    case 'muc#roominfo_occupants':
	                    case 'muc#roominfo_maxusers':
	                    case 'muc#roominfo_affiliations':
	                    case 'muc#roominfo_description':
	                        fieldValues[fieldSimplify] = field.textContent || field.text || '';
	                        break;
	                    case 'muc#roominfo_owner':
	                        var mem = {
	                            jid: (field.textContent || field.text) + '@' + domain,
	                            affiliation: 'owner'
	                        };
	                        members.push(mem);
	                        fieldValues[fieldSimplify] = field.textContent || field.text;
	                        break;
	                }

	                // if (field.getAttribute('label') === 'owner') {
	                //     var mem = {
	                //         jid: (field.textContent || field.text) + '@' + domain
	                //         , affiliation: 'owner'
	                //     };
	                //     members.push(mem);
	                //     break;
	                // }
	            }
	            fieldValues['name'] = result.getElementsByTagName('identity')[0].getAttribute('name');
	        }
	        log(settings, members, fieldValues);
	        suc(settings, members, fieldValues);
	    };
	    var err = options.error || _utils.emptyfn;
	    var errorFn = function errorFn(ele) {
	        err({
	            type: _code.WEBIM_CONNCTION_GETROOMINFO_ERROR,
	            data: ele
	        });
	    };
	    this.context.stropheConn.sendIQ(iq.tree(), completeFn, errorFn);
	};

	connection.prototype.queryRoomOccupants = function (options) {
	    var suc = options.success || _utils.emptyfn;
	    var completeFn = function completeFn(result) {
	        var occupants = [];
	        occupants = _parseRoomOccupants(result);
	        suc(occupants);
	    };
	    var err = options.error || _utils.emptyfn;
	    var errorFn = function errorFn(ele) {
	        err({
	            type: _code.WEBIM_CONNCTION_GETROOMOCCUPANTS_ERROR,
	            data: ele
	        });
	    };
	    var attrs = {
	        xmlns: Strophe.NS.DISCO_ITEMS
	    };
	    var info = $iq({
	        from: this.context.jid,
	        to: this.context.appKey + '_' + options.roomId + '@conference.' + this.domain,
	        type: 'get'
	    }).c('query', attrs);
	    this.context.stropheConn.sendIQ(info.tree(), completeFn, errorFn);
	};

	connection.prototype.setUserSig = function (desc) {
	    var dom = $pres({ xmlns: 'jabber:client' });
	    desc = desc || '';
	    dom.c('status').t(desc);
	    this.sendCommand(dom.tree());
	};

	connection.prototype.setPresence = function (type, status) {
	    var dom = $pres({ xmlns: 'jabber:client' });
	    if (type) {
	        if (status) {
	            dom.c('show').t(type);
	            dom.up().c('status').t(status);
	        } else {
	            dom.c('show').t(type);
	        }
	    }
	    this.sendCommand(dom.tree());
	};

	connection.prototype.getPresence = function () {
	    var dom = $pres({ xmlns: 'jabber:client' });
	    var conn = this;
	    this.sendCommand(dom.tree());
	};

	connection.prototype.ping = function (options) {
	    var options = options || {};
	    var jid = _getJid(options, this);

	    var dom = $iq({
	        from: this.context.jid || '',
	        to: jid,
	        type: 'get'
	    }).c('ping', { xmlns: 'urn:xmpp:ping' });

	    var suc = options.success || _utils.emptyfn;
	    var error = options.error || this.onError;
	    var failFn = function failFn(ele) {
	        error({
	            type: _code.WEBIM_CONNCTION_PING_ERROR,
	            data: ele
	        });
	    };
	    if (this.isOpened()) {
	        this.context.stropheConn.sendIQ(dom.tree(), suc, failFn);
	    } else {
	        error({
	            type: _code.WEBIM_CONNCTION_DISCONNECTED
	        });
	    }
	    return;
	};

	connection.prototype.isOpened = function () {
	    return this.context.status == _code.STATUS_OPENED;
	};

	connection.prototype.isOpening = function () {
	    var status = this.context.status;
	    return status == _code.STATUS_DOLOGIN_USERGRID || status == _code.STATUS_DOLOGIN_IM;
	};

	connection.prototype.isClosing = function () {
	    return this.context.status == _code.STATUS_CLOSING;
	};

	connection.prototype.isClosed = function () {
	    return this.context.status == _code.STATUS_CLOSED;
	};

	connection.prototype.clear = function () {
	    var key = this.context.appKey;
	    if (this.errorType != WebIM.statusCode.WEBIM_CONNCTION_DISCONNECTED) {
	        this.context = {
	            status: _code.STATUS_INIT,
	            appKey: key
	        };
	    }
	    if (this.intervalId) {
	        clearInterval(this.intervalId);
	    }
	    this.restIndex = 0;
	    this.xmppIndex = 0;

	    if (this.errorType == WebIM.statusCode.WEBIM_CONNCTION_CLIENT_LOGOUT || this.errorType == -1) {
	        Demo.api.init();
	    }
	};

	connection.prototype.getChatRooms = function (options) {

	    if (!_utils.isCanSetRequestHeader) {
	        conn.onError({
	            type: _code.WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR
	        });
	        return;
	    }

	    var conn = this,
	        token = options.accessToken || this.context.accessToken;

	    if (token) {
	        var apiUrl = options.apiUrl;
	        var appName = this.context.appName;
	        var orgName = this.context.orgName;

	        if (!appName || !orgName) {
	            conn.onError({
	                type: _code.WEBIM_CONNCTION_AUTH_ERROR
	            });
	            return;
	        }

	        var suc = function suc(data, xhr) {
	            typeof options.success === 'function' && options.success(data);
	        };

	        var error = function error(res, xhr, msg) {
	            if (res.error && res.error_description) {
	                conn.onError({
	                    type: _code.WEBIM_CONNCTION_LOAD_CHATROOM_ERROR,
	                    msg: res.error_description,
	                    data: res,
	                    xhr: xhr
	                });
	            }
	        };

	        var pageInfo = {
	            pagenum: parseInt(options.pagenum) || 1,
	            pagesize: parseInt(options.pagesize) || 20
	        };

	        var opts = {
	            url: apiUrl + '/' + orgName + '/' + appName + '/chatrooms',
	            dataType: 'json',
	            type: 'GET',
	            headers: { 'Authorization': 'Bearer ' + token },
	            data: pageInfo,
	            success: suc || _utils.emptyfn,
	            error: error || _utils.emptyfn
	        };
	        _utils.ajax(opts);
	    } else {
	        conn.onError({
	            type: _code.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR
	        });
	    }
	};

	connection.prototype.joinChatRoom = function (options) {
	    var roomJid = this.context.appKey + '_' + options.roomId + '@conference.' + this.domain;
	    var room_nick = roomJid + '/' + this.context.userId;
	    var suc = options.success || _utils.emptyfn;
	    var err = options.error || _utils.emptyfn;
	    var errorFn = function errorFn(ele) {
	        err({
	            type: _code.WEBIM_CONNCTION_JOINCHATROOM_ERROR,
	            data: ele
	        });
	    };

	    var iq = $pres({
	        from: this.context.jid,
	        to: room_nick
	    }).c('x', { xmlns: Strophe.NS.MUC + '#user' }).c('item', { affiliation: 'member', role: 'participant' }).up().up().c('roomtype', { xmlns: 'easemob:x:roomtype', type: 'chatroom' });

	    this.context.stropheConn.sendIQ(iq.tree(), suc, errorFn);
	};

	connection.prototype.quitChatRoom = function (options) {
	    var roomJid = this.context.appKey + '_' + options.roomId + '@conference.' + this.domain;
	    var room_nick = roomJid + '/' + this.context.userId;
	    var suc = options.success || _utils.emptyfn;
	    var err = options.error || _utils.emptyfn;
	    var errorFn = function errorFn(ele) {
	        err({
	            type: _code.WEBIM_CONNCTION_QUITCHATROOM_ERROR,
	            data: ele
	        });
	    };
	    var iq = $pres({
	        from: this.context.jid,
	        to: room_nick,
	        type: 'unavailable'
	    }).c('x', { xmlns: Strophe.NS.MUC + '#user' }).c('item', { affiliation: 'none', role: 'none' }).up().up().c('roomtype', { xmlns: 'easemob:x:roomtype', type: 'chatroom' });

	    this.context.stropheConn.sendIQ(iq.tree(), suc, errorFn);
	};

	connection.prototype._onReceiveInviteFromGroup = function (info) {
	    info = eval('(' + info + ')');
	    var options = {
	        title: "Group invitation",
	        msg: info.user + " invites you to join into group:" + info.group_id,
	        agree: function agree() {
	            WebIM.doQuery('{"type":"acceptInvitationFromGroup","id":"' + info.group_id + '","user":"' + info.user + '"}', function (response) {}, function (code, msg) {
	                Demo.api.NotifyError("acceptInvitationFromGroup error:" + msg);
	            });
	        },
	        reject: function reject() {
	            WebIM.doQuery('{"type":"declineInvitationFromGroup","id":"' + info.group_id + '","user":"' + info.user + '"}', function (response) {}, function (code, msg) {
	                Demo.api.NotifyError("declineInvitationFromGroup error:" + msg);
	            });
	        }
	    };

	    this.onConfirmPop(options);
	};
	connection.prototype._onReceiveInviteAcceptionFromGroup = function (info) {
	    info = eval('(' + info + ')');
	    var options = {
	        title: "Group invitation response",
	        msg: info.user + " agreed to join into group:" + info.group_id,
	        agree: function agree() {}
	    };
	    this.onConfirmPop(options);
	};
	connection.prototype._onReceiveInviteDeclineFromGroup = function (info) {
	    info = eval('(' + info + ')');
	    var options = {
	        title: "Group invitation response",
	        msg: info.user + " rejected to join into group:" + info.group_id,
	        agree: function agree() {}
	    };
	    this.onConfirmPop(options);
	};
	connection.prototype._onAutoAcceptInvitationFromGroup = function (info) {
	    info = eval('(' + info + ')');
	    var options = {
	        title: "Group invitation",
	        msg: "You had joined into the group:" + info.group_name + " automatically.Inviter:" + info.user,
	        agree: function agree() {}
	    };
	    this.onConfirmPop(options);
	};
	connection.prototype._onLeaveGroup = function (info) {
	    info = eval('(' + info + ')');
	    var options = {
	        title: "Group notification",
	        msg: "You have been out of the group:" + info.group_id + ".Reason:" + info.msg,
	        agree: function agree() {}
	    };
	    this.onConfirmPop(options);
	};
	connection.prototype._onReceiveJoinGroupApplication = function (info) {
	    info = eval('(' + info + ')');
	    var options = {
	        title: "Group join application",
	        msg: info.user + " applys to join into group:" + info.group_id,
	        agree: function agree() {
	            WebIM.doQuery('{"type":"acceptJoinGroupApplication","id":"' + info.group_id + '","user":"' + info.user + '"}', function (response) {}, function (code, msg) {
	                Demo.api.NotifyError("acceptJoinGroupApplication error:" + msg);
	            });
	        },
	        reject: function reject() {
	            WebIM.doQuery('{"type":"declineJoinGroupApplication","id":"' + info.group_id + '","user":"' + info.user + '"}', function (response) {}, function (code, msg) {
	                Demo.api.NotifyError("declineJoinGroupApplication error:" + msg);
	            });
	        }
	    };
	    this.onConfirmPop(options);
	};
	connection.prototype._onReceiveAcceptionFromGroup = function (info) {
	    info = eval('(' + info + ')');
	    var options = {
	        title: "Group notification",
	        msg: "You had joined into the group:" + info.group_name + ".",
	        agree: function agree() {}
	    };
	    this.onConfirmPop(options);
	};
	connection.prototype._onReceiveRejectionFromGroup = function () {
	    info = eval('(' + info + ')');
	    var options = {
	        title: "Group notification",
	        msg: "You have been rejected to join into the group:" + info.group_name + ".",
	        agree: function agree() {}
	    };
	    this.onConfirmPop(options);
	};
	connection.prototype._onUpdateMyGroupList = function (options) {
	    this.onUpdateMyGroupList(options);
	};
	connection.prototype._onUpdateMyRoster = function (options) {
	    this.onUpdateMyRoster(options);
	};
	connection.prototype.reconnect = function () {
	    var that = this;
	    setTimeout(function () {
	        _login(that.context.restTokenData, that);
	    }, (this.autoReconnectNumTotal == 0 ? 0 : this.autoReconnectInterval) * 1000);
	    this.autoReconnectNumTotal++;
	};
	connection.prototype.closed = function () {
	    Demo.api.init();
	};

	// used for blacklist
	function _parsePrivacy(iq) {
	    var list = [];
	    var items = iq.getElementsByTagName('item');

	    if (items) {
	        for (var i = 0; i < items.length; i++) {
	            var item = items[i];
	            var jid = item.getAttribute('value');
	            var order = item.getAttribute('order');
	            var type = item.getAttribute('type');
	            if (!jid) {
	                continue;
	            }
	            var n = _parseNameFromJidFn(jid);
	            list[n] = {
	                type: type,
	                order: order,
	                jid: jid,
	                name: n
	            };
	        }
	    }
	    return list;
	};

	// used for blacklist
	connection.prototype.getBlacklist = function (options) {
	    options = options || {};
	    var iq = $iq({ type: 'get' });
	    var sucFn = options.success || _utils.emptyfn;
	    var errFn = options.error || _utils.emptyfn;
	    var me = this;

	    iq.c('query', { xmlns: 'jabber:iq:privacy' }).c('list', { name: 'special' });

	    this.context.stropheConn.sendIQ(iq.tree(), function (iq) {
	        me.onBlacklistUpdate(_parsePrivacy(iq));
	        sucFn();
	    }, function () {
	        me.onBlacklistUpdate([]);
	        errFn();
	    });
	};

	// used for blacklist
	connection.prototype.addToBlackList = function (options) {
	    var iq = $iq({ type: 'set' });
	    var blacklist = options.list || {};
	    var type = options.type || 'jid';
	    var sucFn = options.success || _utils.emptyfn;
	    var errFn = options.error || _utils.emptyfn;
	    var piece = iq.c('query', { xmlns: 'jabber:iq:privacy' }).c('list', { name: 'special' });

	    var keys = Object.keys(blacklist);
	    var len = keys.length;
	    var order = 2;

	    for (var i = 0; i < len; i++) {
	        var item = blacklist[keys[i]];
	        var type = item.type || 'jid';
	        var jid = item.jid;

	        piece = piece.c('item', { action: 'deny', order: order++, type: type, value: jid }).c('message');
	        if (i !== len - 1) {
	            piece = piece.up().up();
	        }
	    }

	    // log('addToBlackList', blacklist, piece.tree());
	    this.context.stropheConn.sendIQ(piece.tree(), sucFn, errFn);
	};

	// used for blacklist
	connection.prototype.removeFromBlackList = function (options) {

	    var iq = $iq({ type: 'set' });
	    var blacklist = options.list || {};
	    var sucFn = options.success || _utils.emptyfn;
	    var errFn = options.error || _utils.emptyfn;
	    var piece = iq.c('query', { xmlns: 'jabber:iq:privacy' }).c('list', { name: 'special' });

	    var keys = Object.keys(blacklist);
	    var len = keys.length;

	    for (var i = 0; i < len; i++) {
	        var item = blacklist[keys[i]];
	        var type = item.type || 'jid';
	        var jid = item.jid;
	        var order = item.order;

	        piece = piece.c('item', { action: 'deny', order: order, type: type, value: jid }).c('message');
	        if (i !== len - 1) {
	            piece = piece.up().up();
	        }
	    }

	    // log('removeFromBlackList', blacklist, piece.tree());
	    this.context.stropheConn.sendIQ(piece.tree(), sucFn, errFn);
	};

	connection.prototype._getGroupJid = function (to) {
	    var appKey = this.context.appKey || '';
	    return appKey + '_' + to + '@conference.' + this.domain;
	};

	// used for blacklist
	connection.prototype.addToGroupBlackList = function (options) {
	    var sucFn = options.success || _utils.emptyfn;
	    var errFn = options.error || _utils.emptyfn;
	    var jid = _getJid(options, this);
	    var affiliation = 'admin'; //options.affiliation || 'admin';
	    var to = this._getGroupJid(options.roomId);
	    var iq = $iq({ type: 'set', to: to });

	    iq.c('query', { xmlns: 'http://jabber.org/protocol/muc#' + affiliation }).c('item', {
	        affiliation: 'outcast',
	        jid: jid
	    });

	    this.context.stropheConn.sendIQ(iq.tree(), sucFn, errFn);
	};

	function _parseGroupBlacklist(iq) {
	    var list = {};
	    var items = iq.getElementsByTagName('item');

	    if (items) {
	        for (var i = 0; i < items.length; i++) {
	            var item = items[i];
	            var jid = item.getAttribute('jid');
	            var affiliation = item.getAttribute('affiliation');
	            var nick = item.getAttribute('nick');
	            if (!jid) {
	                continue;
	            }
	            var n = _parseNameFromJidFn(jid);
	            list[n] = {
	                jid: jid,
	                affiliation: affiliation,
	                nick: nick,
	                name: n
	            };
	        }
	    }
	    return list;
	}

	// used for blacklist
	connection.prototype.getGroupBlacklist = function (options) {
	    var sucFn = options.success || _utils.emptyfn;
	    var errFn = options.error || _utils.emptyfn;

	    // var jid = _getJid(options, this);
	    var affiliation = 'admin'; //options.affiliation || 'admin';
	    var to = this._getGroupJid(options.roomId);
	    var iq = $iq({ type: 'get', to: to });

	    iq.c('query', { xmlns: 'http://jabber.org/protocol/muc#' + affiliation }).c('item', {
	        affiliation: 'outcast'
	    });

	    this.context.stropheConn.sendIQ(iq.tree(), function (msginfo) {
	        log('getGroupBlackList');
	        sucFn(_parseGroupBlacklist(msginfo));
	    }, function () {
	        errFn();
	    });
	};

	// used for blacklist
	connection.prototype.removeGroupMemberFromBlacklist = function (options) {
	    var sucFn = options.success || _utils.emptyfn;
	    var errFn = options.error || _utils.emptyfn;

	    var jid = _getJid(options, this);
	    var affiliation = 'admin'; //options.affiliation || 'admin';
	    var to = this._getGroupJid(options.roomId);
	    var iq = $iq({ type: 'set', to: to });

	    iq.c('query', { xmlns: 'http://jabber.org/protocol/muc#' + affiliation }).c('item', {
	        affiliation: 'member',
	        jid: jid
	    });

	    this.context.stropheConn.sendIQ(iq.tree(), function (msginfo) {
	        sucFn();
	    }, function () {
	        errFn();
	    });
	};

	/**
	 * changeGroupSubject 修改群名称
	 *
	 * @param options
	 */
	// <iq to='easemob-demo#chatdemoui_roomid@conference.easemob.com' type='set' id='3940489311' xmlns='jabber:client'>
	//     <query xmlns='http://jabber.org/protocol/muc#owner'>
	//         <x type='submit' xmlns='jabber:x:data'>
	//             <field var='FORM_TYPE'><value>http://jabber.org/protocol/muc#roomconfig</value></field>
	//             <field var='muc#roomconfig_roomname'><value>Room Name</value></field>
	//         </x>
	//     </query>
	// </iq>
	connection.prototype.changeGroupSubject = function (options) {
	    var sucFn = options.success || _utils.emptyfn;
	    var errFn = options.error || _utils.emptyfn;

	    // must be `owner`
	    var affiliation = 'owner';
	    var to = this._getGroupJid(options.roomId);
	    var iq = $iq({ type: 'set', to: to });

	    iq.c('query', { xmlns: 'http://jabber.org/protocol/muc#' + affiliation }).c('x', { type: 'submit', xmlns: 'jabber:x:data' }).c('field', { var: 'FORM_TYPE' }).c('value').t('http://jabber.org/protocol/muc#roomconfig').up().up().c('field', { var: 'muc#roomconfig_roomname' }).c('value').t(options.subject).up().up().c('field', { var: 'muc#roomconfig_roomdesc' }).c('value').t(options.description);

	    this.context.stropheConn.sendIQ(iq.tree(), function (msginfo) {
	        sucFn();
	    }, function () {
	        errFn();
	    });
	};

	/**
	 * destroyGroup 删除群组
	 *
	 * @param options
	 */
	// <iq id="9BEF5D20-841A-4048-B33A-F3F871120E58" to="easemob-demo#chatdemoui_1477462231499@conference.easemob.com" type="set">
	//     <query xmlns="http://jabber.org/protocol/muc#owner">
	//         <destroy>
	//             <reason>xxx destory group yyy</reason>
	//         </destroy>
	//     </query>
	// </iq>
	connection.prototype.destroyGroup = function (options) {
	    var sucFn = options.success || _utils.emptyfn;
	    var errFn = options.error || _utils.emptyfn;

	    // must be `owner`
	    var affiliation = 'owner';
	    var to = this._getGroupJid(options.roomId);
	    var iq = $iq({ type: 'set', to: to });

	    iq.c('query', { xmlns: 'http://jabber.org/protocol/muc#' + affiliation }).c('destroy').c('reason').t(options.reason || '');

	    this.context.stropheConn.sendIQ(iq.tree(), function (msginfo) {
	        sucFn();
	    }, function () {
	        errFn();
	    });
	};

	/**
	 * leaveGroupBySelf 主动离开群组
	 *
	 * @param options
	 */
	// <iq id="5CD33172-7B62-41B7-98BC-CE6EF840C4F6_easemob_occupants_change_affiliation" to="easemob-demo#chatdemoui_1477481609392@conference.easemob.com" type="set">
	//     <query xmlns="http://jabber.org/protocol/muc#admin">
	//         <item affiliation="none" jid="easemob-demo#chatdemoui_lwz2@easemob.com"/>
	//     </query>
	// </iq>
	connection.prototype.leaveGroupBySelf = function (options) {
	    var sucFn = options.success || _utils.emptyfn;
	    var errFn = options.error || _utils.emptyfn;

	    // must be `owner`
	    var jid = _getJid(options, this);
	    var affiliation = 'admin';
	    var to = this._getGroupJid(options.roomId);
	    var iq = $iq({ type: 'set', to: to });

	    iq.c('query', { xmlns: 'http://jabber.org/protocol/muc#' + affiliation }).c('item', {
	        affiliation: 'none',
	        jid: jid
	    });

	    this.context.stropheConn.sendIQ(iq.tree(), function (msgInfo) {
	        sucFn(msgInfo);
	    }, function (errInfo) {
	        errFn(errInfo);
	    });
	};

	/**
	 * leaveGroup 被踢出群组
	 *
	 * @param options
	 */
	// <iq id="9fb25cf4-1183-43c9-961e-9df70e300de4:sendIQ" to="easemob-demo#chatdemoui_1477481597120@conference.easemob.com" type="set" xmlns="jabber:client">
	//     <query xmlns="http://jabber.org/protocol/muc#admin">
	//         <item affiliation="none" jid="easemob-demo#chatdemoui_lwz4@easemob.com"/>
	//         <item jid="easemob-demo#chatdemoui_lwz4@easemob.com" role="none"/>
	//         <item affiliation="none" jid="easemob-demo#chatdemoui_lwz2@easemob.com"/>
	//         <item jid="easemob-demo#chatdemoui_lwz2@easemob.com" role="none"/>
	//     </query>
	// </iq>
	connection.prototype.leaveGroup = function (options) {
	    var sucFn = options.success || _utils.emptyfn;
	    var errFn = options.error || _utils.emptyfn;
	    var list = options.list || [];
	    var affiliation = 'admin';
	    var to = this._getGroupJid(options.roomId);
	    var iq = $iq({ type: 'set', to: to });
	    var piece = iq.c('query', { xmlns: 'http://jabber.org/protocol/muc#' + affiliation });
	    var keys = Object.keys(list);
	    var len = keys.length;

	    for (var i = 0; i < len; i++) {
	        var name = list[keys[i]];
	        var jid = _getJidByName(name, this);

	        piece = piece.c('item', {
	            affiliation: 'none',
	            jid: jid
	        }).up().c('item', {
	            role: 'none',
	            jid: jid
	        }).up();
	    }

	    this.context.stropheConn.sendIQ(iq.tree(), function (msgInfo) {
	        sucFn(msgInfo);
	    }, function (errInfo) {
	        errFn(errInfo);
	    });
	};

	/**
	 * addGroupMembers 添加群组成员
	 *
	 * @param options

	 Attention the sequence: message first (每个成员单独发一条message), iq second (多个成员可以合成一条iq发)
	 <!-- 添加成员通知：send -->
	 <message to='easemob-demo#chatdemoui_1477482739698@conference.easemob.com'>
	 <x xmlns='http://jabber.org/protocol/muc#user'>
	 <invite to='easemob-demo#chatdemoui_lwz2@easemob.com'>
	 <reason>liuwz invite you to join group '谢谢'</reason>
	 </invite>
	 </x>
	 </message>
	 <!-- 添加成员：send -->
	 <iq id='09DFB1E5-C939-4C43-B5A7-8000DA0E3B73_easemob_occupants_change_affiliation' to='easemob-demo#chatdemoui_1477482739698@conference.easemob.com' type='set'>
	 <query xmlns='http://jabber.org/protocol/muc#admin'>
	 <item affiliation='member' jid='easemob-demo#chatdemoui_lwz2@easemob.com'/>
	 </query>
	 </iq>
	 */

	connection.prototype.addGroupMembers = function (options) {
	    var sucFn = options.success || _utils.emptyfn;
	    var errFn = options.error || _utils.emptyfn;
	    var list = options.list || [];
	    var affiliation = 'admin';
	    var to = this._getGroupJid(options.roomId);
	    var iq = $iq({ type: 'set', to: to });
	    var piece = iq.c('query', { xmlns: 'http://jabber.org/protocol/muc#' + affiliation });
	    var len = list.length;

	    for (var i = 0; i < len; i++) {

	        var name = list[i];
	        var jid = _getJidByName(name, this);

	        piece = piece.c('item', {
	            affiliation: 'member',
	            jid: jid
	        }).up();

	        var dom = $msg({
	            to: to
	        }).c('x', {
	            xmlns: 'http://jabber.org/protocol/muc#user'
	        }).c('invite', {
	            to: jid
	        }).c('reason').t(options.reason || '');

	        this.sendCommand(dom.tree());
	    }

	    this.context.stropheConn.sendIQ(iq.tree(), function (msgInfo) {
	        sucFn(msgInfo);
	    }, function (errInfo) {
	        errFn(errInfo);
	    });
	};

	/**
	 * acceptInviteFromGroup 接受加入申请
	 *
	 * @param options
	 */
	connection.prototype.acceptInviteFromGroup = function (options) {
	    options.success = function () {
	        // then send sendAcceptInviteMessage
	        // connection.prototype.sendAcceptInviteMessage(optoins);
	    };
	    this.addGroupMembers(options);
	};

	/**
	 * rejectInviteFromGroup 拒绝入群申请
	 *
	 * throw request for now 暂时不处理，直接丢弃
	 *
	 <message to='easemob-demo#chatdemoui_mt002@easemob.com' from='easmeob-demo#chatdemoui_mt001@easemob.com' id='B83B7210-BCFF-4DEE-AB28-B9FE5579C1E2'>
	 <x xmlns='http://jabber.org/protocol/muc#user'>
	 <apply to='easemob-demo#chatdemoui_groupid1@conference.easemob.com' from='easmeob-demo#chatdemoui_mt001@easemob.com' toNick='llllll'>
	 <reason>reject</reason>
	 </apply>
	 </x>
	 </message>
	 *
	 * @param options
	 */
	connection.prototype.rejectInviteFromGroup = function (options) {
	    // var from = _getJidByName(options.from, this);
	    // var dom = $msg({
	    //     from: from,
	    //     to: _getJidByName(options.to, this)
	    // }).c('x', {
	    //     xmlns: 'http://jabber.org/protocol/muc#user'
	    // }).c('apply', {
	    //     from: from,
	    //     to: this._getGroupJid(options.groupId),
	    //     toNick: options.groupName
	    // }).c('reason').t(options.reason || '');
	    //
	    // this.sendCommand(dom.tree());
	};

	/**
	 * createGroup 创建群组
	 *
	 * 1. 创建申请 -> 得到房主身份
	 * 2. 获取房主信息 -> 得到房间form
	 * 3. 完善房间form -> 创建成功
	 * 4. 添加房间成员
	 * 5. 消息通知成员
	 * @param options
	 */
	connection.prototype.createGroup = function (options) {
	    var roomId = +new Date();
	    var toRoom = this._getGroupJid(roomId);
	    var to = toRoom + '/' + this.context.userId;

	    var pres = $pres({ to: to }).c('x', { xmlns: 'http://jabber.org/protocol/muc' }).up().c('create', { xmlns: 'http://jabber.org/protocol/muc' }).up();
	    // .c('c', {
	    //     hash: 'sha-1',
	    //     node: 'https://github.com/robbiehanson/XMPPFramework',
	    //     ver: 'k6gP4Ua5m4uu9YorAG0LRXM+kZY=',
	    //     xmlns: 'http://jabber.org/protocol/caps'
	    // }).up();

	    // createGroupACK
	    this.sendCommand(pres.tree());

	    var me = this;
	    // timeout hack for create group async
	    setTimeout(function () {
	        // Creating a Reserved Room
	        var iq = $iq({ type: 'get', to: toRoom }).c('query', { xmlns: 'http://jabber.org/protocol/muc#owner' });

	        // Strophe.info('step 1 ----------');
	        // Strophe.info(options);
	        me.context.stropheConn.sendIQ(iq.tree(), function (msgInfo) {
	            // log(msgInfo);

	            // for ie hack
	            if ('setAttribute' in msgInfo) {
	                // Strophe.info('step 3 ----------');
	                var x = msgInfo.getElementsByTagName('x')[0];
	                x.setAttribute('type', 'submit');
	            } else {
	                // Strophe.info('step 4 ----------');
	                Strophe.forEachChild(msgInfo, 'x', function (field) {
	                    field.setAttribute('type', 'submit');
	                });
	            }

	            // var rcv = msgInfo.getElementsByTagName('x');
	            // var v;
	            // if (rcv.length > 0) {
	            //     if (rcv[0].childNodes && rcv[0].childNodes.length > 0) {
	            //         v = rcv[0].childNodes[0].nodeValue;
	            //     } else {
	            //         v = rcv[0].innerHTML || rcv[0].innerText
	            //     }
	            //     mid = rcv[0].getAttribute('mid');
	            // }
	            Strophe.info('step 5 ----------');
	            Strophe.forEachChild(x, 'field', function (field) {
	                var fieldVar = field.getAttribute('var');
	                var valueDom = field.getElementsByTagName('value')[0];
	                Strophe.info(fieldVar);
	                switch (fieldVar) {
	                    case 'muc#roomconfig_roomname':
	                        _setText(valueDom, options.subject || '');
	                        break;
	                    case 'muc#roomconfig_roomdesc':
	                        _setText(valueDom, options.description || '');
	                        break;
	                    case 'muc#roomconfig_publicroom':
	                        // public 1
	                        _setText(valueDom, +options.optionsPublic);
	                        break;
	                    case 'muc#roomconfig_membersonly':
	                        _setText(valueDom, +options.optionsMembersOnly);
	                        break;
	                    case 'muc#roomconfig_moderatedroom':
	                        _setText(valueDom, +options.optionsModerate);
	                        break;
	                    case 'muc#roomconfig_persistentroom':
	                        _setText(valueDom, 1);
	                        break;
	                    case 'muc#roomconfig_allowinvites':
	                        _setText(valueDom, +options.optionsAllowInvites);
	                        break;
	                    case 'muc#roomconfig_allowvisitornickchange':
	                        _setText(valueDom, 0);
	                        break;
	                    case 'muc#roomconfig_allowvisitorstatus':
	                        _setText(valueDom, 0);
	                        break;
	                    case 'allow_private_messages':
	                        _setText(valueDom, 0);
	                        break;
	                    case 'allow_private_messages_from_visitors':
	                        _setText(valueDom, 'nobody');
	                        break;
	                    default:
	                        break;
	                }
	                // log(valueDom);
	            });

	            var iq = $iq({ to: toRoom, type: 'set' }).c('query', { xmlns: 'http://jabber.org/protocol/muc#owner' }).cnode(x);

	            // log(iq.tree());

	            me.context.stropheConn.sendIQ(iq.tree(), function (msgInfo) {
	                // sucFn(msgInfo);

	                me.addGroupMembers({
	                    list: options.members,
	                    roomId: roomId
	                });
	            }, function (errInfo) {
	                // errFn(errInfo);
	            });
	            // sucFn(msgInfo);
	        }, function (errInfo) {
	            // errFn(errInfo);
	        });
	    }, 1000);
	};

	function _setText(valueDom, v) {
	    if ('textContent' in valueDom) {
	        valueDom.textContent = v;
	    } else if ('text' in valueDom) {
	        valueDom.text = v;
	    } else {
	        // Strophe.info('_setText 4 ----------');
	        // valueDom.innerHTML = v;
	    }
	}

	var WebIM = window.WebIM || {};
	WebIM.connection = connection;
	WebIM.utils = _utils;
	WebIM.statusCode = _code;
	WebIM.message = _msg.message;
	WebIM.doQuery = function (str, suc, fail) {
	    if (typeof window.cefQuery === 'undefined') {
	        return;
	    }
	    window.cefQuery({
	        request: str,
	        persistent: false,
	        onSuccess: suc,
	        onFailure: fail
	    });
	};

	module.exports = WebIM;

	if (false) {
	    module.hot.accept();
	}

/***/ },

/***/ 226:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	;(function () {
	    'use strict';

	    var _utils = __webpack_require__(217).utils;
	    var Message = function Message(type, id) {
	        if (!this instanceof Message) {
	            return new Message(type);
	        }

	        this._msg = {};

	        if (typeof Message[type] === 'function') {
	            Message[type].prototype.setGroup = this.setGroup;
	            this._msg = new Message[type](id);
	        }
	        return this._msg;
	    };
	    Message.prototype.setGroup = function (group) {
	        this.body.group = group;
	    };

	    /*
	     * text message
	     */
	    Message.txt = function (id) {
	        this.id = id;
	        this.type = 'txt';
	        this.body = {};
	    };
	    Message.txt.prototype.set = function (opt) {
	        this.value = opt.msg;
	        this.body = {
	            id: this.id,
	            to: opt.to,
	            msg: this.value,
	            type: this.type,
	            roomType: opt.roomType,
	            ext: opt.ext || {},
	            success: opt.success,
	            fail: opt.fail
	        };

	        !opt.roomType && delete this.body.roomType;
	    };

	    /*
	     * cmd message
	     */
	    Message.cmd = function (id) {
	        this.id = id;
	        this.type = 'cmd';
	        this.body = {};
	    };
	    Message.cmd.prototype.set = function (opt) {
	        this.value = '';

	        this.body = {
	            to: opt.to,
	            action: opt.action,
	            msg: this.value,
	            type: this.type,
	            roomType: opt.roomType,
	            ext: opt.ext || {},
	            success: opt.success
	        };
	        !opt.roomType && delete this.body.roomType;
	    };

	    /*
	     * loc message
	     */
	    Message.location = function (id) {
	        this.id = id;
	        this.type = 'loc';
	        this.body = {};
	    };
	    Message.location.prototype.set = function (opt) {
	        this.body = {
	            to: opt.to,
	            type: this.type,
	            roomType: opt.roomType,
	            addr: opt.addr,
	            lat: opt.lat,
	            lng: opt.lng,
	            ext: opt.ext || {}
	        };
	    };

	    /*
	     * img message
	     */
	    Message.img = function (id) {
	        this.id = id;
	        this.type = 'img';
	        this.body = {};
	    };
	    Message.img.prototype.set = function (opt) {
	        opt.file = opt.file || _utils.getFileUrl(opt.fileInputId);

	        this.value = opt.file;

	        this.body = {
	            id: this.id,
	            file: this.value,
	            apiUrl: opt.apiUrl,
	            to: opt.to,
	            type: this.type,
	            ext: opt.ext || {},
	            roomType: opt.roomType,
	            onFileUploadError: opt.onFileUploadError,
	            onFileUploadComplete: opt.onFileUploadComplete,
	            success: opt.success,
	            fail: opt.fail,
	            flashUpload: opt.flashUpload,
	            width: opt.width,
	            height: opt.height,
	            body: opt.body,
	            uploadError: opt.uploadError,
	            uploadComplete: opt.uploadComplete
	        };

	        !opt.roomType && delete this.body.roomType;
	    };

	    /*
	     * audio message
	     */
	    Message.audio = function (id) {
	        this.id = id;
	        this.type = 'audio';
	        this.body = {};
	    };
	    Message.audio.prototype.set = function (opt) {
	        opt.file = opt.file || _utils.getFileUrl(opt.fileInputId);

	        this.value = opt.file;
	        this.filename = opt.filename || this.value.filename;

	        this.body = {
	            id: this.id,
	            file: this.value,
	            filename: this.filename,
	            apiUrl: opt.apiUrl,
	            to: opt.to,
	            type: this.type,
	            ext: opt.ext || {},
	            length: opt.length || 0,
	            roomType: opt.roomType,
	            file_length: opt.file_length,
	            onFileUploadError: opt.onFileUploadError,
	            onFileUploadComplete: opt.onFileUploadComplete,
	            success: opt.success,
	            fail: opt.fail,
	            flashUpload: opt.flashUpload,
	            body: opt.body
	        };
	        !opt.roomType && delete this.body.roomType;
	    };

	    /*
	     * file message
	     */
	    Message.file = function (id) {
	        this.id = id;
	        this.type = 'file';
	        this.body = {};
	    };
	    Message.file.prototype.set = function (opt) {
	        opt.file = opt.file || _utils.getFileUrl(opt.fileInputId);

	        this.value = opt.file;
	        this.filename = opt.filename || this.value.filename;

	        this.body = {
	            id: this.id,
	            file: this.value,
	            filename: this.filename,
	            apiUrl: opt.apiUrl,
	            to: opt.to,
	            type: this.type,
	            ext: opt.ext || {},
	            roomType: opt.roomType,
	            onFileUploadError: opt.onFileUploadError,
	            onFileUploadComplete: opt.onFileUploadComplete,
	            success: opt.success,
	            fail: opt.fail,
	            flashUpload: opt.flashUpload,
	            body: opt.body
	        };
	        !opt.roomType && delete this.body.roomType;
	    };

	    /*
	     * video message
	     */
	    Message.video = function (id) {};
	    Message.video.prototype.set = function (opt) {};

	    var _Message = function _Message(message) {

	        if (!this instanceof _Message) {
	            return new _Message(message, conn);
	        }

	        this.msg = message;
	    };

	    _Message.prototype.send = function (conn) {
	        var me = this;

	        var _send = function _send(message) {

	            message.ext = message.ext || {};
	            message.ext.weichat = message.ext.weichat || {};
	            message.ext.weichat.originType = message.ext.weichat.originType || 'webim';

	            var json = {
	                from: conn.context.userId || '',
	                to: message.to,
	                bodies: [message.body],
	                ext: message.ext || {}
	            };

	            var jsonstr = _utils.stringify(json);
	            var dom = $msg({
	                type: message.group || 'chat',
	                to: message.toJid,
	                id: message.id,
	                xmlns: 'jabber:client'
	            }).c('body').t(jsonstr);

	            if (message.roomType) {
	                dom.up().c('roomtype', { xmlns: 'easemob:x:roomtype', type: 'chatroom' });
	            }

	            setTimeout(function () {
	                if (typeof _msgHash !== 'undefined' && _msgHash[message.id]) {
	                    _msgHash[message.id].msg.fail instanceof Function && _msgHash[message.id].msg.fail(message.id);
	                }
	            }, 60000);
	            conn.sendCommand(dom.tree(), message.id);
	        };

	        if (me.msg.file) {
	            if (me.msg.body && me.msg.body.url) {
	                // Only send msg
	                _send(me.msg);
	                return;
	            }
	            var _tmpComplete = me.msg.onFileUploadComplete;
	            var _complete = function _complete(data) {

	                if (data.entities[0]['file-metadata']) {
	                    var file_len = data.entities[0]['file-metadata']['content-length'];
	                    me.msg.file_length = file_len;
	                    me.msg.filetype = data.entities[0]['file-metadata']['content-type'];
	                    if (file_len > 204800) {
	                        me.msg.thumbnail = true;
	                    }
	                }

	                me.msg.body = {
	                    type: me.msg.type || 'file',

	                    url: (location.protocol != 'https:' && WebIM.config.isHttpDNS ? WebIM.config.apiURL + data.uri.substr(data.uri.indexOf("/", 9)) : data.uri) + '/' + data.entities[0]['uuid'],
	                    secret: data.entities[0]['share-secret'],
	                    filename: me.msg.file.filename || me.msg.filename,
	                    size: {
	                        width: me.msg.width || 0,
	                        height: me.msg.height || 0
	                    },
	                    length: me.msg.length || 0,
	                    file_length: me.msg.file_length || 0,
	                    filetype: me.msg.filetype
	                };

	                _send(me.msg);
	                _tmpComplete instanceof Function && _tmpComplete(data, me.msg.id);
	            };

	            me.msg.onFileUploadComplete = _complete;
	            _utils.uploadFile.call(conn, me.msg);
	        } else {
	            me.msg.body = {
	                type: me.msg.type === 'chat' ? 'txt' : me.msg.type,
	                msg: me.msg.msg
	            };
	            if (me.msg.type === 'cmd') {
	                me.msg.body.action = me.msg.action;
	            } else if (me.msg.type === 'loc') {
	                me.msg.body.addr = me.msg.addr;
	                me.msg.body.lat = me.msg.lat;
	                me.msg.body.lng = me.msg.lng;
	            }

	            _send(me.msg);
	        }
	    };

	    exports._msg = _Message;
	    exports.message = Message;
	})();

/***/ },

/***/ 227:
/***/ function(module, exports) {

	"use strict";

	;(function () {
	    function Array_h(length) {
	        this.array = length === undefined ? [] : new Array(length);
	    }

	    Array_h.prototype = {
	        /**
	         * 返回数组长度
	         *
	         * @return {Number} length [数组长度]
	         */
	        length: function length() {
	            return this.array.length;
	        },

	        at: function at(index) {
	            return this.array[index];
	        },

	        set: function set(index, obj) {
	            this.array[index] = obj;
	        },

	        /**
	         * 向数组的末尾添加一个或多个元素，并返回新的长度。
	         *
	         * @param  {*} obj [description]
	         * @return {Number} length [新数组的长度]
	         */
	        push: function push(obj) {
	            return this.array.push(obj);
	        },

	        /**
	         * 返回数组中选定的元素
	         *
	         * @param  {Number} start [开始索引值]
	         * @param  {Number} end [结束索引值]
	         * @return {Array} newArray  [新的数组]
	         */
	        slice: function slice(start, end) {
	            return this.array = this.array.slice(start, end);
	        },

	        concat: function concat(array) {
	            this.array = this.array.concat(array);
	        },

	        remove: function remove(index, count) {
	            count = count === undefined ? 1 : count;
	            this.array.splice(index, count);
	        },

	        join: function join(separator) {
	            return this.array.join(separator);
	        },

	        clear: function clear() {
	            this.array.length = 0;
	        }
	    };

	    /**
	     * 先进先出队列 (First Input First Output)
	     *
	     * 一种先进先出的数据缓存器
	     */
	    var Queue = function Queue() {
	        this._array_h = new Array_h();
	    };

	    Queue.prototype = {
	        _index: 0,

	        /**
	         * 排队
	         *
	         * @param  {Object} obj [description]
	         * @return {[type]}     [description]
	         */
	        push: function push(obj) {
	            this._array_h.push(obj);
	        },

	        /**
	         * 出队
	         *
	         * @return {Object} [description]
	         */
	        pop: function pop() {
	            var ret = null;
	            if (this._array_h.length()) {
	                ret = this._array_h.at(this._index);
	                if (++this._index * 2 >= this._array_h.length()) {
	                    this._array_h.slice(this._index);
	                    this._index = 0;
	                }
	            }
	            return ret;
	        },

	        /**
	         * 返回队列中头部(即最新添加的)的动态对象
	         *
	         * @return {Object} [description]
	         */
	        head: function head() {
	            var ret = null,
	                len = this._array_h.length();
	            if (len) {
	                ret = this._array_h.at(len - 1);
	            }
	            return ret;
	        },

	        /**
	         * 返回队列中尾部(即最早添加的)的动态对象
	         *
	         * @return {Object} [description]
	         */
	        tail: function tail() {
	            var ret = null,
	                len = this._array_h.length();
	            if (len) {
	                ret = this._array_h.at(this._index);
	            }
	            return ret;
	        },

	        /**
	         * 返回数据队列长度
	         *
	         * @return {Number} [description]
	         */
	        length: function length() {
	            return this._array_h.length() - this._index;
	        },

	        /**
	         * 队列是否为空
	         *
	         * @return {Boolean} [description]
	         */
	        empty: function empty() {
	            return this._array_h.length() === 0;
	        },

	        clear: function clear() {
	            this._array_h.clear();
	        }
	    };
	    exports.Queue = Queue;
	})();

/***/ }

/******/ });