import React from "react"
import PropTypes from "prop-types"
import { Menu, Icon } from "antd"

const ContactItem = ({ key, text, logo, collpose }) => {
	return (
		<Menu.Item key={key}>
			<Icon type="user" />
			<span className="nav-text">nav 1</span>
		</Menu.Item>
	)
}

// ContactItem.propTypes = {
// 	onMenuClick: PropTypes.func,
// 	menuOptions: PropTypes.array.isRequired,
// 	buttonStyle: PropTypes.object,
// 	dropdownProps: PropTypes.object
// }

export default ContactItem
