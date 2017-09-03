import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"

let key = 0

const ListItem = ({ config, className, ...rest }) => {
    !config && (config = [])

    const modes = {
        left: "fl",
        right: "fr",
        inlineBlock: "ib",
        block: ""
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
        <div className={classNames("x-list-item", className)} {...rest}>
            {content}
        </div>
    )
}

ListItem.propTypes = {
    // collapse: PropTypes.bool
    // menuOptions: PropTypes.array.isRequired,
}

export default ListItem
