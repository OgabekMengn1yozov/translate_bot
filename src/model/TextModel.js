const mongoose = require("mongoose")
const { v4 } = require("uuid")

const textScheme = new mongoose.Schema({
    id : {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    text: {
        type: String,
    }
})

const texts = mongoose.model("texts", textScheme)

module.exports = texts