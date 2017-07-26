import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  updateGroupInfo: ['info'],
  updateGroup: ['groups'],
  // ---------------async------------------
  getGroups: () => {
    return (dispatch, getState) => {
      WebIM.conn.listRooms({
        success: function (rooms) {
          dispatch(Creators.updateGroup(rooms))
        },
        error: function (e) {
          WebIM.conn.setPresence();
        }
      });
    }
  },
})

export const GroupsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  byName: {},
  names: [],
})

/* ------------- Reducers ------------- */
// [{jid,name,roomId}] groups
export const updateGroup = (state, {groups}) => {
  let byName = {}
  let byId = {}
  groups.forEach((v) => {
    byName[v.name] = v
    byId[v.roomId] = v
  })
  return state.merge({
    byName,
    byId,
    names: Object.keys(byName).sort()
  })
}

// [{affiliations,description,maxusers,name,occupants,owner}] info
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
  state.group.byName[info.name]
  return {}
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_GROUP]: updateGroup,
})

/* ------------- Selectors ------------- */
