import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import moment from "moment"
import { Badge } from "antd"
import { renderTime } from "@/utils"

export default ({ bySelf, from, time, body }) => {
	// x-message-right

	const cls = classNames("x-message-group", bySelf ? "x-message-right" : "")
	const localFormat = renderTime(time)

	let content = null
	if (body.type == "txt") {
		content = (
			<p className="x-message-text">
				{body.msg}
			</p>
		)
	} else if (body.type == "img") {
		content = (
			<div className="x-message-img">
				<img src={body.url} width="100%" />
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
