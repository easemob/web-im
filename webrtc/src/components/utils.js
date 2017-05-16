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
        var chars = CHARS, uuid = [], i;
        radix = radix || chars.length;

        if (len) {
            // Compact form
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
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
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }

        return uuid.join('');
    };

    // A more performant, but slightly bulkier, RFC4122v4 solution. We boost
    // performance
    // by minimizing calls to random()
    Math.uuidFast = function () {
        var chars = CHARS, uuid = new Array(36), rnd = 0, r;
        for (var i = 0; i < 36; i++) {
            if (i == 8 || i == 13 || i == 18 || i == 23) {
                uuid[i] = '-';
            } else if (i == 14) {
                uuid[i] = '4';
            } else {
                if (rnd <= 0x02) rnd = 0x2000000 + (Math.random() * 0x1000000) | 0;
                r = rnd & 0xf;
                rnd = rnd >> 4;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
        return uuid.join('');
    };

    // A more compact, but less performant, RFC4122v4 solution:
    Math.uuidCompact = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
})();


/**
 * Util
 *
 * @constructor
 */
function Util() {
}

/**
 * Function Logger
 *
 * @constructor
 */
var Logger = function () {
    var self = this;

    var LogLevel = {
        TRACE: 0,
        DEBUG: 1,
        INFO: 2,
        WARN: 3,
        ERROR: 4,
        FATAL: 5
    }

    var LogLevelName = [
        'TRACE',
        'DEBUG',
        'INFO',
        'WARN',
        'ERROR',
        'FATAL'
    ]

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
        this.log && callLog(LogLevel.TRACE, arguments)
    };

    this.debug = function () {
        this.log && callLog(LogLevel.DEBUG, arguments)
    };

    this.info = function () {
        this.log && callLog(LogLevel.INFO, arguments)
    };

    this.warn = function () {
        this.log && callLog(LogLevel.WARN, arguments)
    };

    this.error = function () {
        this.log && callLog(LogLevel.ERROR, arguments)
    };

    this.fatal = function () {
        this.log && callLog(LogLevel.FATAL, arguments)
    };
}

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
    return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
};

/**
 * Function extend
 *
 * @returns {*|{}}
 */
Util.prototype.extend = function () {
    var self = this;
    var options, name, src, copy, copyIsArray, clone,
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
    if (typeof target !== "object" && !self.isFunction(target)) {
        target = {};
    }

    // Extend self itself if only one argument is passed
    if (i === length) {
        target = this;
        i--;
    }

    for (; i < length; i++) {

        // Only deal with non-null/undefined values
        if (( options = arguments[i] ) != null) {

            // Extend the base object
            for (name in options) {
                src = target[name];
                copy = options[name];

                // Prevent never-ending loop
                if (target === copy) {
                    continue;
                }

                // Recurse if we're merging plain objects or arrays
                if (deep && copy && ( self.isPlainObject(copy) ||
                    ( copyIsArray = self.isArray(copy) ) )) {

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
}

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
}

Util.prototype.toggleClass = function (node, className) {
    if (node.hasClass(className)) {
        node.removeClass(className);
        return;
    }
    node.addClass(className);
}


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
}

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
}


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
}

module.exports = new Util();
