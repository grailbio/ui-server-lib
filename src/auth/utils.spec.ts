// eslint-disable-next-line import/no-extraneous-dependencies
import { Request } from "express";
import { hasAuthHeader } from "./utils";

describe("hasAuthHeader", () => {
  it("finds auth header", () => {
    expect(
      hasAuthHeader({
        headers: {
          authorization: "test",
        },
      } as Request),
    ).toEqual(true);
  });
  it("headers with no auth -> false", () => {
    expect(
      hasAuthHeader(({
        headers: {
          something: "test",
        },
      } as unknown) as Request),
    ).toEqual(false);
  });
  it("no headers", () => {
    expect(hasAuthHeader({} as Request)).toEqual(false);
  });
});
