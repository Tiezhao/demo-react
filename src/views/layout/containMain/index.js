import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import StudentList from "./component/studentList";
import HomeList from "./component/homeList";
import TeacherList from "./component/teacherList";
import PrivateRouter from "../../../components/privateRouter/index";

export default class ContainMain extends React.Component {
  render() {
    return (
      <Switch>
        <PrivateRouter exact component={HomeList} path="/index" />
        <PrivateRouter exact component={StudentList} path="/index/user/list" />
        <PrivateRouter
          exact
          component={TeacherList}
          path="/index/user/adduser"
        />
      </Switch>
    );
  }
}
