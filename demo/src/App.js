import React, { Component } from "react"
import { connect } from "react-redux"
import {
	// BrowserRouter as Router,
	// HashRouter as Router,
	Route,
	Switch,
	Fade,
	Redirect,
	withRouter
} from "react-router-dom"
import Layout from "@/layout/DefaultLayout"
import Login from "@/containers/loginregister/Login"
import Register from "@/containers/loginregister/Register"
import Chat from "@/containers/chat/Chat"
import WebIMActions from "@/redux/WebIMRedux"
import LoginActions from "@/redux/LoginRedux"
import SubscribeActions from "@/redux/SubscribeRedux"
import BlacklistActions from "@/redux/BlacklistRedux"
import RosterActions from "@/redux/RosterRedux"
import MessageActions from "@/redux/MessageRedux"
import GroupActions from "@/redux/GroupRedux"
import Loading from "@/components/common/LoadingComponent"
import WebIM from "@/config/WebIM"
import { store } from "@/redux"
import utils from "@/utils"

const debug = false

const AuthorizedComponent = ({ token, Layout, ...rest }) => {
	// console.log("auth", token)
	if (!token && !debug) {
		return <Redirect to="/login" />
	}

	// todo
	return (
		<Switch>
			<Route
				path="/:selectTab/:selectItem"
				render={props => <Layout {...rest} />}
			/>
			<Route path="/:selectTab" render={props => <Layout {...rest} />} />
		</Switch>
	)
	// <Redirect from="/" to="/contact" />
	// <Redirect from="/" to={"/contact" + location.search} />
	//
}

class App extends Component {
	constructor() {
		super()

		this.state = {
			hasToken: utils.hasToken() && utils.getUserName()
		}
	}

	componentDidMount() {
		// 1. check user auth by cookie
		const { hasToken } = this.state
		const { loginByToken } = this.props
		if (hasToken && !debug) {
			loginByToken(utils.getUserName(), utils.getToken())
		}
	}

	componentWillReceiveProps() {}

	render() {
		const { isLogin, token, isLoading } = this.props
		const { hasToken } = this.state
		// console.log("App render:", isLogin, token, isLoading, hasToken)
		if (!isLogin && hasToken && !debug) return <Loading />

		const authorizedComponent = (
			<AuthorizedComponent {...this.props} token={token} Layout={Layout} />
		)

		return (
			<div>
				<Loading show={isLoading} />
				<Switch>
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />
					<Route path="/" children={authorizedComponent} />
				</Switch>
			</div>
		)
	}
}

export default withRouter(
	connect(
		({ breakpoint, login }) => ({
			breakpoint,
			token: login.token,
			isLogin: login.isLogin,
			isLoading: login.fetching
		}),
		dispatch => ({
			loginByToken: (username, token) =>
				dispatch(LoginActions.loginByToken(username, token))
		})
	)(App)
)
