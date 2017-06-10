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

Demo.first = true;

// for webview in client
Demo.api = Api;

// The messages cache
/*

 Demo.chatRecord = {
 targetId: {
 messages: [{
 msg: 'msg',
 type: 'type'
 },
 {
 msg: 'msg',
 type: 'type'
 }],
 brief: 'brief'
 }
 }
 */

Demo.chatRecord = {};
// The max messages count of a dialog
Demo.maxChatRecordCount = 20000;

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

Demo.chatingCate = '';    // friends|groups|chatrooms|strangers
Demo.selectedCate = 'friends';   // friends|groups|chatrooms|strangers

Demo.chatState = {
    friends: {
        selected: '',
        scroll: 0,
        chatWindow: [],
        count: 0
    },
    groups: {
        selected: '',
        scroll: 0,
        chatWindow: [],
        count: 0
    },
    chatrooms: {
        selected: '',
        scroll: 0,
        chatWindow: [],
        count: 0
    },
    strangers: {
        selected: '',
        scroll: 0,
        chatWindow: [],
        count: 0
    },
    clear: function (cate) {
        if (cate) {
            this[cate].selected = '';
            this[cate].scroll = 0;
            this[cate].chatWindow = [];
        } else {
            this['friends'].selected = '';
            this['friends'].scroll = 0;
            this['friends'].chatWindow = [];

            this['groups'].selected = '';
            this['groups'].scroll = 0;
            this['groups'].chatWindow = [];

            this['chatrooms'].selected = '';
            this['chatrooms'].scroll = 0;
            this['chatrooms'].chatWindow = [];

            this['strangers'].selected = '';
            this['strangers'].scroll = 0;
            this['strangers'].chatWindow = [];
        }
    }
}

Demo.orgName = WebIM.config.appkey.split('#')[0];
Demo.appName = WebIM.config.appkey.split('#')[1];

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
    isAutoLogin: true,
    encrypt: WebIM.config.encrypt,
    delivery: WebIM.config.delivery
});

Demo.api.render(document.getElementById('demo'));

if (module.hot) {
    module.hot.accept();
}
