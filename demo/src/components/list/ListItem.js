import React from "react"
import PropTypes from "prop-types"
import { Menu, Icon } from "antd"

const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

const ContactItem = ({ collapse, ...rest }) => {
	const tabs = ["Contacts", "Chat", "Public"]
	const tabsLen = tabs.length
	const tabCls = collapse ? "" : ``

	const tabsItem = tabs.map(name =>
		<Menu.Item key={name} className={tabCls}>
			<div className="nav-img">test</div>
			<div className="nav-text">
				<p>Jerry</p>
				<p className="nav-text-desc">How long will you take ?</p>
			</div>
			<div className="nav-op">10.02 AM</div>
		</Menu.Item>
	)

	const tabsColItem = (
		<SubMenu title={<Icon type="bars" />} className="collapse">
			{tabsItem}
		</SubMenu>
	)

	return (
		<Menu
			id="x-contact-item2"
			mode={"inline"}
			inlineCollapsed={collapse}
			{...rest}
		>
			{tabsItem}
		</Menu>
	)
}

ContactItem.propTypes = {
	collapse: PropTypes.bool
	// menuOptions: PropTypes.array.isRequired,
}

export default ContactItem
