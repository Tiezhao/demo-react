import React, { Component, Fragment } from "react";
import { Button, message } from "antd";
import { GetCode } from "../../api/account";
import { validate_email } from "../../utils/validate";

import "./index.scss";

var timer = null;

class Code extends Component {
  state = {
    username: "",
    code_disabled: false,
    code_loading: false,
    code_text: "获取验证码",
    module: "",
  };

  //子组件获取到父组件传进来的props
  componentWillReceiveProps({ username, module }) {
    // console.log(this.props.username);//可以用解构赋值，不一定非要用this.props来获取
    // console.log(username);
    this.setState({ username, module });
  }

  //组件被销毁时清除定时器
  componentWillUnmount() {
    clearInterval(timer);
  }
  //获取验证码
  getCode = () => {
    // alert(this.state.username);
    if (this.state.username === "") {
      message.warning("用户名不能为空！", 2);
      return;
    }
    if (!validate_email(this.state.username)) {
      message.warning("邮箱格式不正确！", 2);
      return;
    }
    if (this.state.username) {
      this.setState({
        code_loading: true,
        code_text: "发送中",
      });
    }

    const requestData = {
      username: this.state.username,
      module: this.state.module,
    };
    //调用axios接口来发送验证码请求
    GetCode(requestData)
      .then((response) => {
        //发送验证码请求成功则调用resolve
        //发送验证码请求则提示发送成功
        // console.log(response.data.message);
        //拿到验证码
        message.success(`${response.data.message}`, 2);
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
    let second = 5;
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
        //销毁定时器
        clearInterval(timer);
        return;
      }
      this.setState({
        code_text: `${second}s`,
      });
    }, 1000);
  };

  render() {
    const { code_disabled } = this.state;
    return (
      <Button
        type="danger"
        disabled={code_disabled}
        onClick={this.getCode}
        loading={this.state.code_loading}
        className="code-button"
      >
        {this.state.code_text}
      </Button>
    );
  }
}

export default Code;
