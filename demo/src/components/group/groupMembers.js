import React from 'react';
import {connect} from "react-redux";
import {Card, Menu} from 'antd';
import dottie from 'dottie';
import './style/index.less';

class GroupMembers extends React.Component {
    render () {
        const {entities, roomId} = this.props;
        const members = dottie.get(entities, `groupMember.${roomId}.names`, []);
        return (
            <Card title="Members" bordered={false} noHovering={true}>
                <Menu className="group-member-list">
                    {members.map((val, idx) => <Menu.Item key={idx} className="group-member-item"><span>{val}</span></Menu.Item>)}
                </Menu>
            </Card>
        );
    }
}

export default connect(
    ({entities}) => ({entities})
)(GroupMembers);
