import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Button, Row, Form, Input } from "antd"
import { config } from "@/config"
import styles from "./index.less"
import RegisterActions from "@/redux/RegisterRedux"
import WebIM from "@/config/WebIM"

const FormItem = Form.Item

const Register = ({
    I18N,
    login,
    doRegister,
    jumpLogin,
    form: { getFieldDecorator, validateFieldsAndScroll }
}) => {


    const { loginLoading } = login

    function handleOk() {
        validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return
            }
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
                            placeholder={I18N.username}
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
                            placeholder={I18N.password}
                        />
                    )}
                </FormItem>
                <FormItem hasFeedback>
                    {getFieldDecorator("nickname")(
                        <Input
                            size="large"
                            onPressEnter={handleOk}
                            placeholder={I18N.nickname}
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
                        {I18N.signUp}
                    </Button>
                </Row>
            </form>
            <div className="extra">
                <p>
                    {I18N.haveaccount}
                    <span onClick={jumpLogin}>{I18N.signIn}</span>
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
    ({ i18n, login }) => ({
        I18N: i18n.locale && i18n.translations && i18n.translations[i18n.locale] || {},
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
