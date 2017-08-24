import React from 'react';
import {connect} from "react-redux"
import dottie from 'dottie'
import Immutable from "seamless-immutable"

import { Card, Col, Dropdown, Form, Icon, Input, Menu, Modal, Tooltip } from 'antd';
import GroupActions from '@/redux/GroupRedux'
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
            <Form layout="vertical">
                <Form.Item label="群组名称">
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: '请输入群组名称' }]
                    })(
                        <Input />
                    )}
                </Form.Item>
            </Form>
        </Modal>
    );
});

class GroupInfo extends React.Component {
    constructor() {
        super()
        this.state = {
            visible: false,
            blackListVisible: false,
            newName: ''
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
    }

    handleSiderClick() {
        const obj = Immutable({ a: { aa: { aaa: 1111 } } })
        console.log(obj.a.aa, obj.a)
        // const aa = Immutable.without(obj.a.aa, 'aaa')
        // const a = Immutable.without(obj.a, 'aa')
        const aa = obj.a.aa.without('aaa')
        const a = obj.a.without('aa')
        console.log(aa)
        console.log(a)
        console.log('~~~~~~')
        this.props.switchRightSider({rightSiderOffset: 0})
    }

    handleCreate() {
        const form = this.form
        form.validateFieldsAndScroll((err, values) => {
            if (err) { return }
            console.log(values);
            const { room } = this.props;
            const info = {
                id: room.roomId,
                name: room.name,
                newName: values.name
            }
            console.log(room, info)
            this.setState({visible: false})
            this.props.updateGroupInfo(info)
        })
    }

    showModal() {
        this.setState({ visible: true })
    }

    handleModalOk() {
        console.log(this.props.form)
        console.log(this.refs.form)
        this.props.form.validateFieldsAndScroll((errors, values) => {
            if (errors) {return}
            console.log(values)
        })
        // const info = {}
        // this.props.updateGroupInfo({info})
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
        console.log(key)
        switch (key) {
            case '1':
                this.showModal();
                break;
            case '2':
                this.handleGetBlackList();
                break;
            default:
                break;
        }
    }

    handleGetBlackList() {
        const { room } = this.props
        // this.setState({ blackListVisible: true })
        const blackListModal = Modal.info({
            title: '群组黑名单',
            content: (
                <div>blacklist</div>
            ),
            onOk() { blackListModal.destroy() }
        })
        this.props.getGroupBlackList(room.roomId, room.name)
    }

    render() {
        const { title, name, owner, description, joinPermission } = this.props
        const isLoading = dottie.get(this.props, 'entities.group.isLoading', false)

        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1">
                    <Tooltip title="修改群组" placement="left"><i className="iconfont icon-pencil"></i> 修改群组</Tooltip> 
                </Menu.Item>
                <Menu.Item key="2">
                    <Tooltip title="群组黑名单" placement="left"><Icon type="frown" /> 群组黑名单</Tooltip> 
                </Menu.Item>
                <Menu.Item key="3">
                    <Tooltip title="解散群组" placement="left"><Icon type="poweroff" /> 解散群组</Tooltip> 
                </Menu.Item>
            </Menu>
        )

        const blackListModal = (
            <Modal
                visible={this.state.blackListVisible}
            >
                {/* // */}
            </Modal>
        )

        return (
            <Card title={title} extra={<Tooltip title="关闭" placement="left"><Icon type="close-circle-o" onClick={this.handleSiderClick} /></Tooltip>} bordered={false} noHovering={true}>
                <h3>
                    Group Name
                    <span className="fr">
                        <Dropdown overlay={menu}><Icon type="setting" /></Dropdown>
                    </span>
                </h3>
                <p className='gray fs-117em'>{this.props.room.name}</p>
                <GroupInfoForm
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    loading={isLoading}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                >
                </GroupInfoForm>
            </Card>
        )
    }
}

export default connect(
    ({entities}) => ({entities}),
    dispatch => ({
        updateGroupInfo: (info) => dispatch(GroupActions.updateGroupInfo(info)),
        dissolveGroup: (roomId) => dispatch(GroupActions.dissolveGroup(roomId)),
        getGroupBlackList: (groupId, groupName) => dispatch(GroupActions.getGroupBlackList(groupId, groupName)),
        switchRightSider: ({rightSiderOffset}) => dispatch(GroupActions.switchRightSider({rightSiderOffset}))
    })
)(GroupInfo)