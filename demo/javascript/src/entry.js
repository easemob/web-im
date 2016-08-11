require('../../stylesheet/demo.scss');

var Api = require('./api');
var Emoji = require('./components/chat/emoji');
var Language = require('./components/language');

// import emoji
WebIM.Emoji = Emoji;


// global log method
window.log = Api.log;

window.Demo = {
    groupType: 'groupchat'
};

// import language package
// Demo.lan = Language.English;
Demo.lan = Language.Chinese;

// for webview in client
Demo.api = Api;

Demo.roster = {};
Demo.strangers = {};

Demo.IMGTYPE = {
    gif: 1,
    bmp: 1,
    jpg: 1,
    png: 1
};

Demo.FILETYPE = {
    gif: 1,
    bmp: 1,
    jpg: 1,
    png: 1,
    zip: 1,
    txt: 1,
    doc: 1,
    pdf: 1
};

Demo.AUDIOTYPE = {
    mp3: 1,
    amr: 1,
    wmv: 1
};

// initialize webIM connection
Demo.conn = new WebIM.connection({
    isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
    https : typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
    url: WebIM.config.xmppURL,
    isAutoLogin: false
});

Demo.api.render(document.getElementById('demo'));
