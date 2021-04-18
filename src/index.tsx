import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";
import store from "./app/store";
import { Provider } from "react-redux";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { theme as chakraTheme } from "./app/theme";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={chakraTheme}>
      <Provider store={store}>
        <ColorModeScript
          initialColorMode={chakraTheme.config.initialColorMode}
        />
        <App />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
