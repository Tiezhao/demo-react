import React, { Component, Fragment } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
//导入api
import { Login } from "../../../api/account";
////导入密码正则，邮箱正则
import { valid_password_neg } from "../../../utils/validate";
import Code from "../../../components/code/index";
import { setToken } from "../../../utils/session";
import "./index.scss";
class LoginForm extends Component {
  state = {
    username: "",
    module: "login",
    password: "",
    code: "",
    loading: false,
  };

  //获取到用户名输入框实时数据并更新到state的username中
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

  // 登录， 登录时调用该方法会打印出输入的用户名、密码等
  onFinish = (values) => {
    this.setState({ loading: true });
    const requestData = {
      username: this.state.username,
      password: this.state.password,
      code: this.state.code,
    };
    Login(requestData)
      .then((response) => {
        // console.log(response.data.data.token);
        //登陆成功后将token暂时存储到浏览器
        setToken(response.data.data.token);
        this.props.history.push("/index");
      })
      .catch((error) => {
        console.log("Received values of form: ", error);
      });
  };

  //切换到注册页面
  changeRegister = () => {
    //子组件接收收到父组件传进来的数据，用this.props接收，打印this.props会发现有changeFormType一个方法，这就是父组件传进来的方法，调用这个方法时要有实参，否则父组件的形参会undefined
    //调用这个方法就相当于执行父组件传进来的方法
    this.props.changeFormType("register");
  };

  render() {
    const { username, module, loading } = this.state;
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
                // ({ getFieldValue }) => ({
                //   validator(_, value) {
                //     if (validate_email(value)) {
                //       _this.setState({ code_disabled: false });
                //       return Promise.resolve();
                //     }
                //     return Promise.reject("邮箱格式不正确！");
                //   },
                // }),
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
                //利用pattern正则作判断
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
                onChange={this.passwordChange}
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
                    onChange={this.codeChange}
                  />
                </Col>
                <Col span={8} style={{ paddingLeft: 8.5 }}>
                  <Code username={username} module={module} />
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
                loading={loading}
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

export default withRouter(LoginForm);
