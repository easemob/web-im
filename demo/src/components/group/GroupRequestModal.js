import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { connect } from "react-redux"
import { Modal, Input, Button, Row, Col } from "antd"
import WebIM from "@/config/WebIM"
import { I18n } from "react-redux-i18n"
import _ from "lodash"
import GroupRequestActions from "@/redux/GroupRequestRedux"

class GroupRequestModal extends React.Component {
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

    onAgree = (gid, applicant) => {
        // const { from } = this.props.groupRequests[gid] || {}
        var options = {
            groupId: gid,
            applicant,
            success: function(resp) {
                console.log(resp)
            },
            error: function(e) {}
        }
        this.props.agreeJoinGroup(gid, options)
    }

    render() {
        const requests = []

        _.forEach(this.props.groupRequests, val => {
            _.forEach(val, ({ from, status, toNick, reason, gid }) => {
                requests.push(
                    <Row key={from}>
                        <Col span={14}>
                            {`${from}${I18n.t("apply")}${I18n.t("joinGroup")}${toNick}`}
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
                                onClick={() => this.onAgree(gid, from)}
                            >
                                {I18n.t("agree")}
                            </Button>
                            <Button
                                style={{
                                    height: 32
                                }}
                                className="fr"
                                type="danger"
                                onClick={() => this.onRefuse(gid)}
                            >
                                {I18n.t("reject")}
                            </Button>
                        </Col>
                    </Row>
                )
            })
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
        groupRequests: entities.groupRequest.byGid
    }),
    dispatch => ({
        agreeJoinGroup: (gid, options) => dispatch(GroupRequestActions.agreeJoinGroup(gid, options)),
        rejectJoinGroup: (gid, options) => dispatch(GroupRequestActions.rejectJoinGroup(gid, options))
    })
)(GroupRequestModal)
