import HttpStatus from "http-status-codes";
import { AUTH_HEADER } from "../auth";
import { createProxyMiddleware } from "http-proxy-middleware";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from "express";

export const setupProxy = (
  target: string,
  proxyOptions: {
    [x: string]: any;
  } = {},
) => {
  function onError(error: Error, req: Request, res: Response) {
    console.error(error);
    res.writeHead(HttpStatus.SERVICE_UNAVAILABLE, {
      "Content-Type": "application/json",
    });
    res.end(
      JSON.stringify({
        errors: {
          errors: [
            {
              message: error.toString(),
              errorCode: "UI_SERVER_PROXY_FAILED",
            },
          ],
          warnings: [],
        },
      }),
    );
  }
  function onProxyReq(proxyReq: any, req: Request, res: Response) {
    if (proxyReq.getHeader(AUTH_HEADER)) {
      console.info("proxy", "Using header authorization");
    } else if (req.isAuthenticated() && req.session) {
      // Add authorization token from session.
      const { idToken = "", email } = req.session.passport.user;
      console.info("proxy", `Adding Auth Token for ${email}`);
      proxyReq.setHeader("authorization", `Bearer ${idToken}`);
    } else {
      console.error("proxy", "API Request from unauthorized client");
      res.status(HttpStatus.UNAUTHORIZED).json({
        message: "Unauthorized",
      });
    }
  }
  const appProxy = createProxyMiddleware({
    target,
    onError,
    onProxyReq,
    ...proxyOptions,
  });

  return appProxy;
};
