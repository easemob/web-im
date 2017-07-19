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

// friends zzf1, zzf2, zzf3, zzf4
let username = '4imtest';
let password = 'i';


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

Demo.conn.listen({});

log(Demo.conn)

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
                let options = {
                    token: accessToken,
                    user: username,
                    orgName: 'easemob-demo',
                    appName: 'chatdemoui'
                }
                Demo.conn.testInit(options);
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

describe('webim-interface test', () => {

    it('test1: apiURL-http://' + apiURL, done => {
        let url = 'http://' + apiURL
        apiURLTest(url, done, 'test1')

    })

    it('test2: xmppURL-ws://' + xmppURL, done => {


        var url = 'ws://' + xmppURL

        xmppURLTest(url, done, 'test3')
    })
});

describe('WebIM-Rest-Interface-Test', () => {
    describe('Group Test', () => {

        let groupId = null,
            groupName = 'TestCase',
            groupName2 = 'TestCase2',
            desc = 'This is a group for test',
            desc2 = 'This is a group for test2',
            pub = true,
            approval = true,
            allowinvites = true,
            inviteFriends = ['zzf1', 'zzf2', 'zzf3', 'zzf4'],
            stableGroupId = '21627244969985';

        it('Test 1: createGroup', done => {
            let options = {
                data: {
                    groupname: groupName,
                    desc: desc,
                    public: pub,
                    approval: approval,
                    allowinvites: allowinvites
                },
                success: function (respData) {
                    groupId = respData.data.groupid;
                    expect(true).toBe(true);
                    done();
                },
                error: function (e) {
                    expect(false).toBe(true);
                    done();
                }
            };
            Demo.conn.createGroupNew(options);
        });

        it('Test 2: getGroups', done => {
            let options = {
                success: function (respData) {
                    log(respData)
                    let groups = respData.data;
                    expect(groups.length).toEqual(2);
                    expect(groups).toContain({
                        groupid: groupId,
                        groupname: groupName
                    });
                    expect(groups).toContain({
                        groupid: stableGroupId,
                        groupname: groupName2
                    });
                    done();
                },
                error: function () {
                    expect(false).toBe(true);
                    done();
                }
            };
            Demo.conn.getGroup(options);
        });

        it('Test 3: getGroupInfo', done => {
            let options = {
                groupId: groupId,
                success: function (respData) {
                    log(respData);
                    expect(respData.data.length).toEqual(1);
                    expect(respData.data[0].description).toEqual(desc);
                    expect(respData.data[0].id).toEqual(groupId);
                    expect(respData.data[0].name).toEqual(groupName);
                    done();
                },
                error: function (e) {
                    expect(false).toBe(true);
                    done();
                }
            }
            Demo.conn.getGroupInfo(options);
        });

        it('Test 4: modifyGroup', done => {
            let options = {
                groupId: groupId,
                groupName: groupName2,
                description: desc2,
                success: function (respData) {
                    log(respData);
                    expect(true).toBe(true);
                    done();
                },
                error: function (e) {
                    log('Error: ', e);
                    expect(false).toBe(true);
                    done();
                }
            };
            Demo.conn.modifyGroup(options);
        });

        it('Test 5: inviteGroupMembers', done => {
            let options = {
                groupId: groupId,
                users: inviteFriends,
                success: function (respData) {
                    log(respData);
                    let len = respData.data.length,
                        data = respData.data;
                    expect(len).toEqual(data.length);
                    for (let i = 0; i < len; i++) {
                        let user = data[i].user;
                        expect(inviteFriends).toContain(user);
                    }
                    done();
                },
                error: function (e) {
                    log('Error: ', e);
                    expect(false).toBe(true);
                    done();
                }
            };
            Demo.conn.inviteToGroup(options);
        });

        it('Test 6: listGroupMember', done => {
            let pageNum = 1,
                pageSize = 1000,
                options = {
                    pageNum: pageNum,
                    pageSize: pageSize,
                    groupId: stableGroupId,
                    success: function (respData) {
                        log(respData);
                        expect(true).toBe(true);
                        expect(respData.data.length).toEqual(inviteFriends.length + 1);
                        for (let i = 0; i < inviteFriends.length; i++) {
                            expect(respData.data).toContain({
                                member: inviteFriends[i]
                            });
                        }
                        expect(respData.data).toContain({
                            owner: username
                        });
                        done();
                    },
                    error: function () {
                        expect(false).toBe(true);
                        done();
                    }
                };
            Demo.conn.listGroupMember(options);
        });

        it('Test 7: setAdmin', done => {
            let options = {
                groupId: stableGroupId,
                username: inviteFriends[0],
                success: function (respData) {
                    log(respData);
                    expect(respData.data).toEqual({
                        newadmin: inviteFriends[0],
                        result: 'success'
                    });
                    done();
                },
                error: function () {
                    expect(false).toBe(true);
                    done();
                }
            };
            Demo.conn.setAdmin(options);
        });

        it('Test 9: getGroupAdmin', done => {
            let options = {
                groupId: stableGroupId,
                success: function (resp) {
                    log(resp);
                    expect(resp.data).toContain(inviteFriends[0]);
                    done();
                },
                error: function (e) {
                    expect(false).toBe(true);
                    done();
                }
            };
            Demo.conn.getGroupAdmin(options);
        });

        it('Test 8: removeAdmin', done => {
            let options = {
                groupId: stableGroupId,
                username: inviteFriends[0],
                success: function (respData) {
                    log(respData);
                    expect(respData.data).toEqual({
                        oldadmin: inviteFriends[0],
                        result: 'success'
                    });
                    done();
                },
                error: function () {
                    expect(false).toBe(true);
                    done();
                }
            };
            Demo.conn.removeAdmin(options);
        });

        it('Test 9: mute', done => {
            let options = {
                username: inviteFriends[0],
                muteDuration: 886400000,
                groupId: stableGroupId,
                success: function (respData) {
                    log(respData);
                    expect(respData.data[0].user).toEqual(inviteFriends[0]);
                    done();
                },
                error: function () {
                    expect(false).toBe(true);
                    done();
                }
            };
            Demo.conn.mute(options);
        });

        it('Test 11: getMuted', done => {
            let options = {
                groupId: stableGroupId,
                success: function (respData) {
                    expect(respData.data[0].user).toEqual(inviteFriends[0]);
                    done();
                },
                error: function () {
                    expect(false).toBe(true);
                    done();
                }
            };
            Demo.conn.getMuted(options);
        });

        it('Test 12: removeMute', done => {
            let options = {
                groupId: stableGroupId,
                username: inviteFriends[0],
                success: function (respData) {
                    log(respData);
                    expect(respData.data[0].user).toEqual(inviteFriends[0]);
                    expect(respData.data[0].result).toEqual(true);
                    done();
                },
                error: function () {
                    expect(false).toBe(true);
                    done();
                }
            };
            Demo.conn.removeMute(options);
        });

        it('Test 13: groupBlockSingle', done => {
            let options = {
                groupId: stableGroupId,
                username: inviteFriends[0],
                success: function (resp) {
                    log(resp);
                    expect(resp.data).toEqual({
                        action: "add_blocks",
                        groupid: stableGroupId,
                        result: true,
                        user: inviteFriends[0]
                    });
                    done();
                },
                error: function (e) {
                    expect(false).toBe(true);
                    done()
                }
            };
            Demo.conn.groupBlockSingle(options);
        });

        it('Test 14: groupBlockMulti', done => {
            let options = {
                groupId: stableGroupId,
                usernames: [inviteFriends[1], inviteFriends[2]],
                success: function (resp) {
                    log(resp);
                    expect(resp.data).toContain({
                        action: "add_blocks",
                        groupid: stableGroupId,
                        result: true,
                        user: inviteFriends[1]
                    });
                    expect(resp.data).toContain({
                        action: "add_blocks",
                        groupid: stableGroupId,
                        result: true,
                        user: inviteFriends[2]
                    });
                    done();
                },
                error: function (e) {
                    expect(false).toBe(true);
                    done()
                }
            }
            Demo.conn.groupBlockMulti(options);
        });

        it('Test 15: getGroupBlacklistNew', done => {
            let options = {
                groupId: stableGroupId,
                success: function (resp) {
                    log(resp);
                    expect(resp.data).toContain(inviteFriends[0]);
                    expect(resp.data).toContain(inviteFriends[1]);
                    expect(resp.data).toContain(inviteFriends[2]);
                    done();
                },
                error: function (e) {
                    expect(false).toBe(true);
                    done();
                }
            }
            Demo.conn.getGroupBlacklistNew(options);
        });

        it('Test 16: removeGroupBlockSingle', done => {
            let options = {
                groupId: stableGroupId,
                username: inviteFriends[1],
                success: function (respData) {
                    log(respData);
                    expect(respData.data.action).toEqual('remove_blocks');
                    expect(respData.data.groupid).toEqual(stableGroupId);
                    expect(respData.data.result).toEqual(true);
                    expect(respData.data.user).toEqual(inviteFriends[1]);
                    done();
                },
                error: function () {
                    expect(false).toBe(true);
                    done();
                }
            };
            Demo.conn.removeGroupBlockSingle(options);
        });

        it('Test 17: getGroupBlacklistNew', done => {
            let options = {
                groupId: stableGroupId,
                success: function (resp) {
                    log(resp);
                    expect(resp.data).not.toContain(inviteFriends[1]);
                    done();
                },
                error: function (e) {
                    expect(false).toBe(true);
                    done();
                }
            }
            Demo.conn.getGroupBlacklistNew(options);
        });

        it('Test 18: removeGroupBlockMulti', done => {
            let options = {
                groupId: stableGroupId,
                username: [inviteFriends[0],inviteFriends[2]],
                success: function (respData) {
                    log(respData);
                    expect(respData.data).toContain({
                        action: 'remove_blocks',
                        groupid: stableGroupId,
                        result: true,
                        user: inviteFriends[0]
                    });
                    expect(respData.data).toContain({
                        action: 'remove_blocks',
                        groupid: stableGroupId,
                        result: true,
                        user: inviteFriends[2]
                    });
                    done();
                },
                error: function () {
                    expect(false).toBe(true);
                    done();
                }
            };
            Demo.conn.removeGroupBlockMulti(options);
        });

        it('Test 19: getGroupBlacklistNew', done => {
            let options = {
                groupId: stableGroupId,
                success: function (resp) {
                    log(resp);
                    expect(resp.data).not.toContain(inviteFriends[0]);
                    expect(resp.data).not.toContain(inviteFriends[2]);
                    done();
                },
                error: function (e) {
                    expect(false).toBe(true);
                    done();
                }
            }
            Demo.conn.getGroupBlacklistNew(options);
        });

        it('Test N: dissolveGroup', done => {
            let options = {
                groupId: groupId,
                success: function (respData) {
                    log(respData);
                    expect(respData.data.id).toEqual(groupId);
                    expect(respData.data.success).toEqual(true);
                    done();
                },
                error: function () {
                    expect(false).toBe(true);
                    done();
                }
            }

            Demo.conn.dissolveGroup(options);
        });
    });
});
