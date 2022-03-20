const texts = require("../model/TextModel")
const { v4 }  = require("uuid")
const languages = require("./languages")

module.exports = async function(bot, message) {
    try {
        const { text }  = message
        const userId = message.from.id
        let { message_id } = message
    
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
        
        let right = 20,
            left = 0
    
        for(let i = left; i < right; i += 2) {
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
                callback_data: "0",
            },
            {
                text: "❌",
                callback_data: "cancel",
            },
            {
                text: "➡️",
                callback_data: "20",
            }
        ])
    
        await bot.sendMessage(userId, `Tarjima tilini tanlang:`, 
        {
            reply_to_message_id: message_id - 1,
            reply_markup: keyboard,
        })        
    } catch(e) {
        console.log(e + "")
    }
}