import React from "react"

import { storiesOf, addDecorator } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { linkTo } from "@storybook/addon-links"
import { Welcome } from "@storybook/react/demo"

import "../src/theme.less"

import { Button } from "antd"

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

storiesOf("core.Button", module)
	.add("with text", () =>
		<Button onClick={action("clicked")}>Hello Button</Button>
	)
	.add("with some emoji", () =>
		<Button onClick={action("clicked")}>😀 😎 👍 💯</Button>
	)
