import React from 'react';
import classNames from 'classnames';
import GroupInfo from '@/components/group/groupInfo';
import {config} from '@/config';

class RightSider extends React.Component {
    static defaultProps = {
        prefixCls: 'x-layout-right-sider',
        style: {}
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillReceiveProps(nextProps) {}

    componentDidMount(){}

    componentWillUnmount() {}

    render() {
        const joinPermission = {a: 'aa'};
        return (
            <GroupInfo title="Group Info" name="bernard" owner="adsf" description="asdf" joinPermission="joinPermission"></GroupInfo>
        );
    }
};

export default RightSider;
