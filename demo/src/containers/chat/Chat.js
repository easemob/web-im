import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { I18n } from "react-redux-i18n"
import _ from "lodash"
import { Button, Row, Form, Input, Icon, Dropdown, Menu } from "antd"
import { config } from "@/config"
import ListItem from "@/components/list/ListItem"
import ChatMessage from "@/components/chat/ChatMessage"
import ChatEmoji from "@/components/chat/ChatEmoji"
import styles from "./style/index.less"
import LoginActions from "@/redux/LoginRedux"
import MessageActions from "@/redux/MessageRedux"
import GroupActions from "@/redux/GroupRedux"
import GroupMemberActions from "@/redux/GroupMemberRedux"
import StrangerActions from "@/redux/StrangerRedux"
import RosterActions from "@/redux/RosterRedux"
import BlacklistActions from "@/redux/BlacklistRedux"
import WebIM from "@/config/WebIM"
import { message } from "antd"
import { history } from "@/utils"
import getTabMessages from "@/selectors/ChatSelector"
import RTCChannel from "@/components/common/rtcChannel"


const { TextArea } = Input
const FormItem = Form.Item

const chatType = {
    contact: "chat",
    group: "groupchat",
    chatroom: "chatroom",
    stranger: "stranger"
}

class Chat extends React.Component {
    input = null // eslint-disable-line
    image = null // eslint-disable-line
    timer = null

    constructor({ match }) {
        super()
        const { selectTab, selectItem = "" } = match.params
        this.state = {
            selectTab,
            selectItem,
            value: ""
        }
        this.handleSend = this.handleSend.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.pictureChange = this.pictureChange.bind(this)
        this.fileChange = this.fileChange.bind(this)
        this.handleEmojiSelect = this.handleEmojiSelect.bind(this)
        this.handleEmojiCancel = this.handleEmojiCancel.bind(this)
        this.handleKey = this.handleKey.bind(this)
        this.handleRightIconClick = this.handleRightIconClick.bind(this)
        this.onMenuContactClick = this.onMenuContactClick.bind(this)

        //console.log("---chat.js--")
        //const a = {}
        // const b = a.b.c
        //console.log("-----")

        // throw new Error("1")
    }

    scollBottom() {
        setTimeout(() => {
            const dom = this.refs["x-chat-content"]
            if (!ReactDOM.findDOMNode(dom)) return
            dom.scrollTop = dom.scrollHeight
        }, 0)
    }

    pictureChange(e) {
        const { match } = this.props
        const { selectItem, selectTab } = match.params
        const isRoom = chatType[selectTab] == "chatroom" || chatType[selectTab] == "groupchat"

        // console.log(e, e.target)
        let file = WebIM.utils.getFileUrl(e.target)
        console.log(file)

        if (!file.filename) {
            this.image.value = null
            return false
        }

        if (!config.imgType[file.filetype.toLowerCase()]) {
            this.image.value = null
            // todo i18n
            return message.error(`${I18n.t("invalidType")}: ${file.filetype}`, 1)
        }

        this.props.sendImgMessage(chatType[selectTab], selectItem, { isRoom }, file, () => {
            this.image.value = null
        })
        //
    }

    fileChange(e) {
        const { match } = this.props
        const { selectItem, selectTab } = match.params
        const isRoom = chatType[selectTab] == "chatroom" || chatType[selectTab] == "groupchat"

        // console.log(e, e.target)
        let file = WebIM.utils.getFileUrl(e.target)
        console.log(file)

        if (!file.filename) {
            this.image.value = null
            return false
        }

        this.props.sendFileMessage(chatType[selectTab], selectItem, { isRoom }, file, () => {
            this.image.value = null
        })
    }

    handleEmojiSelect(v) {
        this.setState({
            value: (this.state.value || "") + v.key
        })
        this.input.focus()
    }

    handleEmojiCancel() {
        if (!this.state.value) return
        const arr = this.state.value.split("")
        const len = arr.length
        let newValue = ""

        if (arr[len - 1] != "]") {
            arr.pop()
            newValue = arr.join("")
        } else {
            const index = arr.lastIndexOf("[")
            newValue = arr.splice(0, index).join("")
        }

        this.setState({
            value: newValue
        })
    }

    handleChange(e) {
        // 场景1：正常+ -
        // 场景2：从中间位置+ - -> 如果删除一个字符后字符串匹配，则非中间位置
        // 场景3：删除操作可以从textInput直接编辑，适应于以上情况
        const v = e.target.value
        const splitValue = this.state.value ? this.state.value.split("") : []
        splitValue.pop()
        if (v == splitValue.join("")) {
            this.handleEmojiCancel()
        } else {
            this.setState({
                value: v
            })
        }
    }

