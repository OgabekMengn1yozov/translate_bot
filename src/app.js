const TelegramBot = require("node-telegram-bot-api")
const { TOKEN, PORT } = require("../config")
const editReplyKey = require("./controllers/editReplyKey")
const SendText = require("./controllers/SendText")
const translateText = require("./controllers/translateText")
const mongo = require("./model/mongo")



const url = "https://translatebotogabek.herokuapp.com"

const bot = new TelegramBot(TOKEN, {
    webHook: {
        port: PORT
    }
});
bot.setWebHook(`${url}/bot${TOKEN}`)

// const bot = new TelegramBot(TOKEN, {
//     polling: true,
// })


// bot.setWebHook(`${APP_URL}/bot${TOKEN}`);


mongo()

bot.on("message", async (message) => {
    const userId = message.from.id
    if(message.text == "/start") {
        await bot.sendMessage(userId, `Assalomu alaykum <b>${message.from.first_name}</b> . Bot'ga xush kelibsiz. Men so'zlarni 105 ta tilga tarjima qilaman. Tarjima uchun menga xabar yuboring.`, {
            parse_mode: "HTML",
        })
    } if(text == "/post") {
        if(userId == ADMIN_ID) {
            try {
                const messageId = message.reply_to_message.message_id
                let chatId = message.from.id
                let userList = await texts.find()
                let interval = 1000 / 15

                for(let user of userList) {
                    setTimeout(async function () {
                        try {
                            let copy = await bot.copyMessage(user.user_id, chatId, messageId, {
                                reply_markup: message.reply_to_message.reply_markup,
                            })
                        } catch(e) {

                        }
                    }, interval)
                }   
            } catch(e) {
                console.log(e + "")
            }
        }
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