import axios from "axios";
import jwt_decode from "jwt-decode";
import TokenGenerator from "../auth/tokenGenerator";
import keys from "../auth/keys";
import store from "../store/configureStore";
import setAuthToken from "../utils/setAuthToken";
import { setCurrentUser } from "../actions/auth";

axios.defaults.baseURL = "http://localhost:5000/api/";

// Add a request interceptor
axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    console.log(config);
    if (config.headers.common.Authorization) {
      const token = config.headers.common.Authorization.split(" ")[1];
      console.log("refresh");
      const tokenGenerator = new TokenGenerator(
        keys.secretOrKey,
        keys.secretOrKey,
        { expiresIn: "1m" }
      );

      return tokenGenerator.refresh(token, {}).then(newtoken => {
        if (newtoken) {
          console.log(newtoken);
          const headerAuth = "Bearer " + newtoken;
          setAuthToken(headerAuth);
          const decoded = jwt_decode(headerAuth);
          store.dispatch(setCurrentUser(decoded));
        }
        return config;
      });
    } else {
      return config;
    }
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
