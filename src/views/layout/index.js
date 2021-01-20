import React from "react";
import Aside from "./aside/index";
import { Layout } from "antd";
import ContainMain from "./containMain/index";
import "./style.scss";

const { Content, Sider } = Layout;

export default class Home extends React.Component {
  render() {
    return (
      <Layout>
        <Sider>
          <Aside />
        </Sider>
        <Content>
          <ContainMain />
        </Content>
      </Layout>
    );
  }
}
