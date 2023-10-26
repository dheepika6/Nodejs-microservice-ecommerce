import { Express, Request, Response } from "express";
import { signUp, logOut } from "../controllers/auth";
import { addToCart } from "../controllers/cart";
import { authenticated } from "../middlewares/utitlities";
import passport from "passport";
// import
export function userRoutes(app: Express) {
  app.post(
    "/login",
    passport.authenticate("local", {
      failureMessage: "Incorrect Username/password",
    }),
    function (req: Request, res: Response) {
      if (req.user) {
        res.json(req.user);
      } else {
        // handle errors here, decide what you want to send back to your front end
        // so that it knows the user wasn't found
        res.statusCode = 503;
        res.send({ message: "Not Found" });
      }
    }
  );
  app.post("/signUp", signUp);
  app.post("/logout", logOut);
  app.post("/cart/add", authenticated, addToCart);
  // app.get("/ping", authenticated, (req: Request, res: Response) => {
  //   // console.log(app._router.stack);
  //   console.log("\n==============================");
  //   // console.log(`------------>  ${count++}`);

  //   console.log(`req.body.username -------> ${req.body.username}`);
  //   console.log(`req.body.password -------> ${req.body.password}`);

  //   console.log(`\n req.session.passport -------> `);
  //   console.log(req.session);

  //   console.log(`\n req.user -------> `);
  //   console.log(req.user);
  //   console.log(req.signedCookies);

  //   console.log("\n Session and Cookie");
  //   console.log(`req.session.id -------> ${req.session.id}`);
  //   console.log(`req.session.cookie -------> `);
  //   console.log(req.session.cookie);

  //   console.log("===========================================\n");
  //   res.send();
  // });
}
