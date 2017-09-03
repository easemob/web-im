// @flow

import { createReducer, createActions } from "reduxsauce"
import Immutable from "seamless-immutable"
import WebIM, { api } from "@/config/WebIM"
import Cookie from "js-cookie"
import { message } from "antd"
import { history } from "@/utils"
import { store } from "@/redux"


/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    setLoginToken: [ "username", "token" ],
    setLoging: [ "username", "password", "token" ],
    stopLoging: null,
    setLoginSuccess: [ "username" ],
    loginFailure: [ "error" ],
    jumpRegister: null,
    logout: null,

    // ------------- async -----------------

    login: (username, password) => {
        return (dispatch, getState) => {
            dispatch(Creators.setLoging(username, password, null))

            if (WebIM.conn.isOpened()) {
                WebIM.conn.close("logout")
            }
            WebIM.conn.open({
                apiUrl: WebIM.config.apiURL,
                user: username.trim().toLowerCase(),
                pwd: password,
                //  accessToken: password,
                appKey: WebIM.config.appkey,
                success(token) {
                    let I18N = store.getState().i18n.translations[store.getState().i18n.locale]
                    message.success(I18N.loginSuccessfully, 1)

                    dispatch(Creators.setLoginToken(username, token.access_token))
                    dispatch(Creators.setLoginSuccess(username))
                }
            })
        }
    },
    loginByToken: (username, token) => {
        return (dispatch, getState) => {
            dispatch(Creators.setLoging(username, null, token))

            if (WebIM.conn.isOpened()) {
                WebIM.conn.close("logout")
            }
            console.log("open", username, token)
            WebIM.conn.open({
                apiUrl: WebIM.config.apiURL,
                user: username.trim().toLowerCase(),
                pwd: token,
                accessToken: token,
                appKey: WebIM.config.appkey
                // there is no success callback when login by token
                // success(token) {
                // }
            })
        }
    }
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    username: null,
    token: null,
    error: null,
    fetching: false,
    registerError: null,
    isLoadingToken: false,
    //
    hasToken: false,
    isLogin: false
})

/* ------------- Reducers ------------- */
export const setLoginToken = (state = INITIAL_STATE, { username, token }) => {
    console.log("setLoginToken")
    Cookie.set("web_im_" + username, token)
    return Immutable.merge(state, {
        username: username,
        token
    })
}

// we're attempting to login
export const setLoging = (state = INITIAL_STATE,
    { username, password, token }) => {
    return Immutable.merge(state, {
        username,
        password,
        token,
        fetching: true,
        error: false
    })
}

export const stopLoging = (state = INITIAL_STATE) => {
    return Immutable.merge(state, {
        fetching: false,
    })
}

// we've successfully logged in
export const setLoginSuccess = state => {
    return Immutable.merge(state, { isLogin: true })
}

// we've had a problem logging in
export const failure = (state, { error }) => {
    return Immutable.merge(state, { error: error })
}


// we've logged out
export const logout = (state = INITIAL_STATE) => {
    console.log("reducer logout")
    return state
}

export const jumpRegister = (state) => {
    history.push("/register")
    return state
}


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.SET_LOGIN_TOKEN]: setLoginToken,
    [Types.SET_LOGING]: setLoging,
    [Types.STOP_LOGING]: stopLoging,
    [Types.SET_LOGIN_SUCCESS]: setLoginSuccess,
    [Types.LOGIN_FAILURE]: failure,
    [Types.LOGOUT]: logout,
    [Types.JUMP_REGISTER]: jumpRegister,
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isLoggedIn = state => state.username !== null
