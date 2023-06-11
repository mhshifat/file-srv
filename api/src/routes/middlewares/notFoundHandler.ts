import { Request, Response } from "express";
import { ErrorResponse } from "../../interfaces";

export default function notFoundHandler(req: Request, res: Response<ErrorResponse>) {  
  res.status(404).json({
    status: 404,
    success: false,
    message: `${req.originalUrl} - Requested route not found!`
  })
}