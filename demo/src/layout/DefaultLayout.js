import React, { Component } from "react"
import { Icon } from "antd"
import Layout from "./Layout"
import { connect } from "react-redux"
import ContactItem from "@/components/contact/ContactItem"
import { config } from "@/config"

const { SIDER_COL_BREAK, SIDER_COL_WIDTH, SIDER_WIDTH } = config
const { Header, Content, Footer, Sider } = Layout

class DefaultLayout extends Component {
	constructor({ breakpoint }) {
		super()

		this.state = {
			collapsed: breakpoint[SIDER_COL_BREAK] || false
		}
	}

	toggle = collapsed => {
		this.setState({
			collapsed
		})
	}

	componentWillReceiveProps(nextProps) {
		const { breakpoint } = this.props
		const nextBeakpoint = nextProps.breakpoint

		if (breakpoint[SIDER_COL_BREAK] != nextBeakpoint[SIDER_COL_BREAK]) {
			this.toggle(nextBeakpoint[SIDER_COL_BREAK])
		}
	}

	render() {
		const { collapsed } = this.state
		return (
			<Layout>
				<Header className="header">
					<Icon
						className="trigger"
						type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
						onClick={this.toggle}
					/>
				</Header>
				<Content>
					<Layout style={{ flex: "none" }}>
						<Sider
							trigger={null}
							collapsed={collapsed}
							width={SIDER_WIDTH}
							collapsedWidth={SIDER_COL_WIDTH}
						>
							<ContactItem
								collapse={collapsed}
								onClick={e => {
									return console.log(e.key)
								}}
							/>
						</Sider>
						<Content
							className="responsive"
							style={{
								overflow: "scroll",
								margin: collapsed
									? `24px 16px 0 ${16 + SIDER_COL_WIDTH}px`
									: `24px 16px 0 ${16 + SIDER_WIDTH}px`
							}}
						>
							{/*<div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
								content
							</div>*/}
							{this.props.children}
						</Content>
						<Footer style={{ textAlign: "center" }}>
							Ant Design ©2016 Created by Ant UED
						</Footer>
					</Layout>
				</Content>
			</Layout>
		)
	}
}

export default connect(
	({ breakpoint }) => ({
		breakpoint
	}),
	dispatch => ({})
)(DefaultLayout)

// export default DefaultLayout
