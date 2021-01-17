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

export default class ContainMain extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/home" component={HomeList} />
          <Route path="/home/studentInfo" component={StudentList} />
          <Route path="/home/teacherInfo" component={TeacherList} />
        </Switch>
      </Router>
    );
  }
}
