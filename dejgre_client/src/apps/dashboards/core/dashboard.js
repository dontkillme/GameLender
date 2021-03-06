import React from "react";
import {
  Router,
  Switch,
  Route
} from "react-router-dom";
import axiosRequests from "../../../generics/axiosShortcuts";
import NavBar from "./NavBar";
import BoardGameView from "../../boardgames/BoardGameView";
import history from "../../../generics/history";

export default class Dashboard extends React.Component {

  componentDidMount() {
    axiosRequests.get("/ping/");
  }

  render() {
    return (
      <Router history={history} >
        <NavBar loginRefresh={this.props.loginRefresh}/>
        <Switch>
          <Route exact path="/">
            <div> JEEEEJ </div>
          </Route>
          <Route path="/profile">
            <div> profil </div>
          </Route>
          <Route path="/boardgames">
            <BoardGameView />
          </Route>
        </Switch>
    </Router>
    );
  }
}