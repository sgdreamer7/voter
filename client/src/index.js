import React from "react";
import ReactDOM from "react-dom";
import { Route, Switch } from "react-router-dom";

import "./axios/config";

import jwt_decode from "jwt-decode";
import { setCurrentUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import TokenGenerator from "./auth/tokenGenerator";
import keys from "./auth/keys";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import store, { history } from "./store/configureStore";
import "assets/css/material-dashboard-react.css?v=1.5.0";
import "assets/css/styles.css";

import indexRoutes from "routes/index.jsx";

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken.split(" ")[1];
  const tokenGenerator = new TokenGenerator(
    keys.secretOrKey,
    keys.secretOrKey,
    { expiresIn: "1h" }
  );
  tokenGenerator.refresh(token, {}).then(newtoken => {
    if (newtoken) {
      const headerAuth = "Bearer " + newtoken;
      localStorage.setItem("jwtToken", headerAuth);
      setAuthToken(headerAuth);
      const decoded = jwt_decode(headerAuth);
      store.dispatch(setCurrentUser(decoded));
    }
    setAuthToken(token);
    store.dispatch(setCurrentUser(jwt_decode(token)));
  });
}

const app = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        {indexRoutes.map((prop, key) => {
          return (
            <Route path={prop.path} component={prop.component} key={key} />
          );
        })}
      </Switch>
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
