import HttpStatus from "http-status-codes";
// eslint-disable-next-line import/no-extraneous-dependencies
import { NextFunction, Request, Response } from "express";

export const isNotFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.status(HttpStatus.NOT_FOUND);
  return next(new Error(`Not found: ${req.originalUrl}`));
};
