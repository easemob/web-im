import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  updateGroupMember: ['id', 'members'],
  // ---------------async------------------
  getGroupMember: (id) => {
    return (dispatch, getState) => {
      WebIM.conn.queryRoomMember({
        roomId: id,
        success: function (members) {
          dispatch(Creators.updateGroupMember(id, members))
        },
        error: function () {
        }
      });
    }
  },
})

export const GroupMemberTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({})

/* ------------- Reducers ------------- */
// [{jid,name,roomId}] members
export const updateGroupMember = (state, {id, members}) => {
  let byName = {}
  members.forEach((v) => {
    let name = (v.jid.match(/_(.*?)@/))[1]
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
  [Types.UPDATE_GROUP_MEMBER]: updateGroupMember,
})

/* ------------- Selectors ------------- */
