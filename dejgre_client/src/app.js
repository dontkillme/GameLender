//I will rename this later
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoginView from "./apps/auth/loginView";
import axiosRequests from "./generics/axiosShortcuts";

export default function App() {

  useEffect(() => {
    if (axiosRequests.checkForToken()) {
      axiosRequests.get("/ping/");
    }
  }, []);

  return (
    <Router>
      <Switch>
          <Route exact path="/">
            <LoginView />
          </Route>
          <Route path="/dashboard">
            <div> JEEEEJ </div>
          </Route>
        </Switch>
    </Router>
  )
}