// @flow
import HttpStatus from "http-status-codes";
import proxy from "http-proxy-middleware";
import { AUTH_HEADER } from "../auth";

export const setupProxy = (target: string, proxyOptions: Object = {}) => {
  function onError(error, req, res) {
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
  function onProxyReq(proxyReq, req, res) {
    if (proxyReq.getHeader(AUTH_HEADER)) {
      console.info("proxy", "Using header authorization");
    } else if (req.isAuthenticated()) {
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
  const appProxy = proxy({
    target,
    onError,
    onProxyReq,
    ...proxyOptions,
  });

  return appProxy;
};
