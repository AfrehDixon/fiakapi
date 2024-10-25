import { Db_config } from "./db.config";
import * as mongoose from "mongoose";

const initDb = (): Promise<any> => {
  return mongoose.connect(Db_config.URL,
    // {
    //   authSource: "admin",
    //   authMechanism: "SCRAM-SHA-1",
    //   auth: {
    //     username: Db_config.USERNAME,
    //     password: Db_config.PASSWORD,
    //   },
    // }
  ).then(() => {
    console.log("Connected to DB successfully");
  }).catch((error) => {
    console.error("Error connecting to DB:", error);
  });
};

export default initDb;