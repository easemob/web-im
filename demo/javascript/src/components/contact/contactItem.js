var React = require("react");
var Avatar = require('../common/avatar');


module.exports = React.createClass({

    getInitialState: function () {
        var me = this;

        return {
            msg: '',
            avatar: '',
            countShow: false,
        };
    },

    handleIconCount: function (count) {
        // TODO
        var curCate = this.refs['i'];
        var curCateCount = curCate.getAttribute('count') / 1;
        curCateCount -= count;
        // curCateCount = Math.max(0, curCateCount);

        if (curCateCount > 0) {
            curCate.style.display = 'block';
        } else {
            curCateCount = 0;
            curCate.style.display = 'none';
        }
        // this.setState({
        //     countShow: curCateCount > 0
        // })
    },

    // blacklist
    addToBlackList: function (e) {
        var value = this.props.id;
        var me = this;

        // todo
        var flen = Demo.friends.length;
        for (var i = 0; i < flen; i++) {
            var f = Demo.friends[i];
            if (f.name == value) {
                Demo.blacklist[f.name] = f;
                break;
            }
        }

        Demo.conn.addToBlackList({
            list: Demo.blacklist,
            type: 'jid',
            success: function () {
                // no good
                Demo.selected = null;
                me.update();
            },
            error: function () {
            }
        });

        event.preventDefault();
        event.stopPropagation();
    },

    update: function () {
        var count = this.refs['i'].getAttribute('count') / 1;
        this.handleIconCount(count);

        this.refs['i'].style.display = 'none';
        this.refs['i'].setAttribute('count', 0);
        this.refs['i'].innerText = '';

        if (this.props.id === Demo.selected) {
            return;
        }

        if (Demo.selectedCate !== 'friends' && Demo.selectedCate !== 'strangers') {
            Demo.selected = this.props.id;
        } else {
            Demo.selected = this.props.username;
        }

        // quit previous chatroom
        if (Demo.currentChatroom) {
            document.getElementById('wrapper' + Demo.currentChatroom).innerHTML = '';
            document.getElementById(Demo.currentChatroom).querySelector('em').innerHTML = '';
            if (WebIM.config.isWindowSDK) {
                WebIM.doQuery('{"type":"quitChatroom","id":"' + Demo.currentChatroom + '"}',
                    function success(str) {
                        //do nothing
                    },
                    function failure(errCode, errMessage) {
                        Demo.api.NotifyError('update currentChatroom:' + errCode);
                    });
            } else {
                Demo.conn.quitChatRoom({
                    roomId: Demo.currentChatroom
                });
            }

            Demo.currentChatroom = null;
        }

        if (Demo.selectedCate === 'chatrooms') {

            document.getElementById('wrapper' + this.props.id).innerHTML = '';
            document.getElementById(this.props.id).querySelector('em').innerHTML = '';

            // join chatroom
            if (WebIM.config.isWindowSDK) {
                WebIM.doQuery('{"type":"joinChatroom","id":"' + this.props.id + '"}',
                    function success(str) {
                        Demo.currentChatroom = str;
                    },
                    function failure(errCode, errMessage) {
                        Demo.api.NotifyError('update chatrooms:' + errCode);
                    });
            } else {
                Demo.conn.joinChatRoom({
                    roomId: this.props.id
                });
            }
        }

        this.props.update(Demo.selected);
    }
    ,

    render: function () {
        var className = this.props.cur === this.props.id ? ' selected' : '';

        return (
            <div id={this.props.id} className={'webim-contact-item' + className} onClick={this.update}>
                <Avatar src={this.props.src}/>
                <div className="webim-contact-info">
                    <span className="webim-contact-username">{this.props.username}</span>
                    <div className="webim-contact-handlers">
                        <i ref="i2" title="Add to blacklist" className="webim-leftbar-icon font smaller"
                           style={{display: Demo.selectedCate != 'friends' ? 'none' : ''}}
                           onClick={this.addToBlackList}>A</i>
                    </div>
                </div>
                <em></em>
                <i ref='i' className='webim-msg-prompt' count='0' style={{display: 'none'}}></i>
            </div>
        );
    }
})
;
