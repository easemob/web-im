var React = require("react");
var ReactDOM = require('react-dom');

var componentsNode = document.getElementById('components');
var dom = document.createElement('div');
componentsNode.appendChild(dom);

var UI = require('../common/webim-demo');
var Button = UI.Button;
var Input = UI.Input;

var JoinPublicGroup = React.createClass({

    getInitialState: function () {

        return {
            groupDetail: false,
            gid: null,
            cursor: null,
            groups: [],
            loading: false,
            bodyLoading: false,
            groupName: '',
            owner: '',
            description: '',
            membersOnly: '',
            inputValue: ''
        };
    },

    onInputChange: function(e){
        this.setState({
            inputValue: e.target.value
        });
    },

    search: function () {

        var value = this.state.inputValue;

        this.showDetail(value);
    },

    joinGroup: function(){
        var appKey = WebIM.config.appkey,
            orgName = appKey.split('#')[0],
            appName = appKey.split('#')[1],
            uri = WebIM.utils.parseUri(),
            username = uri.username,
            token = WebIM.utils.getCookie()['webim_' + username];
        var gid = this.state.gid,
            options = {
                url: WebIM.config.apiURL + '/' + orgName + '/' + appName + '/' + 'chatgroups' + '/' + gid + '/' + 'apply',
                type: 'POST',
                dataType: 'json',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                success: function(resp){
                    console.log(resp);
                    Demo.api.NotifySuccess('入群申请发送成功!');
                },
                error: function(e){
                    if(e.type == 17){
                        Demo.api.NotifyError('您已经在这个群组!');
                    }
                }
            };
        WebIM.utils.ajax(options);
        console.log('Join Group ' + gid + '!');
    },

    componentDidMount: function(){
        this.getGroupList();
    },

    onScroll: function(){
        if(this.state.groupDetail)
            return;
        var groups = this.refs.groupList,
            scrollTop = groups.scrollTop,
            count = this.state.groups.length;
        if(scrollTop - 174 < 0)
            return;
        else if((scrollTop - 174) / 300 == (count / 10) - 1){
            this.setState({
                loading: true
            });
            this.getGroupList();
        }

        // console.log('Scroll Top: ', groups.scrollTop);
    },

    getGroupList: function(){
        var appKey = WebIM.config.appkey,
            orgName = appKey.split('#')[0],
            appName = appKey.split('#')[1],
            uri = WebIM.utils.parseUri(),
            username = uri.username,
            token = WebIM.utils.getCookie()['webim_' + username];

        var requestData = [];
        requestData['limit'] = 20;
        this.state.cursor && (requestData['cursor'] = this.state.cursor);
        var options = {
            url: WebIM.config.apiURL + '/' + orgName + '/' + appName + '/publicchatgroups',
            type: 'GET',
            dataType: 'json',
            data: requestData,
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            success: function (resp) {
                var groupData = resp.data,
                    groups = this.state.groups;
                for(var i in groupData){
                    groups.push(<li className="webim-blacklist-item"
                                    data-gid={groupData[i].groupid}
                                    key={groupData[i].groupid}
                                    onClick={this.showDetail.bind(this, groupData[i].groupid)}>
                                    {groupData[i].groupname}
                                    <i className="webim-leftbar-icon font smaller">F</i>
                                </li>);
                }
                this.setState({
                    cursor: resp.cursor,
                    groups: groups,
                    loading: false
                });
            }.bind(this),
            error: function (e) {

            }
        }

        WebIM.utils.ajax(options);
    },

    close: function () {
        typeof this.props.onClose === 'function' && this.props.onClose();
    },

    backToList: function(){
        this.setState({groupDetail: false});
    },

    showDetail:function(gid){
        this.setState({
            bodyLoading: true
        });
        var appKey = WebIM.config.appkey,
            orgName = appKey.split('#')[0],
            appName = appKey.split('#')[1],
            uri = WebIM.utils.parseUri(),
            username = uri.username,
            token = WebIM.utils.getCookie()['webim_' + username];

        var options = {
            url: WebIM.config.apiURL + '/' + orgName + '/' + appName + '/chatgroups/' + gid,
            type: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            success: function(resp){
                console.log('groupDetail: ', resp);
                var groupName = resp.data[0].name,
                    desc = resp.data[0].description,
                    owner = '',
                    affiliations = resp.data[0].affiliations,
                    membersOnly = resp.data[0].membersonly;

                for(var i in affiliations){
                    if(affiliations[i].owner){
                        owner = affiliations[i].owner;
                        break;
                    }
                }

                this.setState({
                    groupName: groupName,
                    description: desc,
                    owner: owner,
                    groupDetail: true,
                    bodyLoading: false,
                    gid: gid,
                    membersOnly: membersOnly
                });
            }.bind(this),
            error: function(){

            }.bind(this)
        };
        WebIM.utils.ajax(options);
    },

    render: function () {

        var groups = this.state.groups;

        return (
            <div className='webim-friend-options'>
                <div ref='layer' className='webim-layer'></div>
                <div className='webim-dialog'>
                    <h3>{Demo.lan.joinPublicGroup}</h3>
                    <div ref='content'>
                        <Input defaultFocus='true' placeholder={Demo.lan.groupSubject} onChange={this.onInputChange}/>
                        <Button text={Demo.lan.search} onClick={this.search} className='webim-dialog-button-search'/>
                    </div>
                    <div className="webim-dialog-body" onScroll={this.onScroll} ref='groupList'>
                        <div ref='loading' className={'webim-body-loading ' + (this.state.bodyLoading ? '' : 'hide')}>
                            <img src='demo/images/loading.gif'/>
                        </div>
                        <ul className={this.state.groupDetail?"hide":"webim-blacklist-wrapper"}>
                            {groups}
                        </ul>
                        <div ref='loading' className={'webim-contact-loading ' + (this.state.loading ? '' : 'hide')}>
                            <img src='demo/images/loading.gif'/>
                        </div>
                        <div className={!this.state.groupDetail?"hide":"webim-dialog-body-detail"}>
                            <span className="title">群名称</span>
                            <span className="content">{this.state.groupName || '[群名称未设置]'}</span>
                        </div>
                        <div className={!this.state.groupDetail?"hide":"webim-dialog-body-detail"}>
                            <span className="title">群主</span>
                            <span className="content">{this.state.owner || '[群主未设置]'}</span>
                        </div>
                        <div className={!this.state.groupDetail?"hide":"webim-dialog-body-detail"}>
                            <span className="title">群简介</span>
                            <span className="content">{this.state.description || '[群简介未设置]'}</span>
                        </div>
                        <div className={!this.state.groupDetail?"hide":"webim-dialog-body-detail"}>
                            <span className="title">是否需要审批</span>
                            <span className="content">{this.state.membersOnly ? '[是]' : '否'}</span>
                        </div>
                    </div>
                    <div className="webim-dialog-footer">
                        <div className={!this.state.groupDetail?"hide":"webim-group-back"} onClick={this.backToList}>
                            <span>&crarr;</span>
                        </div>
                        <Button text={Demo.lan.join} onClick={this.joinGroup} className={!this.state.groupDetail?"hide":"webim-dialog-button"}/>
                    </div>
                    <span className='font' onClick={this.close}>A</span>
                </div>
            </div>
        );
    }
});

module.exports = {
    show: function () {
        ReactDOM.render(
            <JoinPublicGroup onClose={this.close}/>,
            dom
        );
    },

    close: function () {
        ReactDOM.unmountComponentAtNode(dom);
    }
};
