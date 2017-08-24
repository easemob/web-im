import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { connect } from "react-redux"
import { Input, Button, Row, Col, Form, Radio, Checkbox } from "antd"
import SubscribeActions from "@/redux/SubscribeRedux"
import { I18n } from "react-redux-i18n"
import _ from "lodash"
import "./style/AddGrouModal.less"
const RadioGroup = Radio.Group
const CheckboxGroup = Checkbox.Group

const FormItem = Form.Item

class AddGroupModal extends React.Component {
	state = {
		name: ""
	}

	onChangeName = e => {
		this.setState({ name: e.target.value })
	}

	handleSubmit = e => {
		e.preventDefault()
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log("Received values of form: ", values)
			}
		})
	}

	onCheck = e => {}

	render() {
		const { name } = this.state
		const { getFieldDecorator } = this.props.form
		const requests = []

		const options = [
			{ label: "Apple", value: "Apple" },
			{ label: "Pear", value: "Pear" },
			{ label: "Orange", value: "Orange" }
		]

		return (
			<Form onSubmit={this.handleSubmit} className="x-add-group">
				<div style={{ display: "none" }}>
					<FormItem>
						{getFieldDecorator("name", {
							rules: [{ required: true, message: "Please input Group Name !" }]
						})(<Input placeholder="Group Name" />)}
					</FormItem>
					<FormItem>
						{getFieldDecorator("description", {
							rules: [{ required: true, message: "Please enter description ！" }]
						})(
							<Input.TextArea
								placeholder="Enter description"
								autosize={{ minRows: 4, maxRows: 6 }}
							/>
						)}
					</FormItem>
					<FormItem style={{ marginBottom: 10 }}>
						<p>Group Type</p>
						{getFieldDecorator("type", { initialValue: "private" })(
							<RadioGroup>
								<Radio style={{ width: 100 }} value="private">
									Private
								</Radio>
								<Radio style={{ width: 100 }} value="public">
									Public
								</Radio>
							</RadioGroup>
						)}
					</FormItem>

					<FormItem style={{ marginBottom: 10 }}>
						<p>Permission to join</p>
						{getFieldDecorator("canJoin", { initialValue: "no" })(
							<RadioGroup>
								<Radio style={{ width: 100 }} value="yes">
									Yes
								</Radio>
								<Radio style={{ width: 100 }} value="no">
									No
								</Radio>
							</RadioGroup>
						)}
					</FormItem>
					<div style={{ overflow: "hidden" }}>
						<Button
							style={{
								width: 100,
								height: 32
								// marginBottom: 30
							}}
							className="fr"
							type="primary"
							onClick={() => {}}
						>
							Next
						</Button>
					</div>
				</div>
				<div className="x-add-group-members">
					<FormItem>
						{getFieldDecorator("members")(
							<CheckboxGroup
								style={{ display: "block" }}
								options={options}
								defaultValue={["Pear"]}
								onChange={this.onCheck}
							/>
						)}
					</FormItem>
					<div style={{ overflow: "hidden" }}>
						<div className="fl" style={{ cursor: "pointer" }}>
							<i className="iconfont icon-arrow-left" /> back
						</div>
						<Button
							style={{
								width: 100,
								height: 32
								// marginBottom: 30
							}}
							className="fr"
							type="primary"
							onClick={() => {}}
						>
							Next
						</Button>
					</div>
				</div>
			</Form>
		)
	}
}

export default connect(
	({ entities }) => ({
		data: entities.subscribe.byFrom
	}),
	dispatch => ({
		acceptSubscribe: id => dispatch(SubscribeActions.acceptSubscribe(id)),
		declineSubscribe: id => dispatch(SubscribeActions.declineSubscribe(id))
	})
)(Form.create()(AddGroupModal))
