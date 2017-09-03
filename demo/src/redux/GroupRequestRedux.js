// @flow

import { createReducer, createActions } from "reduxsauce"
import Immutable from "seamless-immutable"
import WebIM from "@/config/WebIM"

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    addGroupRequest: [ "msg" ],
    removeGroupRequest: [ "gid" ],
    // ----------------async------------------
    // 接受好友请求
    agreeJoinGroup: (gid, options) => {
        return (dispatch, getState) => {
            dispatch(Creators.removeGroupRequest(gid))

            WebIM.conn.agreeJoinGroup(options)
        }
    },
    rejectJoinGroup: (gid, options) => {
        return (dispatch, getState) => {
            dispatch(Creators.removeGroupRequest(gid))

            WebIM.conn.rejectJoinGroup(options)
        }
    }
})

export const GroupRequestTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    byGid: {}
})

/* ------------- Reducers ------------- */

export const addGroupRequest = (state, { msg }) => {
    return Immutable.setIn(state, [ "byGid", msg.gid ], msg)
}

export const removeGroupRequest = (state, { gid }) => {
    let byGid = Immutable.without(state.byGid, gid)
    return Immutable.set(state, [ "byGid" ], byGid)
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.ADD_GROUP_REQUEST]: addGroupRequest,
    [Types.REMOVE_GROUP_REQUEST]: removeGroupRequest
})

/* ------------- Selectors ------------- */
