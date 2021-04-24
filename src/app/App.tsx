import React from "react";
import routes from "../constants/routes.json";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home } from "../pages/home";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={routes.HOME}>
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
