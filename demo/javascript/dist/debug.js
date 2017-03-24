//override strophe in debug mode
if (WebIM.config.isDebug) {
    Strophe.log = function (level, msg) {
        // console.log(Demo.api.ts(), level, msg);
    };
    // Strophe.Connection.prototype.xmlOutput = function (elem) {
    //console.log(ts() + 'send: ');
    //console.log(elem);
    // };
    Strophe.Connection.prototype.rawOutput = function (data) {
        console.log(WebIM.utils.ts() + 'send: ' + data);
    };
    // Strophe.Connection.prototype.xmlInput = function (elem) {
    //console.log(ts() + 'recv1:');
    //console.log(elem);
    // };
    // Strophe.Connection.prototype.rawInput = function (data) {
    //console.log(data);
    // };
}


if (WebIM.config.isSandBox) {
    WebIM.config.xmppURL = WebIM.config.xmppURL.replace('.easemob.', '-sandbox.easemob.');
    WebIM.config.apiURL = WebIM.config.apiURL.replace('.easemob.', '-sdb.easemob.');
}
