import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { Button, Row, Form, Input, Icon } from "antd"
import { config } from "@/config"
import ListItem from "@/components/list/ListItem"
import ChatMessage from "@/components/chat/ChatMessage"
import ChatEmoji from "@/components/chat/ChatEmoji"
import styles from "./style/index.less"
import LoginActions from "@/redux/LoginRedux"
import MessageActions from "@/redux/MessageRedux"
import WebIM from "@/config/WebIM"
import { message } from "antd"

const { TextArea } = Input
const FormItem = Form.Item

const chatType = {
	contact: "chat",
	groups: "chatRoom",
	room: "chatRoom"
}

class Chat extends React.Component {
	input = null
	image = null

	constructor() {
		super()
		this.state = {
			value: ""
		}
		this.handleSend = this.handleSend.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.pictureChange = this.pictureChange.bind(this)
		this.handleEmojiSelect = this.handleEmojiSelect.bind(this)
		this.handleEmojiCancel = this.handleEmojiCancel.bind(this)
		this.handleKey = this.handleKey.bind(this)
	}

	scollBottom() {
		const dom = this.refs["x-chat-content"]
		setTimeout(function() {
			dom.scrollTop = dom.scrollHeight
		}, 0)
	}

	pictureChange(e) {
		const { match } = this.props
		const { selectItem, selectTab } = match.params
		const isRoom = chatType[selectTab] == "chatRoom"

		// console.log(e, e.target)
		let file = WebIM.utils.getFileUrl(e.target)
		console.log(file)

		if (!file.filename) {
			this.image.value = null
			return false
		}

		if (!config.imgType[file.filetype.toLowerCase()]) {
			this.image.value = null
			// todo i18n
			return message.error("invalid type : " + file.filetype, 1)
		}

		this.props.sendImgMessage(
			chatType[selectTab],
			selectItem,
			{ isRoom },
			file,
			() => {
				this.image.value = null
			}
		)
		//
	}

	handleEmojiSelect(v) {
		this.setState({
			value: (this.state.value || "") + v.key
		})
		this.input.focus()
	}

	handleEmojiCancel() {
		if (!this.state.value) return
		const arr = this.state.value.split("")
		const len = arr.length
		let newValue = ""

		if (arr[len - 1] != "]") {
			arr.pop()
			newValue = arr.join("")
		} else {
			const index = arr.lastIndexOf("[")
			newValue = arr.splice(0, index).join("")
		}

		this.setState({
			value: newValue
		})
	}

	handleChange(e) {
		// 场景1：正常+ -
		// 场景2：从中间位置+ - -> 如果删除一个字符后字符串匹配，则非中间位置
		// 场景3：删除操作可以从textInput直接编辑，适应于以上情况
		const v = e.target.value.trim()
		const splitValue = this.state.value ? this.state.value.split("") : []
		splitValue.pop()
		if (v == splitValue.join("")) {
			this.handleEmojiCancel()
		} else {
			this.setState({
				value: v
			})
		}
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

	handleKey(e) {
		if (e.keyCode == 8 || e.keycode == 46) {
			this.handleEmojiCancel()
		}
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

		// document.addEventListener("keydown", this.handleKey)
	}
	componentWillUnmount() {
		// document.removeEventListener("keydown", this.handleKey)
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
					<div className="x-list-item x-chat-ops">
						{/* emoji*/}
						<div className="x-chat-ops-icon ib">
							<ChatEmoji onSelect={this.handleEmojiSelect} />
						</div>
						{/* 图片上传 image upload*/}
						<label
							for="uploadImage"
							className="x-chat-ops-icon ib"
							onClick={() =>
								this.image && this.image.focus() && this.image.click()}
						>
							<i className="icon-circle" />
							<input
								id="uploadImage"
								ref={node => (this.image = node)}
								onChange={this.pictureChange}
								type="file"
								className="hide"
							/>
						</label>
						<div className="x-chat-ops-icon ib">
							<i className="icon-file-code" />
						</div>
						<div className="x-chat-ops-icon ib">
							<i className="icon-phone" />
						</div>
						<div className="x-chat-ops-icon ib">
							<i className="icon-videocam" />
						</div>
					</div>
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
