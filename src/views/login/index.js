import React, { Component, Fragment } from "react";
import "./index.scss";
import LoginForm from "./loginForm/index";
import RegisterForm from "./registerForm/index";

class Login extends Component {
  state = {
    formType: "login",
  };
  // 调用changeForm改变formType
  changeForm = (value) => {
    this.setState({ formType: value });
    console.log(value);
  };
  render() {
    const { formType } = this.state;
    return (
      <div className="login-warp">
        {formType === "login" ? (
          // 父组件先定义了一个方法changeForm，在调用子组件LoginForm的时候把这个方法传递进去，传的时候给这个方法换了个别名changeFormType替代，子组件接受的方法就是这个别名
          <LoginForm changeFormType={this.changeForm} />
        ) : (
          <RegisterForm changeFormType={this.changeForm} />
        )}
      </div>
    );
  }
}

export default Login;
