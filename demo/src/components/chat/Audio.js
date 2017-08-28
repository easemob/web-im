/**
 * Created by clock on 2017/8/28.
 */
import React from "react"
import { Button, Icon } from "antd"

class Audio extends React.Component {
    constructor() {
        super()
        this.play = this.play.bind(this)
    }

    play() {
        this.refs.aud.play()
    }

    render() {
        let url = this.props.url
        return (
            <Button type="primary" onClick={this.play} icon="icon-volume-up">
                <Icon type="sound" />
                {this.props.length + "''"}
                <audio src={url} ref="aud" />
            </Button>
        )
    }
}

export default Audio
