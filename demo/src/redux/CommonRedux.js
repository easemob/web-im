import { createReducer, createActions } from "reduxsauce"
import Immutable from "seamless-immutable"

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    fetching: [],
    fetched: [],
    getGroupAlready: null,
    getChatRoomAlready: null,
    setShowGroupRequestModal: [ "status" ]
})

export const CommonTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    fetching: false,
    isGetGroupAlready: false,
    isGetChatRoomAlready: false,
    showGroupRequestModal: false
})

/* ------------- Reducers ------------- */

export const fetching = state => {
    return state.merge({ fetching: true })
}

export const fetched = state => {
    return state.merge({ fetching: false })
}

export const getGroupAlready = state => {
    return state.merge({ isGetGroupAlready: true })
}

export const getChatRoomAlready = state => {
    return state.merge({ isGetChatRoomAlready: true })
}

export const setShowGroupRequestModal = (state, { status }) => {
    return state.merge({ showGroupRequestModal: status })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.FETCHING]: fetching,
    [Types.FETCHED]: fetched,
    [Types.GET_GROUP_ALREADY]: getGroupAlready,
    [Types.GET_CHAT_ROOM_ALREADY]: getChatRoomAlready,
    [Types.SET_SHOW_GROUP_REQUEST_MODAL]: setShowGroupRequestModal
})

/* ------------- Selectors ------------- */
