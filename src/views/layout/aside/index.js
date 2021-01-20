import React, { Fragment } from "react";
import { Menu } from "antd";
import { Link, withRouter } from "react-router-dom";

import "./style.scss";

const { SubMenu } = Menu;

const navList = [
  {
    title: "首页",
    path: "/index",
  },
  {
    title: "用户管理",
    path: "/index/user",
    child: [
      {
        title: "用户列表",
        path: "/index/user/list",
      },
      {
        title: "添加用户",
        path: "/index/user/adduser",
      },
    ],
  },
  {
    title: "部门管理",
    path: "/home/department",
    child: [
      {
        title: "部门列表",
        path: "/home/department/list",
      },
      {
        title: "添加部门",
        path: "/home/department/drop",
      },
    ],
  },
  {
    title: "职位管理",
    path: "/home/postion",
    child: [
      {
        title: "职位列表",
        path: "/home/position/list",
      },
      {
        title: "添加职位",
        path: "/home/position/add",
      },
    ],
  },
  {
    title: "请假",
    path: "/home/leave",
  },
  {
    title: "加班",
    path: "/home/overtime",
  },
];

class Aside extends React.Component {
  state = {
    selectedKeys: [],
    openKeys: [],
  };

  componentDidMount = () => {
    const pathName = this.props.location.pathname;
    const menuKey = pathName.split("/").slice(0, 3).join("/");
    this.setState({ selectedKeys: [pathName], openKeys: [menuKey] });
  };

  selectMenu = ({ item, key, keyPath, domEvent }) => {
    console.log(key);
    console.log(keyPath);
    this.setState({
      selectedKeys: [key],
      openKeys: [keyPath[keyPath.length - 1]],
    });
  };

  openMenu = (openKeys) => {
    console.log(openKeys);
    this.setState({
      openKeys: [openKeys[openKeys.length - 1]],
    });
  };

  //有child级菜单，使用递归，用的是SubMenu ，再包一层Menu.Item
  renderSubMenu = ({ title, path, child }) => {
    return (
      <SubMenu key={path} title={title}>
        {child &&
          child.map((item) => {
            return item.child && item.child.length > 0
              ? this.renderSubMenu(item)
              : this.renderMenu(item);
          })}
      </SubMenu>
    );
  };
  //无子菜单,直接用的是Menu.Item
  renderMenu = ({ title, path }) => {
    return (
      <Menu.Item key={path}>
        <Link to={path}>{title}</Link>
      </Menu.Item>
    );
  };
  render() {
    const { selectedKeys, openKeys } = this.state;
    return (
      <Fragment>
        {/* 问题：刷新后defaultSelectedKeys变了，但路由地址没变 */}
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onClick={this.selectMenu}
          onOpenChange={this.openMenu}
        >
          {navList &&
            navList.map((item) => {
              // console.log(item.child);
              return item.child && item.child.length > 0
                ? this.renderSubMenu(item)
                : this.renderMenu(item);
            })}
        </Menu>
      </Fragment>
    );
  }
}

export default withRouter(Aside);
