import { EnumDatabaseConnectionEnv } from "./db.model";

const {
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_URL,
  DATABASE_URL_LOCAL,
  ENVIRONMENT,
  DB_USERNAME_STAGING,
  DB_PASSWORD_STAGING,
} = Bun.env;

let Db_config: any = {
  URL: "",
  USERNAME: "",
  PASSWORD: "",
  ENV: ENVIRONMENT,
};

switch (ENVIRONMENT) {
  case EnumDatabaseConnectionEnv.PROD:
    Db_config.URL = DATABASE_URL;
    Db_config.PASSWORD = DATABASE_PASSWORD;
    Db_config.USERNAME = DATABASE_USER;
    break;
  case EnumDatabaseConnectionEnv.STAGING:
    Db_config.URL = DATABASE_URL;
    Db_config.PASSWORD = DB_PASSWORD_STAGING;
    Db_config.USERNAME = DB_USERNAME_STAGING;
    break;
  default:
    Db_config.URL = DATABASE_URL_LOCAL;
    break;
}

export { Db_config };



