const languages = require("./languages");

module.exports = async function (bot, message) {
  try {
    let messageId = message.message.message_id;
    let userId = message.from.id;
    let data = message.data;

    let left = Number(data.split("/")[0]);
    let right = Number(data.split("/")[1]);

    let leftText = `${left - 20}/${right - 20}`;
    let rightText = `${left + 20}/${right + 20}`;

    if (!(left >= 0)) {
      return;
    }
    if (right > 106) {
      right = 105;
      rightText = "100/120";
    }

    keyboard = {
      resize_keyboard: true,
      inline_keyboard: [],
    };

    for (let i = left; i < right; i += 2) {
      let newRow = [];
      newRow.push({
        text: languages[i],
        callback_data: languages[i],
      });
      if (languages[i + 1]) {
        newRow.push({
          text: languages[i + 1],
          callback_data: languages[i + 1],
        });
      }
      keyboard.inline_keyboard.push(newRow);
    }

    keyboard.inline_keyboard.push([
      {
        text: "⬅️",
        callback_data: `${leftText}`,
      },
      {
        text: "❌",
        callback_data: "delete",
      },
      {
        text: "➡️",
        callback_data: `${rightText}`,
      },
    ]);

    await bot.editMessageReplyMarkup(keyboard, {
      chat_id: userId,
      message_id: messageId,
    });
  } catch (e) {
    console.log(e + "");
  }
};
