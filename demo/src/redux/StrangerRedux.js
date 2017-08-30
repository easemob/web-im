import { createReducer, createActions } from "reduxsauce"
import Immutable from "seamless-immutable"
import _ from "lodash"
import { parseFromServer } from "@/redux/MessageRedux"

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    updateStrangerMessage: ["stranger", "message", "bodyType"],
    addFriend: ["stranger"],
    deleteStranger: ["stranger"]
    // ---------------async------------------
})

export const StrangerTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    byId: {}
})

/* ------------- Reducers ------------- */

export const updateStrangerMessage = (state, { stranger, message, bodyType = "txt" }) => {
    //TODO: 在MessageRedux中封装一个函数 export给这里直接调用,避免逻辑重复
    !message.status && (message = parseFromServer(message, bodyType))
    const { username = "" } = state.user || {}
    const { id, to, status } = message
    let { type } = message

    // 消息来源：没有from默认即为当前用户发送
    const from = message.from || username
    // 当前用户：标识为自己发送
    const bySelf = from == username
    // 房间id：自己发送或者不是单聊的时候，是接收人的ID， 否则是发送人的ID
    const chatId = bySelf || type !== "chat" ? to : from

    state = state.setIn(["byId", stranger, id], {
        ...message,
        bySelf,
        time: +new Date(),
        status: status
    })
    return state
}

export const addFriend = (state, { stranger }) => {
    console.log("addFriend", stranger)
    return state
}

export const deleteStranger = (state, { stranger }) => {
    let byId = state.byId.asMutable()
    delete byId[stranger]
    return state.merge({ byId: byId })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.UPDATE_STRANGER_MESSAGE]: updateStrangerMessage,
    [Types.ADD_FRIEND]: addFriend,
    [Types.DELETE_STRANGER]: deleteStranger
})

/* ------------- Selectors ------------- */
