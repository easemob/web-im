import React, {Component} from "react"
import {connect} from "react-redux"
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
import {store} from "@/redux"
import utils from "@/utils"

const debug = false

const AuthorizedComponent = ({token, Layout, ...rest}) => {
    console.log("auth", token)
    if (!token && !debug) {
        return <Redirect to="/login"/>
    }

    // todo
    return (
        <Switch>
            <Route
                path="/:selectTab/:selectItem"
                render={props => <Layout {...rest} />}
            />
            <Route path="/:selectTab" render={props => <Layout {...rest} />}/>
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
        const {hasToken} = this.state
        const {loginByToken} = this.props
        if (hasToken && !debug) {
            loginByToken(utils.getUserName(), utils.getToken())
        }
    }

    componentWillReceiveProps() {
    }

    render() {
        const {isLogin, token} = this.props
        const {hasToken} = this.state
        console.log('App render:', hasToken, isLogin, debug)
        if (!isLogin && hasToken && !debug) return <Loading />

        const authorizedComponent = (
            <AuthorizedComponent {...this.props} token={token} Layout={Layout}/>
        )

        // console.log("logged")
        return (
            <Switch>
                <Route exact path="/login" component={Login}/>
                <Route path="/" children={authorizedComponent}/>
            </Switch>
        )
    }
}

export default withRouter(
    connect(
        ({breakpoint, login}) => ({
            breakpoint,
            token: login.token,
            isLogin: login.isLogin
        }),
        dispatch => ({
            loginByToken: (username, token) =>
                dispatch(LoginActions.loginByToken(username, token))
        })
    )(App)
)
