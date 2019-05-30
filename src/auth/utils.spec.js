// @flow

import { hasAuthHeader } from "./utils";

describe("hasAuthHeader", () => {
  it("finds auth header", () => {
    expect(
      hasAuthHeader({
        headers: {
          authorization: "test",
        },
      }),
    ).toEqual(true);
  });
  it("headers with no auth -> false", () => {
    expect(
      hasAuthHeader({
        headers: {
          something: "test",
        },
      }),
    ).toEqual(false);
  });
  it("no headers", () => {
    expect(hasAuthHeader({})).toEqual(false);
  });
});
