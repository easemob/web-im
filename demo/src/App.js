import React, { Component } from "react"
import { Menu, Icon } from "antd"
import Layout from "./layout"
import "./App.css"
import { connect } from "react-redux"
import { SIDER_COL_BREAK, SIDER_COL_WIDTH, SIDER_WIDTH } from "@/config"
import ContactItem from "@/components/contact/ContactItem"

const { Header, Content, Footer, Sider } = Layout

class App extends Component {
	state = {
		collapsed: false
	}
	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed
		})
	}

	render() {
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
							width={SIDER_WIDTH}
							collapsedWidth={SIDER_COL_WIDTH}
							onCollapse={(collapsed, type) => {
								console.log(collapsed, type)
							}}
						>
							<Menu mode="inline" defaultSelectedKeys={["4"]}>
								<Menu.Item key="1" className="xxx">
									<Icon type="user" />
									<span className="nav-text">nav 1</span>
								</Menu.Item>
								<Menu.Item key="2">
									<Icon type="video-camera" />
									<span className="nav-text">nav 2</span>
								</Menu.Item>
								<Menu.Item key="3">
									<Icon type="upload" />
									<span className="nav-text">nav 3</span>
								</Menu.Item>
								<Menu.Item key="4">
									<Icon type="user" />
									<span className="nav-text">nav 4</span>
								</Menu.Item>
							</Menu>
						</Sider>
						<Content
							className="responsive"
							style={{
								// margin: "24px 16px 0",
								overflow: "scroll",
								margin: this.props.breakpoint[SIDER_COL_BREAK]
									? `24px 16px 0 ${16 + SIDER_COL_WIDTH}px`
									: `24px 16px 0 ${16 + SIDER_WIDTH}px`
							}}
						>
							<div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
								content
							</div>
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
	(state = {}) => {
		return {
			breakpoint: state.breakpoint
		}
	},
	dispatch => {
		return {}
	}
)(App)
