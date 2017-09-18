import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { connect } from "react-redux"
import { Input, Button, Row, Col, Form, Radio, Checkbox, message } from "antd"
import GroupActions from "@/redux/GroupRedux"
import { I18n } from "react-redux-i18n"
import _ from "lodash"
import "./style/AddGrouModal.less"
const RadioGroup = Radio.Group
const CheckboxGroup = Checkbox.Group

const FormItem = Form.Item

class AddGroupModal extends React.Component {
 state = {
     name: "",
     screen: 1
 }

 onChangeName = e => {
     this.setState({ name: e.target.value })
 }

 handleSubmit = e => {
     e.preventDefault()
     this.props.form.validateFields((err, values) => {
         if (!err) {
             console.log("Received values of form: ", values)
             const {
                 name,
                 description,
                 members,
                 type,
                 canJoin,
                 allowInvite = true
             } = values
             if (!name) {
                 return message.error("Please input Group Name !", 1)
             }

             if (!description) {
                 return message.error("Please enter description ！", 1)
             }

             //message.success(I18N.loginSuccessfully, 1)
             this.props.createGroups({
                 data: {
                     groupname: name,
                     desc: description,
                     members: members,
                     public: type === "public",
                     approval: canJoin === "yes",
                     allowinvites: allowInvite
                     // invite_need_confirm // default: member
                 },
                 success: () => {
                     console.log("success")
                     message.success(`Group ${name} created`)
                     this.props.getGroups()
                     this.props.onCancel()
                 },
                 error: () => {
                     // console.log("error")
                     // message.error(`Group ${name} failed`)
                 }
             })
         }
     })
 }

 onCheck = e => {}

 render() {
     const { name, screen } = this.state
     const { getFieldDecorator } = this.props.form
     const { roster } = this.props
     const requests = []

     const items = []
     const options = []
     roster.friends.forEach((name, index) => {
         items[index] = {
             name
         }

         options[index] = { label: name, value: name }
     })

     // const options = [
     // 	{ label: "Apple", value: "Apple" },
     // 	{ label: "Pear", value: "Pear" },
     // 	{ label: "Orange", value: "Orange" },
     // 	{ label: "Orange", value: "1" },
     // 	{ label: "Orange", value: "2" },
     // 	{ label: "Orange", value: "3" },
     // 	{ label: "Orange", value: "4" },
     // 	{ label: "Orange", value: "5" },
     // 	{ label: "Orange", value: "13" },
     // 	{ label: "Orange", value: "6" },
     // 	{ label: "Orange", value: "7" },
     // 	{ label: "Orange", value: "8" },
     // 	{ label: "Orange", value: "9" },
     // 	{ label: "Orange", value: "11" },
     // 	{ label: "Orange", value: "12" }
     // ]
     // console.log(this.props.form.getFieldValue("type"))

     return (
         <Form onSubmit={this.handleSubmit} className="x-add-group">
             <div style={{ display: screen === 1 ? "block" : "none" }}>
                 <FormItem>
                     {getFieldDecorator("name", {
                         rules: [ { message: "Please input Group Name !" } ]
                     })(<Input placeholder="Group Name" />)}
                 </FormItem>
                 <FormItem>
                     {getFieldDecorator("description", {
                         rules: [ { message: "Please enter description ！" } ]
                     })(
                         <Input.TextArea
                             placeholder="Enter description"
                             autosize={{ minRows: 4, maxRows: 6 }}
                         />
                     )}
                 </FormItem>
                 <FormItem style={{ marginBottom: 10 }}>
                     <p>Group Type</p>
                     {getFieldDecorator("type", { initialValue: "public" })(
                         <RadioGroup>
                             <Radio style={{ width: 100 }} value="private">
									Private
                             </Radio>
                             <Radio style={{ width: 100 }} value="public">
									Public
                             </Radio>
                         </RadioGroup>
                     )}
                 </FormItem>
                 {this.props.form.getFieldValue("type") === "private" &&
      <FormItem style={{ marginBottom: 10 }}>
          {getFieldDecorator("allowInvite", {
              valuePropName: "checked",
              initialValue: true
          })(<Checkbox>Allow invite</Checkbox>)}
      </FormItem>}

                 <FormItem style={{ marginBottom: 10 }}>
                     <p>Permission to join</p>
                     {getFieldDecorator("canJoin", { initialValue: "no" })(
                         <RadioGroup>
                             <Radio style={{ width: 100 }} value="yes">
									Yes
                             </Radio>
                             <Radio style={{ width: 100 }} value="no">
									No
                             </Radio>
                         </RadioGroup>
                     )}
                 </FormItem>
                 <div style={{ overflow: "hidden" }}>
                     <Button
                         style={{
                             width: 100,
                             height: 32
                             // marginBottom: 30
                         }}
                         className="fr"
                         type="primary"
                         onClick={() =>
                             this.setState({
                                 screen: 2
                             })}
                     >
							Next
                     </Button>
                 </div>
             </div>
             <div style={{ display: screen === 2 ? "block" : "none" }}>
                 <div className="x-add-group-members">
                     <FormItem>
                         {getFieldDecorator("members", { initialValue: [] })(
                             <CheckboxGroup
                                 style={{ display: "block" }}
                                 options={options}
                                 onChange={this.onCheck}
                             />
                         )}
                     </FormItem>
                 </div>
                 <div style={{ overflow: "hidden" }}>
                     <div
                         className="fl"
                         style={{ cursor: "pointer" }}
                         onClick={() =>
                             this.setState({
                                 screen: 1
                             })}
                     >
                         <i className="iconfont icon-arrow-left" /> back
                     </div>
                     <Button
                         style={{
                             width: 100,
                             height: 32
                             // marginBottom: 30
                         }}
                         className="fr"
                         type="primary"
                         htmlType="submit"
                     >
							Create
                     </Button>
                 </div>
             </div>
         </Form>
     )
 }
}

export default connect(
    ({ entities }) => ({
        roster: entities.roster
    }),
    dispatch => ({
        createGroups: options => dispatch(GroupActions.createGroups(options)),
        getGroups: options => dispatch(GroupActions.getGroups(options))
    })
)(Form.create()(AddGroupModal))
