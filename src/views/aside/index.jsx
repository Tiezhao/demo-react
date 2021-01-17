import React, { Fragment } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

import "./style.scss";

const navList = [
  {
    title: "首页",
    path: "/home",
  },
  {
    title: "学生信息",
    path: "/home/studentInfo",
  },
  {
    title: "老师信息",
    path: "/home/teacherInfo",
  },
];

export default class Aside extends React.Component {
  render() {
    return (
      <Fragment>
        {/* 问题：刷新后defaultSelectedKeys变了，但路由地址没变 */}
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["/home"]}>
          {navList.map((item) => {
            return (
              <Menu.Item key={item.path}>
                <Link to={item.path}>{item.title}</Link>
              </Menu.Item>
            );
          })}
        </Menu>
      </Fragment>
    );
  }
}
