
import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import App from "./App";
import ExchangeRateFetcher from "./containers/EchangeRateFetcher";
import { user, rates } from "./store";

import { EXCHANGE_URL, UPDATE_INTERVAL } from "./settings";

import "./index.css";

import * as serviceWorker from "./serviceWorker";

const store = createStore(combineReducers({
    user,
    rates,
}));

ReactDOM.render(
  <Provider store={store}>
    <App />
    <ExchangeRateFetcher interval={UPDATE_INTERVAL} url={EXCHANGE_URL} />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
