import React from 'react';
import {Card} from 'antd';
import './style/index.less';

class GroupMembers extends React.Component {
    render () {
        return (
            <Card title="Members" bordered={false} noHovering={true}>
                <div>
                    <span className="fs-117em">Han</span><span className="gray fs-117em fr">Admin</span>
                </div>
            </Card>
        );
    }
}

export default GroupMembers;
