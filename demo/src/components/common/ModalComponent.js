import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { Modal } from "antd"
import "./style/ModalComponent.less"

export default class ModalComponent extends React.Component {
	constructor(props) {
		super()
		this.state = { visible: props.visible }
	}

	showModal = () => {
		this.setState({
			visible: true
		})
	}
	handleOk = e => {
		// console.log(e)
		this.setState({
			visible: false
		})
	}
	handleCancel = e => {
		// console.log(e)
		this.setState({
			visible: false
		})
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			visible: nextProps.visible
		})
	}

	render() {
		if (!this.state.visible) {
			return null
		}

		return (
			<div>
				<Modal
					width={this.props.width}
					className="x-modal x-modal__nofooter"
					title={this.props.title}
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
				>
					{
						<this.props.component
							onOk={this.handleOk}
							onCancel={this.handleCancel}
						/>
					}
				</Modal>
			</div>
		)
	}
}
