require("dotenv").config()

let { env } = process

module.exports = {
    TOKEN: env.TOKEN,
    MONGO_URL: env.MONGO_URL,
    PORT: env.PORT,
}