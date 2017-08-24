import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Menu, Dropdown, Icon } from "antd"
import ListItem from "@/components/list/ListItem"
import History from "@/utils/history"
import WebIM from "@/config/WebIM"
import WebIMActions from "@/redux/WebIMRedux"
import "./style/HeaderOps.less"
import _ from "lodash"

import AddFriendsModal from "@/components/friend/AddFriendsModal"
import FriendsRequestModal from "@/components/friend/FriendsRequestModal"
import ModalComponent from "@/components/common/ModalComponent"
import AddGroupModal from "@/components/group/AddGroupModal"

class HeaderOps extends Component {
	constructor(props) {
		super()

		this.state = {
			showAddFriendsModal: false,
			showAddGroupModal: false
		}
		this.onMenuSettingsClick = this.onMenuSettingsClick.bind(this)
		this.onMenuRightClick = this.onMenuRightClick.bind(this)
		this.handleLogout = this.handleLogout.bind(this)
	}

	handleLogout() {
		console.log("handleLogout")

		this.props.doLogout()
	}

	onMenuSettingsClick({ key }) {
		switch (key) {
			case "0":
				console.log("好友黑名单")
				break
			case "1":
				this.handleLogout()
				break
		}
	}

	onMenuRightClick({ key }) {
		switch (key) {
			case "0":
				console.log("添加好友")
				this.setState({
					showAddFriendsModal: true
				})
				break
			case "1":
				console.log("申请加入公开群")
				break
			case "2":
				console.log("创建群组")
				this.setState({
					showAddGroupModal: true
				})
				break
		}
	}

	render() {
		const { title, doLogout, subscribes } = this.props
		const { showAddFriendsModal, showAddGroupModal } = this.state

		const tabsLeft = [
			["0", "好友黑名单", "minus-circle-o"],
			["1", `退出(${title})`, "logout"]
		]

		const tabsRight = [
			["0", "添加好友", "user-add"],
			["1", "申请加入公开群", "plus-circle-o"],
			["2", "创建群组", "usergroup-add"]
		]

		const tabsLeftItem = tabsLeft.map(([key, name, icon]) =>
			<Menu.Item key={key}>
				<span>
					<Icon type={icon} /> <span>{name}</span>
				</span>
			</Menu.Item>
		)

		const tabsRightItem = tabsRight.map(([key, name, icon]) =>
			<Menu.Item key={key}>
				<span>
					<Icon type={icon} /> <span>{name}</span>
				</span>
			</Menu.Item>
		)

		const menuSettings = (
			<Menu
				className="x-header-ops__dropmenu"
				onClick={this.onMenuSettingsClick}
			>
				{tabsLeftItem}
			</Menu>
		)

		const menuRight = (
			<Menu className="x-header-ops__dropmenu" onClick={this.onMenuRightClick}>
				{tabsRightItem}
			</Menu>
		)
		// console.log("subscribes", _.isEmpty, subscribes)

		return (
			<div id="x-header-ops" className="x-list-item headerBg">
				<div
					className="fl"
					style={{
						margin: "0 12px 0 0",
						fontSize: 24,
						lineHeight: "50px",
						color: "#fff",
						cursor: "pointer"
					}}
				>
					<Dropdown
						overlay={menuSettings}
						trigger={["click"]}
						style={{ position: "absolute" }}
					>
						<Icon type="setting" />
					</Dropdown>
				</div>
				<div className="fl" style={{ lineHeight: "50px", color: "#fff" }}>
					{title}
				</div>
				<div
					className="fr"
					style={{
						fontSize: 24,
						lineHeight: "50px",
						color: "#fff",
						cursor: "pointer"
					}}
				>
					<Dropdown overlay={menuRight} trigger={["click"]}>
						<Icon type="plus-circle-o" />
					</Dropdown>
				</div>
				{
					<ModalComponent
						width={460}
						title="Add Friends"
						visible={showAddFriendsModal}
						component={AddFriendsModal}
					/>
				}
				{
					<ModalComponent
						width={460}
						title="Friends Request"
						visible={!_.isEmpty(subscribes)}
						component={FriendsRequestModal}
					/>
				}
				{
					<ModalComponent
						width={460}
						title="Create Group"
						visible={showAddGroupModal}
						component={AddGroupModal}
					/>
				}
			</div>
		)
	}
}

HeaderOps.propTypes = {
	collapse: PropTypes.bool
	// menuOptions: PropTypes.array.isRequired,
}

export default connect(
	({ entities }) => ({
		subscribes: entities.subscribe.byFrom
	}),
	dispatch => ({
		doLogout: () => dispatch(WebIMActions.logout())
	})
)(HeaderOps)
