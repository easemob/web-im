import {createReducer, createActions} from "reduxsauce"
import Immutable from "seamless-immutable"
import deepcopy from 'deepcopy'
import {WebIM} from "@/config"

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    // updateGroupInfo: ["info"],
    setLoading: ["isLoading"],
    setLoadingFailed: ['loadingFailed'],
    setBlackList: ['group'],
    updateGroup: ["groups"],
	switchRightSider: ['width'],
    // ---------------async------------------
    getGroups: () => {
        return (dispatch, getState) => {
            WebIM.conn.listRooms({
                success: function (rooms) {
                    dispatch(Creators.updateGroup(rooms))
                },
                error: function (e) {
                    WebIM.conn.setPresence()
                }
            })
        }
    },
    updateGroupInfo: (info) => {
        return (dispatch, getState) => {
            dispatch(Creators.setLoading({isLoading: true}))
            WebIM.conn.modifyGroup({
                groupId: info.id,
                groupName: info.name,
                // description: info.description
                success: (group) => {
                    console.log(group)
                    // dispatch(Creators.updateGroup([group]))
                    dispatch(Creators.setLoading(false))
                    dispatch(Creators.setLoadingFailed(false))
                },
                error: (e) => {
                    console.log(e.message)
                    dispatch(Creators.setLoading(false))
                    dispatch(Creators.setLoadingFailed(true))
                    WebIM.conn.setPresence()
                }
            })
        }
    },
    dissolveGroup: (group) => {
        return (dispatch, getState) => {
            dispatch(Creators.setLoading({isLoading: true}))
            WebIM.conn.dissolveGroup({
                groupId: group.groupId,
                success: () => {
                    dispatch(Creators.setLoading(false))
                    dispatch(Creators.setLoadingFailed(false))
                },
                error: (e) => {
                    dispatch(Creators.setLoading(false))
                    dispatch(Creators.setLoadingFailed(true))
                }
            })
        }
    },
    getGroupBlackList: (groupId, groupName) => {
        return (dispatch, getState) => {
            dispatch(Creators.setLoading({isLoading: true}))
            WebIM.conn.getGroupBlacklistNew({
                groupId,
                success: (blackList) => {
                    const group = { groupId, groupName, blackList }
                    dispatch(Creators.setLoading(false))
                    dispatch(Creators.setLoadingFailed(false))
                    dispatch(Creators.setBlackList({ group }))
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
export const setLoading = (state, {isLoading}) => {
    return state.merge({
        isLoading
    })
}

export const setLoadingFailed = (state, {loadingFailed}) => {
    return state.merge({
        loadingFailed
    })
}

// [{jid,name,roomId}] groups
export const updateGroup = (state, {groups}) => {
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
export const updateGroupInfo = (state, {info}) => {
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
    
    // state.group.byName[info.name]
    // return {}
    const byName = deepcopy(state.byName)
    byName[info.newName] = deepcopy(byName[info.name])
    delete byName[info.name]
    const byId = deepcopy(state.byId)
    byId[info.id].name = info.newName
    
    return state.merge({
        byName,
        byId,
        names: Object.keys(byName).sort()
    })
}

/**
 * 
 * @param {Object} state 
 * @param {Object} info
 * @param {String|Number} info.groupId
 * @param {String} info.groupName
 */
export const dissolveGroup = (state, {info}) => {
    let byName = deepcopy(state.byName)
    delete byName[info.groupName]
    let byId = deepcopy(state.byId)
    delete byId[info.groupId]
    return state.merge({
        byName,
        byId,
        names: Object.keys(byName).sort()
    })
    // const byName = Immutable.without(state.byName, info.groupName)
    // const byId = Immutable.without(state.byId, info.groupId)
    // const names = Immutable.without(state.names, info.groupName)
}

/**
 * 
 * @param {*} state 
 * @param {Object} group 
 * @param {Number} group.groupId
 * @param {String} group.groupName
 * @param {Array} group.blackList
 */
export const setBlackList = (state, { group }) => {
    let byName = deepcopy(state.byName)
    const { blackList} = group
    Object.assign(byName[group.groupName], { blackList })
    let byId = deepcopy(state.byId)
    Object.assign(byId[group.groupId], { blackList})
    return state.merge({
        byId,
        byName
    })
}

export const switchRightSider = (state, {width}) => {
	console.log(width);
	const {rightSiderOffset} = width;
	console.log(rightSiderOffset);
	return state.merge({
		rightSiderOffset
	});
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.SET_LOADING]: setLoading,
    [Types.SET_LOADING_FAILED]: setLoadingFailed,
    [Types.UPDATE_GROUP]: updateGroup,
    [Types.UPDATE_GROUP_INFO]: updateGroupInfo,
    [Types.DISSOLVE_GROUP]: dissolveGroup,
    [Types.SET_BLACK_LIST]: setBlackList,
	[Types.SWITCH_RIGHT_SIDER]: switchRightSider
})

/* ------------- Selectors ------------- */
