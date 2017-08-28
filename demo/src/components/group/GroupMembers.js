import React from "react"
import { connect } from "react-redux"
import Immutable from "seamless-immutable"
import { Card, Icon, Menu, Popconfirm, Table, Tooltip } from "antd"
import _ from "lodash"
import GroupActions from "@/redux/GroupRedux"
import GroupMemberActions from "@/redux/GroupMemberRedux"
import "./style/index.less"

class GroupMembers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            admin: "",
            isAdmin: false
        }
    }

    setAdmin = (groupId, name) => this.props.setAdminAsync(groupId, name)

    removeAdmin = (groupId, name) => this.props.removeAdminAsync(groupId, name)

    mute = (groupId, name) => this.props.muteAsync(groupId, name)

    groupBlockSingle = (groupId, name) =>
        this.props.groupBlockSingleAsync(groupId, name)

    removeSingleGroupMember = (groupId, name) =>
        this.props.removeSingleGroupMemberAsync(groupId, name)

    render() {
        const { entities, login, roomId } = this.props
        // const memberActionMenu = (
        //     <Menu>
        //         <Menu.Item key="1">
        //             <Tooltip>
        //                 <Popconfirm title="确认设为管理员吗？" onConfirm={() => this.setAdmin(record.name)}>
        //                     <a href="#">设为管理</a>
        //                 </Popconfirm>
        //             </Tooltip>
        //         </Menu.Item>
        //     </Menu>
        // )
        let admin
        let isAdmin = false
        const members = _.get(entities, `groupMember.${roomId}.byName`, [])
        // const members = Immutable.from(entities).getIn(['groupMember', roomId, 'byName'], [])

        const data = _.map(members, (val, key) => {
            const { affiliation } = val
            console.log(affiliation)
            if (affiliation === "owner") {
                admin = key
                if (key === _.get(login, "username", "")) {
                    isAdmin = true
                }
            }
            return { name: key, key, affiliation }
        })
        const columns = [
            {
                title: "Name",
                key: "name",
                dataIndex: "name"
            },
            {
                title: "Action",
                key: "action",
                render: (text, record) => {
                    return data.length > 0 && isAdmin && admin !== record.name
                        ? <span className="fr">
                              {/* <Dropdown overlay={memberActionMenu} trigger={['click']}><Icon type="info-circle-o" /></Dropdown> */}
                              <Popconfirm
                                  title="确认设为管理员吗？"
                                  onConfirm={() =>
                                      this.setAdmin(roomId, record.name)}
                              >
                                  <Tooltip title="设为管理员" placement="left">
                                      <Icon type="arrow-up" />
                                  </Tooltip>
                              </Popconfirm>
                              <Popconfirm
                                  title="确认移除管理员吗？"
                                  onConfirm={() =>
                                      this.removeAdmin(roomId, record.name)}
                              >
                                  <Tooltip title="移除管理员" placement="left">
                                      <Icon type="arrow-down" />
                                  </Tooltip>
                              </Popconfirm>
                              <Popconfirm
                                  title="确认禁言吗？"
                                  onConfirm={() =>
                                      this.mute(roomId, record.name)}
                              >
                                  <Tooltip title="禁言" placement="left">
                                      <Icon type="lock" />
                                  </Tooltip>
                              </Popconfirm>
                              <Popconfirm
                                  title="确认加入群黑名单吗？"
                                  onConfirm={() =>
                                      this.groupBlockSingle(
                                          roomId,
                                          record.name
                                      )}
                              >
                                  <Tooltip title="加入群黑名单" placement="left">
                                      <Icon type="frown-o" />
                                  </Tooltip>
                              </Popconfirm>
                              <Popconfirm
                                  title="确认从本群移除吗？"
                                  onConfirm={() =>
                                      this.removeSingleGroupMember(
                                          roomId,
                                          record.name
                                      )}
                              >
                                  <Tooltip title="从本群移除" placement="left">
                                      <Icon type="usergroup-delete" />
                                  </Tooltip>
                              </Popconfirm>
                          </span>
                        : null
                }
            }
        ]
        return (
            <Card
                title="Members"
                bordered={false}
                noHovering={true}
                className="group-member-wrapper"
            >
                {/* <Menu className="group-member-list">
                    {members.map((val, idx) => <Menu.Item key={idx} className="group-member-item"><span>{val}</span></Menu.Item>)}
                </Menu> */}
                <Table
                    columns={columns}
                    dataSource={data}
                    showHeader={false}
                    pagination={false}
                    scroll={{ y: 300 }}
                    className="group-member-list"
                />
            </Card>
        )
    }
}

export default connect(
    ({ entities, login }) => ({ entities, login }),
    dispatch => ({
        setAdminAsync: (groupId, name) =>
            dispatch(GroupMemberActions.setAdminAsync(groupId, name)),
        removeAdminAsync: (groupId, name) =>
            dispatch(GroupMemberActions.removeAdminAsync(groupId, name)),
        muteAsync: (groupId, name) =>
            dispatch(GroupMemberActions.muteAsync(groupId, name)),
        groupBlockSingleAsync: (groupId, name) =>
            dispatch(GroupActions.groupBlockSingleAsync(groupId, name)),
        removeSingleGroupMemberAsync: (groupId, name) =>
            dispatch(
                GroupMemberActions.removeSingleGroupMemberAsync(groupId, name)
            )
    })
)(GroupMembers)
