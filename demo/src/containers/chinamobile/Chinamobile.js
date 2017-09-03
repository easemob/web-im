/**
 * Created by clock on 2017/8/28.
 */
import React from "react"
import { connect } from "react-redux"
import { Layout } from "antd"
import styles from "./style/index.less"
const { Header, Footer, Sider, Content } = Layout

const ChinaMobile = ({}) =>{
    return(
        <div>
            <Layout>
                <Header>Header</Header>
                <Content>Content</Content>
                <Footer>Footer</Footer>
            </Layout>
        </div>
    )
}

export default ChinaMobile