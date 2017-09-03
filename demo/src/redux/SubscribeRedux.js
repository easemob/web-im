// @flow

import { createReducer, createActions } from "reduxsauce"
import Immutable from "seamless-immutable"
import WebIM from "@/config/WebIM"

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    addSubscribe: [ "msg" ],
    removeSubscribe: [ "name" ],
    // ----------------async------------------
    // 接受好友请求
    acceptSubscribe: name => {
        return (dispatch, getState) => {
            dispatch(Creators.removeSubscribe(name))

            WebIM.conn.subscribed({
                to: name,
                message: "[resp:true]"
            })
        }
    },
    // 拒绝好友请求
    declineSubscribe: name => {
        return (dispatch, getState) => {
            dispatch(Creators.removeSubscribe(name))

            WebIM.conn.unsubscribed({
                to: name,
                message: new Date().toLocaleString()
            })
        }
    }
})

export const SubscribeTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    byFrom: {}
})

/* ------------- Reducers ------------- */

export const subscribe = (state, { msg }) => {
    return Immutable.setIn(state, [ "byFrom", msg.from ], msg)
}

export const removeSubscribe = (state, { name }) => {
    let byFrom = Immutable.without(state.byFrom, name)
    return Immutable.set(state, [ "byFrom" ], byFrom)
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.ADD_SUBSCRIBE]: subscribe,
    [Types.REMOVE_SUBSCRIBE]: removeSubscribe
})

/* ------------- Selectors ------------- */
