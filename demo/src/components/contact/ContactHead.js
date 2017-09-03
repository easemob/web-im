import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"

const ContactHead = ({ width, imgUrl, name, className, ...rest }) => {
    let content = null
    if (name) {
        let names = name.split("")
        content = (
            <span>
                {names[0].toUpperCase()}
            </span>
        )
    }
    if (imgUrl) {
        content = <img src={imgUrl} />
    }

    let size = width + "px"

    return (
        <div
            className={classnames("contact-head", className)}
            style={{
                width: size,
                height: size,
                lineHeight: size,
                fontSize: width / 2
            }}
        >
            {content}
        </div>
    )
}

ContactHead.propTypes = {
    // collapse: PropTypes.bool
    // menuOptions: PropTypes.array.isRequired,
}

export default ContactHead
