import { createReducer, createActions } from "reduxsauce"
import Immutable from "seamless-immutable"
import { WebIM } from "@/config"

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
	updateGroupMember: ["id", "members"],
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
    setAdminAsync: (groupId, username) => {
        return (dispatch, getState) => {
            WebIM.conn.setAdmin({
                groupId,
                username,
                success: (response) => {
                    console.log(response)
                    // dispatch(Creators.)
                },
                error: (e) => console.log(`an error found while invoking restful setAdmin: ${e.message}`)
            })
        }
    },
    muteAsync: (groupId, username, muteDuration) => {
        return (dispatch, getState) => {
            WebIM.conn.mute({
                groupId,
                username,
                muteDuration,
                success: (response) => console.log(response),
                error: (e) => console.log(`an error found while invoking resultful mute: ${e.message}`)
            })
        }
    },
    removeAdminAsync: (groupId, username) => {
        return (dispatch, getState) => {
            WebIM.conn.removeAdmin({
                groupId,
                username,
                success: (response) => console.log(response),
                error: (e) => console.log(`an error found while invoking resultful removeAdmin: ${e.message}`)
            })
        }
    },
    removeSingleGroupMemberAsync: (groupId, username) => {
        return (dispatch, getState) => {
            WebIM.conn.removeSingleGroupMember({
                groupId,
                username,
                success: (response) => console.log(response),
                error: (e) => console.log(`an error found while invoking resultful removeSingleGroupMember: ${e.message}`)
            })
        }
    }
})

export const GroupMemberTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({})

/* ------------- Reducers ------------- */
// [{jid,name,roomId}] members
export const updateGroupMember = (state, { id, members }) => {
	let byName = {}
	members.forEach(v => {
		let name = v.jid.match(/_(.*?)@/)[1]
		byName[name] = v
	})
	return state.merge({
		[id]: {
			byName,
			names: Object.keys(byName).sort()
		}
	})
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
	[Types.UPDATE_GROUP_MEMBER]: updateGroupMember
})

/* ------------- Selectors ------------- */
