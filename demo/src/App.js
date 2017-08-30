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
import Chat from "@/containers/chat/Chat"
import ChinaMobile from "@/containers/chinamobile/Chinamobile"
import Register from "@/containers/loginregister/Register"
import LoginActions from "@/redux/LoginRedux"
import Loading from "@/components/common/LoadingComponent"
import { store } from "@/redux"
import utils from "@/utils"

const debug = false

// const AuthorizedComponent = ({ token, Layout, ...rest }) => {
//     console.log("auth", token)
//     if (!token && !debug) {
//         return <Redirect to="/login" />
//     }

//     return <Layout {...rest} />

//     // return (
//     //     <Switch>
//     //         <Route path="/:selectTab/:selectItem" render={props => <Layout {...rest} />} />
//     //         <Route path="/:selectTab" render={props => <Layout {...rest} />} />
//     //     </Switch>
//     // )
// }

class AuthorizedComponent extends Component {
    render() {
        const { token, ...rest } = this.props

        console.log("auth", token)

        if (!token && !debug) {
            return <Redirect to="/login" />
        }

        return (
            <Switch>
                <Route path="/:selectTab/:selectItem" render={props => <Layout {...rest} />} />
                <Route path="/:selectTab" render={props => <Layout {...rest} />} />
            </Switch>
        )
    }
}

const A = withRouter(
    connect(
        ({ breakpoint, login }) => ({
            breakpoint,
            token: login.token,
            isLogin: login.isLogin,
            isLoading: login.fetching
        }),
        dispatch => ({
            loginByToken: (username, token) => dispatch(LoginActions.loginByToken(username, token))
        })
    )(AuthorizedComponent)
)

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
        console.log("App render:", isLogin, token, isLoading, hasToken)
        if (!isLogin && hasToken && !debug) return <Loading show={true} />

        // const authorizedComponent = <AuthorizedComponent {...this.props} token={token} Layout={Layout} />
        // const authorizedComponent = <Layout {...this.props} token={token} />

        return (
            <div>
                <Loading show={isLoading} />
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route path="/cnm" component={ChinaMobile} />
                    {/* <Route path="/" children={authorizedComponent} /> */}
                    {/* <Route path="/" component={AuthorizedComponent} /> */}
                    <Route path="/" render={props => <AuthorizedComponent {...this.props} token={token} />} />
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
            loginByToken: (username, token) => dispatch(LoginActions.loginByToken(username, token))
        })
    )(App)
)
