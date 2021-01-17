import Index from "./views/index";
import Login from "./views/login/index";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact render={() => <Redirect to="/login" />} />
        <Route path="/login" component={Login} />
        <Route path="/home" component={Index} />
      </div>
    </Router>
  );
}

export default App;
