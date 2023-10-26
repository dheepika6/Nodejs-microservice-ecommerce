import { Response, Request, NextFunction } from "express";
import UserService from "../services/user-service";
import logger from "../utils/logger";
import { IUserInput } from "../types/User";
import { STATUS_CODES } from "../utils/errors";

export const logOut = (
  req: Request<{}, IUserInput, any>,
  res: Response,
  next: NextFunction
) => {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
    res.send();
  });
};

export const signUp = async (
  req: Request<{}, IUserInput, any>,
  res: Response,
  next: NextFunction
) => {
  try {
    const service = new UserService();
    const { email, password } = req.body;
    // let { salt, hashedPassword } = createPassword(password);
    const userCreated = await service.signUp({ email, password });
    req.login(userCreated, function (err) {
      if (err) {
        return next(err);
      }
      res.send(JSON.stringify({ user: userCreated }));
    });
  } catch (error) {
    logger.error("Error Signing up", { error });
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send(error);
  }
};
