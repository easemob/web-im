// @flow

import {createReducer, createActions} from "reduxsauce"
import Immutable from "seamless-immutable"
import WebIM, {api} from "@/config/WebIM"
import Cookie from "js-cookie"
import {message} from "antd"
import {history} from "@/utils"
/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({

    jumpLogin: null,

})

export const RegisterTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({})

/* ------------- Reducers ------------- */
export const jumpLogin = (state) => {
    history.push("/login")
    return state
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.JUMP_LOGIN]: jumpLogin,
})

/* ------------- Selectors ------------- */
