import { createReducer, createActions } from "reduxsauce"
import Immutable from "seamless-immutable"
import _ from "lodash"
import { WebIM } from "@/config"
import { history } from "@/utils"
import GroupActions from "@/redux/GroupRedux"

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    setAdmins: [ "groupId", "admins" ],
    operateAdmin: [ "groupId", "admin", "operation" ],
    setMuted: [ "groupId", "muted" ],
    operateMuted: [ "groupId", "muted", "operation" ],
    setBlacklist: [ "groupId", "blacklist" ],
    // addToGroupBlock: [ "groupId", "username" ],
    // removeFromGroupBlock: [ "groupId", "username" ],
    operateBlacklist: [ "groupId", "username", "operation" ],
    setGroupMember: [ "groupId", "members" ],
    operateGroupMember: [ "groupId", "username", "operation" ],
    // ---------------async------------------
    getGroupMember: id => {
        return (dispatch, getState) => {
            WebIM.conn.queryRoomMember({
                roomId: id,
                success: function (members) {
                    dispatch(Creators.setGroupMember(id, members))
                },
                error: function () { }
            })
        }
    },
    joinGroup: options => {
        return (dispatch, getState) => {
            WebIM.conn.joinGroup(options)
        }
    },
    quitGroupAsync: (groupId, username) => {
        return (dispatch, getState) => {
            const logger = WebIM.loglevel.getLogger("Group Member Redux - quit group")
            WebIM.conn.quitGroup({
                groupId,
                success: response => {
                    logger.info(response)
                    dispatch(GroupActions.switchRightSider({ rightSiderOffset: 0 }))
                    dispatch(Creators.operateGroupMember(groupId, username, "del"))
                    dispatch(GroupActions.deleteGroup(groupId))
                    history.push("/group")
                },
                error: e => logger.error(`an error found while invoking resultful quitGroup: ${e.message}`)
            })
        }
    },
    listGroupMemberAsync: opt => {
        let { groupId, pageNum, pageSize } = opt
        pageNum = pageNum || 1
        pageSize = pageSize || 1000
        return (dispatch, getState) => {
            WebIM.conn.listGroupMember({
                groupId,
                pageNum,
                pageSize,
                success: response => {
                    const members = response.data
                    dispatch(Creators.setGroupMember(groupId, members))
                },
                error: e => console.log(e.message)
            })
        }
    },
    getGroupBlackListAsync: groupId => {
        return (dispatch, getState) => {
            // dispatch(Creators.setLoading(true))

            WebIM.conn.getGroupBlacklistNew({
                groupId,
                success: response => {
                    const blacklist = response.data // <-- !!!
                    // dispatch(Creators.setLoading(false))
                    // dispatch(Creators.setLoadingFailed(false))
                    if (blacklist) dispatch(Creators.setBlacklist(groupId, blacklist))
                },
                error: e => {
                    // dispatch(Creators.setLoading(false))
                    // dispatch(Creators.setLoadingFailed(true))
                    console.log(`an error found while invoking resultful getGroupBlackList: ${e.message}`)
                }
            })
        }
    },
    groupBlockSingleAsync: (groupId, username) => {
        return (dispatch, getState) => {
            WebIM.conn.groupBlockSingle({
                groupId,
                username,
                success: response => {
                    // dispatch(Creators.setLoading(false))
                    // dispatch(Creators.setLoadingFailed(false))
                    dispatch(Creators.operateGroupMember(groupId, username, "del"))
                },
                error: e => {
                    console.log(`an error found while invoking resultful mute: ${e.message}`)
                    // dispatch(Creators.setLoading(false))
                    // dispatch(Creators.setLoadingFailed(true))
                }
            })
        }
    },
    removeGroupBlockSingleAsync: (groupId, username) => {
        return (dispatch, getState) => {
            // dispatch(Creators.setLoading(true))
            WebIM.conn.removeGroupBlockSingle({
                groupId,
                username,
                success: response => {
                    const { groupid, user } = response.data
                    const groupId = groupid
                    // dispatch(Creators.setLoading(false))
                    // dispatch(Creators.setLoadingFailed(false))
                    dispatch(Creators.operateBlacklist(groupId, user, "del"))
                },
                error: e => {
                    // dispatch(Creators.setLoading(false))
                    // dispatch(Creators.setLoadingFailed(true))
                    console.log(`an error found while invoking resultful removeGroupBlockAsync: ${e.message}`)
                }
            })
        }
    },
    setAdminAsync: (groupId, username) => {
        return (dispatch, getState) => {
            WebIM.conn.setAdmin({
                groupId,
                username,
                success: response => {
                    // response :{
                    //    data: {
                    //        newadmin: 'leo222',
                    //        result: 'success'
                    //    }
                    // }
                    dispatch(Creators.operateAdmin(groupId, response.data.newadmin, "add"))
                },
                error: e => console.log(`an error found while invoking restful setAdmin: ${e}`)
            })
        }
    },
    muteAsync: (groupId, username, mDuration) => {
        const muteDuration = mDuration || 886400000
        return (dispatch, getState) => {
            WebIM.conn.mute({
                groupId,
                username,
                muteDuration,
                success: response => {
                    dispatch(Creators.operateMuted(groupId, response.data, "add"))
                },
                error: e => console.log(`an error found while invoking resultful mute: ${e}`)
            })
        }
    },
    removeAdminAsync: (groupId, username) => {
        return (dispatch, getState) => {
            WebIM.conn.removeAdmin({
                groupId,
                username,
                success: response => dispatch(Creators.operateAdmin(groupId, response.data.oldadmin, "del")),
                error: e => console.log(`an error found while invoking resultful removeAdmin: ${e}`)
            })
        }
    },
    removeMuteAsync: (groupId, username) => {
        return (dispatch, getState) => {
            WebIM.conn.removeMute({
                groupId,
                username,
                success: response => dispatch(Creators.operateMuted(groupId, response.data, "del")),
                error: e => console.log(`an error found while invoking resultful removeMute: ${e}`)
            })
        }
    },
    removeSingleGroupMemberAsync: (groupId, username) => {
        return (dispatch, getState) => {
            WebIM.conn.removeSingleGroupMember({
                groupId,
                username,
                success: response => dispatch(Creators.operateGroupMember(groupId, username, "del")),
                error: e => console.log(`an error found while invoking resultful removeSingleGroupMember: ${e}`)
            })
        }
    },
    getMutedAsync: groupId => {
        return (dispatch, getState) => {
            WebIM.conn.getMuted({
                groupId,
                success: response => {
                    const muted = response.data
                    if (muted) dispatch(Creators.setMuted(groupId, muted))
                },
                error: e => console.log(`an error found while invoking resultful getMuted: ${e}`)
            })
        }
    },
    getGroupAdminAsync: groupId => {
        return (dispatch, getState) => {
            WebIM.conn.getGroupAdmin({
                groupId,
                success: response => {
                    const admins = response.data
                    if (admins) dispatch(Creators.setAdmins(groupId, admins))
                },
                error: e => console.log(`an error found while invoking resultful getGroupAdmin: ${e}`)
            })
        }
    }
})

