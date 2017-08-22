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
    registerRequest: ["username", "password", "nickname"],
    registerSuccess: ["username"],
    registerFailure: ["registerError"],
    // ------------- async -----------------

    register: (username, password, nickname) => {
        return (dispatch, getState) => {
            let options = {
                username: username.trim().toLowerCase(),
                password: password,
                nickname: nickname ? nickname.trim().toLowerCase() : ""
            }
            dispatch(Creators.registerRequest(username, password, nickname))

            return api
                .post("/users", options)
                .then(({data}) => {
                    dispatch(Creators.registerSuccess(username))
                })
        }
    },
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

export const register = (state = INITIAL_STATE) => {
    return state
}

export const registerRequest = (state = INITIAL_STATE,
                                {username, password}) => {
    return Immutable.merge(state, {username, password, fetching: true})
}

export const registerSuccess = (state = INITIAL_STATE, {username}) => {
    message.success(username + " register successed!")
    history.push("/login")
    return Immutable.merge(state, {fetching: false, registerError: null})
}

export const registerFailure = (state = INITIAL_STATE, {registerError}) => {
    console.log('registerFailure', registerError)
    return Immutable.merge(state, {fetching: false, registerError})
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.JUMP_LOGIN]: jumpLogin,
    [Types.REGISTER]: register,
    [Types.REGISTER_REQUEST]: registerRequest,
    [Types.REGISTER_SUCCESS]: registerSuccess,
    [Types.REGISTER_FAILURE]: registerFailure,
})

/* ------------- Selectors ------------- */
