import React, { Component, Fragment } from "react";
import { Form, Input, Button, Row, Col, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Code from "../../../components/code/index";
import { Register } from "../../../api/account";
import { valid_password_neg } from "../../../utils/validate";
import "./index.scss";

class RegisterForm extends Component {
  state = {
    username: "",
    module: "register",
    password: "",
    code: "",
  };

  onFinish = (values) => {
    const requestData = {
      username: this.state.username,
      password: this.state.password,
      code: this.state.code,
    };
    Register(requestData)
      .then((response) => {
        message.success(response.data.message);
        if (response.data.resCode === 0) {
          this.changeLogin();
        }
      })
      .catch((error) => {
        console.log("Received values of form: ", error);
      });
  };

  usernameChange = (e) => {
    // console.log(e.target.value);
    this.setState({ username: e.target.value });
  };
  passwordChange = (e) => {
    // console.log(e.target.value);
    this.setState({ password: e.target.value });
  };
  codeChange = (e) => {
    // console.log(e.target.value);
    this.setState({ code: e.target.value });
  };

  //切换到登录页面
  changeLogin = () => {
    this.props.changeFormType("login");
  };

  render() {
    const { username, module } = this.state;
    return (
      <div className="registerForm-warp">
        <div className="registerForm-header">
          <h3 className="cloumn">注册</h3>
          <span className="title" onClick={this.changeLogin}>
            登录
          </span>
        </div>
        <div className="registerForm-content">
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
                  message: "用户名不能为空！",
                },
                {
                  type: "email",
                  message: "邮箱格式不正确!",
                },
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
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "密码不能为空！",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!valid_password_neg.test(value)) {
                      return Promise.reject(
                        "密码必须是大于6位小于20位的数字+字母"
                      );
                    }
                    if (
                      getFieldValue("confirmPassword") &&
                      value != getFieldValue("confirmPassword")
                    ) {
                      return Promise.reject("两次密码不一致！");
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                onChange={this.passwordChange}
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "密码不能为空！",
                },
                // getFieldValue方法可用于获取其他输入框输入的值，这里利用它从而获取到密码框输入的值，从而判断密码与确认密码是否一致
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    // console.log(getFieldValue("password"));
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("两次密码不一致！");
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Item>
            <Form.Item
              name="Code"
              rules={[
                {
                  required: true,
                  message: "验证码不能为空！",
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
                    onChange={this.codeChange}
                  />
                </Col>
                <Col span={8} style={{ paddingLeft: 8.5 }}>
                  <Code username={username} module={module} />
                </Col>
              </Row>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ width: "100%" }}
              >
                注册
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
