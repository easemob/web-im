import React, { Component } from "react"
import ReactDOM from "react-dom"
import { Icon } from "antd"
import Layout from "./Layout"
import { connect } from "react-redux"
import { I18n } from "react-redux-i18n"
import { withRouter, Route } from "react-router-dom"
import _ from "lodash"
//import ContactItem from "@/components/contact/ContactItem"
import ChatRoomActions from "@/redux/ChatRoomRedux"
import Contact from "@/containers/contact/Contact"
import Chat from "@/containers/chat/Chat"
import HeaderTab from "@/components/header/HeaderTab"
import HeaderOps from "@/components/header/HeaderOps"
import GroupActions from "@/redux/GroupRedux"
import GroupMemberActions from "@/redux/GroupMemberRedux"
import MessageActions from "@/redux/MessageRedux"
import { config } from "@/config"
import utils from "@/utils"

const { SIDER_COL_BREAK, SIDER_COL_WIDTH, SIDER_WIDTH, RIGHT_SIDER_WIDTH } = config
const { Header, Content, Footer, Sider, RightSider } = Layout

class DefaultLayout extends Component {
    constructor({ breakpoint, match }) {
        super()
        const { selectTab, selectItem = "" } = match.params

        const a = {}
        // const b = a.b.c

        // console.log(selectTab, selectItem, "-----")

        this.state = {
            collapsed: breakpoint[SIDER_COL_BREAK],
            selectTab: selectTab,
            selectItem: selectItem,
            headerTabs: [
                {
                    key: "contact",
                    name: `${I18n.t("friends")}`,
                    icon: "fontello icon-comment"
                },
                {
                    key: "group",
                    name: `${I18n.t("groups")}`,
                    icon: "fontello icon-chat"
                },
                {
                    key: "chatroom",
                    name: `${I18n.t("chatrooms")}`,
                    icon: "fontello icon-users-1"
                },
                {
                    key: "stranger",
                    name: `${I18n.t("strangers")}`,
                    icon: "fontello icon-address-book-1"
                }
            ],
            rightSiderOffset: -1 * RIGHT_SIDER_WIDTH,
            roomId: NaN,
            room: {},
            contactItems: []
        }

        this.changeItem = this.changeItem.bind(this)
        this.changeTab = this.changeTab.bind(this)
        this.handleCloseRightSiderClick = this.handleCloseRightSiderClick.bind(this)

        // throw new Error("1")
        // throw new Error("crap")
        // this.props.c = 1
        // console.log(messageList, "---")
    }

    toggle = collapsed => {
        // console.log("collapsed", collapsed)
        this.setState({
            collapsed
        })
    }

    // 切换聊天类型
    changeTab(e) {
        const { history, location } = this.props
        const { selectItem, selectTab } = this.state
        const redirectPath = "/" + [ e.key ].join("/")
        if (selectTab == e.key) return
        this.props.switchRightSider({ rightSiderOffset: 0 })
        history.push(redirectPath + location.search)
    }

    // 切换联系人
    changeItem(e) {
        console.log("changeItem", e)
        const { history, location, entities } = this.props
        const { selectItem, selectTab } = this.state
        const redirectPath = "/" + [ selectTab, e.key ].join("/")
        if (selectItem == e.key) {
            if (selectTab === "group") {
                const groupId = e.key
                if (groupId) {
                    this.props.clearUnread(groupId)
                    this.setState({ roomId: groupId })
                    const room = _.get(entities, `group.byId.${groupId}`, {})
                    this.setState({ room })
                    this.props.listGroupMemberAsync({ groupId })
                    this.props.getMutedAsync(groupId)
                    this.props.getGroupAdminAsync(groupId)
                }
            }
            return
        }

        // if (selectItem !== e.key && selectTab === 'group') {

        if (selectTab === "group") {
            const groupId = e.key
            if (groupId) {
                this.props.clearUnread(groupId)
                this.setState({ roomId: groupId })
                const room = _.get(entities, `group.byId.${groupId}`, {})
                this.setState({ room })
                this.props.listGroupMemberAsync({ groupId })
                this.props.getMutedAsync(groupId)
                this.props.getGroupAdminAsync(groupId)
            }
        }

        if (selectTab == "chatroom") {
            //quit previous chatroom
            if (selectItem) {
                this.props.quitChatRoom(selectItem)
            }

            // join chatroom
            this.props.joinChatRoom(e.key)
        }

        history.push(redirectPath + location.search)
    }

    setSelectStatus() {
        const { history, location, match } = this.props
        // console.log(location.patchname, match)
        const { selectTab, selectItem = "" } = match.params
        // console.log(match)
        this.setState({
            selectTab,
            selectItem
        })
    }

