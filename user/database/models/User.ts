import mongoose, { Schema } from "mongoose";
import { IUserSchema } from "../../types/User";

const UserSchema = new Schema<IUserSchema>(
  {
    email: String,
    password: String,
    salt: String,
    cart: [
      {
        product: {
          _id: { type: String, requires: true },
          name: String,
          banner: String,
          price: Number,
        },
        unit: { type: Number, require: true },
      },
    ],
    wishlist: [
      {
        _id: { type: String, requires: true },
        name: String,
        banner: String,
        price: Number,
        available: Boolean,
      },
    ],
    orders: [
      {
        _id: { type: String, requires: true },
        amount: { type: Number },
        date: { type: Date, default: Date.now() },
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.salt;
      },
    },
    timestamps: true,
  }
);

export default mongoose.model("user", UserSchema);
