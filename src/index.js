import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import StartMenu from "./StartMenu";
import NotFound from "./NotFound";
import TeamsView from "./TeamsView";
import TeamView from "./TeamView";
import MatchesView from "./MatchesView";

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={StartMenu} />
      <Route path="/teams" component={TeamsView} />
      <Route path="/team/:id" component={TeamView} />
      <Route path="/team" component={TeamView} />
      <Route path="/matches" component={MatchesView} />
      <Route component={NotFound} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
