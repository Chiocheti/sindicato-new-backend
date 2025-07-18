import "dotenv/config";
import { Dialect, Options } from "sequelize";

const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT, DB_DIALECT } =
  process.env;

const dbConfig: Options = {
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: DB_DIALECT as Dialect,
  pool: { max: 10 },
  timezone: "-03:00",
};

export = dbConfig;
