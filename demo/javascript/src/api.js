var React = require("react");
var ReactDOM = require('react-dom');

var Webim = require('./components/webim');
var textMsg = require('./components/message/txt');
var imgMsg = require('./components/message/img');
var fileMsg = require('./components/message/file');
var locMsg = require('./components/message/loc');
var audioMsg = require('./components/message/audio');
var videoMsg = require('./components/message/video');
var Notify = require('./components/common/notify');
var _ = require('underscore');

var Blacklist = (function () {
    var data = {};
    var dataGroup = {};
    var isWin = WebIM.config.isWindowSDK;
    var order = 2;
    var emptyfn = function () {
    };

    function _set() {
        Demo.blacklist = data;
        return data;
    }

    function _add(name) {
        data[name] = _.find(Demo.friends, function (item) {
            log('name', name, item.name);
            return (item.name == name);
        });


        return _set();
    }

    function _addWin(name) {
        data[name] = {
            type: 'jid',
            order: order++,
            jid: name,
            name: name
        };

        return _set();
    }

    function _remove(name) {
        log(JSON.stringify(data));

        try {
            delete data[name];
        } catch (e) {
        }
        return _set();
    }

    function _removeWin(name) {
        try {
            delete data[name];
        } catch (e) {
            log('blacklist remove error');
        }

        return _set();
    }

    function _parse(list) {
        data = list;
        return _set();
    }

    function _parseWin(str) {
        data = {};
        var blacklist = str ? JSON.parse(str) : [];

        _.each(blacklist, function (item, k) {
            data[item.name] = {
                type: 'jid',
                order: order++,
                jid: item.name,
                name: item.name
            };
        });

        return _set();
    }

    function _getBlacklist(options) {
        var sucFn = options.success || emptyfn;
        var errFn = options.success || emptyfn;

        Demo.conn.getBlacklist();
    }

    function _getBlacklistWin(options) {
        var sucFn = options.success || emptyfn;
        var errFn = options.success || emptyfn;

        WebIM.doQuery('{"type":"getBlacklist"}',
            function success(str) {
                var list = Demo.api.blacklist.parse(str);
                Demo.api.updateRoster();
                sucFn(list);
            },
            function failure(errCode, errMessage) {
                Demo.api.NotifyError('getRoster:' + errCode);
                errFn();
            });
    }

    function _getGroupBlacklist(options) {
        var sucFn = options.success || emptyfn;
        var errFn = options.success || emptyfn;

        options.success = function (list) {
            dataGroup = list;
            sucFn(list);
        };
        Demo.conn.getGroupBlacklist(options);
    }

    function _getGroupBlacklistWin(options) {
        var sucFn = options.success || emptyfn;
        var errFn = options.success || emptyfn;

        WebIM.doQuery('{"type":"groupSpecification","id":"' + options.roomId + '"}',
            function success(str) {
                if (!str) return;
                var json = JSON.parse(str) || {};
                var p = {
                    owner: [
                        {
                            jid: json.owner,
                            affiliation: "owner",
                        }
                    ],
                    members: json.members,
                    blacklist: json.bans,
                };
                sucFn(p.blacklist, p.members);
            },
            function failure(errCode, errMessage) {
                Demo.api.NotifyError("queryRoomInfo:" + errCode);
            });
    }

    function _removeGroupMember(options) {
        var sucFn = options.success || emptyfn;
        var errFn = options.success || emptyfn;

        options.success = function (list) {
            dataGroup = list;
            sucFn(list);
        };

        Demo.conn.removeGroupMemberFromBlacklist(options);
    }

    function _removeGroupMemberWin(options) {
        var sucFn = options.success || emptyfn;
        var errFn = options.success || emptyfn;

        var query = {
            type: 'unblockGroupMembers',
            id: options.roomId,
            members: [options.to]
        };

        WebIM.doQuery(JSON.stringify(query),
            function () {
                sucFn();
            },
            function failure(errCode, errMessage) {
                Demo.api.NotifyError('_removeGoupMemberWin:' + errCode);
                errFn();
            });
    }

    function _addGroupMemberToBlacklist(options) {
        var sucFn = options.success || emptyfn;
        var errFn = options.success || emptyfn;

        Demo.conn.addToGroupBlackList(options);
    }

    function _addGroupMemberToBlacklistWin(options) {
        var sucFn = options.success || emptyfn;
        var errFn = options.success || emptyfn;

        var query = {
            type: 'blockGroupMembers',
            reason: '',
            id: options.roomId,
            members: [options.to]
        };

        WebIM.doQuery(JSON.stringify(query),
            sucFn,
            function failure(errCode, errMessage) {
                Demo.api.NotifyError('_addGroupMemberToBlacklistWin:' + errCode);
                errFn();
            });
    }

    return {
        add: isWin ? _addWin : _add,
        parse: isWin ? _parseWin : _parse,
        remove: isWin ? _removeWin : _remove,
        getBlacklist: isWin ? _getBlacklistWin : _getBlacklist,
        getGroupBlacklist: isWin ? _getGroupBlacklistWin : _getGroupBlacklist,
        removeGroupMemberFromBlacklist: isWin ? _removeGroupMemberWin : _removeGroupMember,
        addGroupMemberToBlacklist: isWin ? _addGroupMemberToBlacklistWin : _addGroupMemberToBlacklist,
        data: function () {
            return data;
        }
    }
})();

