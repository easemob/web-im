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
    WebIM.config.xmppURL = WebIM.config.xmppURL.replace('.easemob.', '.sandbox.easemob.');
    WebIM.config.apiURL = WebIM.config.apiURL.replace('.easemob.', '.sdb.easemob.');
}

/**
 * Set autoSignIn as true (autoSignInName and autoSignInPwd are configured below),
 * You can auto signed in each time when you refresh the page in dev model.
 */
WebIM.config.autoSignIn = false;
if (WebIM.config.autoSignIn) {
    WebIM.config.autoSignInName = 'wk3369';
    WebIM.config.autoSignInPwd = '111111';
}

/**
 * Whether to use docker on localhost
 * @parameter {Boolean} true or false
 */
WebIM.config.isDocker = false;
if (WebIM.config.isDocker) {
    WebIM.config.xmppURL = 'localhost:5280';
    // //localhost:8080 via nginx direct to sub-domain a1.localhost. requires:
    // 1. nginx add 8080 server setup
    // 2. gmask(or /etc/hosts) points to: 127.0.0.1 a1.localhost
    WebIM.config.apiURL = '//a1.localhost';

    console.log('isDocker=true');
    console.log('xmpp:' + WebIM.config.xmppURL + ' rest:' + WebIM.config.apiURL);
}

