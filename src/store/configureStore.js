import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import {
  routerMiddleware,
  browserHistory,
  routerReducer
} from "react-router-redux";
import thunk from "redux-thunk";
import authReducer from "../reducers/auth";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = routerMiddleware(browserHistory);

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      routing: routerReducer
    }),
    composeEnhancers(applyMiddleware(thunk), applyMiddleware(middleware))
  );

  return store;
};
