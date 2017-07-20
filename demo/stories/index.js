import React from "react"

import { storiesOf, addDecorator } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { linkTo } from "@storybook/addon-links"
import { Welcome } from "@storybook/react/demo"

import "../src/theme.less"

import { Button, Modal } from "antd"
import HeaderTab from "../src/components/header/HeaderTab"
import ContactItem from "../src/components/contact/ContactItem"
import ListItem from "../src/components/list/ListItem"

// 注意
// 1. action(x) x不能是循环引用的对象，否则会卡死

// addDecorator(story => (
//   <div style={{textAlign: 'center'}}>
//     {story()}
//   </div>
// ));

// storiesOf('MyComponent', module)
//   .addDecorator(story => (
//     <div style={{textAlign: 'center'}}>
//       {story()}
//     </div>
//   ))

storiesOf("Welcome", module).add("to Storybook", () =>
	<Welcome showApp={linkTo("Button")} />
)

storiesOf("Button", module)
	.add("with text", () =>
		<Button onClick={action("clicked")}>Hello Button</Button>
	)
	.add("primary", () =>
		<Button onClick={action("clicked")} type="primary">
			Hello Button
		</Button>
	)
	.add("with some emoji", () =>
		<Button onClick={action("clicked")}>😀 😎 👍 💯</Button>
	)

storiesOf("Header", module)
	.addDecorator(story =>
		<div style={{ width: "350px" }}>
			{story()}
		</div>
	)
	.add("tab", () =>
		<HeaderTab
			onClick={e => {
				return action("clicked")(e.key)
			}}
		/>
	)
	.add("tab collapse", () =>
		<HeaderTab
			collapse={true}
			onClick={e => {
				return action("clicked")(e.key)
			}}
		/>
	)

/**
 * 联系人
 * 
 */
storiesOf("Contact", module)
	// .addDecorator(story =>
	// 	<div style={{ width: "350px" }}>
	// 		{story()}
	// 	</div>
	// )
	.add("item", () =>
		<ContactItem
			onClick={e => {
				return action("clicked")(e.key)
			}}
		/>
	)
	.add("item collapse", () =>
		<ContactItem
			collapse={true}
			onClick={e => {
				return action("clicked")(e.key)
			}}
		/>
	)

/**
 *   模态框
 */
storiesOf("Modal", module).add("item", (...args) => {
	const handleOk = () => {
		// this.setState({ loading: true })
		// setTimeout(() => {
		// 	this.setState({ loading: false, visible: false })
		// }, 3000)
	}
	const handleCancel = () => {
		// this.setState({ visible: false })
	}
	const footer = [
		<Button key="back" size="large" onClick={handleCancel}>
			Return
		</Button>,
		<Button
			key="submit"
			type="primary"
			size="large"
			loading={false}
			onClick={handleOk}
		>
			Submit
		</Button>
	]

	return (
		<div>
			<Modal
				visible={true}
				title={null}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={null}
			>
				<h1>Add Friend</h1>
				<p>Some contents...</p>
				<p>Some contents...</p>
				<p>Some contents...</p>
				<p>Some contents...</p>
				<p>Some contents...</p>
			</Modal>
		</div>
	)
})

/**
 *   确认框
 */
const confirm = Modal.confirm

storiesOf("Confirm", module).add("item", (...args) => {
	function showConfirm() {
		confirm({
			title: "Do you Want to delete these items?",
			content: "Some descriptions",
			onOk() {
				console.log("OK")
				action("clicked")("ok")
			},
			onCancel() {
				console.log("Cancel")
				action("clicked")("cancel")
			}
		})
	}

	return <Button onClick={showConfirm}>Confirm</Button>
})

/**
 *   ListItem 列表项
 */

storiesOf("ListItem", module).add("item", () =>
	<ListItem
		onClick={e => {
			return action("clicked")(e.key)
		}}
	/>
)
