import { describe, expect, test } from "@jest/globals";
import { createPassword, passwordCheck } from "../../passport/password";

describe("test createPassword", () => {
  test("test createPassword with verify", () => {
    const { salt, hashedPassword } = createPassword("password");
    let isEqual = passwordCheck("password", hashedPassword, salt);
    console.log("isEqual: ", isEqual);
  });
});
