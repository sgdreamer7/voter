import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { syncHistoryWithStore } from "react-router-redux";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";

import "assets/css/material-dashboard-react.css?v=1.5.0";
import "assets/css/styles.css";

import indexRoutes from "routes/index.jsx";

const store = configureStore();

const hist = syncHistoryWithStore(createBrowserHistory(), store);

const app = (
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        {indexRoutes.map((prop, key) => {
          return (
            <Route path={prop.path} component={prop.component} key={key} />
          );
        })}
      </Switch>
    </Router>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
