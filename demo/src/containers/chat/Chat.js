import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { Button, Row, Form, Input, Icon } from "antd"
import { config } from "@/config"
import ListItem from "@/components/list/ListItem"
import styles from "./style/index.less"
import LoginActions from "@/redux/LoginRedux"
import WebIM from "@/config/WebIM"
const { TextArea } = Input
const FormItem = Form.Item

const Chat = ({
	collapsed,
	match,
	history,
	location
	// form: { getFieldDecorator, validateFieldsAndScroll }
}) => {
	const { selectItem, selectTab } = match.params
	console.log(collapsed, selectTab, selectItem)

	const back = () => {
		const redirectPath = "/" + [selectTab].join("/") + location.search
		history.push(redirectPath)
	}

	return (
		<div className="x-chat">
			<ListItem
				className="x-chat-header"
				config={[
					{
						mode: "left",
						component: () =>
							<div>
								{!collapsed
									? <Icon
											type="arrow-left"
											onClick={back}
											style={{
												cursor: "pointer",
												fontSize: 20,
												verticalAlign: "middle",
												marginRight: 10
											}}
										/>
									: null}
								{selectItem}
							</div>
					},
					{
						mode: "right",
						component: () =>
							<span style={{ color: "#8798a4" }}>
								<Icon type="ellipsis" />
							</span>
					}
				]}
			/>
			<div className="x-chat-content">123</div>
			<div className="x-chat-footer">
				<ListItem
					className="x-chat-ops"
					config={[
						{
							mode: "inlineBlock",
							component: () =>
								<div className="x-chat-ops-icon">
									<Icon type="android" />
								</div>
						},
						{
							mode: "inlineBlock",
							component: () =>
								<div className="x-chat-ops-icon">
									<Icon type="apple" />
								</div>
						},
						{
							mode: "inlineBlock",
							component: () =>
								<div className="x-chat-ops-icon">
									<Icon type="windows" />
								</div>
						},
						{
							mode: "inlineBlock",
							component: () =>
								<div className="x-chat-ops-icon">
									<Icon type="ie" />
								</div>
						}
					]}
				/>
				<ListItem
					className="x-chat-send"
					config={[
						{
							mode: "block",
							component: () =>
								<div>
									<Input
										onPressEnter={e => console.log(e.target.value)}
										placeholder="Type a message"
										addonAfter={<Icon type="setting" />}
										// defaultValue="mysite"
									/>
									{/*<TextArea rows={2} />*/}
								</div>
						}
					]}
				/>
			</div>
		</div>
	)
}

// <p>
// 				Have an account?
// 				<span>Sign In</span>
// 			</p>
// 			<p>
// 				New around here?
// 				<span>Sign Up</span>
// 			</p>

// Login.propTypes = {
// 	form: PropTypes.object,
// 	login: PropTypes.object,
// 	dispatch: PropTypes.func
// }

export default connect(
	({ login }) => ({
		login: {
			loginLoading: false
		}
	}),
	dispatch => ({
		doLogin: (username, password) => {}
		// dispatch(LoginActions.login(username, password))
	})
)(Chat)
