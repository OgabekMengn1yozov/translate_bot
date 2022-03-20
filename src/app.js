const TelegramBot = require("node-telegram-bot-api")
const { TOKEN } = require("../config")
const SendText = require("./controllers/SendText")
const mongo = require("./model/mongo")

const bot = new TelegramBot(TOKEN, {
    polling: true,
})

mongo()

bot.on("message", async (message) => {
    const userId = message.from.id
    console.log(message)
    if(message.text == "/start") {
        await bot.sendMessage(userId, `Assalomu alaykum <b>${message.from.first_name}</b> . Bot'ga xush kelibsiz. Men so'zlarni 105 ta tilga tarjima qilaman. Tarjima uchun menga xabar yuboring.`, {
            parse_mode: "HTML",
        })
    } else {
        await SendText(bot, message)
    }
})