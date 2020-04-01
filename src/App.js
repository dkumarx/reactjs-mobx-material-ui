import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { isAuthenticated } from "./stores/commonStore";
import LoginScreen from './screens/Login/LoginScreen';
import DevicesScreen from "./screens/devices/DevicesScreen";

export default function App() {
  return (
    <Router>
      <Redirect from="/" to="/login" />
      <div>
        <Switch>
          <PublicRoute path="/login">
            <LoginScreen />
          </PublicRoute>
          <PrivateRoute path="/devices">
            <DevicesScreen />
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}

// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() =>
        isAuthenticated.get() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )
      }
    />
  );
}
// Router for non-register user
function PublicRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() =>
        !isAuthenticated.get() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/devices",
            }}
          />
        )
      }
    />
  );
}