import React from "react"
import PropTypes from "prop-types"
import {Menu, Dropdown, Icon} from "antd"
import ListItem from "@/components/list/ListItem"
import History from "@/utils/history"
import WebIM from "@/config/WebIM"

const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

const HeaderTab = ({collapse, title, ...rest}) => {

    const onMenuSettingsClick = function ({key}) {
        switch (key) {
            case '0':
                console.log('好友黑名单');
                break;
            case '1':
                if (WebIM.conn.isOpened()) {
                    WebIM.conn.close("logout")
                }
                History.replace('/login')
                break;
        }
    }

    const tabsLeft = [
        ["0", "好友黑名单", "minus-circle-o"],
        ["1", "退出", "logout"],
    ]

    const tabsLeftItem = tabsLeft.map(([key, name, icon]) =>
        <Menu.Item key={key}>
            <span><Icon type={icon}/> <span>{name}</span></span>
        </Menu.Item>
    )

    const menuSettings = (
        <Menu onClick={onMenuSettingsClick}>
            {tabsLeftItem}
        </Menu>
    )


    const onMenuRihghtClick = function ({key}) {
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

    const tabsRight = [
        ["0", "添加好友", "user-add"],
        ["1", "申请加入公开群", "plus-circle-o"],
        ["2", "创建群组", "usergroup-add"],
    ]


    const tabsRihghtItem = tabsRight.map(([key, name, icon]) =>
        <Menu.Item key={key}>
            <span><Icon type={icon}/> <span>{name}</span></span>
        </Menu.Item>
    )

    const menuRihght = (
        <Menu onClick={onMenuRihghtClick}>
            {tabsRihghtItem}
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
                                <Dropdown overlay={menuRihght} trigger={['click']}>
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
