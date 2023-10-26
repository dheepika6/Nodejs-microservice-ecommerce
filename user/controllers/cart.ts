import { Request, Response } from "express";
import { IAddToCartRequest } from "../types/User";
import UserRepository from "../database/repositories/User";
import logger from "../utils/logger";

export const addToCart = async (
  req: Request<{}, IAddToCartRequest>,
  res: Response
) => {
  const { product, qty, isDeleted } = req.body;

  try {
    const repository = new UserRepository();
    let profile = await repository.addToCart(
      req.session.passport?.user.email!,
      product,
      2,
      isDeleted
    );
    res.status(200).send(profile);
  } catch (err) {
    logger.error("Error occured addToCart", { error: err });
    res
      .status(404)
      .send(
        `Error occured during ${isDeleted ? "deleting to" : "adding"} the cart`
      );
  }
};
