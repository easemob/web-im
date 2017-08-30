import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Menu, Dropdown, Icon } from "antd"
import { I18n } from "react-redux-i18n"
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
import BlacklistModal from "@/components/blacklist/BlacklistModal"
import JoinGroupModal from "@/components/group/JoinGroupModal"
import GroupRequestModal from "@/components/group/GroupRequestModal"

class HeaderOps extends Component {
    constructor(props) {
        super()

        this.state = {
            modal: ""
        }

        // showAddFriendsModal: false,
        // showBlacklistModal: false,
        // showAddGroupModal: false,
        // showJoinGroupModal: false
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
                this.setState({
                    modal: "showBlacklistModal"
                })
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
                    modal: "showAddFriendsModal"
                })
                break
            case "1":
                console.log("申请加入公开群")
                this.setState({
                    modal: "showJoinGroupModal"
                })
                break
            case "2":
                console.log("创建群组")
                this.setState({
                    modal: "showAddGroupModal"
                })
                break
        }
    }

    render() {
        const { title, doLogout, subscribes, groupRequests } = this.props
        const { modal } = this.state

        const tabsLeft = [
            ["0", `${I18n.t("friends")}${I18n.t("blacklist")}`, "minus-circle-o"],
            ["1", `${I18n.t("quit")}(${title})`, "logout"]
        ]

        const tabsRight = [
            ["0", I18n.t("addAFriend"), "user-add"],
            ["1", I18n.t("joinGroup"), "plus-circle-o"],
            ["2", I18n.t("createGroup"), "usergroup-add"]
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
            <Menu className="x-header-ops__dropmenu" onClick={this.onMenuSettingsClick}>
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
                    <Dropdown overlay={menuSettings} trigger={["click"]} style={{ position: "absolute" }}>
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
                    <Dropdown overlay={menuRight} placement="bottomRight" trigger={["click"]}>
                        <Icon type="plus-circle-o" />
                    </Dropdown>
                </div>
                {
                    <ModalComponent
                        width={460}
                        title={I18n.t("addAFriend")}
                        visible={modal === "showAddFriendsModal"}
                        component={AddFriendsModal}
                    />
                }
                {
                    <ModalComponent
                        width={460}
                        title={I18n.t("request")}
                        visible={!_.isEmpty(subscribes)}
                        component={FriendsRequestModal}
                    />
                }
                {
                    <ModalComponent
                        width={460}
                        title={I18n.t("createGroup")}
                        visible={modal === "showAddGroupModal"}
                        component={AddGroupModal}
                    />
                }
                {
                    <ModalComponent
                        width={460}
                        title={I18n.t("blacklist")}
                        visible={modal === "showBlacklistModal"}
                        component={BlacklistModal}
                    />
                }
                {
                    <ModalComponent
                        width={460}
                        title={I18n.t("joinGroup")}
                        visible={modal === "showJoinGroupModal"}
                        component={JoinGroupModal}
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
        subscribes: entities.subscribe.byFrom,
        groupRequests: entities.groupRequest.byGid
    }),
    dispatch => ({
        doLogout: () => dispatch(WebIMActions.logout())
    })
)(HeaderOps)
