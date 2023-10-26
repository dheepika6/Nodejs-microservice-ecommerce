export type IProduct = {
  _id: string;
  name?: string;
  banner?: string;
  price?: number;
  available?: boolean;
};

export type ICartItem = {
  product: IProduct;
  unit: number;
};

export type IOrderItem = {
  _id: string;
  amount: number;
  date: Date;
};

export type IUser = {
  email: string;
  password: string;
  salt: string;
};

export type IUserSchema = IUser & {
  cart: ICartItem[];
  wishlist: IProduct[];
  orders: IOrderItem[];
};

export type IUserInput = {
  email: string;
  password: string;
};

export type IUserSession = {
  email: string;
  _id: string;
};

export type IAddToCartRequest = {
  product: IProduct;
  qty: number;
  isDeleted: Boolean | undefined;
};
