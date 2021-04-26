import React from "react";
import routes from "../constants/routes.json";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home } from "../pages/home";
import { Header } from "../common/components/Header";
import { Overview } from "../pages/overview/Overview";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Switch>
          <Route path={routes.OVERVIEW}>
            <Overview />
          </Route>
          <Route path={routes.HOME}>
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
