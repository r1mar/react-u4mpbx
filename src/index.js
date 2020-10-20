import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import StartMenu from "./StartMenu";
import NotFound from "./NotFound";
import TeamsView from "./TeamList";
import TeamView from "./file2";

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={StartMenu} />
      <Route path="/teams" component={TeamsView} />
      <Route path="/team/:name" component={TeamView} />
      <Route component={NotFound} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
