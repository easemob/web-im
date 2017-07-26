import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  nop: [''],
  nopFunc: null,
  asyncFunc: () => {
    return (dispatch, getState) => {

    }
  }
})

export const DemoTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  error: null,
  fetching: false,
})

/* ------------- Reducers ------------- */

export const request = (state, {username, password}) => {
  return state.merge({fetching: true, error: false})
}

export const success = (state, {msg}) => {
  return state.merge({fetching: false, error: false, msg})
}

export const failure = (state, {error}) => {
  return state.merge({fetching: false, error: true})
}

// we've logged out
export const logout = (state) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.NOP]: request,
  [Types.NOP_FUNC]: request,
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isLoggedIn = (loginState) => loginState.username !== null
