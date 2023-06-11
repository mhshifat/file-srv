import { NextFunction, Request, Response } from "express";

export default function requestLogger(req: Request, _: Response, next: NextFunction) {
  const { method, url, headers } = req;

  // Log the request details
  console.info(`Request received: ${method} - ${url}`);
  // console.info('Headers: ' + JSON.stringify(headers, null, 4));

  // // Log the request params
  // console.info('Params: ', JSON.stringify(req.params || {}, null, 4));

  // // Log the request queries
  // console.info('Queries: ', JSON.stringify(req.query || {}, null, 4));

  // // Log the request body
  // console.info('Body: ', JSON.stringify(req.body || {}, null, 4));

  // Continue processing the request
  next();
};
