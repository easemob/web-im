import React from 'react';
import {connect} from "react-redux";
import {Card, Menu, Table} from 'antd';
import _ from 'lodash';
import './style/index.less';

class GroupMembers extends React.Component {
    render () {
        const {entities, roomId} = this.props;
        const members = _.get(entities, `groupMember.${roomId}.names`, []);
        const columns = [{
            title: 'Name',
            key: 'name',
            dataIndex: 'name'
        }]
        const data = members.map(val => {return {name: val, key: val}})
        return (
            <Card title="Members" bordered={false} noHovering={true}>
                {/* <Menu className="group-member-list">
                    {members.map((val, idx) => <Menu.Item key={idx} className="group-member-item"><span>{val}</span></Menu.Item>)}
                </Menu> */}
                <Table columns={columns} dataSource={data} showHeader={false} pagination={false} scroll={{y:300}}></Table>
            </Card>
        );
    }
}

export default connect(
    ({entities}) => ({entities})
)(GroupMembers);
