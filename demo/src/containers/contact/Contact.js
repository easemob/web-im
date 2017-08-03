import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import ContactItem from "@/components/contact/ContactItem"

const Contact = ({ history, match, location, roster, group, ...rest }) => {
	// console.log(history, match, location)
	const { pathname } = location
	const paths = pathname.split("/")
	const chatType = paths[1]
	const chatId = paths[2]

	const items = []
	switch (chatType) {
		case "contact":
			roster.friends.forEach((name, index) => {
				items[index] = {
					name,
					latestMessage: "",
					latestTime: ""
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
			group: entities.group
		}),
		dispatch => ({
			doLogin: (username, password) => {}
			// dispatch(LoginActions.login(username, password))
		})
	)(Contact)
)
