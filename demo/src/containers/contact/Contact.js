import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import _ from "lodash"
import ContactItem from "@/components/contact/ContactItem"
import utils from "@/utils"
import GroupActions from "@/redux/GroupRedux"
import ChatRoomActions from "@/redux/ChatRoomRedux"
import getTabMessages from "@/selectors/ChatSelector"
import getCurrentContacts from "@/selectors/ContactSelector"

const Contact = ({ history, match, common, location, contacts, group, chatroom, stranger, message, blacklist, getGroups, getChatRooms, ...rest }) => {
    const { pathname } = location
    const paths = pathname.split("/")
    const chatType = paths[1]
    const chatId = paths[2]


    // console.log(history, match, location, pathname, chatType, chatId)

    const chatTypes = {
        "contact": "chat",
        "group": "groupchat",
        "chatroom": "chatroom",
        "stranger": "stranger"
    }

    const items = []
    switch (chatType) {
    case "contact":
        const { byId, chat } = message
        _.forEach(_.get(contacts, "friends", []), (name, index) => {
            if (_.includes(blacklist.names, name)) return
            const info = utils.getLatestMessage(_.get(message, [ chatTypes[chatType], name ], []))
            const count = message.getIn([ "unread", "chat", name ], 0)
            items[index] = {
                name,
                unread: count,
                ...info
            }
        })
        break
    case "group":
        if (!common.isGetGroupAlready) {
            // 获取群组列表
            getGroups()
        } else {
            _.forEach(_.get(contacts, "names", []), (v, index) => {
                const [ name, id ] = v.split("_#-#_")
                const info = utils.getLatestMessage(_.get(message, [ chatTypes[chatType], id ], []))
                const count = message.getIn([ "unread", "groupchat", name ], 0)
                items[index] = {
                    name,
                    id,
                    unread: count,
                    latestMessage: "",
                    latestTime: "",
                    ...info
                }
            })
        }
        break
    case "chatroom":
        if (!common.isGetChatRoomAlready) {
            // 获取聊天室列表
            getChatRooms()
        } else {
            _.forEach(_.get(contacts, "names", []), (v, index) => {
                const [ name, id ] = v.split("_#-#_")
                const info = utils.getLatestMessage(_.get(message, [ chatTypes[chatType], id ], []))
                const count = message.getIn([ "unread", "chatroom", name ], 0)
                items[index] = {
                    name,
                    id,
                    unread: count,
                    latestMessage: "",
                    latestTime: "",
                    ...info
                }
            })
        }
        break
    case "stranger":
        _.forEach(_.get(contacts, "byId", []), (v, name) => {
            // TODO: 目前的数据结构不利于实现最新未读置顶，可能需要改造 entities.stranger 结构
            const info = utils.getLatestMessage(_.get(message, [ chatTypes[chatType], name ], []))
            const count = message.getIn([ "unread", "stranger", name ], 0)
            items.push({
                name,
                unread: count,
                latestMessage: "",
                latestTime: "",
                ...info
            })
        })
        break
    default:
        // 不加 default 的话，编辑器提醒辣眼睛
        break
    }
    // console.log(chatType, chatId, items)

    return (
        <div>
            <ContactItem {...rest} items={items} chatType={chatType}/>
        </div>
    )
}

Contact.propTypes = {
    collapse: PropTypes.bool
    // menuOptions: PropTypes.array.isRequired,
}

export default withRouter(
    connect(
        (state, props) => ({
            common: state.common,
            contacts: getCurrentContacts(state, props.match.params),
            message: state.entities.message,
            blacklist: state.entities.blacklist,
        }),
        dispatch => ({
            doLogin: (username, password) => {
            },
            getGroups: () => dispatch(GroupActions.getGroups()),
            getChatRooms: () => dispatch(ChatRoomActions.getChatRooms())
        })
    )(Contact)
)
