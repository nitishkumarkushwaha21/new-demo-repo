const { Sequelize } = require("sequelize");
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../../../../../.env"),
});
require("dotenv").config();

console.log(
  "[youtube-playlist-service] DATABASE_URL:",
  process.env.DATABASE_URL ? "SET" : "NOT SET",
);

if (!process.env.DATABASE_URL) {
  throw new Error(
    "[youtube-playlist-service] Missing DATABASE_URL. Configure it in root .env before starting the service.",
  );
}

const DB_DIALECT_OPTS = {
  ssl: { require: true, rejectUnauthorized: false },
  connectTimeout: 60000,
  connectionTimeoutMillis: 60000,
  autoSelectFamily: false, // disable Happy Eyeballs (Node.js v20 ETIMEDOUT fix)
};

const DB_POOL_OPTS = {
  max: 2,
  acquire: 60000,
  idle: 10000,
};

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: DB_DIALECT_OPTS,
  pool: DB_POOL_OPTS,
  logging: false,
});

module.exports = sequelize;
