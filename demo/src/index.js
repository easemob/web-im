import React from "react"
import ReactDOM from "react-dom"
// antd theme
import "./App.css"
import "./themes/theme.less"
import registerServiceWorker from "./registerServiceWorker"

import {
	// BrowserRouter as Router,
	HashRouter as Router
} from "react-router-dom"
// redux
import { Provider } from "react-redux"
import { store } from "@/redux"
import App from "./App"

const rootEl = document.getElementById("root")
const render = Component =>
	ReactDOM.render(
		<Provider store={store}>
			<Router>
				<Component />
			</Router>
		</Provider>,
		rootEl
	)

render(App)
if (module.hot) module.hot.accept("./App", () => render(App))
registerServiceWorker()