    handleSend(e) {
        // console.log(this.state.value)
        const {
            match,
            message
            // form: { getFieldDecorator, validateFieldsAndScroll }
        } = this.props
        const { selectItem, selectTab } = match.params
        const { value } = this.state
        if (!value) return
        this.props.sendTxtMessage(chatType[selectTab], selectItem, {
            msg: value
        })
        this.emitEmpty()
    }

    emitEmpty() {
        this.setState({
            value: ""
            // height: 34
        })
        this.input.value = ""
        this.input.focus()
    }

    handleKey(e) {
        if (e.keyCode == 8 || e.keycode == 46) {
            this.handleEmojiCancel()
        }
    }

    /**
     * 右上角按钮点击事件
     *
     * @memberof Chat
     */
    handleRightIconClick() {
        const { selectTab } = this.state
        if (selectTab === "group") {
            // 显示群组侧边栏
            const rightSiderOffset = -1 * config.RIGHT_SIDER_WIDTH
            this.props.switchRightSider({ rightSiderOffset })
        }
    }

    renderContactMenu(selectTab) {
        let tabs = null
        if (selectTab == "contact") {
            tabs = [
                [ "0", `${I18n.t("block")}`, "iconfont icon-circle-minus" ],
                [ "1", `${I18n.t("delAFriend")}`, "iconfont icon-trash" ]
            ]
        } else {
            // stranger
            tabs = [
                [ "2", `${I18n.t("addFriend")}`, "anticon anticon-user-add" ],
                [ "3", `${I18n.t("delete")}`, "iconfont icon-trash" ]
            ]
        }

        const tabsItem = tabs.map(([ key, name, icon ]) =>
            <Menu.Item key={key}>
                <i className={icon} style={{ fontSize: 20, marginRight: 12, verticalAlign: "middle" }}/>
                <span>
                    <span>
                        {name}
                    </span>
                </span>
            </Menu.Item>
        )
        const menuSettings = (
            <Menu className="x-header-ops__dropmenu" onClick={this.onMenuContactClick}>
                {tabsItem}
            </Menu>
        )

        return menuSettings
    }

    onMenuContactClick({ key }) {
        const { match } = this.props
        const { selectItem, selectTab } = match.params
        const search = history.location.search
        switch (key) {
        case "0":
            // 屏蔽好友
            this.props.doAddBlacklist(selectItem)
            history.push("/contact" + search)
            break
        case "1":
            // 删除好友
            this.props.removeContact(selectItem)
            break
        case "2":
            // 加为好友
            this.props.addContact(selectItem)
            message.success(`${I18n.t("addFriendMessage")}`)
            break
        case "3":
            // 删除
            this.props.deleteStranger(selectItem)
            history.push("/stranger" + search)
            break
        }
    }

    onClearMessage = () => {
        const { selectItem, selectTab } = _.get(this.props, [ "match", "params" ], {})
        console.log(selectItem, selectTab)
        const chatTypes = { "contact": "chat", "group": "groupchat", "chatroom": "chatroom", "stranger": "stranger" }
        const chatType = chatTypes[selectTab]
        this.props.clearMessage(chatType, selectItem)
    }

    componentWillReceiveProps(nextProps) {
        // setTimeout(this.scollBottom, 0)
        // this.scollBottom()
    }

    componentDidUpdate() {
        this.scollBottom()
    }

    /**
     * componentDidMount
     * 
     * @memberof Chat
     * 
     * Note: get group members, muted members and group admins when in a group.
     * Especially recommend get muted members here. 
     * Because, it will check current user in or not in muted list when sending a group message.
     */
    componentDidMount() {
        this.scollBottom()
        if (WebIM.config.isWebRTC && WebIM.WebRTC) {
            this.initWebRTC()
            this.channel = new RTCChannel(this.refs.rtcWrapper)
        }        
    }

    channel = null
    rtcTimeoutID = null

