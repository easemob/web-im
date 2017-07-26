import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  fetching: [],
  fetched: [],
})

export const CommonTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: false,
})

/* ------------- Reducers ------------- */

export const fetching = (state) => {
  return state.merge({fetching: true})
}

export const fetched = (state) => {
  return state.merge({fetching: false})
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCHING]: fetching,
  [Types.FETCHED]: fetched,
})

/* ------------- Selectors ------------- */
