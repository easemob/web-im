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
import Login from "@/containers/login/Login"
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

const AuthorizedComponent = ({ token, Layout, ...rest }) => {
	console.log("auth", token)
	if (!token) {
		return <Redirect to="/login" />
	}
	return (
		<Layout {...rest}>
			<Route path="/contact" component={null} />
			<Route path="/group" component={null} />
			<Route path="/room" component={null} />
		</Layout>
	)
}

class App extends Component {
	constructor() {
		super()
	}

	componentDidMount() {
		// 1. check user auth by cookie
	}

	componentWillReceiveProps() {}

	render() {
		const { token, hasToken, isLogin } = this.props
		// logining...
		if (!isLogin && hasToken) return <Loading />

		const authorizedComponent = (
			<AuthorizedComponent token={token} Layout={Layout} />
		)

		return (
			<Switch>
				<Route exact path="/login" component={Login} />
				<Route path="/" children={authorizedComponent} />
			</Switch>
		)
	}
}

export default withRouter(
	connect(
		({ breakpoint, login }) => ({
			breakpoint,
			token: login.token
		}),
		dispatch => ({})
	)(App)
)
