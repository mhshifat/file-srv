import { NextFunction, Request, Response } from "express";

export default function catchAsyncHandler(fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      return next(err);
    }
  };
}