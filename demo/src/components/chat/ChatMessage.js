import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import moment from "moment"
import { Badge } from "antd"
import { renderTime } from "@/utils"
import emoji from "@/config/emoji"

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
				<img src={require(`../../themes/faces/${v}`)} width={20} height={20} />
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
				<img src={body.url} width="100%" style={{ verticalAlign: "middle" }} />
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
