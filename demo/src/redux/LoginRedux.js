// @flow

import { createReducer, createActions } from "reduxsauce"
import Immutable from "seamless-immutable"
import WebIM, { api } from "@/config/WebIM"
import Cookie from "js-cookie"
import { message } from "antd"

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
	setLoginToken: ["username", "token"],
	setLoging: ["username", "password", "token"],
	setLoginSuccess: ["username"],
	loginFailure: ["error"],
	registerRequest: ["username", "password"],
	registerSuccess: ["json"],
	registerFailure: ["registerError"],
	logout: null,

	// ------------- async -----------------
	register: (username, password) => {
		return (dispatch, getState) => {
			let options = {
				username: username.trim().toLowerCase(),
				password: password,
				nickname: username.trim().toLowerCase()
			}
			// console.log(options)
			dispatch(Creators.registerRequest(username, password))

			// must be https for mac policy
			return api
				.register(options)
				.then(({ data }) => {
					if (data.error) {
						// Alert.alert('Error', data.error_description)
						dispatch(Creators.registerFailure(data))
						return Promise.reject()
					}

					// Alert.alert('Success')
					dispatch(Creators.registerSuccess(data))
					// NavigationActions.login()
				})
				.catch(() => {
					console.log("error")
				})
		}
	},
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
					message.success("login success", 1)

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
				// there is no success callback whene login by token
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
	Cookie.set("web_im_" + username, token)
	return Immutable.merge(state, {
		username: username,
		token
	})
}

// we're attempting to login
export const setLoging = (
	state = INITIAL_STATE,
	{ username, password, token }
) => {
	return Immutable.merge(state, {
		username,
		password,
		token,
		fetching: true,
		error: false
	})
}

// we've successfully logged in
export const setLoginSuccess = state => {
	return Immutable.merge(state, { isLogin: true })
}

// we've had a problem logging in
export const failure = (state, { error }) => {
	return Immutable.merge(state, { fetching: false, error: error })
}

export const registerRequest = (
	state = INITIAL_STATE,
	{ username, password }
) => {
	return Immutable.merge(state, { username, password, fetching: true })
}

export const registerSuccess = (state = INITIAL_STATE, { json }) => {
	return Immutable.merge(state, { fetching: false, json, registerError: null })
}

export const registerFailure = (state = INITIAL_STATE, { registerError }) => {
	return Immutable.merge(state, { fetching: false, registerError })
}

// we've logged out
export const logout = state => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
	[Types.SET_LOGIN_TOKEN]: setLoginToken,
	[Types.SET_LOGING]: setLoging,
	[Types.SET_LOGIN_SUCCESS]: setLoginSuccess,
	[Types.LOGIN_FAILURE]: failure,
	[Types.REGISTER_REQUEST]: registerRequest,
	[Types.REGISTER_SUCCESS]: registerSuccess,
	[Types.REGISTER_FAILURE]: registerFailure,
	[Types.LOGOUT]: logout
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isLoggedIn = loginState => loginState.username !== null
