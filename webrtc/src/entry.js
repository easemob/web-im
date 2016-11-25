var Util = require('./components/utils');
var Call = require('./components/call');

window.WebIM = typeof WebIM !== 'undefined' ? WebIM : {};
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


/**
 * 判断是否支持pranswer
 */
if (/Chrome/.test(navigator.userAgent)) {
    WebIM.WebRTC.supportPRAnswer = (navigator.userAgent.split("Chrome/")[1].split(".")[0] >= 50) ? true : false;
}

//WebIM.WebRTC.supportPRAnswer = false;
