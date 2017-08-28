import React from "react"
import classNames from "classnames"
import { connect } from "react-redux"
import { I18n } from "react-redux-i18n"
import GroupInfo from "@/components/group/GroupInfo"
import GroupMembers from "@/components/group/GroupMembers"
import { config } from "@/config"

class RightSider extends React.Component {
    // static defaultProps = {
    //     prefixCls: 'x-layout-right-sider',
    //     style: {}
    // };

    constructor(props) {
        super(props)
        this.state = {}
    }

    componentWillReceiveProps(nextProps) {}

    componentDidMount() {}

    componentWillUnmount() {}

    render() {
        const joinPermission = { a: "aa" }
        const { entities, roomId } = this.props
        return (
            <div>
                <GroupInfo
                    title={I18n.t("groupInfo")}
                    room={this.props.room}
                    owner="adsf"
                    description="asdf"
                    joinPermission="joinPermission"
                />
                <GroupMembers
                    title={I18n.t("members")}
                    roomId={roomId}
                    name={this.props.selectItem}
                    owner="adsf"
                    description="asdf"
                    joinPermission="joinPermission"
                />
            </div>
        )
    }
}

// export default RightSider;
export default connect(({ entities }) => ({ entities }))(RightSider)
