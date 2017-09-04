import { createReducer, createActions } from "reduxsauce"
import Immutable from "seamless-immutable"
import _ from "lodash"
import WebIM from "@/config/WebIM"
import { I18n } from "react-redux-i18n"

import CommonActions from "@/redux/CommonRedux"

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
    updateRoster: [ "roster" ],
    prependRoster: [ "name" ],
    removeRoster: [ "name" ],
    topRoster: [ "name" ],
    // ----------------async------------------
    // 获取好友列表
    getContacts: () => {
        return (dispatch, getState) => {
            dispatch(CommonActions.fetching())
            WebIM.conn.getRoster({
                success: roster => {
                    dispatch(Creators.updateRoster(roster))
                    dispatch(CommonActions.fetched())
                },
                error: error => {
                    //TODO ERROR
                    dispatch(CommonActions.fetched())
                }
            })
        }
    },
    // 删除联系人
    removeContact: id => {
        return (dispatch, getState) => {
            //loading
            dispatch(CommonActions.fetching())
            WebIM.conn.removeRoster({
                to: id,
                success: function() {
                    //loading end
                    dispatch(CommonActions.fetched())
                    dispatch(Creators.getContacts())

                    WebIM.conn.unsubscribed({
                        to: id
                    })
                },
                error: function() {
                    //TODO ERROR
                    dispatch(CommonActions.fetched())
                }
            })
        }
    },
    // 添加联系人
    addContact: id => {
        return (dispatch, getState) => {
            const u = getState().login.username
            WebIM.conn.subscribe({
                to: id,
                message: u + I18n.t("request")
            })
        }
    }
})

export const RosterTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
    byName: null,
    names: [],
    friends: []
})

/* ------------- Reducers ------------- */
function isFriend(v) {
    return v.subscription != "none"
}

export const updateRoster = (state, { roster }) => {
    let byName = {},
        names = [],
        friends = []
    roster.forEach(v => {
        byName[v.name] = v
        names = Object.keys(byName).sort()
        isFriend(v) && friends.push(v.name)
    })
    return state.merge({
        byName,
        names,
        friends
    })
}

export const prependRoster = (state, { name }) => {
    const friends = state.getIn([ "friends" ], Immutable([])).asMutable()
    friends.unshift(name)
    return state.merge({ friends })
}

export const removeRoster = (state, { name }) => {
    let friends = state.getIn([ "friends" ], Immutable([])).asMutable()
    friends = _.without(friends, name)
    return state.merge({ friends })
}

export const topRoster = (state, { name }) => {
    let friends = state.getIn([ "friends" ], Immutable([])).asMutable()
    if (friends[0] === name) return state // if already top, return directly
    friends = _.without(friends, name)
    friends.unshift(name)
    return state.merge({ friends })
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.UPDATE_ROSTER]: updateRoster,
    [Types.TOP_ROSTER]: topRoster,
    [Types.PREPEND_ROSTER]: prependRoster,
    [Types.REMOVE_ROSTER]: removeRoster
})

/* ------------- Selectors ------------- */
