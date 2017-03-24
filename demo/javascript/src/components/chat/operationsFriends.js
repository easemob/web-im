var React = require("react");
var ReactDOM = require('react-dom');

module.exports = React.createClass({

    getInitialState: function () {
        return {
            // the operations list whether show or not
            hide: true
        };
    },

    update: function () {
        this.setState({hide: !this.state.hide});
    },

    // hide when blur | bind focus event
    componentDidUpdate: function () {
        // !this.state.hide && ReactDOM.findDOMNode(this.refs['webim-operations']).focus();
    },

    // hide when blur close
    handleOnBlur: function () {
        this.setState({hide: true});
    },

    delFriend: function () {
        var value = this.props.name;

        if (!value) {
            return;
        }
        delete Demo.chatRecord[value];

        if (value == Demo.user || !Demo.roster[value]) {
            Demo.api.NotifyError(value + ' ' + Demo.lan.delFriendSelfInvalid);
            this.update();
            return;
        }
        if (WebIM.config.isWindowSDK) {
            WebIM.doQuery('{"type":"delFriend","to":"' + value + '"}',
                function success(str) {
                    alert(Demo.lan.contact_deleted);
                },
                function failure(errCode, errMessage) {
                    Demo.api.NotifyError('delFriend:' + errCode);
                });
        } else {
            Demo.conn.removeRoster({
                to: value,
                success: function () {
                    if (Demo.roster[value]) {
                        delete Demo.roster[value];
                    }

                    Demo.conn.unsubscribed({
                        to: value
                    });
                },
                error: function () {
                }
            });
        }
        Demo.selected = '';
        this.props.delFriend();
        this.update();
    },

    addToBlackList: function (e) {
        var value = this.props.name;

        if (!value) {
            return;
        }

        var value = this.props.name;
        var me = this;

        //TODO by lwz 重构
        if (WebIM.config.isWindowSDK) {
            WebIM.doQuery('{"type":"addToBlackList", "username": "' + value + '"}',
                function success(str) {
                    var list = Demo.api.bBlacklist.add(value);
                    me.setState({blacklist: list});
                    Demo.api.updateRoster();
                },
                function failure(errCode, errMessage) {
                    Demo.api.NotifyError('getRoster:' + errCode);
                });
        } else {
            var list = Demo.api.blacklist.add(value);

            Demo.conn.addToBlackList({
                list: list,
                type: 'jid',
                success: function () {
                    me.props.updateNode(null);
                },
                error: function () {
                }
            });
        }
    },


    render: function () {

        return (
            <div>
                <i ref='switch' className='webim-operations-icon font xsmaller' onClick={this.update}>M</i>
                <ul tabIndex="-1" ref="webim-operations"
                    className={'webim-operations ' + (this.state.hide ? 'hide' : '')}
                    onBlur={this.handleOnBlur}>
                    <li onClick={this.delFriend}>
                        <i className='font smallest'>C</i>
                        <span>{Demo.lan.delAFriend}</span>
                    </li>
                    <li onClick={this.addToBlackList}>
                        <i className='font smallest'>n</i>
                        <span>{Demo.lan.addToBlackList}</span>
                    </li>

                </ul>
            </div>
        );
    }
});
