"use strict";
import passport from "passport";
import { LocalStrategy } from "passport-local";
import UserRepository from "../database/repositories/User";
export const localStrategy = ({ email, password }) =>
  new LocalStrategy(async function (email, password, cb) {
    let repository = new UserRepository();
    const customer = await repository.findByEmail({ email });

    if (!customer) {
      return cb(null, false, { message: "Incorrect username or password." });
    }

    const isEqual = passwordCheck(password, customer.password, customer.salt);

    if (!isEqual) {
      return cb(null, false, { message: "Incorrect username or password." });
    }
    return cb(null, row);
  });
