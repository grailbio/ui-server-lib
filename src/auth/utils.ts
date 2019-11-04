// eslint-disable-next-line import/no-extraneous-dependencies
import { Request } from "express";

export const AUTH_HEADER = "authorization";

export const hasAuthHeader = (req: Request) => !!req.headers && req.headers[AUTH_HEADER] != null;
