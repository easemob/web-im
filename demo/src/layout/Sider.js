

import React from "react"
import classNames from "classnames"
import omit from "omit.js"
import PropTypes from "prop-types"
import { Icon } from "antd"
import { connect } from "react-redux"
import { config } from "@/config"

const { SIDER_COL_BREAK } = config

class Sider extends React.Component{
  static __ANT_LAYOUT_SIDER = true;

  static defaultProps = {
      prefixCls: "x-layout-sider",
      collapsible: false,
      defaultCollapsed: false,
      reverseArrow: false,
      width: 200,
      collapsedWidth: 64,
      style: {},
  };

  static childContextTypes = {
      siderCollapsed: PropTypes.bool,
  };

  constructor(props) {
      super(props)
      let collapsed
      if ("collapsed" in props) {
          collapsed = props.collapsed
      } else {
          collapsed = props.defaultCollapsed
      }
      this.state = {
          collapsed,
          below: false,
      }
  }

  getChildContext() {
      return {
          siderCollapsed: this.props.collapsed,
      }
  }

  setResponsive() {
      let matches = false// this.props.breakpoint[SIDER_COL_BREAK]

      this.setState({ below: matches })
      if (this.state.collapsed !== matches) {
          this.setCollapsed(matches, "responsive")
      }
  }

  componentWillReceiveProps(nextProps) {
      if ("collapsed" in nextProps) {
          this.setState({
              collapsed: nextProps.collapsed,
          })
      }
      this.props = nextProps
      this.setResponsive()
  }

  componentDidMount() {
      this.setResponsive()
  }

  componentWillUnmount() {
  }

  setCollapsed = (collapsed, type) => {
      if (!("collapsed" in this.props)) {
          this.setState({
              collapsed,
          })
      }
      const { onCollapse } = this.props
      if (onCollapse) {
          onCollapse(collapsed, type)
      }
  }

  toggle = () => {
      const collapsed = !this.state.collapsed
      this.setCollapsed(collapsed, "clickTrigger")
  }

  belowShowChange = () => {
      this.setState({ belowShow: !this.state.belowShow })
  }

  render() {
      const { prefixCls, className,
          collapsible, reverseArrow, trigger, style, width, collapsedWidth,
          ...others,
      } = this.props
      const divProps = omit(others, [ "collapsed",
          "defaultCollapsed", "onCollapse", "breakpoint" ])
      const siderWidth = this.state.collapsed ? collapsedWidth : width
      // special trigger when collapsedWidth == 0
      const zeroWidthTrigger = collapsedWidth === 0 || collapsedWidth === "0" ? (
          <span onClick={this.toggle} className={`${prefixCls}-zero-width-trigger`}>
              <Icon type="bars" />
          </span>
      ) : null
      const iconObj = {
          "expanded": reverseArrow ? <Icon type="right" /> : <Icon type="left" />,
          "collapsed": reverseArrow ? <Icon type="left" /> : <Icon type="right" />,
      }
      const status = this.state.collapsed ? "collapsed" : "expanded"
      const defaultTrigger = iconObj[status]
      const triggerDom = (
          trigger !== null ?
              zeroWidthTrigger || (
                  <div className={`${prefixCls}-trigger`} onClick={this.toggle}>
                      {trigger || defaultTrigger}
                  </div>
              ) : null
      )
      const divStyle = {
          ...style,
          // flex: `0 0 ${siderWidth}px`,
          left: "0",
          width: `${siderWidth}px`,
      }
      const siderCls = classNames(className, prefixCls, {
          [`${prefixCls}-collapsed`]: !!this.state.collapsed,
          [`${prefixCls}-has-trigger`]: !!trigger,
          [`${prefixCls}-below`]: !!this.state.below,
          [`${prefixCls}-zero-width`]: siderWidth === 0 || siderWidth === "0",
      })
      return (
          <div className={siderCls} {...divProps} style={divStyle}>
              <div className={`${prefixCls}-children`}>{this.props.children}</div>
              {collapsible || (this.state.below && zeroWidthTrigger) ? triggerDom : null}
          </div>
      )
  }
}

const ConnectedSider = connect((state = {}) => {
    return {
        breakpoint: state.breakpoint
    }
}, (dispatch) => {
    return {}
})(Sider)

export default ConnectedSider