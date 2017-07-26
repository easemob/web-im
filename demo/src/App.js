import React, { Component } from "react"
import { connect } from "react-redux"
import {
	// BrowserRouter as Router,
	HashRouter as Router,
	Route,
	Switch,
	Fade
} from "react-router-dom"
// import Routes from "./Routes"
import Layout from "@/layout/DefaultLayout"
import Login from "@/containers/login/Login"

import WebIMActions from "@/redux/WebIMRedux"
import LoginActions from "@/redux/LoginRedux"
import SubscribeActions from "@/redux/SubscribeRedux"
import BlacklistActions from "@/redux/BlacklistRedux"
import RosterActions from "@/redux/RosterRedux"
import MessageActions from "@/redux/MessageRedux"
import GroupActions from "@/redux/GroupRedux"

class App extends Component {
	constructor() {
		super()
		// store.dispatch(LoginActions.login('lwz2', '1'))
		// store.dispatch(LoginActions.login('w', 'w'))

		WebIM.conn.listen({
			// xmpp连接成功
			onOpened: msg => {
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

				NavigationActions.contacts()
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
					if (
						WebIM.conn.autoReconnectNumTotal < WebIM.conn.autoReconnectNumMax
					) {
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
	}

	componentWillReceiveProps() {}

	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/login" component={Login} />
					<Route
						path="/"
						children={props => {
							console.log(props)
							return (
								<Layout {...props}>
									<Route path="/1" component={null} />
								</Layout>
							)
						}}
					/>
				</Switch>
			</Router>
		)
	}
}

export default connect(({ breakpoint }) => ({ breakpoint }), dispatch => ({}))(
	App
)
