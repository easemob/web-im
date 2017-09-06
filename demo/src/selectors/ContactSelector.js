import { createSelector } from "reselect"
import _ from "lodash"

const currentContacts = (state, { selectTab, selectItem }) => {
    const contactType = selectTab === "contact" ? "roster" : selectTab
    return _.get(state, [ "entities", contactType ], [])
}

const getCurrentContacts = createSelector(
    [ currentContacts ],
    (contacts) => contacts
)

export default getCurrentContacts
