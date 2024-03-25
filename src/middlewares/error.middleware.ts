import type { Application, Request, Response, NextFunction } from 'express';
import { HttpException } from "../exceptions/HttpException";

export const ErrorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || "Something went wrong";

    console.error(error);
    res.status(status).json({ message });
  } catch (err) {
    next(err);
  }
}