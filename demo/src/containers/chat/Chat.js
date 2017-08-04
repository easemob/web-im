import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { Button, Row, Form, Input, Icon } from "antd"
import { config } from "@/config"
import ListItem from "@/components/list/ListItem"
import ChatMessage from "@/components/chat/ChatMessage"
import styles from "./style/index.less"
import LoginActions from "@/redux/LoginRedux"
import MessageActions from "@/redux/MessageRedux"
import WebIM from "@/config/WebIM"
const { TextArea } = Input
const FormItem = Form.Item

const chatType = {
	contact: "chat"
}

class Chat extends React.Component {
	input = null

	constructor() {
		super()
		this.state = {
			value: ""
		}
		this.handleSend = this.handleSend.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	scollBottom() {
		const dom = this.refs["x-chat-content"]
		setTimeout(function() {
			dom.scrollTop = dom.scrollHeight
		}, 0)
	}

	handleChange(e) {
		const value = e.target.value.trim()
		this.setState({
			value
		})
	}
	handleSend(e) {
		console.log(this.state.value)
		const {
			match,
			message
			// form: { getFieldDecorator, validateFieldsAndScroll }
		} = this.props
		const { selectItem, selectTab } = match.params
		const { value } = this.state
		if (!value) return
		this.props.sendTxtMessage(chatType[selectTab], selectItem, {
			msg: value
		})
		this.emitEmpty()
	}

	emitEmpty() {
		this.setState({
			value: ""
			// height: 34
		})
		this.input.value = ""
		this.input.focus()
	}

	componentWillReceiveProps(nextProps) {
		// setTimeout(this.scollBottom, 0)
		// this.scollBottom()
	}

	componentDidUpdate() {
		this.scollBottom()
	}

	componentDidMount() {
		this.scollBottom()
	}

	render() {
		const {
			collapsed,
			match,
			history,
			location,
			message
			// form: { getFieldDecorator, validateFieldsAndScroll }
		} = this.props

		const { selectItem, selectTab } = match.params
		// console.log(collapsed, selectTab, selectItem)

		const back = () => {
			const redirectPath = "/" + [selectTab].join("/") + location.search
			history.push(redirectPath)
		}

		const { byId = {}, chat = {} } = message
		let messageList = []
		switch (selectTab) {
			case "contact":
				messageList = chat[selectItem] || []
				messageList = messageList.map(id => byId[id] || {})
				// console.log(messageList)
				break
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
									{collapsed
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
				<div className="x-chat-content" ref="x-chat-content">
					{messageList.map(message =>
						<ChatMessage key={message.id} {...message} />
					)}
					{/*<ChatMessage />
					<ChatMessage />
					<ChatMessage />
					<ChatMessage />
					<ChatMessage bySelf={true} />
					<ChatMessage bySelf={true} />
					<ChatMessage bySelf={true} />*/}
				</div>
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
					<div className="x-list-item x-chat-send">
						<Input
							value={this.state.value}
							onChange={this.handleChange}
							onPressEnter={this.handleSend}
							placeholder="Type a message"
							addonAfter={<Icon type="setting" onClick={this.handleSend} />}
							ref={node => (this.input = node)}
						/>
						{/*<TextArea rows={2} />*/}
					</div>
				</div>
			</div>
		)
	}
}

// const Chat = ({
// 	collapsed,
// 	match,
// 	history,
// 	location
// 	// form: { getFieldDecorator, validateFieldsAndScroll }
// }) => {
// 	const { selectItem, selectTab } = match.params
// 	console.log(collapsed, selectTab, selectItem)

// 	const back = () => {
// 		const redirectPath = "/" + [selectTab].join("/") + location.search
// 		history.push(redirectPath)
// 	}
// }

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
	({ login, entities }) => ({
		message: entities.message.asMutable()
	}),
	dispatch => ({
		sendTxtMessage: (chatType, id, message) =>
			dispatch(MessageActions.sendTxtMessage(chatType, id, message)),
		sendImgMessage: (chatType, id, message, source) =>
			dispatch(MessageActions.sendImgMessage(chatType, id, message, source))
	})
)(Chat)
