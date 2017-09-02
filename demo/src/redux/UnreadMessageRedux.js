import { createReducer, createActions } from "reduxsauce"
import Immutable from "seamless-immutable"

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    increaseUnread: [ "chatType", "to" ]
})

export const UnreadMessageTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    error: null,
    chat: {},
    groupchat: {},
    chatroom: {},
    fetching: false,
})

/* ------------- Reducers ------------- */

export const request = (state, { username, password }) => {
    return state.merge({ fetching: true, error: false })
}

export const increaseUnread = (state, { chatType, to }) => {
    console.log("###########")
    let count = state.getIn([ chatType, to ], 0)
    count++
    return state.merge({
        [chatType]: {
            [to]: count
        }
    }, { deep: true })    
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.INCREASE_UNREAD]: increaseUnread
})
