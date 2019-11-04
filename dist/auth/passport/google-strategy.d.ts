import { GoogleAuthConfig, GoogleUserInfo, User } from "./passport-utils";
import { Request } from "express";
declare const Strategy: any;
export declare const refreshAccessToken: (user: User, googleAuthConfig: GoogleAuthConfig) => Promise<false | User>;
export declare class GoogleJwtStrategy extends Strategy {
    name: string;
    googleAuthConfig: GoogleAuthConfig;
    _verify: (x0: string, x1: string, x2: GoogleUserInfo, x3: Function) => void;
    _scopeSeparator: string;
    constructor(googleAuthConfig: GoogleAuthConfig, verify: (x0: string, x1: string, x2: GoogleUserInfo, x3: Function) => void);
    authenticate(req: Request): any;
}
export {};
