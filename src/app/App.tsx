import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home } from "../pages/home";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
