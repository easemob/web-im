# Changelog

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