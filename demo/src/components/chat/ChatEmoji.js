import React from "react"
import PropTypes from "prop-types"
import { Menu, Icon, Dropdown } from "antd"
import emoji from "@/config/emoji"
import "./style/ChatEmoji.less"

const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item
const path = emoji.path

class ChatEmoji extends React.Component {
 state = {
     tabPosition: "bottom",
     size: "",
     emojiPadding: 5,
     emojiWidth: 25,
     lineNum: 10
 }

 renderEmojiMenu() {
     const { emojiWidth, emojiPadding, lineNum } = this.state
     const emojisNum = Object.values(emoji.map).length
     const rows = Math.ceil(emojisNum / lineNum)
     const width = (emojiWidth + 2 * emojiPadding) * lineNum
     const height = (emojiWidth + 2 * emojiPadding) * rows

     return (
         <Menu className="x-emoji" style={{ width, height }} {...this.props}>
             {this.renderEmoji()}
             {/*
				<Menu.Item key="3" style={{ display: "block" }} disabled>
					<p className="ib" onClick={e => console.log(e)}>
						123
					</p>
				</Menu.Item>
				*/}
         </Menu>
     )
 }

 renderEmoji() {
     // console.log(emojis)
     const { emojiWidth, emojiPadding, lineNum } = this.state

     return Object.keys(emoji.map).map((k, index) => {
         const v = emoji.map[k]
         return (
             <Menu.Item
                 key={k}
                 className="ib"
                 style={{
                     width: emojiWidth,
                     height: emojiWidth,
                     padding: emojiPadding
                 }}
             >
                 <img
                     src={require(`../../themes/faces/${v}`)}
                     width={emojiWidth}
                     height={emojiWidth}
                 />
             </Menu.Item>
         )
     })
 }

 handleChange = tabPosition => {
     // this.setState({ tabPosition })
 }
 render() {
     const menu = this.renderEmojiMenu()

     return (
         <div className="ib">
             <Dropdown overlay={menu} trigger={[ "click" ]}>
                 <a className="ant-dropdown-link" href="#">
                     {/*<Icon type="down" />*/}
                     <i
                         className="iconfont icon-smile"
                         style={{ color: "rgba(0, 0, 0, 0.65)" }}
                     />
                 </a>
             </Dropdown>
         </div>
     )
 }
}

export default ChatEmoji
