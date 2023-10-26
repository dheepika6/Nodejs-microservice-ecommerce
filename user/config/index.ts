require("dotenv").config();

export default {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  COOKIE_SECRET: process.env.SECRET,
  REDIS_URL: process.env.REDIS_URL,
  crypto: {
    randomSize: 16,
    workFactor: 310000,
    keyLength: 32,
  },
};
