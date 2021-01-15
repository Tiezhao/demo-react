import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "./homeList.scss";

export default class HomeList extends React.Component {
  render() {
    return (
      <div className="homeList-warp">
        <h>欢迎！</h>
      </div>
    );
  }
}
