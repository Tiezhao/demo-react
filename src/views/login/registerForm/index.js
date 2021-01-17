import React, { Component, Fragment } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./index.scss";

class RegisterForm extends Component {
  onFinish = (values) => {
    // console.log("Received values of form: ", values);
  };

  //切换到登录页面
  changeLogin = () => {
    this.props.changeFormType("login");
  };

  render() {
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
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              name="confirm password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
                // 该方法可用于获取密码，从而判断密码与确认密码是否一致
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    console.log(getFieldValue("password"));
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "The two passwords that you entered do not match!"
                    );
                  },
                }),
              ]}
            >
              {/* <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Confirm Password"
              /> */}
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
                  message: "Please input your Code!",
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
                  <Button type="danger">获取验证码</Button>
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
