import { UserModel } from "../models";
import { ServerError } from "../../utils/errors";
import logger from "../../utils/logger";
import { ObjectId } from "mongoose";
import { IOrderItem, IProduct, IUser, IUserSchema } from "../../types/User";

class UserRepository {
  async create({ email, password, salt }: Omit<IUser, "_id">) {
    try {
      const customer = new UserModel({
        email,
        password,
        salt,
      });

      const customerSaved = await customer.save();

      return customerSaved;
    } catch (err) {
      logger.error("Database error: Create customer", { error: err });
      throw new ServerError("Unable to Create Customer");
    }
  }

  async findByEmail({ email }: { email: string }): Promise<IUserSchema | null> {
    try {
      const customer = await UserModel.findOne({ email });

      return customer;
    } catch (err) {
      logger.error("Database error: FindByEmail customer", { error: err });
      throw new ServerError("Unable to find the customer");
    }
  }

  async findById({ id }: { id: ObjectId }) {
    try {
      const customer = await UserModel.findById(id);
      return customer;
    } catch (error) {
      logger.error("Database error: FindById customer", { error });
      throw new ServerError("Unable to find the customer");
    }
  }

  async addToWishList(
    customerId: string,
    { _id, name, price, available, banner }: IProduct
  ) {
    const product = { _id, name, price, available, banner };

    try {
      const profile = await UserModel.findById(customerId).populate("wishlist");

      if (profile) {
        let wishlist = profile.wishlist;

        if (wishlist.length > 0) {
          let isExist = false;

          for (let i = 0; i < wishlist.length; i++) {
            if (wishlist[i]._id.toString() === product._id.toString()) {
              wishlist.splice(i, 1);
              isExist = true;
              break;
            }
          }

          if (!isExist) {
            wishlist.push(product);
          }
        } else {
          wishlist.push(product);
        }

        profile.wishlist = wishlist;
        const profileResult = await profile.save();

        return profileResult.wishlist;
      }

      return [];
    } catch (error) {
      logger.error("Database error: AddtoWishList customer", { error });
      throw new ServerError("Error in AddtoWishList");
    }
  }

  async addToCart(
    email: string,
    product: IProduct,
    qty: number,
    isDeleted: boolean
  ): Promise<IUserSchema> {
    try {
      const profile = await UserModel.findOne({ email }).populate("cart");
      // const profile = await res.findByEmail({ email: email });
      const { _id, name, price, banner } = product;
      if (profile) {
        const cartItem = {
          product: { _id, name, price, banner },
          unit: qty,
        };

        let cartItems = profile.cart;

        let isExist = false;
        if (cartItems.length > 0) {
          for (let i = 0; i < cartItems.length; i++) {
            let item = cartItems[i];
            if (item.product._id.toString() === _id.toString()) {
              if (isDeleted) {
                cartItems.splice(i, 1);
              } else {
                item.unit = qty;
              }
              isExist = true;
            }
          }
        }

        if (!isExist) {
          cartItems.push(cartItem);
        }
        profile.cart = cartItems;

        const savedResult = await profile.save();

        return savedResult;
      } else {
        throw new Error("Profile not found");
      }
    } catch (error) {
      logger.error("Database error: addToCart customer", { error });
      throw new ServerError("Error in addToCart");
    }
  }

  async addToOrder(customerId: string, order: IOrderItem) {
    try {
      const profile = await UserModel.findById(customerId);

      if (profile) {
        if (profile.orders == undefined) {
          profile.orders = [];
        }
        profile.orders.push(order);

        profile.cart = [];

        const profileResult = await profile.save();

        return profileResult;
      }

      throw new Error("Unable to add to order!");
    } catch (error) {
      logger.error("Database error: addToOrder customer", { error });
      throw new ServerError("Error in addToOrder");
    }
  }
}

export default UserRepository;
