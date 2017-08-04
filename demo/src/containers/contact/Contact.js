import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import ContactItem from "@/components/contact/ContactItem"
import utils from "@/utils"

const Contact = ({
	history,
	match,
	location,
	roster,
	group,
	message,
	...rest
}) => {
	// console.log(history, match, location)
	const { pathname } = location
	const paths = pathname.split("/")
	const chatType = paths[1]
	const chatId = paths[2]
	const { byId, chat } = message

	const items = []
	switch (chatType) {
		case "contact":
			roster.friends.forEach((name, index) => {
				const info = utils.getLatestInfo(name, byId, chat)
				items[index] = {
					name,
					...info
				}
			})
			break
		case "group":
			group.names.forEach((name, index) => {
				items[index] = {
					name,
					latestMessage: "",
					latestTime: ""
				}
			})
			break
	}
	// console.log(chatType, chatId, items)

	return (
		<div>
			<ContactItem {...rest} items={items} chatType={chatType} />
		</div>
	)
}

Contact.propTypes = {
	collapse: PropTypes.bool
	// menuOptions: PropTypes.array.isRequired,
}

export default withRouter(
	connect(
		({ entities }) => ({
			roster: entities.roster,
			group: entities.group,
			message: entities.message
		}),
		dispatch => ({
			doLogin: (username, password) => {}
			// dispatch(LoginActions.login(username, password))
		})
	)(Contact)
)
