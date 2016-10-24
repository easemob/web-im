ChangeLog:

WebIM v1.1.3 @ 2016-10-28

* [demo] support Windows SDK. <http://www.easemob.com/download/im>
* [demo] add blacklist feature.
* [sdk] upgrade strophe from v1.2.2 to v1.2.8, and use strophe-1.2.8.min.js in the product mode, use strophe.js in the debug mode.
* [sdk] auto reconnect while configured `autoReconnectNumMax` and `autoReconnectInterval` in webim.config.js.
	
* Bug fixes:
    1. Fixed a bug of strophe.js v1.2.8 using BOSH in IE9.  <https://github.com/strophe/strophejs/issues/213>
    2. [groups] complete all function.