import React from "react"
import PropTypes from "prop-types"

let key = 0

const ListItem = ({ config, ...rest }) => {
	!config && (config = [])

	const modes = {
		left: "fl",
		right: "fr"
	}

	const content = config.map(conf => {
		key++

		return (
			<div className={modes[conf.mode]} key={"list-item-" + key}>
				{conf.component()}
			</div>
		)
	})

	return (
		<div className="x-list-item">
			{content}
		</div>
	)
}

ListItem.propTypes = {
	// collapse: PropTypes.bool
	// menuOptions: PropTypes.array.isRequired,
}

export default ListItem
