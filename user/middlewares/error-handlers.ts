import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("Sorry, not found!");
};

export const serverError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error("Server error from middleware", { error: err });
  res.status(500).send("Server error");
};
