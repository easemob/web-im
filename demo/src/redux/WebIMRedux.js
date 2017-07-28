import { createReducer, createActions } from "reduxsauce"
import Immutable from "seamless-immutable"
import WebIM from "@/config/WebIM"
import RosterActions from "@/redux/RosterRedux"
import GroupActions from "@/redux/GroupRedux"
import { store } from "@/redux"

WebIM.conn.listen({
	// xmpp连接成功
	onOpened: msg => {
		console.log("onOpened")
		// 出席后才能接受推送消息
		WebIM.conn.setPresence()
		// 获取好友信息
		store.dispatch(RosterActions.getContacts())
		// 通知登陆成功
		store.dispatch(LoginActions.loginSuccess(msg))
		// 获取黑名单列表
		store.dispatch(BlacklistActions.getBlacklist())
		// 获取群组列表
		store.dispatch(GroupActions.getGroups())

		// this.props.history.push("/contact")
	},
	// 出席消息
	onPresence: msg => {
		console.debug("onPresence", msg, store.getState())
		switch (msg.type) {
			case "subscribe":
				// 加好友时双向订阅过程，所以当对方同意添加好友的时候
				// 会有一步对方自动订阅本人的操作，这步操作是自动发起
				// 不需要通知提示，所以此处通过state=[resp:true]标示
				if (msg.status === "[resp:true]") {
					return
				}

				store.dispatch(SubscribeActions.addSubscribe(msg))
				break
			case "subscribed":
				store.dispatch(RosterActions.getContacts())
				Alert.alert(msg.from + " " + I18n.t("subscribed"))
				break
			case "unsubscribe":
				// TODO: 局部刷新
				store.dispatch(RosterActions.getContacts())
				break
			case "unsubscribed":
				// 好友退订消息
				store.dispatch(RosterActions.getContacts())
				Alert.alert(msg.from + " " + I18n.t("unsubscribed"))
				break
		}
	},
	// 各种异常
	onError: error => {
		console.log(error)
		// 16: server-side close the websocket connection
		if (error.type == WebIM.statusCode.WEBIM_CONNCTION_DISCONNECTED) {
			console.log(
				"WEBIM_CONNCTION_DISCONNECTED",
				WebIM.conn.autoReconnectNumTotal,
				WebIM.conn.autoReconnectNumMax
			)
			if (WebIM.conn.autoReconnectNumTotal < WebIM.conn.autoReconnectNumMax) {
				return
			}
			Alert.alert("Error", "server-side close the websocket connection")
			NavigationActions.login()
			return
		}
		// 8: offline by multi login
		if (error.type == WebIM.statusCode.WEBIM_CONNCTION_SERVER_ERROR) {
			console.log("WEBIM_CONNCTION_SERVER_ERROR")
			Alert.alert("Error", "offline by multi login")
			NavigationActions.login()
			return
		}
		if (error.type == 1) {
			let data = error.data ? error.data.data : ""
			data && Alert.alert("Error", data)
			store.dispatch(LoginActions.loginFailure(error))
		}
	},
	// 连接断开
	onClosed: msg => {
		console.log("onClosed")
	},
	// 更新黑名单
	onBlacklistUpdate: list => {
		store.dispatch(BlacklistActions.updateBlacklist(list))
	},
	// 文本信息
	onTextMessage: message => {
		console.log("onTextMessage", message)
		store.dispatch(MessageActions.addMessage(message, "txt"))
	},
	onPictureMessage: message => {
		console.log("onPictureMessage", message)
		store.dispatch(MessageActions.addMessage(message, "img"))
	}
})

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
	subscribe: ["msg"],
	removeSubscribe: ["name"],
	// ----------------async------------------
	// 登出
	logout: () => {
		return (dispatch, state) => {
			if (WebIM.conn.isOpened()) {
				WebIM.conn.close("logout")
			}

			dispatch({ type: "USER_LOGOUT" })

			NavigationActions.login({ type: ActionConst.REPLACE })
		}
	}
})

export const WebIMTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
	msgs: {},
	subscribes: {}
})

/* ------------- Reducers ------------- */

export const subscribe = (state, { msg }) => {
	return state.merge(
		{
			subscribes: Immutable(state.subscribes).set(msg.from, msg)
		},
		{ deep: true }
	)
}

export const removeSubscribe = (state, { name }) => {
	let subs = state.subscribes.asMutable()
	delete subs[name]
	return state.merge({
		subscribes: Immutable(subs)
	})
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
	[Types.SUBSCRIBE]: subscribe,
	[Types.REMOVE_SUBSCRIBE]: removeSubscribe
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
// export const isLoggedIn = (loginState: Object) => loginState.username !== null

/** Constants: Connection Status Constants
 *  Connection status constants for use by the connection handler
 *  callback.
 *
 *  Status.ERROR - An error has occurred
 *  Status.CONNECTING - The connection is currently being made
 *  Status.CONNFAIL - The connection attempt failed
 *  Status.AUTHENTICATING - The connection is authenticating
 *  Status.AUTHFAIL - The authentication attempt failed
 *  Status.CONNECTED - The connection has succeeded
 *  Status.DISCONNECTED - The connection has been terminated
 *  Status.DISCONNECTING - The connection is currently being terminated
 *  Status.ATTACHED - The connection has been attached
 *  Status.CONNTIMEOUT - The connection has timed out
 */
