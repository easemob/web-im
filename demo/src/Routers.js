import React from "react"
import {
	BrowserRouter as Router,
	Route,
	Link,
	Redirect,
	withRouter
} from "react-router-dom"

// import { asyncComponent } from "./utils"
import App from "./App"

// const AsyncApp = asyncComponent(() => import("./App"))

const Routers = function({ history, app }) {
	return (
		<Router>
			<App />
		</Router>
	)
}

export default Routers
