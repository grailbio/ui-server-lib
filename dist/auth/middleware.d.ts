import { GoogleAuthConfig } from "./passport/passport-utils";
import { NextFunction, Request, Response } from "express";
declare type AuthMiddlewareOptions = {
    allowAuthHeader?: boolean;
};
export declare const refreshAuthIfNecessary: (googleAuthConfig: GoogleAuthConfig, options?: AuthMiddlewareOptions) => (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response, next: NextFunction) => void;
export declare const checkAuth: (googleAuthConfig: GoogleAuthConfig, options?: AuthMiddlewareOptions) => (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response, next: NextFunction) => void;
export declare const checkAuthOrRedirect: (googleAuthConfig: GoogleAuthConfig, options?: AuthMiddlewareOptions) => (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response, next: NextFunction) => void;
export declare const authMiddlewares: {
    refreshAuthIfNecessary: (googleAuthConfig: GoogleAuthConfig, options?: AuthMiddlewareOptions) => (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response, next: NextFunction) => void;
    checkAuth: (googleAuthConfig: GoogleAuthConfig, options?: AuthMiddlewareOptions) => (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response, next: NextFunction) => void;
    checkAuthOrRedirect: (googleAuthConfig: GoogleAuthConfig, options?: AuthMiddlewareOptions) => (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response, next: NextFunction) => void;
};
export {};
