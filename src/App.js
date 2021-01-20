import Home from "./views/layout/index";
import Login from "./views/login/index";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import PrivateRouter from "./components/privateRouter/index";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact render={() => <Redirect to="/login" />} />
        <Route path="/login" component={Login} />
        <PrivateRouter component={Home} path="/index" />
      </Switch>
    </Router>
  );
}

export default App;
