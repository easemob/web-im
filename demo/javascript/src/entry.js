var React = require("react");
var ReactDOM = require('react-dom');
var Webim = require('./components/webim');
var Emotions = require('./components/chat/emotions');
var Api = require('./api');

// import emotions
WebIM.EMOTIONS = Emotions;



// global log method
window.log = Api.log;

window.Demo = {
    groupType: 'groupchat'
};

// for webview in client
Demo.api = Api;

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
    multiResources: WebIM.config.multiResources,
    https : WebIM.config.https,
    url: WebIM.config.xmppURL
});

var mainNode = document.getElementById('demo');

var render = function () {
	ReactDOM.render(
		<Webim config={WebIM.config} close={unMount} />,
		mainNode
	);
};

var unMount = function () {
    ReactDOM.unmountComponentAtNode(mainNode);
	render();
};

render();
