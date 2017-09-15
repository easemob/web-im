import { createReducer, createActions } from "reduxsauce"
import Immutable from "seamless-immutable"
import WebIM from "@/config/WebIM"
import { history } from "@/utils"
import GroupMemberActions from "@/redux/GroupMemberRedux"
import CommonActions from "@/redux/CommonRedux"
import _ from "lodash"
import { config } from "@/config"
import { store } from "@/redux"

const logger = WebIM.loglevel.getLogger("GroupRedux")

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    updateGroupInfo: [ "info" ],
    setLoading: [ "isLoading" ],
    setLoadingFailed: [ "loadingFailed" ],
    deleteGroup: [ "groupId" ],
    updateGroup: [ "groups" ],
    dissolveGroup: [ "group" ],
    switchRightSider: [ "width" ],
    topGroup: [ "groupId" ],
    // ---------------async------------------
    createGroups: options => {
        return (dispatch, getState) => {
            WebIM.conn.createGroupNew(options)
        }
    },
    getGroups: () => {
        return (dispatch, getState) => {
            store.dispatch(CommonActions.getGroupAlready())
            WebIM.conn.getGroup({
                success: function(response) {
                    logger.info(response.data)
                    dispatch(Creators.updateGroup(response.data))
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
                groupId: info.groupId,
                groupName: info.groupName,
                // description: info.description,
                success: response => {
                    // const info = response.data // <-- !!!
                    dispatch(Creators.setLoading(false))
                    dispatch(Creators.setLoadingFailed(false))
                    dispatch(Creators.updateGroupInfo(info))
                    // history.push('/group/')
                },
                error: e => {
                    dispatch(Creators.setLoading(false))
                    dispatch(Creators.setLoadingFailed(true))
                    // WebIM.conn.setPresence()
                }
            })
        }
    },
    dissolveGroupAsync: ({ groupId, groupName }) => {
        debugger
        return (dispatch, getState) => {
            dispatch(Creators.setLoading(true))
            WebIM.conn.dissolveGroup({
                groupId,
                success: () => {
                    dispatch(Creators.setLoading(false))
                    dispatch(Creators.setLoadingFailed(false))
                    dispatch(Creators.dissolveGroup({ groupId, groupName }))
                },
                error: e => {
                    dispatch(Creators.setLoading(false))
                    dispatch(Creators.setLoadingFailed(true))
                }
            })
        }
    },
    inviteToGroupAsync: (groupId, users) => {
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
    listGroups: options => {
        return (dispatch, getState) => {
            WebIM.conn.listGroups(options)
        }
    },
    getGroupInfo: options => {
        return (dispatch, getState) => {
            WebIM.conn.getGroupInfo(options)
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
    byId: {},
    names: []
})

/* ------------- Reducers ------------- */
export const deleteGroup = (state, { groupId }) => {
    const byId = state.getIn([ "byId" ]).without(groupId)
    const names = []
    _.forEach(byId, (v, k) => {
        names.push(v.name)
    })
    return state.merge({ byId, names })
}

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
    let byId = {}
    let names = []
    groups.forEach(v => {
        byId[v.groupid] = v
        names.push(v.groupname + "_#-#_" + v.groupid)
    })
    return state.merge({
        byId,
        names: names.sort()
    })
}

/**
 * 
 * @param {*} state 
 * @param {Object} info 
 * @param {String|Number} info.groupId
 * @param {String} info.groupName
 * @param {String} info.description
 */
export const updateGroupInfo = (state, { info }) => {
    const group = state.getIn([ "byId", info.groupId ])
    const oldName = `${group.name}_#-#_${group.roomId}`
    const newName = `${info.groupName}_#-#_${group.roomId}`
    const names = state.getIn([ "names" ]).asMutable()
    names.splice(names.indexOf(oldName), 1, newName)

    return state.setIn([ "byId", info.groupId, "name" ], info.groupName).set("names", names.sort())
}

/**
 * 
 * @param {Object} state 
 * @param {Object} group
 * @param {String|Number} group.groupId
 * @param {String} group.groupName
 */
export const dissolveGroup = (state, { group }) => {
    const { groupId, groupName } = group
    let byId = state.getIn([ "byId" ]).without(groupId)
    const names = state.getIn([ "names" ]).asMutable()
    names.splice(names.indexOf(`${groupName}_#-#_${groupId}`), 1)
    return state.merge({
        byId,
        names: names.sort()
    })
}

export const switchRightSider = (state, { width }) => {
    const { rightSiderOffset } = width
    return state.merge({
        rightSiderOffset
    })
}

export const topGroup = (state, { groupId }) => {
    let names = state.getIn([ "names" ], Immutable([])).asMutable()
    for (let i = 0; i < names.length; i++) {
        const name = names[i]
        if (name.split("_#-#_")[1] === groupId) {
            if (i === 0) return state // if already top, return directly
            names = _.without(names, name)
            names.unshift(name)
            break
        }
    }
    return state.merge({ names })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.DELETE_GROUP]: deleteGroup,
    [Types.SET_LOADING]: setLoading,
    [Types.SET_LOADING_FAILED]: setLoadingFailed,
    [Types.UPDATE_GROUP]: updateGroup,
    [Types.UPDATE_GROUP_INFO]: updateGroupInfo,
    [Types.DISSOLVE_GROUP]: dissolveGroup,
    [Types.SWITCH_RIGHT_SIDER]: switchRightSider,
    [Types.TOP_GROUP]: topGroup
})

/* ------------- Selectors ------------- */
