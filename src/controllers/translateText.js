const texts = require("../model/TextModel")
const Translate = require("@vitalets/google-translate-api")

module.exports = async function(bot, message) {
    try {
        let data = message.data
        const userId = message.from.id
    
        let userText = await texts.findOne({
            user_id: userId
        })
        
        let translateText = await Translate(userText.text, {to: data})
        
        await bot.sendMessage(userId, `${translateText.text}`)        
    } catch(e) {
        console.log(e + "")    
    }
}