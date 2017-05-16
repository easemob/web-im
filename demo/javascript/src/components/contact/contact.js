var React = require("react");
var Item = require('./contactItem');


module.exports = React.createClass({

    getInitialState: function () {
        var me = this;

        return {
            src: 'demo/images/group_user.png'
        };
    },

    componentDidUpdate: function () {
        this.refs.contactContainer.scrollTop = Demo.chatState[Demo.selectedCate].scroll;
    },

    update: function (id) {
        this.props.updateNode(id);
    },

    onscroll: function () {
        var scrollTop = this.refs.contactContainer.scrollTop;
        // var scollTopNum = scrollTop / 60;
        // Demo.scroll[Demo.selectedCate] = scrollTop;
        Demo.chatState[Demo.selectedCate].scroll = scrollTop;
        if ((scrollTop / 60 + 10) == this.props[Demo.selectedCate].length) {
            this.props.getChatroom();
        }
    },

    getBrief: function (id) {
      if(Demo.chatRecord[id] && Demo.chatRecord[id].brief){
          return Demo.chatRecord[id].brief;
      }
    },


    render: function () {
        var f = [],
            g = [],
            s = [],
            c = [];

        for (var i = 0; i < this.props.friends.length; i++) {
            if (this.props.friends[i].name in this.props.blacklist) {
                continue;
            }
            f.push(<Item id={this.props.friends[i].name} cate='friends' key={this.props.friends[i].name} username={this.props.friends[i].name}
                         update={this.update} cur={this.props.curNode} brief={this.getBrief(this.props.friends[i].name)}/>);
        }

        for (var i = 0; i < this.props.groups.length; i++) {
            g.push(<Item id={this.props.groups[i].roomId} cate='groups' key={this.props.groups[i].roomId} username={this.props.groups[i].name}
                         update={this.update} cur={this.props.curNode} src={this.state.src} brief={this.getBrief(this.props.groups[i].roomId)}/>);
        }

        for (var i = 0; i < this.props.chatrooms.length; i++) {
            c.push(<Item id={this.props.chatrooms[i].id} cate='chatrooms' key={this.props.chatrooms[i].id}
                         username={this.props.chatrooms[i].name} update={this.update} cur={this.props.curNode}
                         src={this.state.src} brief={this.getBrief(this.props.chatrooms[i].id)}/>);
        }

        for (var i = 0; i < this.props.strangers.length; i++) {
            s.push(<Item id={this.props.strangers[i].name} cate='strangers' key={this.props.strangers[i].name}
                         username={this.props.strangers[i].name} update={this.update} cur={this.props.curNode}
                            brief={this.getBrief(this.props.strangers[i].name)}/>);
        }

        return (
            <div ref='contactContainer' className='webim-contact-wrapper' onScroll={this.onscroll}>
                <div className={this.props.cur === 'friend' ? '' : ' hide'}>{f}</div>
                <div className={this.props.cur === 'group' ? '' : ' hide'}>{g}</div>
                <div className={this.props.cur === 'chatroom' ? '' : ' hide'}>{c}</div>
                <div className={this.props.cur === 'stranger' ? '' : ' hide'}>{s}</div>
                <div ref='loading' className={'webim-contact-loading ' + (this.props.loading ? '' : 'hide')}>
                    <img src='demo/images/loading.gif'/>
                </div>
            </div>
        );
    }
});