    initWebRTC() {

        if (WebIM.call) {
            return
        }

        var me = this

        WebIM.call = new WebIM.WebRTC.Call({
            connection: WebIM.conn,

            mediaStreamConstaints: {
                audio: true,
                video: true
            },

            listener: {
                onOtherUserOpenVoice: function (from, opened) {
                    console.log("from open:", opened, " voice .", from)
                },
                onOtherUserOpenVideo: function (from, opened) {
                    console.log("from open:", opened, " voideo .", from)
                },
                onAcceptCall: function (from, options, enableVoice, enableVideo) {
                    console.log("onAcceptCall", from, options, enableVoice, enableVideo)
                },
                onGotRemoteStream: function (stream, streamType) {
                    console.log("onGotRemoteStream")
                    me.channel.setRemote(stream, streamType)
                },
                onGotLocalStream: function (stream, streamType) {
                    console.log("onGotLocalStream ", "Stream Type: ", streamType)
                    me.channel.setLocal(stream, streamType)
                },
                onRinging: function (caller, streamType) {
                    console.log("onRinging", caller)
                    me.channel.ringing(caller, streamType)
                },
                onTermCall: function (reason) {
                    //"ok"      -> 'HANGUP'     "success" -> 'HANGUP'   "timeout"          -> 'NORESPONSE'
                    //"decline" -> 'REJECT'     "busy"    -> 'BUSY'     "failed-transport" -> 'FAIL'
                    // TODO reason undefine if reason is busy
                    console.log("onTermCall")
                    if (reason && (reason == "busy" || reason == "BUSY")) {
                        message.error("Target is busy. Try it later.")
                    }
                    if (reason && (reason == "timeout" || reason == "NORESPONSE")) {
                        message.error("Target no response. Try it later.")
                    }
                    if (reason && (reason == "decline" || reason == "REJECT")) {
                        message.error("Target reject.")
                    }
                    if (reason && (reason == "failed-transport" || reason == "FAIL")) {
                        message.error("Call failed. Try it later.")
                    }
                    if (reason && (reason == "ok" || reason == "success" || reason == "HANGUP")) {
                        message.success("Target hangup. ")
                    }


                    WebIM.call.caller = ""
                    WebIM.call.callee = ""
                    me.channel.close()
                },
                onIceConnectionStateChange: function (iceState) {
                    console.log("onIceConnectionStateChange")
                    // checking
                    // connected completed
                    // disconnected failed
                    // closed
                    // console.log('onIceConnectionStateChange', iceState);
                    if (iceState == "disconnected") {
                        if (!me.rtcTimeoutID) {
                            //console.warn("Warn. disconnect. notify offline");

                            me.rtcTimeoutID = setTimeout(function () {
                                if (!(WebIM.call.pattern && WebIM.call.pattern.hangup)) {
                                    message.success("Target is offline")
                                    var closeButton = document.getElementById("webrtc_close")
                                    closeButton && closeButton.click()
                                }
                            }, 10000)
                        }
                    } else if (iceState == "connected") {
                        if (me.rtcTimeoutID) {
                            clearTimeout(me.rtcTimeoutID)
                            me.rtcTimeoutID = null
                        }
                    }
                },
                onError: function (e) {
                    if (e && e.message) {
                        var close = false
                        switch (e.message) {
                        case "CALLLING_EACH_OTHER_AT_THE_SAME_TIME":
                            e.message = "Target is calling. Please try again later."
                            close = true
                            break
                        case "TARGET_OFFLINE":
                            e.message = "Target is offline."
                            break
                        }
                        if (close) {
                            var closeButton = document.getElementById("webrtc_close")
                            closeButton && closeButton.click()
                        }
                    }
                    message.error(e && e.message ? e.message : "An error occured when calling webrtc")
                }
            }
        })

    }

    componentWillUnmount() {
        if (this.timer) clearTimeout(this.timer)
    }

    callVideo = () => {
        const { selectItem } = _.get(this.props, [ "match", "params" ], {})
        console.log("sendWrapper::callVideo", WebIM.conn.context.userId, selectItem)
        WebIM.call.caller = WebIM.conn.context.userId
        WebIM.call.makeVideoCall(selectItem)
    }

    callVoice = () => {
        const { selectItem } = _.get(this.props, [ "match", "params" ], {})
        console.log("sendWrapper::callVoice", WebIM.conn.context.userId, selectItem)
        WebIM.call.caller = WebIM.conn.context.userId
        WebIM.call.makeVoiceCall(selectItem)
    }

    handleScroll = (e) => {
        if (e.target.scrollTop == 0) {
            const { selectItem, selectTab } = _.get(this.props, [ "match", "params" ], {})
            const chatTypes = { "contact": "chat", "group": "groupchat", "chatroom": "chatroom", "stranger": "stranger" }
            const chatType = chatTypes[selectTab]
            // TODO: 暂时移除滚动查看更多消息
            //this.props.fetchMessage(selectItem, chatType, this.props.messageList.length - 1)
        }
    }

