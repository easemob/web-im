import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import _ from "lodash"
import ContactItem from "@/components/contact/ContactItem"
import utils from "@/utils"
import GroupActions from "@/redux/GroupRedux"
import ChatRoomActions from "@/redux/ChatRoomRedux"

const Contact = ({
    history, match, common, location, roster, group, chatroom, stranger, message, blacklist, getGroups, getChatRooms, unread, ...rest
}) => {
    const {
        pathname
    } = location
    const paths = pathname.split("/")
    const chatType = paths[1]
    const chatId = paths[2]
    const {
        byId, chat
    } = message

    // console.log(history, match, location, pathname, chatType, chatId)

    const items = []
    switch (chatType) {
    case "contact":
        roster &&
            roster.friends &&
            roster.friends.forEach((name, index) => {
                if (blacklist.names.indexOf(name) !== -1) return
                // const info = utils.getLatestInfo(name, byId, chat)
                const count = _.get(unread, name, 0)
                items[index] = {
                    name,
                    unread: count,
                    // ...info
                }
            })
        break
    case "group":
        if (!common.isGetGroupAlready) {
            // 获取群组列表
            getGroups()
        } else {
            group &&
                group.names &&
                group.names.forEach((v, index) => {
                    let [ name, id ] = v.split("_#-#_")
                    const count = _.get(unread, id, 0)
                    items[index] = {
                        name,
                        id,
                        unread: count,
                        latestMessage: "",
                        latestTime: ""
                    }
                })
        }
        break
    case "chatroom":
        if (!common.isGetChatRoomAlready) {
            // 获取聊天室列表
            getChatRooms()
        } else {
            chatroom &&
                chatroom.names &&
                chatroom.names.forEach((v, index) => {
                    let [ name, id ] = v.split("_#-#_")
                    const count = _.get(unread, id, 0)
                    items[index] = {
                        name,
                        id,
                        unread: count,
                        latestMessage: "",
                        latestTime: ""
                    }
                })
        }
        break
    case "stranger":
        if (stranger && stranger.byId) {
            const names = Object.keys(stranger.byId)
            names.length &&
                names.sort().forEach((name, index) => {
                    const count = _.get(unread, name, 0)
                    items[index] = {
                        name,
                        unread: count,
                        latestMessage: "",
                        latestTime: ""
                    }
                })
        }
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
        ({ entities, common }) => ({
            common,
            roster: entities.roster,
            group: entities.group,
            chatroom: entities.chatroom,
            stranger: entities.stranger,
            message: entities.message,
            blacklist: entities.blacklist
        }),
        dispatch => ({
            doLogin: (username, password) => {
            },
            getGroups: () => dispatch(GroupActions.getGroups()),
            getChatRooms: () => dispatch(ChatRoomActions.getChatRooms())
        })
    )(Contact)
)
