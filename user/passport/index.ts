import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { localStrategy } from "./userStrategy";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    localStrategy
  )
);

declare global {
  namespace Express {
    interface User {
      email: string;
      _id?: string;
    }
  }
}

declare module "express-session" {
  interface SessionData {
    passport: {
      user: {
        email: string;
        _id?: string;
      };
    };
  }
}

passport.serializeUser(function (user, done) {
  // process.nextTick(function () {
  console.log("serializing.....");
  console.log(user);
  done(null, { email: user.email, _id: user._id });
  // });
});

passport.deserializeUser(function (user: Express.User, done) {
  // process.nextTick(function () {
  console.log("deserializing.....");
  console.log(user);
  done(null, user);
  // });
});

export default passport;
