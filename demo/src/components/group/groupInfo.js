import React from 'react';
import {connect} from "react-redux"
import _ from 'lodash'
import Immutable from "seamless-immutable"
import { Button, Card, Col, Dropdown, Form, Icon, Input, Menu, Modal, Row, Table, Tooltip } from 'antd';
import ModalComponent from '@/components/common/ModalComponent';
import InviteToGroupModal from '@/components/group/InviteToGroupModal';
import GroupActions from '@/redux/GroupRedux';
import './style/index.less';

const GroupInfoForm = Form.create()((props) => {
    const { visible, onCancel, onCreate, form, loading } = props;
    const { getFieldDecorator } = form;
    return (
        <Modal
            visible={visible}
            title="修改群组"
            okText="修改"
            confirmLoading={loading}
            onCancel={onCancel}
            onOk={onCreate}
        >
            <Form>
                <Form.Item label="群组名称">
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: '请输入群组名称' }]
                    })(
                        <Input />
                    )}
                </Form.Item>
                {/* <Form.Item label="群组简介">
                    {getFieldDecorator('description', {
                        rules: [{ required: false, message: '请输入群组简介' }]
                    })(
                        <Input />
                    )}
                </Form.Item> */}
            </Form>
        </Modal>
    );
});

class GroupInfo extends React.Component {
    constructor() {
        super()
        this.state = {
            users: [],
            visible: false,
            blackListVisible: false,
            showInviteToGroupModal: false
        }

        this.handleSiderClick = this.handleSiderClick.bind(this)
        this.handleCreate = this.handleCreate.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.showModal = this.showModal.bind(this)
        this.handleModalOk = this.handleModalOk.bind(this)
        this.saveFormRef = this.saveFormRef.bind(this)
        this.handleDissolveGroup = this.handleDissolveGroup.bind(this)
        this.handleGetBlackList = this.handleGetBlackList.bind(this)
        this.handleMenuClick = this.handleMenuClick.bind(this)
        this.handleCloseBlacklistModal = this.handleCloseBlacklistModal.bind(this)
    }

    handleSiderClick() {
        this.props.switchRightSider({rightSiderOffset: 0})
    }

    handleCreate() {
        const form = this.form
        form.validateFieldsAndScroll((err, values) => {
            if (err) { return }
            const { room } = this.props;
            const info = {
                id: room.roomId,
                name: values.name,
                description: values.description || ''
            }
            this.setState({visible: false})
            this.props.updateGroupInfoAsync(info)
        })
    }

    showModal() {
        this.setState({ visible: true })
    }

    handleModalOk() {
        this.props.form.validateFieldsAndScroll((errors, values) => {
            if (errors) {return}
        })
        // const info = {}
        // this.props.updateGroupInfoAsync({info})
    }

    handleCloseBlacklistModal() {
        this.setState({ blackListVisible: false })
    }

    handleCancel() {
        this.setState({ visible: false })
    }

    saveFormRef(form) {
        this.form = form
    }

    handleDissolveGroup() {
        const { room } = this.props;
        this.props.dissolveGroup(room.roomId)
    }

    handleMenuClick({ item, key, selectedKeys }) {
        switch (key) {
            case '1':
                break;
            case '2':
                this.setState({showInviteToGroupModal: true})
                break;
            case '3':
                this.showModal();
                break;
            case '4':
                this.handleGetBlackList();
                break;
            case '5':
                break;
            default:
                break;
        }
    }

    handleGetBlackList() {
        const { room } = this.props
        this.props.getGroupBlackList(room.roomId)
        this.setState({ blackListVisible: true })
    }

    onChangeUsers = e => this.setState({ users: [e.target.value]})

    add = () => {
        const value = this.state.users
        if (!value || value.length === 0) return
        this.props.inviteToGroup(this.props.room.roomId, value)
        this.setState({showInviteToGroupModal: false})
    }

