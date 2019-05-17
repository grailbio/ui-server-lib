// @flow
import HttpStatus from "http-status-codes";

export const isNotFoundMiddleware = (
  req: $Subtype<express$Request>,
  res: express$Response,
  next: express$NextFunction,
) => {
  res.status(HttpStatus.NOT_FOUND);
  return next(new Error(`Not found: ${req.originalUrl}`));
};
