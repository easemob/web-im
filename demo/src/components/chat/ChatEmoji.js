import React from "react"
import PropTypes from "prop-types"
import { Menu, Icon, Tabs, Select } from "antd"
const TabPane = Tabs.TabPane
const Option = Select.Option

class ChatEmoji extends React.Component {
	state = {
		tabPosition: "bottom"
	}
	changeTabPosition = tabPosition => {
		this.setState({ tabPosition })
	}
	render() {
		return (
			<div>
				<Tabs tabPosition={this.state.tabPosition}>
					<TabPane tab="Tab 1" key="1">
						Content of Tab 1
					</TabPane>
					<TabPane tab="Tab 2" key="2">
						Content of Tab 2
					</TabPane>
					<TabPane tab="Tab 3" key="3">
						Content of Tab 3
					</TabPane>
				</Tabs>
			</div>
		)
	}
}

export default ChatEmoji
