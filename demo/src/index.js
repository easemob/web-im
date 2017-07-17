import React from "react"
import ReactDOM from "react-dom"
// antd theme
import "./index.css"
import registerServiceWorker from "./registerServiceWorker"

// redux
import { Provider } from "react-redux"
import { store } from "@/redux"
import conf from "@/config"

// component
import Routers from "./Routers"

import "./theme.less"

console.log(conf)

ReactDOM.render(
	<Provider store={store}>
		<Routers />
	</Provider>,
	document.getElementById("root")
)
registerServiceWorker()
