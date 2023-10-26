import express from "express";
import config from "./config";
import logger from "./utils/logger";
import helmet from "helmet";
import { user } from "./routes";
import { db_connection } from "./database";
import passport from "./passport";
import cookieParser from "cookie-parser";
import session from "express-session";
import connectRedis from "connect-redis";
import path from "path";
import { createClient } from "redis";
import { notFound, serverError } from "./middlewares/error-handlers";

const startServer = async () => {
  let redisClient = createClient();
  redisClient.connect().catch(console.error);
  let RedisStore = new connectRedis({ client: redisClient });

  let app = express();
  app.use(express.static(path.join(__dirname, "public")));
  app.use(cookieParser(config.COOKIE_SECRET));
  app.use(
    session({
      secret: config.COOKIE_SECRET!,
      saveUninitialized: true,
      resave: true,
      store: RedisStore,
      cookie: { maxAge: 60 * 60 * 24 * 1000 },
    })
  );
  app.use(helmet());
  app.use(passport.initialize());

  // app.use(passport.authenticate("session"));
  app.use(passport.session());
  app.use(express.urlencoded({ extended: true }));

  await db_connection();

  user(app);
  app.use(serverError);
  app.use(notFound);
  logger.info(`Server running on PORT: ${config.PORT}`);
  app.listen(config.PORT);
};

startServer();
