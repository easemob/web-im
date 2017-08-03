import React from "react"
import PropTypes from "prop-types"
import { Menu, Icon } from "antd"
import ListItem from "@/components/list/ListItem"

const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

const HeaderTab = ({ collapse, ...rest }) => {
	const tabs = ["Contacts", "Chat", "Public"]
	const tabsLen = tabs.length
	const tabCls = collapse ? "" : `ant-col-${Math.floor(24 / tabsLen)}`

	const tabsItem = tabs.map(name =>
		<Menu.Item key={name} className={tabCls}>
			<span className="nav-text">
				{name}
			</span>
		</Menu.Item>
	)

	const tabsColItem = (
		<SubMenu title={<Icon type="bars" />} className="collapse">
			{tabsItem}
		</SubMenu>
	)

	return (
		<ListItem
			className="headerBg"
			config={[
				{
					mode: "left",
					component: () =>
						<div
							style={{
								margin: "0 12px 0 0",
								fontSize: 24,
								lineHeight: "50px",
								color: "#fff"
							}}
						>
							<Icon type="setting" />
						</div>
				},
				{
					mode: "left",
					component: () =>
						<div style={{ lineHeight: "50px", color: "#fff" }}>123</div>
				},
				{
					mode: "right",
					component: () =>
						<span style={{ fontSize: 24, lineHeight: "50px", color: "#fff" }}>
							<Icon type="plus-circle-o" />
						</span>
				}
			]}
		/>
	)
}

HeaderTab.propTypes = {
	collapse: PropTypes.bool
	// menuOptions: PropTypes.array.isRequired,
}

export default HeaderTab
