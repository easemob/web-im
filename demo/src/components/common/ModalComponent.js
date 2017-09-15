import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { Modal } from "antd"
import "./style/ModalComponent.less"

export default class ModalComponent extends React.Component {
    constructor(props) {
        super()
        this.state = { visible: props.visible, title: props.title }
        this.handleCancel = this.handleCancel.bind(this)
    }

    showModal() {
        this.setState({
            visible: true
        })
        debugger
    }
    handleOk = e => {
        // console.log(e)
        this.setState({
            visible: false
        })
    }
    handleCancel(e) {
        // console.log(e)
        this.setState({
            visible: false
        })
        if (typeof this.props.onModalClose === "function") this.props.onModalClose()
    }

    onChangeTitle = v => {
        this.setState({
            title: v
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            visible: nextProps.visible,
            title: nextProps.title
        })
    }

    render() {
        if (!this.state.visible) {
            return null
        }

        return (
            <div>
                <Modal
                    width={this.props.width}
                    className="x-modal x-modal__nofooter"
                    title={this.state.title}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    {
                        <this.props.component
                            onChangeTitle={this.onChangeTitle}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                        />
                    }
                </Modal>
            </div>
        )
    }
}
