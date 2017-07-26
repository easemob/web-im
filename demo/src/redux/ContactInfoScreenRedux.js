import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  contactDeleted: [],
  contactShowed: []
})

export const ContactInfoScreenTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  show: true,
})

/* ------------- Reducers ------------- */

export const contactDeleted = (state, {}) => {
  return state.merge({show: false})
}

export const contactShowed = (state, {}) => {
  return state.merge({show: true})
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CONTACT_DELETED]: contactDeleted,
  [Types.CONTACT_SHOWED]: contactShowed,
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
