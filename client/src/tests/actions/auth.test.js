import { loginUser } from "../../actions/auth";
import mockAxios from "axios";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("auth actions", () => {
  it("loginUser action should call setCurrentUser action", async () => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({
        data: { token: process.env.TEST_TOKEN }
      })
    );
  });
});
