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
var CryptoJS = require('crypto-js');

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
            console.log('blacklist remove error');
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
            dataGroup = list.data;
            sucFn(list.data);
        };
        Demo.conn.getGroupBlacklistNew(options);
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
            window.location.href = '#';
            Demo.conn.close('logout');
            if (type == WebIM.statusCode.WEBIM_CONNCTION_CLIENT_LOGOUT) {
                Demo.conn.errorType = type;
            }
        }
    },

    init: function () {
        Demo.selected = null;
        // Demo.user = null;
        Demo.call = null;
        Demo.roster = {};
        Demo.strangers = {};
        Demo.blacklist = {};
        Demo.selectedCate = 'friends';
        Demo.chatState.clear();
        if (Demo.currentChatroom) {
            delete Demo.chatRecord[Demo.currentChatroom];
        }
        ReactDOM.unmountComponentAtNode(this.node);
        this.render(this.node);
    },

    addToChatRecord: function (msg, type, status) {
        var data = msg.data || msg.msg || '';
        var brief = this.getBrief(data, type);
        var id = msg.id;
        this.sentByMe = msg.from === Demo.user;
        var targetId = this.sentByMe || msg.type !== 'chat' ? msg.to : msg.from;
        if (!Demo.chatRecord[targetId] || !Demo.chatRecord[targetId].messages) {
            Demo.chatRecord[targetId] = {};
            Demo.chatRecord[targetId].messages = [];
        } else if (Demo.chatRecord[targetId].messages.length >= Demo.maxChatRecordCount) {
            Demo.chatRecord[targetId].messages.shift();
        }
        Demo.chatRecord[targetId].brief = brief;
        Demo.chatRecord[targetId].briefType = type;
        Demo.chatRecord[targetId].messages[id] = {message: msg, type: type, status: status};

        Demo.conn.addToLocal(msg, type, status);
    },

    releaseChatRecord: function (targetId) {
        var targetId = targetId || Demo.selected;
        if (Demo.first) {
            // Demo.first = false;
            for (var i in Demo.chatRecord) {
                targetId = i;
                if (Demo.chatRecord[targetId] && Demo.chatRecord[targetId].messages) {
                    if (document.getElementById('wrapper' + targetId))
                        document.getElementById('wrapper' + targetId).innerHTML = '';
                    for (var i in Demo.chatRecord[targetId].messages) {
                        if (Demo.chatRecord[targetId].messages[i] == undefined)
                            continue;
                        if (!Demo.chatRecord[targetId].messages[i].read) {
                            Demo.api.appendMsg(Demo.chatRecord[targetId].messages[i].message,
                                Demo.chatRecord[targetId].messages[i].type,
                                Demo.chatRecord[targetId].messages[i].status,
                                i);
                        }
                    }
                }
            }
            return;
        }
        if (targetId) {
            if (Demo.chatRecord[targetId] && Demo.chatRecord[targetId].messages) {
                if (document.getElementById('wrapper' + targetId))
                    document.getElementById('wrapper' + targetId).innerHTML = '';
                for (var i in Demo.chatRecord[targetId].messages) {
                    if (Demo.chatRecord[targetId].messages[i] == undefined)
                        continue;
                    Demo.chatRecord[targetId].messages[i].read = true;
                    Demo.api.sendRead(Demo.chatRecord[targetId].messages[i].message);
                    Demo.api.appendMsg(Demo.chatRecord[targetId].messages[i].message,
                        Demo.chatRecord[targetId].messages[i].type,
                        Demo.chatRecord[targetId].messages[i].status,
                        i);
                }
            }
        }
    },

    sendRead: function (message) {
        // TODO: Window SDK
        if (WebIM.config.isWindowSDK) {

        }
        if (!WebIM.config.read)
            return;
        // 阅读消息时反馈一个已阅读
        var msgId = Demo.conn.getUniqueId();
        var bodyId = message.id;
        var msg = new WebIM.message('read', msgId);
        msg.set({
            id: bodyId
            , to: message.from
        });
        Demo.conn.send(msg.body);

    },

    getBrief: function (data, type) {
        var brief = '';
        switch (type) {
            case 'txt':
                brief = WebIM.utils.parseEmoji(this.encode(data).replace(/\n/mg, ''));
                break;
            case 'emoji':
                for (var i = 0, l = data.length; i < l; i++) {
                    brief += data[i].type === 'emoji'
                        ? '<img src="' + WebIM.utils.parseEmoji(this.encode(data[i].data)) + '" />'
                        : this.encode(data[i].data);
                }
                break;
            case 'img':
                brief = '[' + Demo.lan.image + ']';
                break;
            case 'aud':
                brief = '[' + Demo.lan.audio + ']';
                break;
            case 'cmd':
                brief = '[' + Demo.lan.cmd + ']';
                break;
            case 'file':
                brief = '[' + Demo.lan.file + ']';
                break;
            case 'loc':
                brief = '[' + Demo.lan.location + ']';
                break;
            case 'video':
                brief = '[' + Demo.lan.video + ']';
                break;
        }
        return brief;
    },

    appendMsg: function (msg, type, status, nid) {
        if (!msg || type === 'cmd') {
            return;
        }
        msg.from = msg.from || Demo.user;
        msg.type = msg.type || 'chat';

        this.sentByMe = msg.from === Demo.user;

        var brief = '',
            data = msg.data || msg.msg || '',
            name = this.sendByMe ? Demo.user : msg.from,
            targetId = this.sentByMe || msg.type !== 'chat' ? msg.to : msg.from;
        var targetNode = document.getElementById('wrapper' + targetId);

        var isStranger = !document.getElementById(targetId) && !document.getElementById('wrapper' + targetId);

        // TODO: ios/android client doesn't encodeURIComponent yet
        if (typeof data === "string" && WebIM.config.isWindowSDK) {
            data = decodeURIComponent(data);
        }

        if (!this.sentByMe && msg.type === 'chat' && isStranger) {
            Demo.strangers[targetId] = Demo.strangers[targetId] || [];
        } else if (isStranger) {
            return;
        }

        if (isStranger) {
            Demo.strangers[targetId].push({msg: msg, type: type});
            this.render(this.node, 'stranger');
            return;
        } else {
            brief = this.getBrief(data, type);
            if (targetNode) {
                switch (type) {
                    case 'txt':
                        textMsg({
                            wrapper: targetNode,
                            name: name,
                            value: brief,
                            error: msg.error,
                            errorText: msg.errorText,
                            id: msg.id,
                            status: status,
                            nid: nid
                        }, this.sentByMe);
                        break;
                    case 'emoji':
                        textMsg({
                            wrapper: targetNode,
                            name: name,
                            value: brief,
                            error: msg.error,
                            errorText: msg.errorText,
                            id: msg.id,
                            status: status,
                            nid: nid
                        }, this.sentByMe);
                        break;
                    case 'img':
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
                                    errorText: msg.errorText,
                                    status: status
                                }, this.sentByMe);
                            }
                        } else {
                            imgMsg({
                                id: msg.id,
                                wrapper: targetNode,
                                name: name,
                                value: data || msg.url,
                                error: msg.error,
                                errorText: msg.errorText,
                                status: status,
                                nid: nid
                            }, this.sentByMe);
                        }
                        break;
                    case 'aud':
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
                        break;
                    case 'cmd':
                        break;
                    case 'file':
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
                            var option = {
                                id: msg.id,
                                wrapper: targetNode,
                                name: name,
                                value: data || msg.url,
                                filename: msg.filename,
                                error: msg.error,
                                errorText: msg.errorText,
                                status: status,
                                nid: nid
                            };
                            if (msg.ext) {
                                option.fileSize = msg.ext.fileSize;
                            }
                            fileMsg(option, this.sentByMe);
                        }
                        break;
                    case 'loc':
                        locMsg({
                            wrapper: targetNode,
                            name: name,
                            value: data || msg.addr,
                            error: msg.error,
                            errorText: msg.errorText
                        }, this.sentByMe);
                        break;
                    case 'video':
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
                        break;
                    default:
                        break;
                }
            }
        }

        // show brief
        this.appendBrief(targetId, brief);

        if (msg.type === 'cmd') {
            return;
        }
        if (Demo.first) {
            return;
        }
        // show count
        var cate = '';
        switch (msg.type) {
            case 'chat':
                if (this.sentByMe) {
                    return;
                }
                var contact = document.getElementById(msg.from);
                cate = Demo.roster[msg.from] ? 'friends' : 'strangers';

                this.addCount(msg.from, cate);
                break;
            case 'groupchat':
                cate = msg.roomtype ? msg.roomtype : 'groups';

                this.addCount(msg.to, cate);
                break;
        }
    },

    appendBrief: function (id, value) {
        var cur = document.getElementById(id);
        if (!cur)
            return;
        cur.querySelector('em').innerHTML = value;
    },

    addCount: function (id, cate) {

        // Do not add a count to an opened chat window
        // TODO: don't handle dom directly,use react way.
        if (Demo.selectedCate !== cate) {
            // This is red dot on the cate
            var curCate = document.getElementById(cate).getElementsByTagName('i')[1];
            curCate.style.display = 'block';
            var curCateCount = curCate.getAttribute('data-count') / 1;

            // Don't increase the count of the cate if an opened item got messages
            if (Demo.chatState[cate].selected != id) {

                curCateCount++;

                // This is the red dot on the items
                var cur = document.getElementById(id).getElementsByTagName('i')[0];
                var curCount = cur.getAttribute('data-count') / 1;
                curCount++;
                cur.setAttribute('data-count', curCount);
                Demo.chatRecord[id].count = curCount;
                cur.innerText = curCount > 999 ? '...' : curCount + '';
                cur.style.display = 'block';
            }

            curCate.setAttribute('data-count', curCateCount);
            Demo.chatState[cate].count = curCateCount;

        } else {
            if (Demo.selected !== id) {
                var curCate = document.getElementById(cate).getElementsByTagName('i')[1];
                curCate.style.display = 'block';
                var curCateCount = curCate.getAttribute('data-count') / 1;
                curCateCount++;
                curCate.setAttribute('data-count', curCateCount);
                Demo.chatState[cate].count = curCateCount;
            }
            if (!this.sentByMe && id !== Demo.selected) {
                var cur = document.getElementById(id).getElementsByTagName('i')[0];
                var curCount = cur.getAttribute('data-count') / 1;
                curCount++;
                cur.setAttribute('data-count', curCount);
                Demo.chatRecord[id].count = curCount;
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


