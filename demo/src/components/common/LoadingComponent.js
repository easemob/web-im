import React, { Component } from "react"
import { Spin } from "antd"

export default ({ size = "large" }) => {
	return (
		<div
			style={{
				position: "absolute",
				top: "40%",
				left: "50%",
				maringLeft: "-16px"
			}}
		>
			<Spin size={size} />
		</div>
	)
}