module.exports = {
    log: function () {
        if (typeof window === 'object') {
            if (typeof console !== 'undefined' && typeof console.log === 'function') {
                console.log.apply(console, arguments);
            }
        }
    },

    render: function (node, change) {
        this.node = node;

        var props = {};
        switch (change) {
            case 'roster':
                props.rosterChange = true;
                break;
            case 'group':
                props.groupChange = true;
                break;
            case 'chatroom':
                props.chatroomChange = true;
                break;
            case 'stranger':
                props.strangerChange = true;
                break;
            default:
                props = null;
                break;
        }

        if (props) {
            ReactDOM.render(<Webim config={WebIM.config} close={this.logout} {...props} />, this.node);
        } else {
            ReactDOM.render(<Webim config={WebIM.config} close={this.logout}/>, this.node);
        }
    },

    logout: function (type) {
        if (WebIM.config.isWindowSDK) {
            WebIM.doQuery('{"type":"logout"}',
                function (response) {
                    Demo.api.init();
                },
                function (code, msg) {
                    Demo.api.NotifyError("logout:" + msg);
                });
        } else {
            Demo.conn.close('logout');
            if (type == WebIM.statusCode.WEBIM_CONNCTION_CLIENT_LOGOUT) {
                Demo.conn.errorType = type;
            }
        }

    },

    init: function () {
        Demo.selected = null;
        Demo.user = null;
        Demo.call = null;
        Demo.roster = {};
        Demo.strangers = {};
        Demo.blacklist = {};

        ReactDOM.unmountComponentAtNode(this.node);
        this.render(this.node);
    },

    appendMsg: function (msg, type) {
        if (!msg) {
            return;
        }
        msg.from = msg.from || Demo.user;
        msg.type = msg.type || 'chat';

        this.sentByMe = msg.from === Demo.user;

        var brief = '',
            data = msg.data || msg.msg || '',
            name = this.sendByMe ? Demo.user : msg.from,
            targetId = this.sentByMe || msg.type !== 'chat' ? msg.to : msg.from,
            targetNode = document.getElementById('wrapper' + targetId);

        // TODO: ios/android client doesn't encodeURIComponent yet
        // if (typeof data === "string") {
        // data = decodeURIComponent(data);
        // }

        if (!this.sentByMe && msg.type === 'chat' && !targetNode) {
            Demo.strangers[targetId] = Demo.strangers[targetId] || [];
        } else if (!targetNode) {
            return;
        }
        switch (type) {
            case 'txt':
                if (!targetNode) {
                    Demo.strangers[targetId].push({msg: msg, type: 'txt'});
                } else {
                    brief = WebIM.utils.parseEmoji(this.encode(data).replace(/\n/mg, ''));
                    textMsg({
                        wrapper: targetNode,
                        name: name,
                        value: brief,
                        error: msg.error,
                        errorText: msg.errorText
                    }, this.sentByMe);
                }
                break;
            case 'emoji':
                if (!targetNode) {
                    Demo.strangers[targetId].push({msg: msg, type: 'emoji'});
                } else {
                    for (var i = 0, l = data.length; i < l; i++) {
                        brief += data[i].type === 'emoji'
                            ? '<img src="' + WebIM.utils.parseEmoji(this.encode(data[i].data)) + '" />'
                            : this.encode(data[i].data);
                    }
                    textMsg({
                        wrapper: targetNode,
                        name: name,
                        value: brief,
                        error: msg.error,
                        errorText: msg.errorText
                    }, this.sentByMe);
                }
                break;
            case 'img':
                if (!targetNode) {
                    Demo.strangers[targetId].push({msg: msg, type: 'img'});
                } else {
                    if (WebIM.config.isWindowSDK) {
                        var cur = document.getElementById('file_' + msg.id);
                        if (cur) {
                            var listenerName = 'onUpdateFileUrl' + msg.id;
                            if (Demo.api[listenerName]) {
                                Demo.api[listenerName]({url: msg.url});
                                Demo.api[listenerName] = null;
                            } else {
                                console.log('listenerName not exists:' + msg.id);
                            }
                            return;
                        } else {
                            brief = '[' + Demo.lan.image + ']';
                            imgMsg({
                                id: msg.id,
                                wrapper: targetNode,
                                name: name,
                                value: data || msg.url,
                                error: msg.error,
                                errorText: msg.errorText
                            }, this.sentByMe);
                        }
                    } else {
                        brief = '[' + Demo.lan.image + ']';
                        imgMsg({
                            id: msg.id,
                            wrapper: targetNode,
                            name: name,
                            value: data || msg.url,
                            error: msg.error,
                            errorText: msg.errorText
                        }, this.sentByMe);
                    }
                }
                break;
            case 'aud':
                if (!targetNode) {
                    Demo.strangers[targetId].push({msg: msg, type: type});
                } else {
                    if (WebIM.config.isWindowSDK) {
                        var cur = document.getElementById('file_' + msg.id);
                        if (cur) {
                            var listenerName = 'onUpdateFileUrl' + msg.id;
                            if (Demo.api[listenerName]) {
                                Demo.api[listenerName]({url: msg.url});
                                Demo.api[listenerName] = null;
                            } else {
                                console.log('listenerName not exists:' + msg.id);
                            }
                            return;
                        } else {
                            brief = '[' + Demo.lan.file + ']';
                            fileMsg({
                                id: msg.id,
                                wrapper: targetNode,
                                name: name,
                                value: data || msg.url,
                                filename: msg.filename,
                                error: msg.error,
                                errorText: msg.errorText
                            }, this.sentByMe);
                        }
                    } else {
                        brief = '[' + Demo.lan.audio + ']';
                        audioMsg({
                            wrapper: targetNode,
                            name: name,
                            value: data || msg.url,
                            length: msg.length,
                            id: msg.id,
                            error: msg.error,
                            errorText: msg.errorText
                        }, this.sentByMe);
                    }
                }
                break;
            case 'cmd':
                if (!targetNode) {
                    Demo.strangers[targetId].push({msg: msg, type: 'cmd'});
                } else {
                    brief = '[' + Demo.lan.cmd + ']';
                }
                break;
            case 'file':
                if (!targetNode) {
                    Demo.strangers[targetId].push({msg: msg, type: 'file'});
                } else {
                    if (WebIM.config.isWindowSDK) {
                        var cur = document.getElementById('file_' + msg.id);
                        if (cur) {
                            var listenerName = 'onUpdateFileUrl' + msg.id;
                            if (Demo.api[listenerName]) {
                                Demo.api[listenerName]({url: msg.url});
                                Demo.api[listenerName] = null;
                            } else {
                                console.log('listenerName not exists:' + msg.id);
                            }
                            return;
                        } else {
                            brief = '[' + Demo.lan.file + ']';
                            fileMsg({
                                id: msg.id,
                                wrapper: targetNode,
                                name: name,
                                value: data || msg.url,
                                filename: msg.filename,
                                error: msg.error,
                                errorText: msg.errorText
                            }, this.sentByMe);
                        }
                    } else {
                        brief = '[' + Demo.lan.file + ']';
                        fileMsg({
                            id: msg.id,
                            wrapper: targetNode,
                            name: name,
                            value: data || msg.url,
                            filename: msg.filename,
                            error: msg.error,
                            errorText: msg.errorText
                        }, this.sentByMe);
                    }


                }
                break;
            case 'loc':
                if (!targetNode) {
                    Demo.strangers[targetId].push({msg: msg, type: 'loc'});
                } else {
                    brief = '[' + Demo.lan.location + ']';
                    locMsg({
                        wrapper: targetNode,
                        name: name,
                        value: data || msg.addr,
                        error: msg.error,
                        errorText: msg.errorText
                    }, this.sentByMe);
                }
                break;
            case 'video':
                if (!targetNode) {
                    Demo.strangers[targetId].push({msg: msg, type: type});
                } else {
                    if (WebIM.config.isWindowSDK) {
                        var cur = document.getElementById('file_' + msg.id);
                        if (cur) {
                            var listenerName = 'onUpdateFileUrl' + msg.id;
                            if (Demo.api[listenerName]) {
                                Demo.api[listenerName]({url: msg.url});
                                Demo.api[listenerName] = null;
                            } else {
                                console.log('listenerName not exists:' + msg.id);
                            }
                            return;
                        } else {
                            brief = '[' + Demo.lan.file + ']';
                            fileMsg({
                                id: msg.id,
                                wrapper: targetNode,
                                name: name,
                                value: data || msg.url,
                                filename: msg.filename,
                                error: msg.error,
                                errorText: msg.errorText
                            }, this.sentByMe);
                        }
                    } else {
                        brief = '[' + Demo.lan.video + ']';
                        videoMsg({
                            wrapper: targetNode,
                            name: name,
                            value: data || msg.url,
                            length: msg.length,
                            id: msg.id,
                            error: msg.error,
                            errorText: msg.errorText
                        }, this.sentByMe);
                    }
                }
                break;
            default:
                break;
        }


        if (!targetNode) {
            this.render(this.node, 'stranger');
            return;
        }

        // show brief
        this.appendBrief(targetId, brief);

        if (msg.type === 'cmd') {
            return;
        }

        // show count
        switch (msg.type) {
            case 'chat':
                if (this.sentByMe) {
                    return;
                }
                var contact = document.getElementById(msg.from),
                    cate = Demo.roster[msg.from] ? 'friends' : 'strangers';

                this.addCount(msg.from, cate);
                break;
            case 'groupchat':
                var cate = msg.roomtype ? msg.roomtype : 'groups';

                this.addCount(msg.to, cate);
                break;
        }


    },

    appendBrief: function (id, value) {
        var cur = document.getElementById(id);
        cur.querySelector('em').innerHTML = value;
    },

    addCount: function (id, cate) {
        // TODO: don't handle dom directly,use react way.
        if (Demo.selectedCate !== cate) {
            var curCate = document.getElementById(cate).getElementsByTagName('i')[1];
            curCate.style.display = 'block';
            var curCateCount = curCate.getAttribute('count') / 1;
            curCateCount++;
            curCate.setAttribute('count', curCateCount);

            var cur = document.getElementById(id).getElementsByTagName('i')[0];
            var curCount = cur.getAttribute('count') / 1;
            curCount++;
            cur.setAttribute('count', curCount);
            cur.innerText = curCount > 999 ? '...' : curCount + '';
            cur.style.display = 'block';
        } else {
            if (!this.sentByMe && id !== Demo.selected) {
                var cur = document.getElementById(id).getElementsByTagName('i')[0];
                var curCount = cur.getAttribute('count') / 1;
                curCount++;
                cur.setAttribute('count', curCount);
                cur.innerText = curCount > 999 ? '...' : curCount + '';
                cur.style.display = 'block';
            }
        }

    },

    updateChatroom: function () {
        this.render(this.node, 'chatroom');
    },

    updateRoster: function () {
        this.render(this.node, 'roster');
    },

    updateGroup: function (groupId) {
        this.render(this.node, 'group');
    },

    deleteFriend: function (username) {
        Demo.conn.removeRoster({
            to: username,
            success: function () {
                Demo.conn.unsubscribed({
                    to: username
                });

                var dom = document.getElementById(username);
                dom && dom.parentNode.removeChild(dom);
            },
            error: function () {
            }
        });
    },

    changeGroupSubjectCallBack: function (id, subject) {
        var cur = document.getElementById(id);
        cur.querySelector('span').innerHTML = subject;
    },

    encode: function (str) {
        if (!str || str.length === 0) {
            return '';
        }
        var s = '';
        s = str.replace(/&amp;/g, "&");
        s = s.replace(/<(?=[^o][^)])/g, "&lt;");
        s = s.replace(/>/g, "&gt;");
        s = s.replace(/\"/g, "&quot;");
        s = s.replace(/\n/g, "<br>");
        return s;
    },
    NotifyError: function (msg) {
        Notify.error(msg);
    },
    NotifySuccess: function (msg) {
        Notify.success(msg);
    },
    scrollIntoView: function (node) {
        setTimeout(function () {
            node.scrollIntoView(true);
        }, 50);
    },
    listen: function (options) {
        for (var key in options) {
            this[key] = options[key];
        }
    },
    blacklist: Blacklist,
    pagesize: 20
};


