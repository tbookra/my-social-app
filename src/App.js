import {  useSelector } from "react-redux";

import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";


function App() {
  const {user} = useSelector(state => state.auth)
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home  /> : <Login  />}
        </Route>
        <Route path="/login">
          {user ? <Redirect to="/" /> : <Login  />}
        </Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register  />}
        </Route>
        <Route path="/profile/:username">
          <Profile  />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
