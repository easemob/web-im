import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Button, Row, Form, Input } from "antd"
import config from "@/config"
import styles from "./index.less"
import LoginActions from "@/redux/LoginRedux"

const FormItem = Form.Item

const Login = ({
	login,
	dispatch,
	attemptLogin,
	form: { getFieldDecorator, validateFieldsAndScroll }
}) => {
	const { loginLoading } = login

	function handleOk() {
		validateFieldsAndScroll((errors, values) => {
			if (errors) {
				return
			}
			console.log(values)
			// dispatch({ type: "login/login", payload: values })
			attemptLogin(values.username, values.password)
		})
	}
	//
	return (
		<div className="form x-login">
			<div className="logo">
				<img alt={"logo"} src={config.logo} />
				<span>
					{config.name}
				</span>
			</div>
			<form>
				<FormItem hasFeedback>
					{getFieldDecorator("username", {
						rules: [
							{
								required: true
							}
						]
					})(
						<Input
							size="large"
							onPressEnter={handleOk}
							placeholder="Username"
						/>
					)}
				</FormItem>
				<FormItem hasFeedback>
					{getFieldDecorator("password", {
						rules: [
							{
								required: true
							}
						]
					})(
						<Input
							size="large"
							type="password"
							onPressEnter={handleOk}
							placeholder="Password"
						/>
					)}
				</FormItem>
				<Row>
					<Button
						type="primary"
						size="large"
						onClick={handleOk}
						loading={loginLoading}
					>
						Sign in
					</Button>
				</Row>
			</form>
			<div className="extra">
				<p>
					Have an account?
					<span>Sign In</span>
				</p>
				<p>
					New around here?
					<span>Sign Up</span>
				</p>
			</div>
		</div>
	)
}

Login.propTypes = {
	form: PropTypes.object,
	login: PropTypes.object,
	dispatch: PropTypes.func
}

export default connect(
	({ login }) => ({
		login: {
			loginLoading: false
		}
	}),
	dispatch => ({
		attemptLogin: (username, password) =>
			dispatch(LoginActions.login(username, password))
	})
)(Form.create()(Login))