export const GroupMemberTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({})

/* ------------- Reducers ------------- */

/**
 * save admin list of group
 * 
 * @param {any} state 
 * @param {any} { groupId, admins } 
 * @returns 
 */
export const setAdmins = (state, { groupId, admins }) => {
    const group = state.getIn([ groupId ], Immutable({})).merge({ admins })
    // group = group.set("admins", admins)
    return state.merge({ [groupId]: group })
}

/**
 * add or remove one user against admin list of group
 * 
 * @param {any} state 
 * @param {any} { groupId, admin, operation } 
 * @returns 
 */
export const operateAdmin = (state, { groupId, admin, operation }) => {
    let admins = state.getIn([ groupId, "admins" ], Immutable([])).asMutable()
    operation === "add"
        ? admins = _.uniq(_.concat(admins, admin))
        : admins = _.without(admins, admin)
    const group = state.getIn([ groupId ]).merge({ admins })
    return state.merge({ [groupId]: group })
}

/**
 * save all members in muted list of group
 * 
 * @param {any} state 
 * @param {any} { groupId, muted } 
 * @returns 
 */
export const setMuted = (state, { groupId, muted }) => {
    const byName = _.chain(muted)
        .reduce((acc, val) => {
            acc[val.user] = val
            return acc
        }, {})
        .value()
    const group = state.getIn([ groupId ], Immutable({})).merge({ muted: { byName } })
    return state.merge({ [groupId]: group })
}

