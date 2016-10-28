ChangeLog:

WebIM v1.1.3 @ 2016-10-28

* [demo] support Windows SDK. <http://www.easemob.com/download/im>
* [demo] add blacklist feature.
* [demo] paging getChatrooms, add 2 params:pagenum and pagesize. 
* [demo] easy debug, webpack support development and production mode。`npm run dev` support hot reload , `npm run prod` used for production more faster than before.
* [demo] add group feature addGroup、destroyGroup、leaveGroup.
* [sdk]  upgrade strophe from v1.2.2 to v1.2.8, and use strophe-1.2.8.min.js in the product mode, use strophe.js in the debug mode.
* [sdk]  auto reconnect while configured `autoReconnectNumMax` and `autoReconnectInterval` in webim.config.js.

* Bug fixes:
    1. [sdk] Fixed a bug of strophe.js v1.2.8 using BOSH in IE9.  <https://github.com/strophe/strophejs/issues/213>
    2. [sdk] Fixed a bug of send/receive message delay while there was a lot of offline messages.Client should limit the speed of sending ack messages  up to 5/s.
    3. [sdk] heartBeat switch from empty body message to  ping/pong iq. json will cached as offline message by XMPP server.
    4. [groups] add these functions: createGroup,changeGroupSubject,changeGroupDesc,adminGroupMembers,joinPublicGroup.
    5. [demo] Fixed a bug of HTML5 element not supported in IE by add `babel-core/browser-polyfill.js`.
    6. [demo] Fixed a bug of click contract person not work when there are unread messages.