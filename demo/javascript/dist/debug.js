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
    // //localhost:8080 通过nginx转发到子域 a1.localhost.需要:
    // 1.nginx新增8080的server配置
    // 2.gmask(或者/etc/hosts)指定: 127.0.0.1 a1.localhost
    WebIM.config.apiURL = '//a1.localhost';

    //易乐天的server
    // WebIM.config.xmppURL = '172.17.3.122:5280';
    // WebIM.config.apiURL = '//172.17.3.155:8080';
    console.log('isDocker=true');
    console.log('xmpp:' + WebIM.config.xmppURL + ' rest:' + WebIM.config.apiURL);
}