/**
 * add or remove one user against muted list
 * 
 * @param {*} state 
 * @param {String|Number} groupId
 * @param {Array[Object]} muted
 * @param {Number} muted[].expire
 * @param {Boolean} muted[].result
 * @param {String} muted[].user
 * @param {String} operation 'add' | 'del'
 */
export const operateMuted = (state, { groupId, muted, operation }) => {
    let byName = state.getIn([ groupId, "muted", "byName" ], Immutable({}))
    operation === "add"
        ? _.forEach(muted, val => (byName = byName.merge({ [val.user]: _.omit(val, "result") })))
        : _.forEach(muted, val => (byName = byName.without(val.user)))
    return state.setIn([ groupId, "muted", "byName" ], byName)
}

/**
 * save all members in blacklist of group
 * 
 * @param {*} state 
 * @param {Object} group 
 * @param {Number} group.groupId
 * @param {Array[String]} group.blackList
 * @returns 
 */
export const setBlacklist = (state, { groupId, blacklist }) => {
    return state.setIn([ groupId, "blacklist" ], blacklist)
}

/**
 * add or remove one user against blacklist
 * 
 * @param {any} state 
 * @param {String|Number} groupId
 * @param {String} username
 * @param {String} operation - 'add' or 'del'
 * @returns new state
 */
export const operateBlacklist = (state, { groupId, username, operation }) => {
    let blacklist = state.getIn([ groupId, "blacklist" ], Immutable([])).asMutable()
    operation === "add"
        ? blacklist.push(username)
        : blacklist = _.without(blacklist, username)
    const group = state.getIn([ groupId ]).merge({ blacklist })
    return state.merge({ [groupId]: group })
}

/**
 * save all members of group
 * 
 * @param {*} state 
 * @param {String|Number} groupId 
 * @param {Array[Object]} members
 * @param {String|null} members[].member
 * @param {String|null} members[].owner
 * @return new state
 */
export const setGroupMember = (state, { groupId, members }) => {
    const byName = _.reduce(
        members,
        (acc, val) => {
            const { member, owner } = val
            const name = member || owner
            const affiliation = owner ? "owner" : "member"
            acc[name] = { name, affiliation }
            return acc
        },
        {}
    )
    const group = state.getIn([ groupId ], Immutable({})).merge({ byName, names: Object.keys(byName).sort() })
    return state.merge({ [groupId]: group })
}

/**
 * add or remove one member of group
 * NOTE: current only support DELETE operation
 * 
 * @param {any} state 
 * @param {String|Number} groupId
 * @param {String} username
 * @param {String} operation - ONLY 'del' currently
 * @returns new state
 */
export const operateGroupMember = (state, { groupId, username, operation }) => {
    if (operation === "del") {
        let byName = state.getIn([ groupId, "byName" ], Immutable({}))
        byName = byName.without(username)
        return state
            .setIn([ groupId, "byName" ], byName)
            .setIn([ groupId, "names" ], Object.keys(byName).sort())
    }
    return state
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.SET_ADMINS]: setAdmins,
    [Types.OPERATE_ADMIN]: operateAdmin,
    [Types.SET_MUTED]: setMuted,
    [Types.OPERATE_MUTED]: operateMuted,
    [Types.SET_BLACKLIST]: setBlacklist,
    [Types.OPERATE_BLACKLIST]: operateBlacklist,
    [Types.SET_GROUP_MEMBER]: setGroupMember,
    [Types.OPERATE_GROUP_MEMBER]: operateGroupMember
    // [Types.REMOVE_GROUP_BLOCK_SINGLE]: removeGroupBlockSingle,
})

/* ------------- Selectors ------------- */
