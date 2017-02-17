# Changelog

## v1.4.10 @ 2017-02-16

###Feature

* [sdk] webrtc add voice call

###BugFix

* [sdk] webrtc:Firefox error while close call
* [sdk] webrtc:logical error after multitimes connection and close
* [sdk] webrtc:shoud not warning offline after normal close
* [sdk] webrtc:can't handle IQ message after reconnect

## v1.4.9 @ 2017-01-20

###BugFix

* [sdk] fix a bug in success/error callback

## v1.4.8 @ 2016-12-27

###Feature

* [demo] Add a mute button to the video chat window
* [demo] Create a chat window automaticly
* [demo] Hide the chat window when switch a cate in leftbar
* [demo] Not back to the login page when refresh the webpage if login succeed

###BugFix

* [sdk] Remove all of the log methods
* [sdk] Send an unavailable presence stanza when leave a group

## v1.4.7 @ 2016-12-21

###Feature

* [demo] Add video chat and send video file functions into the demo.html

###BugFix

* [sdk] Fix the bug when the browser runs in back end that WebIM can't reconnect on phones
* [demo] Refresh the group list on the front end after create a group succeed on back end
* [demo] The master of a group and the members will be added will receive a notification when add members to group
* [demo] A member will leave group when the master of the group remove this member from group black list

## v1.4.6

###Feature

* add demo.html

###BugFix

* to decoupling from Demo namespaces, delete codes using Demo
* delete connection.prototype.createRoom, which is not supported by server

## v1.4.5

###Feature

* GNU version number: `Major_Version_Number.Minor_Version_Number.Revision_Number`
* support webrtc
* while http access,use ip directly instead of ServerName,avoid DNS hijacking.  `isHttpDNS:true`

###BugFix

* does not update catact list UI after destory group
* does not call the callback function after send out the cmd message

## 1.1.4

* add browser version support umd
* remove strophe from sdk because it't too big for webpack or other compiler


# How to install

npm install easemob-webim --save


```
require('easemob-websdk');
```


```
Demo.conn = new WebIM.connection({
    isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
    https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
    url: WebIM.config.xmppURL,
    isAutoLogin: false,
    heartBeatWait: WebIM.config.heartBeatWait,
    autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
    autoReconnectInterval: WebIM.config.autoReconnectInterval
});
```

# How to release

npm install

npm run build