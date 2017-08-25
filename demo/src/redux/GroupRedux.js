import { createReducer, createActions } from "reduxsauce"
import Immutable from "seamless-immutable"
import WebIM from "@/config/WebIM"
import { history } from "@/utils"
import _ from "lodash"

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
	updateGroupInfo: ["info"],
	setLoading: ["isLoading"],
	setLoadingFailed: ["loadingFailed"],
	setBlackList: ["group"],
    removeGroupBlockSingle: ['payload'],
	updateGroup: ["groups"],
    dissolveGroup: ['group'],
    switchRightSider: ['width'],
	// ---------------async------------------
	createGroups: options => {
		return (dispatch, getState) => {
			WebIM.conn.createGroupNew(options)
		}
	},
	getGroups: () => {
		return (dispatch, getState) => {
			WebIM.conn.listRooms({
				success: function(rooms) {
					dispatch(Creators.updateGroup(rooms))
				},
				error: function(e) {
					WebIM.conn.setPresence()
				}
			})
		}
	},
	updateGroupInfoAsync: info => {
		return (dispatch, getState) => {
			dispatch(Creators.setLoading({ isLoading: true }))
			WebIM.conn.modifyGroup({
				groupId: info.id,
				groupName: info.name,
				description: info.description || "",
				success: response => {
					const info = response.data // <-- !!!
					dispatch(Creators.setLoading(false))
					dispatch(Creators.setLoadingFailed(false))
					dispatch(Creators.updateGroupInfo(info))
					// history.push('/group/')
				},
				error: e => {
					dispatch(Creators.setLoading(false))
					dispatch(Creators.setLoadingFailed(true))
					WebIM.conn.setPresence()
				}
			})
		}
	},
    dissolveGroupAsync: (group) => {
		return (dispatch, getState) => {
            dispatch(Creators.setLoading(true))
			WebIM.conn.dissolveGroup({
				groupId: group.groupId,
				success: () => {
                    let {groupId, groupName} = group
                    let payload = {groupId, groupName}
					dispatch(Creators.setLoading(false))
					dispatch(Creators.setLoadingFailed(false))
                    dispatch(Creators.dissolveGroup(payload))
				},
				error: e => {
					dispatch(Creators.setLoading(false))
					dispatch(Creators.setLoadingFailed(true))
				}
			})
		}
	},
	getGroupBlackList: groupId => {
		return (dispatch, getState) => {
            dispatch(Creators.setLoading(true))

			WebIM.conn.getGroupBlacklistNew({
				groupId,
				success: response => {
					const blacklist = response.data // <-- !!!
					const group = { groupId, blacklist }
					dispatch(Creators.setLoading(false))
					dispatch(Creators.setLoadingFailed(false))
					dispatch(Creators.setBlackList(group))
				},
				error: e => {
					dispatch(Creators.setLoading(false))
					dispatch(Creators.setLoadingFailed(true))
				}
			})
		}
	},
	inviteToGroup: (groupId, users) => {
		return (dispatch, getState) => {
            dispatch(Creators.setLoading(true))
			WebIM.conn.inviteToGroup({
				groupId,
				users,
				success: response => {
					// let data = response.data <-- !!!
					dispatch(Creators.setLoading(false))
					dispatch(Creators.setLoadingFailed(false))
				},
				error: e => {
					dispatch(Creators.setLoading(false))
					dispatch(Creators.setLoadingFailed(true))
				}
			})
		}
    },
    removeGroupBlockSingleAsync: (groupId, username) => {
        return (dispatch, getState) => {
            dispatch(Creators.setLoading(true))
            WebIM.conn.removeGroupBlockSingle({
                groupId,
                username,
                success: (response) => {
                    let {groupId, user} = response.data
                    let payload = {groupId, user}
                    dispatch(Creators.setLoading(false))
                    dispatch(Creators.setLoadingFailed(false))
                    dispatch(Creators.removeGroupBlockSingle(payload))
                },
                error: (e) => {
                    dispatch(Creators.setLoading(false))
                    dispatch(Creators.setLoadingFailed(true))
                }
            })
        }
	}
})

export const GroupsTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
	loadingFailed: false,
	isLoading: false,
	rightSiderOffset: 0,
	byName: {},
	byId: {},
	names: []
})

/* ------------- Reducers ------------- */
export const setLoading = (state, { isLoading }) => {
	return state.merge({
		isLoading
	})
}

export const setLoadingFailed = (state, { loadingFailed }) => {
	return state.merge({
		loadingFailed
	})
}

// [{jid,name,roomId}] groups
export const updateGroup = (state, { groups }) => {
	let byName = {}
	let byId = {}
	groups.forEach(v => {
		byName[v.name] = v
		byId[v.roomId] = v
	})
	return state.merge({
		byName,
		byId,
		names: Object.keys(byName).sort()
	})
}

// [{affiliations,description,maxusers,name,occupants,owner,id,newName}] info
export const updateGroupInfo = (state, { info }) => {
	// let byName = {}
	// let byId = {}
	// state.group.forEach((v) => {
	//   byName[v.name] = v
	//   byId[v.roomId] = v
	// })
	// return state.merge({
	//   byName,
	//   byId,
	//   names: Object.keys(byName)
	// })

	state.group.byName[info.name]
	return {}
	// const byName = deepcopy(state.byName)
	// byName[info.newName] = deepcopy(byName[info.name])
	// delete byName[info.name]
	// const byId = deepcopy(state.byId)
	// byId[info.id].name = info.newName

	// return state.merge({
	//     byName,
	//     byId,
	//     names: Object.keys(byName).sort()
	// })
}

/**
 * 
 * @param {Object} state 
 * @param {Object} payload
 * @param {String|Number} payload.groupId
 * @param {String} payload.groupName
 */
export const dissolveGroup = (state, {payload}) => {
    let byId = state.getIn(['byId']).without(payload.groupId)
    let byName = state.getIn(['byName']).without(payload.groupName)
	return state.merge({
		byId,
        byName,
		names: Object.keys(byName).sort()
	})
}

/**
 * 
 * @param {*} state 
 * @param {Object} group 
 * @param {Number} group.groupId
 * @param {String} group.groupName
 * @param {Array[String]} group.blackList
 */
export const setBlackList = (state, { group }) => {
    return state.setIn(['byId', group.groupId, 'blacklist'], group.blacklist)
}

export const removeGroupBlockSingle = (state, { payload }) => {
    let blacklist = state.getIn(['byId', payload.groupId, 'blacklist']).filter(val => val !== payload.user)
    return state.setIn(['byId', payload.groupId, 'blacklist'], blacklist)
}

export const switchRightSider = (state, { width }) => {
	const { rightSiderOffset } = width
	return state.merge({
		rightSiderOffset
	})
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
	[Types.SET_LOADING]: setLoading,
	[Types.SET_LOADING_FAILED]: setLoadingFailed,
	[Types.UPDATE_GROUP]: updateGroup,
	[Types.UPDATE_GROUP_INFO]: updateGroupInfo,
	[Types.DISSOLVE_GROUP]: dissolveGroup,
	[Types.SET_BLACK_LIST]: setBlackList,
    [Types.REMOVE_GROUP_BLOCK_SINGLE]: removeGroupBlockSingle,
	[Types.SWITCH_RIGHT_SIDER]: switchRightSider
})

/* ------------- Selectors ------------- */
