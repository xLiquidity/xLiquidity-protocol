import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store, persistedStore } from "./stores/store";

/**
 * Using PersistGate component from redux-persist to persist the redux store/state across refreshes
 */

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate loading={null} persistor={persistedStore}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
