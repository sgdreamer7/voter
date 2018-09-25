import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { routerMiddleware, routerReducer } from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import thunk from "redux-thunk";
import authReducer from "../reducers/auth";
import filterReducer from "../reducers/filters";
import pollsReducer from "../reducers/polls";

export const history = createHistory();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = routerMiddleware(history);

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      polls: pollsReducer,
      filters: filterReducer,
      routing: routerReducer
    }),
    composeEnhancers(applyMiddleware(thunk), applyMiddleware(middleware))
  );

  return store;
};
