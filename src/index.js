import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import configureStore, { history } from "./store/configureStore";
import "assets/css/material-dashboard-react.css?v=1.5.0";
import "assets/css/styles.css";

import indexRoutes from "routes/index.jsx";

const store = configureStore();

const app = (
  <Provider store={store}>
    <Router history={history}>
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