    render() {
        const {
            collapsed,
            match,
            history,
            location,
            messageList,
        } = this.props

        const { selectItem, selectTab } = match.params
        // console.log(collapsed, selectTab, selectItem)

        const back = () => {
            const redirectPath = "/" + [ selectTab ].join("/") + location.search
            history.push(redirectPath)
        }

        let name = selectItem
        let webrtcButtons = []
        if (WebIM.config.isWebRTC && selectTab === "contact") {
            // webrtc video button
            webrtcButtons.push(<label key="video" htmlFor="clearMessage" className="x-chat-ops-icon ib"
                onClick={this.callVideo}>
                <i className="icon iconfont icon-camera-video"></i>
            </label>)
            // webrtc audio button
            webrtcButtons.push(<label key="audio" htmlFor="clearMessage" className="x-chat-ops-icon ib"
                onClick={this.callVoice}>
                <i className="icon iconfont icon-mic"></i>
            </label>)
        }
        return (
            <div className="x-chat">
                <div className="x-list-item x-chat-header">
                    <div className="fl">
                        {collapsed
                            ? <Icon
                                type="arrow-left"
                                onClick={back}
                                style={{
                                    cursor: "pointer",
                                    fontSize: 20,
                                    verticalAlign: "middle",
                                    marginRight: 10
                                }}
                            />
                            : null}
                        {name}
                    </div>
                    <div className="fr">
                        <span style={{ color: "#8798a4", cursor: "pointer" }}>
                            {selectTab === "contact" || selectTab === "stranger"
                                ? <Dropdown
                                    overlay={this.renderContactMenu(selectTab)}
                                    placement="bottomRight"
                                    trigger={[ "click" ]}
                                >
                                    <Icon type="ellipsis"/>
                                </Dropdown>
                                : <Icon type="ellipsis" onClick={this.handleRightIconClick}/>}
                        </span>
                    </div>
                </div>
                <div className="x-chat-content" ref="x-chat-content" onScroll={this.handleScroll}>
                    {/* fixed bug of messageList.map(...) */}
                    {_.map(messageList, message => <ChatMessage key={message.id} {...message} />)}
                </div>
                <div className="x-chat-footer">
                    <div className="x-list-item x-chat-ops">
                        {/* emoji */}
                        <div className="x-chat-ops-icon ib">
                            <ChatEmoji onSelect={this.handleEmojiSelect}/>
                        </div>
                        {/* image upload */}
                        <label
                            htmlFor="uploadImage"
                            className="x-chat-ops-icon ib"
                            onClick={() => this.image && this.image.focus() && this.image.click()}>
                            <i className="iconfont icon-picture"/>
                            <input
                                id="uploadImage"
                                ref={node => (this.image = node)}
                                onChange={this.pictureChange}
                                type="file"
                                className="hide"
                            />
                        </label>
                        {/*  file upload*/}
                        <label
                            htmlFor="uploadFile"
                            className="x-chat-ops-icon ib"
                            onClick={() => this.file && this.file.focus() && this.file.click()}>
                            <i className="icon iconfont icon-file-empty"/>
                            <input
                                id="uploadFile"
                                ref={node => (this.file = node)}
                                onChange={this.fileChange}
                                type="file"
                                className="hide"
                            />
                        </label>
                        {/* webrtc video && audio */}
                        {webrtcButtons}
                        {/* clear */}
                        <label htmlFor="clearMessage" className="x-chat-ops-icon ib" onClick={this.onClearMessage}>
                            <i className="icon iconfont icon-trash"></i>
                        </label>
                    </div>
                    <div className="x-list-item x-chat-send">
                        <Input
                            value={this.state.value}
                            onChange={this.handleChange}
                            onPressEnter={this.handleSend}
                            placeholder={I18n.t("message")}
                            addonAfter={
                                <i
                                    className="fontello icon-paper-plane"
                                    onClick={this.handleSend}
                                    style={{ cursor: "pointer" }}
                                />
                            }
                            ref={node => (this.input = node)}
                        />
                        {/*<TextArea rows={2} />*/}
                    </div>
                </div>
                <div className="webim-rtc" ref="rtcWrapper"></div>
            </div>
        )
    }
}

export default connect(
    (state, props) => ({
        messageList: getTabMessages(state, props)
    }),
    dispatch => ({
        switchRightSider: ({ rightSiderOffset }) => dispatch(GroupActions.switchRightSider({ rightSiderOffset })),
        sendTxtMessage: (chatType, id, message) => dispatch(MessageActions.sendTxtMessage(chatType, id, message)),
        sendImgMessage: (chatType, id, message, source) => dispatch(MessageActions.sendImgMessage(chatType, id, message, source)),
        sendFileMessage: (chatType, id, message, source) => dispatch(MessageActions.sendFileMessage(chatType, id, message, source)),
        clearMessage: (chatType, id) => dispatch(MessageActions.clearMessage(chatType, id)),
        listGroupMemberAsync: opt => dispatch(GroupMemberActions.listGroupMemberAsync(opt)),
        getMutedAsync: groupId => dispatch(GroupMemberActions.getMutedAsync(groupId)),
        getGroupAdminAsync: groupId => dispatch(GroupMemberActions.getGroupAdminAsync(groupId)),
        removeContact: id => dispatch(RosterActions.removeContact(id)),
        addContact: id => dispatch(RosterActions.addContact(id)),
        deleteStranger: id => dispatch(StrangerActions.deleteStranger(id)),
        doAddBlacklist: id => dispatch(BlacklistActions.doAddBlacklist(id)),
        fetchMessage: (id, chatType, offset) => dispatch(MessageActions.fetchMessage(id, chatType, offset))
    })
)(Chat)
