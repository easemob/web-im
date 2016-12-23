require('../../stylesheet/demo.scss');
// require('easemob-websdk');

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

// The messages cache
Demo.chatRecord = {};
// The max messages count of a dialog
Demo.maxChatRecordCount = 20;

Demo.roster = {};
Demo.friends = [];
Demo.strangers = {};
Demo.blacklist = {};

Demo.IMGTYPE = {
    gif: 1,
    bmp: 1,
    jpg: 1,
    png: 1
};

Demo.AUDIOTYPE = {
    mp3: 1,
    amr: 1,
    wmv: 1
};

Demo.selectedCate = '';   //friends|groups|chatrooms|strangers

// initialize webIM connection
Demo.conn = new WebIM.connection({
    isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
    https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
    url: WebIM.config.xmppURL,
    heartBeatWait: WebIM.config.heartBeatWait,
    autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
    autoReconnectInterval: WebIM.config.autoReconnectInterval,
    apiUrl: WebIM.config.apiURL,
    isHttpDNS: WebIM.config.isHttpDNS,
    isWindowSDK: WebIM.config.isWindowSDK,
    isAutoLogin: false
});

Demo.api.render(document.getElementById('demo'));

if (module.hot) {
    module.hot.accept();
}
