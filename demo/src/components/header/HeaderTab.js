import React from "react"
import PropTypes from "prop-types"
import { Menu, Icon } from "antd"

const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

const HeaderTab = ({ collapsed, items, ...rest }) => {
	const tabs = items || ["Chat", "Groups", "Chat Rooms", "Friends"]
	const tabsLen = tabs.length
	const tabCls = collapsed ? `ant-col-${Math.floor(24 / tabsLen)}` : ""

	const tabsItem = tabs.map(({ key, name, icon }) =>
		<Menu.Item key={key} className={tabCls}>
			{/*<Icon type="user" style={{ fontSize: 20, marginRight: 12 }} />*/}
			<i
				className={icon}
				style={{ fontSize: 20, marginRight: 12, verticalAlign: "middle" }}
			/>
			{collapsed
				? ""
				: <span className="nav-text">
						{name}
					</span>}
		</Menu.Item>
	)

	// const tabsColItem = (
	// 	<SubMenu title={<Icon type="bars" />} className="collapsed">
	// 		{tabsItem}
	// 	</SubMenu>
	// )

	return (
		<Menu {...rest} id="x-header-tab" mode="horizontal">
			{tabsItem}
		</Menu>
	)
}

HeaderTab.propTypes = {
	collapsed: PropTypes.bool
	// menuOptions: PropTypes.array.isRequired,
}

export default HeaderTab
