import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { connect } from "react-redux"
import { Modal, Input, Button, Row, Col } from "antd"
import WebIM from "@/config/WebIM"
import SubscribeActions from "@/redux/SubscribeRedux"
import { I18n } from "react-redux-i18n"
import _ from "lodash"

class FriendsRequestModal extends React.Component {
    state = {}

    render() {
        const { declineSubscribe, acceptSubscribe } = this.props
        const requests = []

        _.forEach(this.props.data, ({ from, status }) => {
            requests.push(
                <Row key={from}>
                    <Col span={14}>
                        {from + ": " + status}
                    </Col>
                    <Col span={10}>
                        <Button
                            style={{
                                height: 32,
                                marginLeft: 10
                            }}
                            className="fr"
                            type="primary"
                            onClick={() => acceptSubscribe(from)}
                        >
                            {I18n.t("agree")}
                        </Button>
                        <Button
                            style={{
                                height: 32
                            }}
                            className="fr"
                            type="danger"
                            onClick={() => declineSubscribe(from)}
                        >
                            {I18n.t("reject")}
                        </Button>
                    </Col>
                </Row>
            )
        })

        return (
            <div>
                {requests}
            </div>
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
)(FriendsRequestModal)
