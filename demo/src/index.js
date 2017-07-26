import React from "react"
import ReactDOM from "react-dom"
// antd theme
import "./App.css"
import "./themes/theme.less"
import registerServiceWorker from "./registerServiceWorker"

// redux
import { Provider } from "react-redux"
import { store } from "@/redux"
import App from "./App"

const rootEl = document.getElementById("root")
const render = Component =>
	ReactDOM.render(
		<Provider store={store}>
			<Component />
		</Provider>,
		rootEl
	)

render(App)
if (module.hot) module.hot.accept("./App", () => render(App))
registerServiceWorker()
