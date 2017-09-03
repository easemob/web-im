import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import moment from "moment"
import { I18n } from "react-redux-i18n"
import { Badge } from "antd"
import { renderTime } from "@/utils"
import emoji from "@/config/emoji"
import { Card } from "antd"
import Audio from "@/components/chat/Audio"
import WebIM from "@/config/WebIM"

const renderTxt = txt => {
    // 替换不能直接用replace，必须以数组组合的方式，因为混合着dom元素
    let rnTxt = []
    let match = null
    const regex = /(\[.*?\])/g
    let start = 0
    let index = 0
    while ((match = regex.exec(txt))) {
        index = match.index
        if (index > start) {
            rnTxt.push(txt.substring(start, index))
        }
        if (match[1] in emoji.map) {
            const v = emoji.map[match[1]]
            rnTxt.push(
                <img
                    key={WebIM.conn.getUniqueId()}
                    src={require(`../../themes/faces/${v}`)}
                    width={20}
                    height={20}
                />
            )
        } else {
            rnTxt.push(match[1])
        }
        start = index + match[1].length
    }
    rnTxt.push(txt.substring(start, txt.length))

    return rnTxt
}

export default ({ bySelf, from, time, body }) => {
    // x-message-right

    const cls = classNames("x-message-group", bySelf ? "x-message-right" : "")
    const localFormat = renderTime(time)

    let content = null
    if (body.type == "txt") {
        content = (
            <p className="x-message-text">
                {renderTxt(body.msg)}
            </p>
        )
    } else if (body.type == "img") {
        content = (
            <div className="x-message-img">
                <img
                    src={body.url}
                    width="100%"
                    style={{ verticalAlign: "middle" }}
                />
            </div>
        )
    } else if (body.type == "file") {
        const readablizeBytes = bytes => {
            let s = [ "Bytes", "KB", "MB", "GB", "TB", "PB" ]
            var e = Math.floor(Math.log(bytes) / Math.log(1024))
            return (
                (bytes / Math.pow(1024, Math.floor(e))).toFixed(2) + " " + s[e]
            )
        }
        content = (
            <Card
                title={I18n.t("file")}
                style={{ width: 240, margin: "2px 2px 2px 0" }}
            >
                <div className="x-message-file">
                    <h3 title={body.filename}>
                        {body.filename}
                    </h3>
                    <div className="ant-row">
                        <div className="ant-col-12">
                            <p>
                                {readablizeBytes(body.file_length)}
                            </p>
                        </div>
                        <div className="ant-col-12">
                            <a href={body.url} download={body.filename}>
                                {I18n.t("download")}
                            </a>
                        </div>
                    </div>
                </div>
            </Card>
        )
    } else if (body.type == "video") {
        content = (
            <div className="x-message-video">
                <video src={body.url} width="100%" controls />
            </div>
        )
    } else if (body.type == "audio") {
        content = (
            <div className="x-message-audio">
                <Audio url={body.url} length={body.length} />
            </div>
        )
    }

    return (
        <div className={cls}>
            <div className="x-message-user">
                {from}
            </div>
            <div className="x-message-content">
                {content}
            </div>
            {bySelf
                ? <div className="x-message-time">
                    <span className="x-message-status" /> {localFormat}
                </div>
                : <div className="x-message-time">
                    {localFormat} <span className="x-message-status" />
                </div>}
        </div>
    )
}
