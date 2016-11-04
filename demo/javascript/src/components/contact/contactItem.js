var React = require("react");
var Avatar = require('../common/avatar');
var _ = require('underscore');

module.exports = React.createClass({


    getInitialState: function () {
        var me = this;

        return {
            msg: '',
            avatar: '',
            countShow: false,
        };
    },

    handleCurCateIconCount: function (count) {
        var curCate = document.getElementById(this.props.cate).getElementsByTagName('i')[1];
        var curCateCount = curCate.getAttribute('count') / 1;
        curCateCount -= count;
        curCateCount = Math.max(0, curCateCount);

        if (curCateCount > 0) {
            curCate.style.display = 'block';
        } else {
            curCateCount = 0;
            curCate.style.display = 'none';
        }
        curCate.setAttribute('count', curCateCount);
    },


    update: function () {
        if (this.refs['i']) {
            var count = this.refs['i'].getAttribute('count') / 1;
            this.handleCurCateIconCount(count);

            this.refs['i'].style.display = 'none';
            this.refs['i'].setAttribute('count', 0);
            this.refs['i'].innerText = '';
        }

        // if (this.props.id === Demo.selected) {
        //     return;
        // }

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
        } else {
            //get the last 10 messages
            if (WebIM.config.isWindowSDK) {
                console.log(document.getElementById(this.props.id).querySelector('em').innerHTML);
                if (document.getElementById(this.props.id).querySelector('em').innerHTML == '') {
                    WebIM.doQuery('{"type":"loadMoreMessages","id":"' + this.props.id + '","chatType":"singlechat"}', function success(str) {
                        //Add seperator
                    }, function failure(errCode, errMessage) {
                        Demo.api.NotifyError('getRoster:' + errCode);
                        errFn();
                    });
                }

            } else {

            }
        }

        this.props.update(Demo.selected);
    },

    render: function () {
        var className = this.props.cur === this.props.id ? ' selected' : '';

        return (
            <div id={this.props.id} className={'webim-contact-item' + className} onClick={this.update}>
                <Avatar src={this.props.src}/>
                <div className="webim-contact-info">
                    <span className="webim-contact-username">{this.props.username}</span>
                </div>
                <em></em>
                <i ref='i' className='webim-msg-prompt' style={{display: 'none'}}></i>
            </div>
        );
    }
})
;
