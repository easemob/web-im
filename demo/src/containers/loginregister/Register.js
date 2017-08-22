import React from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {Button, Row, Form, Input} from "antd"
import {config} from "@/config"
import styles from "./index.less"
import RegisterActions from "@/redux/RegisterRedux"
import WebIM from "@/config/WebIM"

const FormItem = Form.Item

const Register = ({
                      login,
                      doRegister,
                      jumpLogin,
                      form: {getFieldDecorator, validateFieldsAndScroll}
                  }) => {


    const {loginLoading} = login

    function handleOk() {
        validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return
            }
            console.log(values)
            doRegister(values.username, values.password, values.nickname)
        })
    }

    //
    return (
        <div className="form x-login">
            <div className="logo">
                <i className="iconfont icon-hyphenate"/>
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
                <FormItem hasFeedback>
                    {getFieldDecorator("nickname")(
                        <Input
                            size="large"
                            onPressEnter={handleOk}
                            placeholder="Nickname"
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
                        Sign up
                    </Button>
                </Row>
            </form>
            <div className="extra">
                <p>
                    Have an account?
                    <span onClick={jumpLogin}>Sign In</span>
                </p>
            </div>
        </div>
    )
}


Register.propTypes = {
    form: PropTypes.object,
    login: PropTypes.object,
    dispatch: PropTypes.func
}

export default    connect(
    ({login}) => ({
        login: {
            loginLoading: false
        }
    }),
    dispatch => ({
        doRegister: (username, password, nickname) =>
            dispatch(RegisterActions.register(username, password, nickname)),
        jumpLogin: () =>
            dispatch(RegisterActions.jumpLogin())
    })
)(Form.create()(Register))
