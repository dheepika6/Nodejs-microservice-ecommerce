import { VerifyFunction } from "passport-local";
import UserRepository from "../database/repositories/User";
import { passwordCheck } from "./password";
import config from "../config";
export const localStrategy: VerifyFunction = async (email, password, done) => {
  try {
    let repository = new UserRepository();

    const user = await repository.findByEmail({ email });

    if (!user) {
      done(null, false, { message: "Incorrect Username/password" });
    } else {
      let isPasswordEqual = passwordCheck(password, user?.password, user.salt);
      if (!isPasswordEqual) {
        done(null, false, { message: "Incorrect User/password" });
      } else done(null, user);
    }
  } catch (err) {
    done(err);
  }
};
