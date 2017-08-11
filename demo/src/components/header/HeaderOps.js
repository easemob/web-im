import React from "react"
import PropTypes from "prop-types"
import {Menu, Dropdown, Icon} from "antd"
import ListItem from "@/components/list/ListItem"
import History from "@/utils/history"

const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

const HeaderTab = ({collapse, title, ...rest}) => {
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
        <SubMenu title={<Icon type="bars"/>} className="collapse">
            {tabsItem}
        </SubMenu>
    )

    const onMenuSettingsClick = function ({key}) {
        switch (key) {
            case '0':
                console.log('好友黑名单');
                break;
            case '1':
                console.log('退出');
                break;
        }
    }

    const menuSettings = (
        <Menu onClick={onMenuSettingsClick}>
            <Menu.Item key="0">
                <span>好友黑名单</span>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="1">
                <span>退出</span>
            </Menu.Item>
        </Menu>
    )


    const onMenuAddClick = function ({key}) {
        switch (key) {
            case '0':
                console.log('添加好友');
                break;
            case '1':
                console.log('申请加入公开群');
                break;
            case '2':
                console.log('创建群组');
                break;
        }
    }

    const menuAdd = (
        <Menu onClick={onMenuAddClick}>
            <Menu.Item key="0">
                <span>添加好友</span>
            </Menu.Item>
            <Menu.Item key="1">
                <span>申请加入公开群</span>
            </Menu.Item>
            <Menu.Item key="2">
                <span>创建群组</span>
            </Menu.Item>
        </Menu>
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
                            <Dropdown overlay={menuSettings} trigger={['click']}>
                                <Icon type="setting"/>
                            </Dropdown>
                            {/*<Icon type="setting" onClick={logout }/>*/}
                        </div >
                },
                {
                    mode: "left",
                    component: () =>
                        <div style={{lineHeight: "50px", color: "#fff"}}>
                            {title}
                        </div>
                },
                {
                    mode: "right",
                    component: () =>
                        <span style={{fontSize: 24, lineHeight: "50px", color: "#fff"}}>
                                <Dropdown overlay={menuAdd} trigger={['click']}>
                                <Icon type="plus-circle-o"/>
                            </Dropdown>
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
