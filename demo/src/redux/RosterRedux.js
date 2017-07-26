import { createReducer, createActions } from "reduxsauce"
import Immutable from "seamless-immutable"
import WebIM from "@/config/WebIM"

import CommonActions from "@/redux/CommonRedux"

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
	updateRoster: ["roster"],
	// ----------------async------------------
	// 获取好友列表
	getContacts: () => {
		return (dispatch, getState) => {
			WebIM.conn.getRoster({
				success: roster => {
					dispatch(Creators.updateRoster(roster))
				},
				error: error => {
					//TODO ERROR
				}
			})
		}
	},
	// 删除联系人
	removeContact: id => {
		return (dispatch, getState) => {
			//loading
			dispatch(CommonActions.fetching())
			WebIM.conn.removeRoster({
				to: id,
				success: function() {
					//loading end
					dispatch(CommonActions.fetched())
					dispatch(Creators.getContacts())

					WebIM.conn.unsubscribed({
						to: id
					})
				},
				error: function() {
					//TODO ERROR
				}
			})
		}
	},
	// 添加联系人
	addContact: id => {
		return (dispatch, getState) => {
			WebIM.conn.subscribe({
				to: id,
				message: I18n.t("request")
			})
		}
	}
})

export const RosterTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
	byName: null,
	names: [],
	friends: []
})

/* ------------- Reducers ------------- */
function isFriend(v) {
	return v.subscription != "none"
}

export const updateRoster = (state, { roster }) => {
	let byName = {},
		names = [],
		friends = []
	roster.forEach(v => {
		byName[v.name] = v
		names = Object.keys(byName).sort()
		isFriend(v) && friends.push(v.name)
	})
	return state.merge({
		byName,
		names,
		friends
	})
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
	[Types.UPDATE_ROSTER]: updateRoster
})

/* ------------- Selectors ------------- */
