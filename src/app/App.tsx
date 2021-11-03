import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Header } from "../common/components/Header";
import { useAppDispatch } from "../common/hooks";
import routes from "../constants/routes.json";
import { init as initPdfInfoState } from "../features/pdfInfo/pdfInfoSlice";
import { Home } from "../pages/home";
import { Overview } from "../pages/overview";
import { Store } from "../pages/store";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initPdfInfoState());
  }, []);
  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path={routes.OVERVIEW}>
            <Overview />
          </Route>
          <Route path={routes.STORE}>
            <Store />
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
