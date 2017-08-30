import { createReducer, createActions } from "reduxsauce"
import Immutable from "seamless-immutable"
import _ from "lodash"

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    updateStranger: ["stranger"],
    addFriend: ["stranger"],
    deleteStranger: ["stranger"]
    // ---------------async------------------
})

export const StrangerTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    byId: {}
})

/* ------------- Reducers ------------- */

export const updateStranger = (state, { stranger }) => {
    let byId = state.byId.asMutable()
    // TODO： messages as value
    byId[stranger] = 1
    return state.merge({ byId: byId })
}

export const addFriend = (state, { stranger }) => {
    console.log("addFriend", stranger)
    return state
}

export const deleteStranger = (state, { stranger }) => {
    console.log("deleteStranger", stranger)
    return state
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.UPDATE_STRANGER]: updateStranger,
    [Types.ADD_FRIEND]: addFriend,
    [Types.DELETE_STRANGER]: deleteStranger
})

/* ------------- Selectors ------------- */
