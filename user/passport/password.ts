import crypto from "crypto";
import config from "../config";

type IPasswordCreate = {
  (password: string): { salt: string; hashedPassword: string };
};
export const createPassword: IPasswordCreate = (password) => {
  let salt = crypto.randomBytes(config.crypto.randomSize).toString("base64");
  let hashedPassword = crypto.pbkdf2Sync(
    password,
    salt,
    config.crypto.workFactor,
    config.crypto.keyLength,
    "sha256"
  );
  console.log("salt", salt);
  console.log("hashedPass", hashedPassword);

  return {
    salt: salt,
    hashedPassword: hashedPassword.toString("base64"),
  };
};

export const passwordCheck = (
  password: string,
  actualPassword: string,
  salt: string
): Boolean => {
  let hashedPassword = crypto.pbkdf2Sync(
    password,
    salt,
    config.crypto.workFactor,
    config.crypto.keyLength,
    "sha256"
  );
  console.log(
    password,
    hashedPassword.toString("base64"),
    actualPassword,
    salt
  );

  let isPasswordEqual = crypto.timingSafeEqual(
    hashedPassword,
    Buffer.from(actualPassword, "base64")
  );
  console.log("isPasswordEqual", isPasswordEqual);

  return isPasswordEqual;
};
