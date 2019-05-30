// @flow

export const AUTH_HEADER = "authorization";

export const hasAuthHeader = (req: $Subtype<express$Request>) => !!req.headers && req.headers[AUTH_HEADER] != null;
