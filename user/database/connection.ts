import mongoose from "mongoose";
import logger from "../utils/logger";
import config from "../config";

export async function connection() {
  try {
    console.log("connecting");
    await mongoose.connect(config.MONGO_URL!);
    console.log("conencted");
    logger.info("The database is connected now.");
  } catch (err) {
    console.log(err);
    logger.error(`error connecting databsase`, { error: JSON.stringify(err) });
    process.exit(1);
  }
}
