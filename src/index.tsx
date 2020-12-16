import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "@auth0/auth0-react";

const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

const customTheme = extendTheme({ config });

// use cross env to store values
ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_domain || ""}
      clientId={process.env.REACT_APP_clientId || ""}
      redirectUri={window.location.origin}
      audience={process.env.REACT_APP_audience || ""}
      scope={process.env.REACT_APP_scope || ""}
    >
      <Provider store={store}>
        <ChakraProvider theme={customTheme}>
          <App />
        </ChakraProvider>
      </Provider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
