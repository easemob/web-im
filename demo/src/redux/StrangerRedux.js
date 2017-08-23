import {createReducer, createActions} from "reduxsauce"
import Immutable from "seamless-immutable"
import {WebIM} from "@/config"

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    updateStranger: ["stranger"],
    // ---------------async------------------

})

export const GroupsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    byName: {},
    byId: {},
    names: []
})

/* ------------- Reducers ------------- */

export const updateStranger = (state, {stranger}) => {
    let byName = {}
    let byId = {}
    byName[stranger.name] = stranger
    byId[stranger.roomId] = stranger
    return state.merge({
        byName,
        byId,
        names: Object.keys(byName).sort()
    })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.UPDATE_STRANGER]: updateStranger
})

/* ------------- Selectors ------------- */
