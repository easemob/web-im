import "babel-polyfill"
import React from "react"
import ReactDOM from "react-dom"
// antd theme
import "./App.css"
import "./themes/theme.less"
import registerServiceWorker from "./registerServiceWorker"
import {history} from "@/utils"

import {
    // BrowserRouter as Router,
    // HashRouter as Router
    Router
} from "react-router-dom"
// redux
import {Provider} from "react-redux"
import {store} from "@/redux"
import App from "./App"
// fix android browsers compatibilities
import "babel-polyfill"

var FastClick = require("fastclick")
FastClick.attach(document.body)

const rootEl = document.getElementById("root")
const render = Component =>
    ReactDOM.render(
        <Provider store={store}>
            <Router history={history}>
                <Component />
            </Router>
        </Provider>,
        rootEl
    )

render(App)
if (module.hot) module.hot.accept("./App", () => render(App))
registerServiceWorker()
