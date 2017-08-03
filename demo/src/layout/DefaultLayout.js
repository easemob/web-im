import React, { Component } from "react"
import { Icon } from "antd"
import Layout from "./Layout"
import { connect } from "react-redux"
import { withRouter, Route } from "react-router-dom"
//import ContactItem from "@/components/contact/ContactItem"
import Contact from "@/containers/contact/Contact"
import Chat from "@/containers/chat/Chat"
import HeaderTab from "@/components/header/HeaderTab"
import HeaderOps from "@/components/header/HeaderOps"
import { config } from "@/config"

const { SIDER_COL_BREAK, SIDER_COL_WIDTH, SIDER_WIDTH } = config
const { Header, Content, Footer, Sider } = Layout

class DefaultLayout extends Component {
	constructor({ breakpoint, match }) {
		super()
		const { selectTab, selectItem = "" } = match.params
		console.log(selectTab, selectItem)

		this.state = {
			collapsed: breakpoint[SIDER_COL_BREAK] || false,
			selectTab: selectTab,
			selectItem: selectItem,
			headerTabs: [
				{
					key: "contact",
					name: "Chat"
				},
				{
					key: "group",
					name: "Groups"
				},
				{
					key: "room",
					name: "Chat Rooms"
				},
				{
					key: "friends",
					name: "Friends"
				}
			],
			contactItems: []
		}

		this.changeItem = this.changeItem.bind(this)
		this.changeTab = this.changeTab.bind(this)
	}

	toggle = collapsed => {
		this.setState({
			collapsed
		})
	}

	// 切换聊天类型
	changeTab(e) {
		const { history, location } = this.props
		const { selectItem, selectTab } = this.state
		const redirectPath = "/" + [e.key].join("/")
		if (selectTab == e.key) return
		history.push(redirectPath + location.search)
	}

	// 切换联系人
	changeItem(e) {
		const { history, location } = this.props
		const { selectItem, selectTab } = this.state
		const redirectPath = "/" + [selectTab, e.key].join("/")
		if (selectTab == e.key) return
		history.push(redirectPath + location.search)
	}

	setSelectStatus() {
		const { history, location, match } = this.props
		const { selectTab, selectItem = "" } = match.params
		console.log(match)
		this.setState({
			selectTab,
			selectItem
		})
	}

	componentDidMount() {
		// this.setSelectStatus()
	}

	componentWillReceiveProps(nextProps) {
		console.log(
			"componentWillReceiveProps",
			this.props.location.pathname,
			nextProps.location.pathname
		)
		const { breakpoint, location } = this.props
		const nextBeakpoint = nextProps.breakpoint

		if (breakpoint[SIDER_COL_BREAK] != nextBeakpoint[SIDER_COL_BREAK]) {
			this.toggle(nextBeakpoint[SIDER_COL_BREAK])
		}

		if (location.pathname != nextProps.location.pathname) {
			this.props = nextProps
			console.log("componentWillReceiveProps", location)
			this.setSelectStatus()
		}
	}
	//
	//

	render() {
		const { collapsed, selectTab, selectItem, headerTabs } = this.state
		console.log(selectItem, selectTab)
		return (
			<Layout>
				<Header className="header">
					<HeaderOps />
					<HeaderTab
						collapsed={collapsed}
						items={headerTabs}
						selectedKeys={[selectTab]}
						onClick={this.changeTab}
					/>
				</Header>
				<Content className="x-layout-main">
					<div
						className="x-layout-sider"
						style={{
							// sider full display when breakpoint
							width: collapsed ? "100%" : SIDER_WIDTH,
							// sider display to left when breakpoint and has selectItem
							left: selectItem && collapsed ? "-100%" : 0
						}}
					>
						<Contact
							collapsed={false}
							onClick={this.changeItem}
							selectedKeys={[selectItem]}
						/>
					</div>
					<Content
						className="x-layout-chat"
						style={{
							overflow: "scroll",
							margin: collapsed ? `0` : `0 0 0 ${SIDER_WIDTH}px`
						}}
					>
						<Route
							path="/:selectTab/:selectItem"
							render={props => <Chat collapsed={collapsed} {...props} />}
						/>
					</Content>
					{/*<Footer style={{ textAlign: "center" }}>
							Ant Design ©2016 Created by Ant UED
						</Footer>*/}
				</Content>
			</Layout>
		)
	}
}

export default withRouter(
	connect(
		({ breakpoint, entities }) => ({
			breakpoint
		}),
		dispatch => ({})
	)(DefaultLayout)
)

// export default DefaultLayout
