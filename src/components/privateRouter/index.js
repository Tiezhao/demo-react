//私有路由，用于页面间的跳转
//如果登录成功则会获取到token，通过token来判断是否要跳转到其他页面,token不存在的话就重定向到登录页面
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getToken } from "../../utils/session";

const PrivateRouter = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        getToken() ? <Component {...routeProps} /> : <Redirect to="/" />
      }
    />
  );
};
export default PrivateRouter;