    render() {
        const { title, name, owner, description, joinPermission, room } = this.props
        const isLoading = _.get(this.props, 'entities.group.isLoading', false)
        const blacklist = _.get(this.props, `entities.group.byId.${room.roomId}.blacklist`, [])

        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1">
                    <Tooltip title="管理群成员" placement="left"><i className="iconfont icon-pencil"></i> 管理群成员</Tooltip> 
                </Menu.Item>
                <Menu.Item key="2">
                    <Tooltip title="添加群成员" placement="left"><i className="iconfont icon-pencil"></i> 添加群成员</Tooltip> 
                </Menu.Item>
                <Menu.Item key="3">
                    <Tooltip title="修改群信息" placement="left"><i className="iconfont icon-pencil"></i> 修改群信息</Tooltip> 
                </Menu.Item>
                <Menu.Item key="4">
                    <Tooltip title="群组黑名单" placement="left"><Icon type="frown" /> 群组黑名单</Tooltip> 
                </Menu.Item>
                <Menu.Item key="5">
                    <Tooltip title="解散群组" placement="left"><Icon type="poweroff" /> 解散群组</Tooltip> 
                </Menu.Item>
            </Menu>
        )

        const columns = [{
            title: 'Name',
            key: 'name',
            dataIndex: 'name'
        }]

        const ds = _.reduce(blacklist, (result, val, key) => {
            result.push({ name: val })
            return result
        }, [])
        
        const table = (
            <Table columns={columns} dataSource={ds} showHeader={false} />
        )

        return (
            <Card title={title} extra={<Tooltip title="关闭" placement="left"><Icon type="close-circle-o" onClick={this.handleSiderClick} /></Tooltip>} bordered={false} noHovering={true}>
                <h3>
                    Group Name
                    <span className="fr">
                        <Dropdown overlay={menu} trigger="click"><Icon type="setting" /></Dropdown>
                    </span>
                </h3>
                <p className='gray fs-117em'>{this.props.room.name}</p>
                {/* <h3>Group Description</h3>
                <p className='gray fs-117em'>{this.props.room.description}</p> */}

                <GroupInfoForm
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                >
                </GroupInfoForm>
                <Modal
                    title="群组黑名单"
                    visible={this.state.blackListVisible}
                    okText="关闭"
                    onOk={this.handleCloseBlacklistModal}
                    onCancel={this.handleCloseBlacklistModal}
                >
                    {table}
                </Modal>
                <Modal
                    width={460}
                    title="添加群成员"
                    visible={this.state.showInviteToGroupModal}
                    footer={null}
                >
                    <Row>
                        <Col span={20}>
                            <Input
                                size="large"
                                placeholder="用户名"
                                onChange={this.onChangeUsers}
                            />
                        </Col>
                        <Col span={4}>
                            <Button style={{height: 32}} className="fr" type="primary" onClick={this.add}>Add</Button>
                        </Col>
                    </Row>
                </Modal>
                {/* {
                    <ModalComponent
                        width={460}
                        title="添加群成员"
                        visible={this.state.showInviteToGroupModal}
                        groupId={room.roomId}
                        component={InviteToGroupModal}
                    />
                } */}
            </Card>
        )
    }
}

export default connect(
    ({entities}) => ({entities}),
    dispatch => ({
        updateGroupInfoAsync: (info) => dispatch(GroupActions.updateGroupInfoAsync(info)),
        dissolveGroup: (roomId) => dispatch(GroupActions.dissolveGroup(roomId)),
        getGroupBlackList: (groupId, groupName) => dispatch(GroupActions.getGroupBlackList(groupId, groupName)),
        inviteToGroup: (groupId, users) => dispatch(GroupActions.inviteToGroup(groupId, users)),
        switchRightSider: ({rightSiderOffset}) => dispatch(GroupActions.switchRightSider({rightSiderOffset}))
    })
)(GroupInfo)