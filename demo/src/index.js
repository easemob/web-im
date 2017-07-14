import React from "react"
import ReactDOM from "react-dom"
// antd theme
import "./index.css"
import registerServiceWorker from "./registerServiceWorker"

// redux
import { Provider } from "react-redux"
import { store } from "@/redux"

// component
import Routers from "./Routers"

import "./theme.less"

ReactDOM.render(
	<Provider store={store}>
		<Routers />
	</Provider>,
	document.getElementById("root")
)
registerServiceWorker()
