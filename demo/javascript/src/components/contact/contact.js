var React = require("react");
var Item = require('./contactItem');


module.exports = React.createClass({

    getInitialState: function () {
        var me = this;

        return {
            src: 'demo/images/group_user.png'
        };
    },

    update: function ( id ) {
        this.props.updateNode(id);
    },

    render: function () {
        var f = [],
            g = [],
            s = [],
            c = [];

        for ( var i = 0; i < this.props.friends.length; i++ ) {
            f.push(<Item id={this.props.friends[i].name} cate='friends' key={i} username={this.props.friends[i].name} update={this.update} cur={this.props.curNode} />);
        }

        for ( var i = 0; i < this.props.groups.length; i++ ) {
            g.push(<Item id={this.props.groups[i].roomId} cate='groups' key={i} username={this.props.groups[i].name} update={this.update} cur={this.props.curNode} src={this.state.src} />);
        }

        for ( var i = 0; i < this.props.chatrooms.length; i++ ) {
            c.push(<Item id={this.props.chatrooms[i].id} cate='chatrooms' key={i} username={this.props.chatrooms[i].name} update={this.update} cur={this.props.curNode} src={this.state.src} />);
        }

        for ( var i = 0; i < this.props.strangers.length; i++ ) {
            s.push(<Item id={this.props.strangers[i].name} cate='strangers' key={i} username={this.props.strangers[i].name} update={this.update} cur={this.props.curNode} />);
        }

        return (
            <div className='webim-contact-wrapper'>
                <div className={this.props.cur === 'friend' ? '' : ' hide'}>{f}</div>
                <div className={this.props.cur === 'group' ? '' : ' hide'}>{g}</div>
                <div className={this.props.cur === 'chatroom' ? '' : ' hide'}>{c}</div>
                <div className={this.props.cur === 'stranger' ? '' : ' hide'}>{s}</div>
            </div>
        );
    }
});
