import React from "react"
import {
    // BrowserRouter as Router,
    HashRouter as Router,
    Route,
    Link,
    Redirect,
    Switch,
    withRouter
} from "react-router-dom"
import AsyncComponents from "@/components/common/AsyncComponent"

// import { asyncComponent } from "./utils"
// import App from "./App"


const LoadableMyComponent = AsyncComponents({
    loader: () => import("./App")
})

const LoadableMyComponent2 = AsyncComponents({
    loader: () => import("./components/contact/ContactItem")
})

// const AsyncApp = asyncComponent(() => import("./App"))

const Routes = function ({ history, app }) {
    return (
        <Switch>
            <Route exact path="/login" component={LoadableMyComponent2}/>
        </Switch>
    )
}

export default Routes
