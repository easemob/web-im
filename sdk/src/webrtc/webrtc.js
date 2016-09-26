var Util = require('./components/utils');
var Call = require('./components/call');

window.WebIM = WebIM || {};
WebIM.WebRTC = WebIM.WebRTC || {};
WebIM.WebRTC.Call = Call;
WebIM.WebRTC.Util = Util;

if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = WebIM.WebRTC;
} else if (typeof define === 'function' && define.amd) {
    define([], function () {
        return WebIM.WebRTC;
    });
}
