import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { connect } from "react-redux"
import { Modal, Input, Button, Row, Col } from "antd"
import WebIM from "@/config/WebIM"
import { I18n } from "react-redux-i18n"
import _ from "lodash"
import GroupRequestActions from "@/redux/GroupRequestRedux"

class FriendsRequestModal extends React.Component {
    state = {
        toNick: "",
        groupName: "",
        reason: ""
    }
    onRefuse = gid => {
        const { from } = this.props.groupRequests[gid] || {}
        var options = {
            applicant: from,
            groupId: gid,
            success: function(resp) {
                console.log(resp)
            },
            error: function(e) {}
        }
        this.props.rejectJoinGroup(gid, options)
    }

    onAgree = gid => {
        const { from } = this.props.groupRequests[gid] || {}
        var options = {
            applicant: from,
            groupId: gid,
            success: function(resp) {
                console.log(resp)
            },
            error: function(e) {}
        }
        this.props.rejectJoinGroup(gid, options)
    }

    render() {
        const requests = []

        _.forEach(
            this.props.groupRequests,
            ({ from, status, toNick, reason, gid }) => {
                requests.push(
                    <Row key={from}>
                        <Col span={14}>
                            {from + " applys to join into group: " + toNick}
                            <p>
                                {reason}
                            </p>
                        </Col>
                        <Col span={10}>
                            <Button
                                style={{
                                    height: 32,
                                    marginLeft: 10
                                }}
                                className="fr"
                                type="primary"
                                onClick={() => this.onRefuse(gid)}
                            >
                                {I18n.t("agree")}
                            </Button>
                            <Button
                                style={{
                                    height: 32
                                }}
                                className="fr"
                                type="danger"
                                onClick={() => this.onAgree(gid)}
                            >
                                {I18n.t("reject")}
                            </Button>
                        </Col>
                    </Row>
                )
            }
        )

        return (
            <div>
                {requests}
            </div>
        )
    }
}

export default connect(
    ({ entities }) => ({
        groupRequests: entities.groupRequest.byGid
    }),
    dispatch => ({
        agreeJoinGroup: (gid, options) =>
            dispatch(GroupRequestActions.agreeJoinGroup(gid, options)),
        rejectJoinGroup: (gid, options) =>
            dispatch(GroupRequestActions.rejectJoinGroup(gid, options))
    })
)(FriendsRequestModal)
