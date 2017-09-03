import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Menu, Icon, Badge } from "antd"
import _ from "lodash"
import "./style/HeaderTab.less"

const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

class HeaderTab extends React.Component {
    render() {
        const { collapsed, items, unread, ...rest } = this.props
        const typeMap = { contact: "chat", group: "groupchat", chatroom: "chatroom", stranger: "stranger" }
        const hadUnread = { contact: false, group: false, chatroom: false, stranger: false }
        _.forEach(typeMap, (v, k) => {
            const m = _.get(unread, v)
            if (!_.isEmpty(m)) hadUnread[k] = true
        })

        const tabs = items || {}
        const tabsLen = tabs.length
        const tabCls = collapsed ? `ant-col-${Math.floor(24 / tabsLen)}` : ""

        const tabsItem = tabs.map(({ key, name, icon }) =>
            <Menu.Item key={key} className={tabCls}>
                {/*<Icon type="user" style={{ fontSize: 20, marginRight: 12 }} />*/}
                {hadUnread[key]
                    ? <Badge dot style={{ marginRight: 12 }} className="x-header-tab__badge">
                        <i
                            className={icon}
                            style={{ fontSize: 20, marginRight: -5, marginTop: -4, verticalAlign: "middle" }}
                        />
                    </Badge>
                    : <i className={icon} style={{ fontSize: 20, marginRight: 12, verticalAlign: "middle" }}/>}
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
            <Menu {...rest} id="x-header-tab" mode="horizontal" className="x-header-tab__menu">
                {tabsItem}
            </Menu>
        )
    }
}

HeaderTab.propTypes = {
    collapsed: PropTypes.bool
    // menuOptions: PropTypes.array.isRequired,
}


export default connect(
    ({ entities }, props) => ({
        unread: entities.message.unread,
        ...props
    }),
    dispatch => ({})
)(HeaderTab)
