import HttpStatus from "http-status-codes";
import { GoogleAuthConfig } from "./passport/passport-utils";
// eslint-disable-next-line import/no-extraneous-dependencies
import { NextFunction, Request, Response } from "express";
import { hasAuthHeader } from "./utils";
import { refreshAccessToken } from "./passport";

type AuthMiddlewareOptions = {
  allowAuthHeader?: boolean;
};

export const refreshAuthIfNecessary = (googleAuthConfig: GoogleAuthConfig, options: AuthMiddlewareOptions = {}) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (options.allowAuthHeader && hasAuthHeader(req)) {
    next();
    return;
  }
  if (!req.user) {
    next();
    return;
  }

  // eslint-disable-next-line prefer-destructuring
  const user: any = req.user;

  if (!user.refreshToken) {
    next();
    return;
  }
  const nowInSeconds = Date.now() / 1000;
  const { email, expirationInSeconds = nowInSeconds, refreshToken } = user;
  if (!req.isAuthenticated() || nowInSeconds > expirationInSeconds - 1 * 60) {
    // Expiring soon, lets refresh.
    if (refreshToken) {
      console.info("Refreshing token for", email);
      refreshAccessToken(user, googleAuthConfig)
        .then(() => {
          next();
        })
        .catch(console.error);
      return;
    }
  }
  next();
};

export const checkAuth = (googleAuthConfig: GoogleAuthConfig, options: AuthMiddlewareOptions = {}) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  refreshAuthIfNecessary(googleAuthConfig)(req, res, () => {
    if (options.allowAuthHeader && hasAuthHeader(req)) {
      next();
      return;
    }
    if (!req.isAuthenticated()) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        message: "Unauthorized",
      });
      return;
    }
    next();
  });
};

export const checkAuthOrRedirect = (googleAuthConfig: GoogleAuthConfig, options: AuthMiddlewareOptions = {}) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  refreshAuthIfNecessary(googleAuthConfig)(req, res, () => {
    if (options.allowAuthHeader && hasAuthHeader(req)) {
      next();
      return;
    }
    if (!req.isAuthenticated()) {
      res.redirect(`/sign-in?redirectTo=${req.originalUrl}`);
      return;
    }
    next();
  });
};

export const authMiddlewares = {
  refreshAuthIfNecessary,
  checkAuth,
  checkAuthOrRedirect,
};
