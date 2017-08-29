import { createReducer, createActions } from "reduxsauce"
import Immutable from "seamless-immutable"
import _ from "lodash"

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    updateStranger: ["stranger"]
    // ---------------async------------------
})

export const GroupsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    names: []
})

/* ------------- Reducers ------------- */

export const updateStranger = (state, { stranger }) => {
    let names = state.names.asMutable()
    if (!_.includes(names, stranger)) {
        names.push(stranger)
    }
    state = state.set("names", names)
    return state
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.UPDATE_STRANGER]: updateStranger
})

/* ------------- Selectors ------------- */
