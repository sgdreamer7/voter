import "../__mocks__/localStorage";
import {
  loginUser,
  setCurrentUser,
  registerUser,
  verifyEmail,
  refreshToken,
  logoutUser
} from "../../actions/auth";
import { SET_CURRENT_USER } from "../../actions/types";
import mockAxios from "axios";
import { push } from "react-router-redux";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let store;

beforeEach(() => {
  store = mockStore({});
});

const userData = {
  email: "test@gmail.com",
  password: "123456"
};

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViYjMzYjJkYzVlYWU0NDVlZDBjOTM5ZiIsImVtYWlsIjoidGVzdDRAbWFpbC5ydSIsImlhdCI6MTUzODQ3MzcyOSwiZXhwIjoxNTM4NDc3MzI5fQ.47OvwoFErVBPaZ-vo9RLG2uTUv_NG50Ee46b_rdO6W8";

describe("login actions", () => {
  it("fires a setCurrentUser request action", () => {
    store.dispatch(setCurrentUser(userData));
    expect(store.getActions()).toContainEqual({
      type: SET_CURRENT_USER,
      payload: userData
    });
  });

  it("loginUser action should call request", done => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          token
        }
      })
    );

    store.dispatch(loginUser(userData)).then(() => {
      expect(mockAxios.post).toHaveBeenCalledTimes(1);
      expect(mockAxios.post).toHaveBeenLastCalledWith("users/signin", userData);
      done();
    });
  });
});

describe("register actions", async () => {
  it("should send request to signup route", async () => {
    await store.dispatch(registerUser(userData));

    expect(mockAxios.post).toHaveBeenLastCalledWith("users/signup", userData);
  });
});

describe("verify email action ", () => {
  it("should send request and updates the route", async () => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          token
        }
      })
    );

    await store.dispatch(verifyEmail(userData));
    const actions = store.getActions();
    expect(mockAxios.post).toHaveBeenLastCalledWith(
      "users/verifyEmail",
      userData
    );
    expect(actions).toContainEqual(push("/dashboard"));
  });
});

describe("refreshToken", () => {
  it("should send request to refresh route", async () => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          refreshtoken: token
        }
      })
    );

    await store.dispatch(refreshToken(userData));

    expect(mockAxios.post).toHaveBeenLastCalledWith(
      "users/refreshToken",
      userData
    );
  });
});

describe("logout user", () => {
  it("should call setcurrenUser with empty object", () => {
    store.dispatch(logoutUser());
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: SET_CURRENT_USER,
      payload: {}
    });
  });
});
