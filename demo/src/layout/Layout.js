import React from "react"
import classNames from "classnames"
// import Sider from "./Sider"
import RightSider from "./RightSider"

function generator(props) {
    return BacicComponent => {
        // index++
        return class Adapter extends React.Component {
   static Header
   static Footer
   static Content
            // static Sider

   render() {
       const { prefixCls } = props
       // console.log("base", index, this.indexx)
       return <BacicComponent prefixCls={prefixCls} {...this.props} />
   }
        }
    }
}

class Basic extends React.Component {
    render() {
        const { prefixCls, className, children, ...others } = this.props
        let hasSider
        React.Children.forEach(children, element => {
            if (element && element.type && element.type.__ANT_LAYOUT_SIDER) {
                hasSider = true
            }
        })
        const divCls = classNames(className, prefixCls, {
            [`${prefixCls}-has-sider`]: hasSider
        })
        return (
            <div className={divCls} {...others}>
                {children}
            </div>
        )
    }
}

const Layout = generator({
    prefixCls: "x-layout"
})(Basic)

const Header = generator({
    prefixCls: "x-layout-header"
})(Basic)

const Footer = generator({
    prefixCls: "x-layout-footer"
})(Basic)

const Content = generator({
    prefixCls: "x-layout-content"
})(Basic)

Layout.Header = Header
Layout.Footer = Footer
Layout.Content = Content
// Layout.Sider = Sider
Layout.RightSider = RightSider

export default Layout
