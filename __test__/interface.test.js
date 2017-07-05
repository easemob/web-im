import React from 'react'
import jasmineEnzyme from 'jasmine-enzyme';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;

let log = console.log.bind(console)

// ignore errors with warning message
console.olderror = console.error
console.error = (...args) => {
    // log('fake', args)
    if (/Warning\:/.test(args[0])) return
    console.olderror.apply(console, args)
}

// before 在每个case之前只会执行一遍，所以清理缓存类似操作不能放在此处
beforeEach(() => {
    jasmineEnzyme();
});

require('../demo/javascript/dist/webim.config.js');
require('../sdk/dist/strophe-1.2.8.min.js');
require('../sdk/dist/websdk-1.4.11.js');

log('WebIM.config:', WebIM.config)

let temp1 = WebIM.config.appkey.split('#');
let orgName = temp1[0];
let appName = temp1[1];

let temp2 = WebIM.config.apiURL.split('//');
let apiURL = temp2[1] + '/' + orgName + '/' + appName + '/token';

let username = 'liuwz'
let password = '1'


let loginJson = {
    grant_type: 'password',
    username: username,
    password: password,
    timestamp: new Date()
}

let xmppURL = WebIM.config.xmppURL + '/ws/'

let Demo = {}

let accessToken

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

log(Demo.conn)

describe('webim-interface test', () => {

    it('test1: apiURL-http://' + apiURL, done => {
        let url = 'http://' + apiURL
        apiURLTest(url, done, 'test1')

    })

    it('test2: apiURL-https://' + apiURL, done => {
        let url = 'https://' + apiURL
        apiURLTest(url, done, 'test2')

    })

    it('test3: xmppURL-ws://' + xmppURL, done => {


        var url = 'ws://' + xmppURL

        xmppURLTest(url, done, 'test3')
    })

    it('test4: xmppURL-wss://' + xmppURL, done => {
        var url = 'wss://' + xmppURL

        xmppURLTest(url, done, 'test4')
    })


});


function apiURLTest(url, done, testName) {

    $.ajax({
        url: url,
        type: 'GET',
        data: loginJson,
        error: function (jqXHR, textStatus, errorThrown) {
            expect(1).toBe(0)
            if (jqXHR) {
                log(testName + ' error:', jqXHR)
            }
            done()
        },
        success: function (respData, textStatus, jqXHR) {
            expect(1).toBe(1)
            if (respData) {
                accessToken = respData.access_token
                log(testName + ' success:', respData)
            }
            done()
        }
    });
}

function xmppURLTest(url, done, testName) {
    var stropheConn = new Strophe.Connection(
        url,
        {
            inactivity: Demo.conn.inactivity,
            maxRetries: Demo.conn.maxRetries,
            pollingTime: Demo.conn.pollingTime
        });


    var callback = function (status, msg) {
        // console.log('stropheConn status=', status)
        switch (status) {
            case 1:
                console.log('stropheConn status=' + status, 'CONNECTING')
                break;
            case 5:
                console.log('stropheConn status=' + status, 'CONNECTED')
                done()
                break;
        }

    };

    var jid = WebIM.config.appkey + '_' + username + '@easemob.com/webim'
    stropheConn.connect(jid, '$t$' + accessToken, callback, Demo.conn.wait, Demo.conn.hold);

}