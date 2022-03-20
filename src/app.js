const TelegramBot = require("node-telegram-bot-api")
const { TOKEN } = require("../config")
const editReplyKey = require("./controllers/editReplyKey")
const SendText = require("./controllers/SendText")
const translateText = require("./controllers/translateText")
const mongo = require("./model/mongo")

const bot = new TelegramBot(TOKEN, {
    polling: true,
})

mongo()

bot.on("message", async (message) => {
    const userId = message.from.id
    if(message.text == "/start") {
        await bot.sendMessage(userId, `Assalomu alaykum <b>${message.from.first_name}</b> . Bot'ga xush kelibsiz. Men so'zlarni 105 ta tilga tarjima qilaman. Tarjima uchun menga xabar yuboring.`, {
            parse_mode: "HTML",
        })
    } else {
        await SendText(bot, message)
    }
})

bot.on("callback_query", async message => {
    let data = message.data
    let userId = message.from.id
    let messageId = message.message.message_id
    let text = message.message.text 
    
    if(Number(data.split("/")[0])) {
        await editReplyKey(bot, message)
    } else if(data == "delete") {
        await bot.deleteMessage(userId, messageId)
    } else {
        await translateText(bot, message)
    }
})