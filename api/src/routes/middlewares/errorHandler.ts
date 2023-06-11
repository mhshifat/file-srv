import { ZodError } from 'zod';
import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../../interfaces";

export default function errorHandler(err: Error, req: Request, res: Response<ErrorResponse>, next: NextFunction) {
  // Log the error
  console.error('Global Error:', err);
  // Set a default error status and message
  const status = 500;
  const message = 'Internal Server Error';
  // Customize the error response based on specific error types
  // if (err instanceof MyCustomError) {
  //   // Handle specific error type
  //   // Customize status and message accordingly
  // }
  // Send the error response
  if (err instanceof ZodError) {
    return res.status(422).json({
      status: 422,
      success: false,
      message: 'Invalid fields',
      errors: err.errors.map(e => ({ path: String(e.path[0]), message: `${e.path[0]} field is ${e.message}` }))
    })
  }
  res.status(status).json({
    status,
    success: false,
    message,
  });
}