    handleCloseRightSiderClick(e) {
        e.preventDefault()
        console.log(e.target)
        this.props.switchRightSider({ rightSiderOffset: 0 })
    }

    componentDidMount() {
        // this.setSelectStatus()
    }

    componentWillReceiveProps(nextProps) {
        // console.log("componentWillReceiveProps", this.props.location.pathname, nextProps.location.pathname)
        const { breakpoint, location } = this.props
        const nextBeakpoint = nextProps.breakpoint

        // if (breakpoint[SIDER_COL_BREAK] != nextBeakpoint[SIDER_COL_BREAK]) {
        // console.log(breakpoint, "---1")

        this.toggle(nextBeakpoint[SIDER_COL_BREAK])
        // }

        if (location.pathname != nextProps.location.pathname) {
            this.props = nextProps
            // console.log("componentWillReceiveProps", location)
            this.setSelectStatus()
        }
    }

    render() {
        const { collapsed, selectTab, selectItem, headerTabs, roomId } = this.state
        const { login, rightSiderOffset, unread } = this.props
        const typeMap = { contact: "chat", group: "groupchat", chatroom: "chatroom", stranger: "stranger" }
        const hadUnread = { contact: false, group: false, chatroom: false, stranger: false }
        _.forEach(typeMap, (v, k) => {
            const m = _.get(unread, v)
            if (!_.isEmpty(m) && _.chain(m).values().sum().value() > 0 ) hadUnread[k] = true      
        })


        return (
            <Layout>
                <Header className="header">
                    <HeaderOps title={login.username}/>
                    <HeaderTab
                        collapsed={collapsed}
                        items={headerTabs}
                        selectedKeys={[ selectTab ]}
                        hadUnread={hadUnread}
                        onClick={this.changeTab}
                    />
                </Header>
                <Content className="x-layout-main">
                    <div
                        className="x-layout-sider"
                        style={{
                            // sider full display when breakpoint
                            width: collapsed ? "100%" : SIDER_WIDTH,
                            // sider display to left when breakpoint and has selectItem
                            left: selectItem && collapsed ? "-100%" : 0
                        }}
                    >
                        <Contact collapsed={false} onClick={this.changeItem} selectedKeys={[ selectItem ]} unread={_.get(unread, typeMap[selectTab], {})} />
                    </div>
                    <Content
                        className="x-layout-chat"
                        style={{
                            overflow: "scroll",
                            margin: collapsed ? "0" : `0 0 0 ${SIDER_WIDTH}px`
                        }}
                    >
                        <Route
                            path="/:selectTab/:selectItem"
                            render={props => <Chat collapsed={collapsed} {...props} />}
                        />
                    </Content>
                    <div
                        className="x-layout-right-sider"
                        style={{
                            width: `${RIGHT_SIDER_WIDTH}px`,
                            marginLeft: `${rightSiderOffset}px`
                        }}
                    >
                        <RightSider roomId={roomId} room={this.state.room} ref="rightSider"/>
                    </div>
                    {/*<Footer style={{ textAlign: "center" }}>
                     Ant Design ©2016 Created by Ant UED
                     </Footer>*/}
                </Content>
            </Layout>
        )
    }
}

export default withRouter(
    connect(
        ({ breakpoint, entities, login, common }) => ({
            breakpoint,
            entities,
            login,
            common,
            rightSiderOffset: entities.group.rightSiderOffset,
            unread: entities.unreadMessage
        }),
        dispatch => ({
            getGroupMember: id => dispatch(GroupMemberActions.getGroupMember(id)),
            listGroupMemberAsync: opt => dispatch(GroupMemberActions.listGroupMemberAsync(opt)),
            switchRightSider: ({ rightSiderOffset }) => dispatch(GroupActions.switchRightSider({ rightSiderOffset })),
            joinChatRoom: roomId => dispatch(ChatRoomActions.joinChatRoom(roomId)),
            quitChatRoom: roomId => dispatch(ChatRoomActions.quitChatRoom(roomId)),
            clearUnread: groupId => dispatch(MessageActions.clearUnread(groupId)),
            getGroups: () => dispatch(GroupActions.getGroups()),
            getChatRooms: () => dispatch(ChatRoomActions.getChatRooms()),
            getMutedAsync: groupId => dispatch(GroupMemberActions.getMutedAsync(groupId)),
            getGroupAdminAsync: groupId => dispatch(GroupMemberActions.getGroupAdminAsync(groupId))
        })
    )(DefaultLayout)
)
