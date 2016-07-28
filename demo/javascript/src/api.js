var textMsg = require('./components/message/txt');
var imgMsg = require('./components/message/img');
var fileMsg = require('./components/message/file');
var locMsg = require('./components/message/loc');
var audioMsg = require('./components/message/audio');

module.exports = {
    log: function () {
        console.log(arguments);
    },

    appendMsg: function ( msg, type ) {
        if ( !msg ) {
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

        if ( msg.type !== 'chat' && !targetNode ) {
            return;
        }

        
        switch ( type ) {
            case 'txt':
                brief = WebIM.utils.parseEmotions(this.encode(data).replace(/\n/mg, ''));
                textMsg({
                    wrapper: targetNode,
                    name: name,
                    value: brief,
                }, this.sentByMe);
                break;
            case 'emotion':
                for ( var i = 0, l = data.length; i < l; i++ ) {
                    brief += data[i].type === 'emotion' 
                        ? '<img src="' + WebIM.utils.parseEmotions(this.encode(data[i].data)) +'" />'
                        : this.encode(data[i].data);
                }
                textMsg({
                    wrapper: targetNode,
                    name: name,
                    value: brief,
                }, this.sentByMe);
                break;
            case 'img':
                brief = '[图片]';
                imgMsg({
                    wrapper: targetNode,
                    name: name,
                    value: data || msg.url,
                }, this.sentByMe);
                break;
            case 'aud':
                brief = '[音频]';
                audioMsg({
                    wrapper: targetNode,
                    name: name,
                    value: data || msg.url,
                    length: msg.length,
                    id: msg.id
                }, this.sentByMe);
                break;
            case 'cmd':
                brief = '[命令消息]';
                log(msg);
                break;
            case 'file':
                brief = '[文件]';
                fileMsg({
                    wrapper: targetNode,
                    name: name,
                    value: data || msg.url,
                    filename: msg.filename
                }, this.sentByMe);
                break;
            case 'loc':
                brief = '[位置]';
                locMsg({
                    wrapper: targetNode,
                    name: name,
                    value: data || msg.addr
                }, this.sentByMe);
                break;
            case 'video':
                brief = '[视频]';
                break;
            default: break;
        };

        // show brief
        this.appendBrief( targetId, brief);

        if ( msg.type === 'cmd' ) {
            return;
        }

        // show count
        switch ( msg.type ) {
            case 'chat':
                if ( this.sentByMe ) { return; }
                var contact = document.getElementById(msg.from),
                    cate = contact ? 'friends' : 'strangers';
                
                this.addCount(msg.from, cate);
                break;
            case 'groupchat':
                var cate = msg.roomtype ? 'chatrooms' : 'groups';

                this.addCount(msg.to, cate);
                break;
        };
        
    },

    appendBrief: function ( id, value ) {
        var cur = document.getElementById(id);
        cur.querySelector('em').innerHTML = value;
    },

    addCount: function ( id, cate ) {
        if ( Demo.selectedCate !== cate ) {
            var curCate = document.getElementById(cate).getElementsByTagName('i')[1];
            curCate.style.display = 'block';

            var cur = document.getElementById(id).querySelector('i');
            var curCount = cur.getAttribute('count') / 1;
            curCount++;
            cur.setAttribute('count', curCount);
            cur.innerText = curCount > 999 ? '...' : curCount + '';
            cur.style.display = 'block';
        } else {
            if ( !this.sentByMe && id !== Demo.selected ) {
                var cur = document.getElementById(id).querySelector('i');
                var curCount = cur.getAttribute('count') / 1;
                curCount++;
                cur.setAttribute('count', curCount);
                cur.innerText = curCount > 999 ? '...' : curCount + '';
                cur.style.display = 'block';
            }    
        }

    },

    addContact: function () {
    },

    encode: function ( str ) {
        if ( !str || str.length === 0 ) {
            return '';
        }
        var s = '';
        s = str.replace(/&amp;/g, "&");
        s = s.replace(/<(?=[^o][^)])/g, "&lt;");
        s = s.replace(/>/g, "&gt;");
        s = s.replace(/\"/g, "&quot;");
        s = s.replace(/\n/g, "<br>");
        return s;
    }
};
