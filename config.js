require("dotenv").config();

let { env } = process;

module.exports = {
  TOKEN: env.TOKEN,
  MONGO_URL: env.MONGO_URL,
  ADMIN_ID: env.ADMIN_ID,
  PORT: env.PORT,
};
