import React from 'react';
import classNames from 'classnames';
import {connect} from 'react-redux';
import GroupInfo from '@/components/group/groupInfo';
import GroupMembers from '@/components/group/groupMembers';
import {config} from '@/config';

class RightSider extends React.Component {
    // static defaultProps = {
    //     prefixCls: 'x-layout-right-sider',
    //     style: {}
    // };

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillReceiveProps(nextProps) {}

    componentDidMount(){}

    componentWillUnmount() {}

    render() {
        const joinPermission = {a: 'aa'};
        const { entities, roomId } = this.props;
        return (
            <div>
                <GroupInfo title="Group Info" room={this.props.room} owner="adsf" description="asdf" joinPermission="joinPermission"></GroupInfo>
                <GroupMembers title="Members" roomId={roomId} name={this.props.selectItem} owner="adsf" description="asdf" joinPermission="joinPermission"></GroupMembers>
            </div>
        );
    }
};

// export default RightSider;
export default connect(
    ({entities}) => ({entities})
)(RightSider)
