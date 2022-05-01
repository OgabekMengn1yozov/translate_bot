const texts = require("../model/TextModel")
const { v4 }  = require("uuid")
const languages = require("./languages")
const translateText = require("./translateText")
const { ADMIN_ID } = require("../../config")

module.exports = async function(bot, message) {
    try {

        const { text }  = message
        const userId = message.from.id
        let { message_id } = message
    
        if(text == "/post") {
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
        }

        let userText = await texts.findOne({
            user_id: userId,
        })
    
        if(userText) {
            await texts.findOneAndUpdate({
                user_id: userId,
            }, {
                text,
            })
        } else {
            await texts.create({
                id: v4(),
                user_id: userId,
                text,
            })
        }
    
        keyboard = {
            resize_keyboard: true,
            inline_keyboard: []
        }
        
        
    
        for(let i = 0; i < 20; i += 2) {
            let newRow = []
            newRow.push({
                text: languages[i],
                callback_data: languages[i],
            })
            if(languages[i+1]) {
                newRow.push({
                    text: languages[i+1],
                    callback_data: languages[i+1],
                })
            }
            keyboard.inline_keyboard.push(newRow)
        }  
        
        keyboard.inline_keyboard.push([
            {
                text: "⬅️",
                callback_data: "0/20",
            },
            {
                text: "❌",
                callback_data: "delete",
            },
            {
                text: "➡️",
                callback_data: "20/40",
            }
        ])
    
        await bot.sendMessage(userId, `Tarjima tilini tanlang:`, 
        {
            reply_to_message_id: message_id,
            reply_markup: keyboard,
        })  
    } catch(e) {
        console.log(e + "")
    }
}