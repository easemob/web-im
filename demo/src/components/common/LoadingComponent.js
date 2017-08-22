import React, {Component} from "react"
import {Spin} from "antd"

export default ({size = "large", show, msg}) => {
    return (
        <div className={'webim-loading' + (show ? '' : ' hide')}>
            <div
                style={{
                    position: "absolute",
                    top: "40%",
                    left: "50%",
                }}
            >
                <Spin size={size}/>
                {/*<p>*/}
                {/*<br/>{msg}...*/}
                {/*</p>*/}
            </div>

        </div>
    )
}
