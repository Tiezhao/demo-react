import Index from "./pages/view";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact render={() => <Redirect to="/home" />} />
        <Route path="/home" component={Index} />
      </div>
    </Router>
  );
}

export default App;
