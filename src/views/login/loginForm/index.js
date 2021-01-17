import React, { Component, Fragment } from "react";
import { Form, Input, Button, Row, Col, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
//导入api
import { Login, GetCode } from "../../../api/account";
////导入密码正则，邮箱正则
import { valid_password_neg, validate_email } from "../../../utils/validate";
import "./index.scss";

class LoginForm extends Component {
  state = {
    username: "",
    code_disabled: true,
    code_loading: false,
    code_text: "获取验证码",
  };

  //获取到用户名输入框实时数据并更新到state的username中
  usernameChange = (e) => {
    console.log(e.target.value);
    this.setState({ username: e.target.value });
  };

  // 登录， 登录时调用该方法会打印出输入的用户名、密码等
  onFinish = (values) => {
    Login()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {});
    console.log("Received values of form: ", values);
  };

  //获取验证码
  getCode = () => {
    if (this.state.username) {
      this.setState({
        code_loading: true,
        code_text: "发送中",
      });
    }
    const requestData = {
      username: this.state.username,
      module: "login",
    };
    //调用axios来发送请求
    GetCode(requestData)
      .then((response) => {
        //成功则调用resolve
        this.countDown();
      })
      .catch((error) => {
        //失败则调用reject
        this.setState({
          code_loading: false,
          code_text: "重新发送",
        });
      });
  };

  //登录倒计时
  countDown = () => {
    alert(123);
    let timer = null;
    let second = 60;
    this.setState({
      code_loading: false,
      code_text: `${second}s`,
      code_disabled: true,
    });
    timer = setInterval(() => {
      second--;
      if (second <= 0) {
        this.setState({
          code_text: "重新获取",
          code_disabled: false,
        });
        clearInterval(timer);
        return;
      }
      this.setState({
        code_text: `${second}s`,
      });
    }, 1000);
  };

  //切换到注册页面
  changeRegister = () => {
    //子组件接收收到父组件传进来的数据，用this.props接收，打印this.props会发现有changeFormType一个方法，这就是父组件传进来的方法，调用这个方法时要有实参，否则父组件的形参会undefined
    //调用这个方法就相当于执行父组件传进来的方法
    this.props.changeFormType("register");
  };

  render() {
    const { code_disabled } = this.state;
    const _this = this;
    return (
      <div className="loginForm-warp">
        <div className="loginForm-header">
          <h3 className="cloumn">登录</h3>
          <span className="title" onClick={this.changeRegister}>
            账号注册
          </span>
        </div>
        <div className="loginForm-content">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "邮箱不能为空！",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (validate_email(value)) {
                      _this.setState({ code_disabled: false });
                      return Promise.resolve();
                    }
                    return Promise.reject("邮箱格式不正确！");
                  },
                }),
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
                onChange={this.usernameChange}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "密码不能为空！",
                },
                {
                  pattern: valid_password_neg,
                  message: "密码必须是大于6位小于20位的数字+字母",
                },
              ]}
              // 状态符，当输入错误时会出现红叉叉，正确会出现绿色的√
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              name="Code"
              rules={[
                {
                  required: true,
                  message: "验证码不能为空!",
                },
                {
                  len: 6,
                  message: "请输入长度为6位的验证码!",
                },
              ]}
            >
              <Row gutter={13}>
                <Col span={15}>
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="text"
                    placeholder="Code"
                  />
                </Col>
                <Col span={8} style={{ paddingLeft: 8.5 }}>
                  <Button
                    type="danger"
                    disabled={code_disabled}
                    onClick={this.getCode}
                    loading={this.state.code_loading}
                    className="code-button"
                  >
                    {this.state.code_text}
                  </Button>
                </Col>
              </Row>
            </Form.Item>
            {/* 点击登录按钮后会触发头部Form的onFinish */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ width: "100%" }}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
