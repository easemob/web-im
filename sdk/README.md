# Changelog

## v1.4.11 @ 2017-06-07

###Feature

* [sdk] debug.js fused to sdk logs output optimized
* [sdk] Block groups through rest api
* [sdk] Apply for appending groups through rest api
* [sdk] Get groups list through rest api
* [sdk] Get a group detail through rest api
* [sdk] List all groups a user in through rest api
* [sdk] List all of a group's members through rest api
* [sdk] Block member in group through rest api
* [sdk] Unblock member in group through rest api
* [sdk] List all of administrators in a group through rest api
* [sdk] List blocked members in a group through rest api
* [sdk] Set members as administrator in a group through rest api
* [sdk] Delete an administrator in a group through rest api
* [sdk] Agree a user's application filings of join in the group through rest api
* [sdk] Reject a user's application filings of join in the group through rest api
* [sdk] Add a single user in a group to the blacklist of this group through rest api
* [sdk] Add multi of users in a group to the blacklist of this group through rest api
* [sdk] Delete a single user in a group from the blacklist of this group through rest api
* [sdk] Delete multi of users in a group from the blacklist of this group through rest api
* [demo] Chat record can be deleted
* [demo] Show status of chat records(Undelivered, delivered, read) 
* [demo] List members in a chat room
* [demo] Open a dialog window with friends just through a link
* [demo] Add the board apply for join in a group
* [demo] In the apply for join in a group board get pages of public groups while scroll to the bottom
* [demo] Click a group's name will show detail information of this group on the apply for join in a group board
* [demo] Search a group by the group's id will show detail information of this group on the apply for join in a group board
* [demo] Users are be able to apply for join in a group on the apply for join in a group board
* [demo] Group owners are able to agree or reject a user's filings of join in the group
* [demo] Add the add/delete administrator and block/unblock members buttons in the group members list

###BugFix

* [sdk] Add a new friend will create spare subscription information
* [sdk] Send messages continually will cause the problem of message id repetition
* [sdk] Adapt size of pictures whild sdk and webim sending pictures to each other 
* [demo] Optimize sdk/demo.html, fix the problem that some of dependent files can't be found
* [demo] Fix the problem that off-line messages count not right

## v1.4.10 @ 2017-02-16

### Feature

* [sdk] webrtc add voice call

### BugFix

* [sdk] webrtc:Firefox error while close call
* [sdk] webrtc:logical error after multitimes connection and close
* [sdk] webrtc:shoud not warning offline after normal close
* [sdk] webrtc:can't handle IQ message after reconnect

## v1.4.9 @ 2017-01-20

### BugFix

* [sdk] fix a bug in success/error callback

## v1.4.8 @ 2016-12-27

### Feature

* [demo] Add a mute button to the video chat window
* [demo] Create a chat window automaticly
* [demo] Hide the chat window when switch a cate in leftbar
* [demo] Not back to the login page when refresh the webpage if login succeed

### BugFix

* [sdk] Remove all of the log methods
* [sdk] Send an unavailable presence stanza when leave a group

## v1.4.7 @ 2016-12-21

### Feature

* [demo] Add video chat and send video file functions into the demo.html

### BugFix

* [sdk] Fix the bug when the browser runs in back end that WebIM can't reconnect on phones
* [demo] Refresh the group list on the front end after create a group succeed on back end
* [demo] The master of a group and the members will be added will receive a notification when add members to group
* [demo] A member will leave group when the master of the group remove this member from group black list

## v1.4.6

### Feature

* add demo.html

### BugFix

* to decoupling from Demo namespaces, delete codes using Demo
* delete connection.prototype.createRoom, which is not supported by server

## v1.4.5

### Feature

* GNU version number: `Major_Version_Number.Minor_Version_Number.Revision_Number`
* support webrtc
* while http access,use ip directly instead of ServerName,avoid DNS hijacking.  `isHttpDNS:true`

### BugFix

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

```
$ npm install

$ npm run build
```


# How to generate exported APIs doc

```
$ npm install
$ ./jsdoc.sh
```

then open jsdoc/out/index.html in your browser.