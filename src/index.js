import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import StartMenu from "./StartMenu";
import NotFound from "./NotFound";

ReactDOM.render(
  <Router>
      <Switch>
        <Route exact path="/" component={StartMenu} />
        <Route component={NotFound} />
      </Switch>
  </Router>, document.getElementById("root"));
