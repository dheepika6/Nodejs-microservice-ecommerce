import { Response, Request, NextFunction } from "express";

export const authenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated() && "user" in (req.session.passport || {})) {
    next();
  } else res.status(404).send("Please login to access");
};
