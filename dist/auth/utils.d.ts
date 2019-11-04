import { Request } from "express";
export declare const AUTH_HEADER = "authorization";
export declare const hasAuthHeader: (req: Request<import("express-serve-static-core").Dictionary<string>>) => boolean;
