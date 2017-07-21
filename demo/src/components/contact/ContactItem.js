import React from "react"
import PropTypes from "prop-types"
import { Menu, Icon } from "antd"
import ContactHead from "./ContactHead"

const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

const ContactItem = ({ collapse, ...rest }) => {
	const tabs = ["Contacts", "Chat", "Public"]
	const tabsLen = tabs.length
	const tabCls = collapse ? "" : ``

	const tabsItem = tabs.map(name =>
		<Menu.Item key={name} className={tabCls}>
			<ContactHead className="fl nav-img" name="test" width={50} />
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
			id="x-contact-item"
			mode={"inline"}
			inlineIndent={24}
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
