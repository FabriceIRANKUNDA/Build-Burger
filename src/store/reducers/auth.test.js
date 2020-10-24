import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe("Auth reducer", () => {
  let initialState = null;
  beforeEach(() => {
    initialState = {
      token: null,
      userId: null,
      loading: false,
      error: null,
      authRedirectPath: "/",
    };
  });

  it("Should return initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("Should update state with token and user id", () => {
    expect(
      reducer(initialState, {
        type: actionTypes.AUTH_SUCCESS,
        idToken: "some token",
        userId: "some user-ID",
      })
    ).toEqual({
      token: "some token",
      userId: "some user-ID",
      loading: false,
      error: null,
      authRedirectPath: "/",
    });
  });
});
