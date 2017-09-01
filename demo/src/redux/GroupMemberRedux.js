import { createReducer, createActions } from "reduxsauce"
import Immutable from "seamless-immutable"
import _ from "lodash"
import { WebIM } from "@/config"

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    updateAdmin: [ "groupId", "admins" ],
    operateAdmin: [ "groupId", "admin", "operation" ],
    updateMuted: [ "groupId", "muted" ],
    operateMuted: [ "groupId", "muted", "operation" ],
    updateGroupMember: [ "groupId", "members" ],
    removeMemberFromGroup: [ "id", "username" ],
    // ---------------async------------------
    getGroupMember: id => {
        return (dispatch, getState) => {
            WebIM.conn.queryRoomMember({
                roomId: id,
                success: function (members) {
                    dispatch(Creators.updateGroupMember(id, members))
                },
                error: function () { }
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
                    dispatch(Creators.updateGroupMember(groupId, members))
                },
                error: e => console.log(e.message)
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
                success: response => dispatch(Creators.removeMemberFromGroup(groupId, username)),
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
                    dispatch(Creators.updateMuted(groupId, muted))
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
                    dispatch(Creators.updateAdmin(groupId, admins))
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
/*
* deprecated
*/
// [{jid,name,roomId}] members
// export const updateGroupMember = (state, { id, members }) => {
//     let byName = {}
//     members.forEach(v => {
//         let name = v.jid.match(/_(.*?)@/)[1]
//         byName[name] = v
//     })
//     return state.merge({
//         [id]: {
//             byName,
//             names: Object.keys(byName).sort()
//         }
//     })
// }

/**
 * 
 * @param {*} state 
 * @param {String|Number} groupId 
 * @param {Array[Object]} members
 * @param {Object} members[][]
 */
export const updateGroupMember = (state, { groupId, members }) => {
    const byName = _.reduce(
        members,
        (acc, val) => {
            const { member, owner } = val
            const name = member || owner
            const affiliation = owner ? "owner" : "member"
            // acc.push({ name, affiliation })
            acc[name] = { name, affiliation }
            return acc
        },
        {}
    )
    const group = state.getIn([ groupId ], Immutable({})).merge({ byName, names: Object.keys(byName).sort() })
    return state.merge({ [groupId]: group })
}

export const removeMemberFromGroup = (state, { id, username }) => {
    let byName = state.getIn([ "groupMember", id, "byName" ]).without(username)
    return state
        .setIn([ "groupMember", id, "byName" ], byName)
        .setIn([ "groupMember", id, "names" ], Object.keys(byName).sort())
}

export const updateAdmin = (state, { groupId, admins }) => {
    const group = state.getIn([ groupId ], Immutable({})).merge({ admins })
    // group = group.set("admins", admins)
    return state.merge({ [groupId]: group })
}

export const operateAdmin = (state, { groupId, admin, operation }) => {
    let admins = state.getIn([ groupId, "admins" ], Immutable([])).asMutable()
    operation === "add"
        ? admins = _.uniq(_.concat(admins, admin))
        : admins = _.without(admins, admin)
    const group = state.getIn([ groupId ]).merge({ admins })
    return state.merge({ [groupId]: group })
}

export const updateMuted = (state, { groupId, muted }) => {
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
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.UPDATE_GROUP_MEMBER]: updateGroupMember,
    [Types.UPDATE_ADMIN]: updateAdmin,
    [Types.UPDATE_MUTED]: updateMuted,
    [Types.OPERATE_ADMIN]: operateAdmin,
    [Types.OPERATE_MUTED]: operateMuted
})

/* ------------- Selectors ------------- */
