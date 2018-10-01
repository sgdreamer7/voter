import axios from "axios";
import jwt_decode from "jwt-decode";
import TokenGenerator from "../auth/tokenGenerator";
import keys from "../auth/keys";
import store from "../store/configureStore";
import { setCurrentUser } from "../actions/auth";

axios.defaults.baseURL = "http://localhost:5000/api/";

// Add a request interceptor
axios.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (config.headers.common.Authorization) {
      const token = config.headers.common.Authorization.split(" ")[1];
      const tokenGenerator = new TokenGenerator(
        keys.secretOrKey,
        keys.secretOrKey,
        { expiresIn: "1h" }
      );

      return tokenGenerator.refresh(token, {}).then(newtoken => {
        if (newtoken) {
          const headerAuth = "Bearer " + newtoken;
          localStorage.setItem("jwtToken", headerAuth);
          config.headers.Authorization = headerAuth;
          const decoded = jwt_decode(headerAuth);
          store.dispatch(setCurrentUser(decoded));
        }
        return Promise.resolve(config);
      });
    } else {
      return config;
    }
  },
  error => {
    return Promise.reject(error);
  }
);
