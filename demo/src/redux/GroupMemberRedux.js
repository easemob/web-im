import { createReducer, createActions } from "reduxsauce"
import Immutable from "seamless-immutable"
import _ from "lodash"
import { WebIM } from "@/config"

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    updateGroupMember: ["groupId", "members"],
    removeMemberFromGroup: ["id", "username"],
    // ---------------async------------------
    getGroupMember: id => {
        return (dispatch, getState) => {
            WebIM.conn.queryRoomMember({
                roomId: id,
                success: function(members) {
                    dispatch(Creators.updateGroupMember(id, members))
                },
                error: function() {}
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
                    console.log(response)
                    // dispatch(Creators.)
                },
                error: e =>
                    console.log(
                        `an error found while invoking restful setAdmin: ${e.message}`
                    )
            })
        }
    },
    muteAsync: (groupId, username, muteDuration) => {
        return (dispatch, getState) => {
            WebIM.conn.mute({
                groupId,
                username,
                muteDuration,
                success: response => console.log(response),
                error: e =>
                    console.log(
                        `an error found while invoking resultful mute: ${e.message}`
                    )
            })
        }
    },
    removeAdminAsync: (groupId, username) => {
        return (dispatch, getState) => {
            WebIM.conn.removeAdmin({
                groupId,
                username,
                success: response => console.log(response),
                error: e =>
                    console.log(
                        `an error found while invoking resultful removeAdmin: ${e.message}`
                    )
            })
        }
    },
    removeSingleGroupMemberAsync: (groupId, username) => {
        return (dispatch, getState) => {
            WebIM.conn.removeSingleGroupMember({
                groupId,
                username,
                success: response =>
                    dispatch(Creators.removeMemberFromGroup(groupId, username)),
                error: e =>
                    console.log(
                        `an error found while invoking resultful removeSingleGroupMember: ${e.message}`
                    )
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
    // const group = []
    // _.each(members, val => {
    //     _.each(val, (k, v) => group.push({ name: k, affiliation: v }))
    // })
    const byName = {}
    _.each(members, val => {
        _.each(val, (v, k) => (byName[v] = { affiliation: k }))
    })
    const group = { byName, names: Object.keys(byName).sort() }
    return state.merge({ [groupId]: group })
}

export const removeMemberFromGroup = (state, { id, username }) => {
    let byName = state.getIn(["groupMember", id, "byName"]).without(username)
    return state
        .setIn(["groupMember", id, "byName"], byName)
        .setIn(["groupMember", id, "names"], Object.keys(byName).sort())
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.UPDATE_GROUP_MEMBER]: updateGroupMember
})

/* ------------- Selectors ------------- */
