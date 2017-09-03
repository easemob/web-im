import React from "react"
import ReactDOM from "react-dom"

// 无法使用redux
export default function overlay({ component, ...rest }) {
    const dom = document.createElement("div")
    document.body.appendChild(dom)

    function close() {
        const isUnmount = ReactDOM.unmountComponentAtNode(dom)
        if (isUnmount && dom.parentNode) {
            dom.parentNode.removeChild(dom)
        }
    }

    const C = component || null

    rest.close = close

    return {
        show: () => {
            ReactDOM.render(<C {...rest} />, dom)
        },
        close
    }
}
