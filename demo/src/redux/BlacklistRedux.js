// @flow

import { createReducer, createActions } from "reduxsauce"
import Immutable from "seamless-immutable"
import WebIM from "@/config/WebIM"
import CommonActions from "./CommonRedux"

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    updateBlacklist: [ "list" ],
    // ----------------async------------------
    // 更新黑名单列表
    getBlacklist: () => {
        return (dispatch, getState) => {
            WebIM.conn.getBlacklist()
        }
    },
    // 添加到黑名单
    doAddBlacklist: id => {
        return (dispatch, getState) => {
            dispatch(CommonActions.fetching())

            let blacklist = getState().entities.blacklist.byName.asMutable()
            let roster = getState().entities.roster.byName
            if (blacklist[id]) return
            blacklist[id] = roster[id]
            WebIM.conn.addToBlackList({
                list: blacklist,
                type: "jid",
                success: function() {
                    // TODO: 之前添加当前黑名单用户还是重新拉取黑名单
                    dispatch(CommonActions.fetched())
                },
                error: function() {
                    dispatch(CommonActions.fetched())
                }
            })
        }
    },
    // 从黑名单删除
    doRemoveBlacklist: id => {
        return (dispatch, getState) => {
            dispatch(CommonActions.fetching())

            let blacklist = getState().entities.blacklist.byName.asMutable()
            delete blacklist[id]
            WebIM.conn.removeFromBlackList({
                list: blacklist,
                type: "jid",
                success: function() {
                    // TODO: 之前添加当前黑名单用户还是重新拉取黑名单
                    // 其实此处可以支持同步完成，只不过sdk中写的代码也自持listen
                    // 就直接使用listen，但是都没有做增量更新blacklist的操作
                    dispatch(CommonActions.fetched())
                },
                error: function() {
                    dispatch(CommonActions.fetched())
                }
            })
        }
    }
})

export const BlacklistTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    byName: {},
    names: []
})

/* ------------- Reducers ------------- */

export const updateBlacklist = (state, { list }) => {
    console.log("updateBlacklist", list)
    return state.merge({
        byName: Object(list),
        names: Object.keys(list).sort()
    })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.UPDATE_BLACKLIST]: updateBlacklist
})

/* ------------- Selectors ------------- */
