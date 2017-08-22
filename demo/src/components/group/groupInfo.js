import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Card } from 'antd';
import './style/index.less';

class GroupInfo extends React.Component {

    render() {
        const { title, name, owner, description, joinPermission } = this.props;
        return (
            <Card title={title} bordered={false} noHovering={true}>
                <h3>Group Name</h3>
                <p className='gray fs-117em'>{name}</p>
                <h3>Owner</h3>
                <p className='gray fs-117em'>{owner}</p>
                <h3>Description</h3>
                <p className='gray fs-117em'>{description}</p>
                <h3>Permission to join</h3>
                <p className='gray fs-117em'>{joinPermission}</p>
            </Card>
        );
    }
}

export default GroupInfo;
