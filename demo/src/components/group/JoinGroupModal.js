import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { connect } from "react-redux"
import { Input, Button, Row, Col, Form, Radio, Checkbox, message } from "antd"
import GroupActions from "@/redux/GroupRedux"
import GroupMemberActions from "@/redux/GroupMemberRedux"
import { I18n } from "react-redux-i18n"
import _ from "lodash"
import "./style/JoinGroupModal.less"
const RadioGroup = Radio.Group
const CheckboxGroup = Checkbox.Group
const FormItem = Form.Item

class JoinGroupModal extends React.Component {
    state = {
        groupDetail: false,
        gid: null,
        cursor: null,
        groups: [],
        groupsData: [],
        loading: false,
        bodyLoading: false,
        groupName: "",
        owner: "",
        description: "",
        membersOnly: "",
        inputValue: ""
    }

    onInputChange = e => {
        this.setState({
            inputValue: e.target.value
        })
    }

    search = () => {
        var value = this.state.inputValue
        this.showDetail(value)
    }

    joinGroup = () => {
        var options = {
            groupId: this.state.gid,
            success: function(resp) {
                message.success(`${I18n.t("groupRequest")}${I18n.t("successfully")}`)
            },
            error: function(e) {
                if (e.type == 17) {
                    message.error(`${I18n.t("already")}${I18n.t("in")}${I18n.t("group")}`)
                }
            }
        }
        this.props.joinGroup(options)
    }

    onScroll = () => {
        if (this.state.groupDetail) return
        var groups = this.refs.groupList,
            scrollTop = groups.scrollTop,
            count = this.state.groups.length
        // console.log(scrollTop, scrollTop / 400, count, count / 10 - 1)
        if (scrollTop - 250 < 0) return
        else if (scrollTop / 400 >= count / 10 - 1) {
            this.setState({
                loading: true
            })
            this.getGroupList()
        }
    }

    getGroupList = () => {
        var limit = 20,
            cursor = this.state.cursor
        this.setState({ loading: true })
        var options = {
            limit: limit,
            cursor: cursor,
            success: function(resp) {
                var groupData = resp.data,
                    groups = this.state.groups
                var groupsData = this.state.groupsData
                for (var i in groupData) {
                    if (
                        !groupsData.find(v => v.groupid == groupData[i].groupid)
                    ) {
                        groupsData.push(groupData[i])
                    } else {
                        continue
                    }
                    // console.log(groupData[i].groupid)
                    groups.push(
                        <li
                            className="x-list-item"
                            data-gid={groupData[i].groupid}
                            key={groupData[i].groupid}
                            onClick={this.showDetail.bind(
                                this,
                                groupData[i].groupid
                            )}
                        >
                            {groupData[i].groupname}
                        </li>
                    )
                }
                this.setState({
                    cursor: resp.cursor,
                    groups: groups,
                    groupsData: groupsData,
                    loading: false
                })
            }.bind(this),
            error: function(e) {}
        }
        this.props.listGroups(options)
    }

    close = () => {
        typeof this.props.onCancel === "function" && this.props.onCancel()
    }

    backToList = () => {
        this.setState({ groupDetail: false })
    }

    showDetail = gid => {
        this.setState({
            bodyLoading: true
        })
        var options = {
            groupId: gid,
            success: function(resp) {
                var groupName = resp.data[0].name,
                    desc = resp.data[0].description,
                    owner = "",
                    affiliations = resp.data[0].affiliations,
                    membersOnly = resp.data[0].membersonly

                for (var i in affiliations) {
                    if (affiliations[i].owner) {
                        owner = affiliations[i].owner
                        break
                    }
                }
                this.setState({
                    groupName: groupName,
                    description: desc,
                    owner: owner,
                    groupDetail: true,
                    bodyLoading: false,
                    gid: gid,
                    membersOnly: membersOnly
                })
            }.bind(this),
            error: function(e) {
                if (e.type == 17) message.error(`${I18n.t("group")}${I18n.t("ID")}${I18n.t("notExist")}`)
                this.setState({
                    bodyLoading: false
                })
            }.bind(this)
        }
        this.props.getGroupInfo(options)
    }

    componentDidMount() {
        this.getGroupList()
    }

    render() {
        const { groups } = this.state
        const { roster, I18N } = this.props
        return (
            <div className="x-join-group">
                <div className="x-layer" />
                <div className="x-dialog">
                    <div>
                        <Row>
                            <Col span={18}>
                                <Input
                                    placeholder={I18N.groupSubject}
                                    onChange={this.onInputChange}
                                />
                            </Col>
                            <Col span={6} style={{ textAlign: "right" }}>
                                <Button type="primary" onClick={this.search}>
                                    search
                                </Button>
                            </Col>
                        </Row>
                    </div>
                    <div
                        className={
                            this.state.groupDetail
                                ? "hide"
                                : "x-join-group-members"
                        }
                        onScroll={this.onScroll}
                        ref="groupList"
                    >
                        <div
                            ref="loading"
                            className={
                                "x-body-loading " +
                                (this.state.bodyLoading ? "" : "hide")
                            }
                        >
                            <img src="demo/images/loading.gif" />
                        </div>
                        <ul
                            className={
                                this.state.groupDetail
                                    ? "hide"
                                    : "x-blacklist-wrapper"
                            }
                        >
                            {groups}
                        </ul>
                        <div
                            ref="loading"
                            className={
                                "x-contact-loading " +
                                (this.state.loading ? "" : "hide")
                            }
                        >
                            <img src="demo/images/loading.gif" />
                        </div>
                    </div>
                    <div
                        className={!this.state.groupDetail ? "hide" : ""}
                        style={{ overflow: "hidden" }}
                    >
                        <div>
                            <span className="title">{I18n.t("groupName")}</span>
                            <span className="content">
                                {this.state.groupName || `${I18n.t("empty")}` }
                            </span>
                        </div>
                        <div>
                            <span className="title">{I18n.t("admin")}</span>
                            <span className="content">
                                {this.state.owner || `${I18n.t("empty")}`}
                            </span>
                        </div>
                        <div>
                            <span className="title">{I18n.t("description")}</span>
                            <span className="content">
                                {this.state.description || `${I18n.t("empty")}`}
                            </span>
                        </div>
                        <div>
                            <span className="title">{I18n.t("needApproval")}</span>
                            <span className="content">
                                {this.state.membersOnly ? "[Y]" : "N"}
                            </span>
                        </div>
                        <div
                            className="fl"
                            style={{ cursor: "pointer" }}
                            onClick={this.backToList}
                        >
                            <i className="iconfont icon-arrow-left" /> {I18n.t("back")}
                        </div>
                        <Button
                            style={{
                                width: 100,
                                height: 32
                                // marginBottom: 30
                            }}
                            className="fr"
                            type="primary"
                            onClick={this.joinGroup}
                        >
                            {I18n.t("joinGroup")}
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    ({ entities, i18n }) => ({
        I18N:
            (i18n.locale &&
                i18n.translations &&
                i18n.translations[i18n.locale]) ||
            {},
        roster: entities.roster
    }),
    dispatch => ({
        joinGroup: options => dispatch(GroupMemberActions.joinGroup(options)),
        listGroups: options => dispatch(GroupActions.listGroups(options)),
        getGroups: options => dispatch(GroupActions.getGroups(options)),
        getGroupInfo: options => dispatch(GroupActions.getGroupInfo(options))
    })
)(JoinGroupModal)
