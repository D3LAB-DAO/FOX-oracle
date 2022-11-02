require('dotenv').config();
const { logger, bot, chatId } = require('./import');

bot.on("newChatMembers", (msg) => {
    logger.trace("Join new member");
    return msg.reply.text(
        "🍀 Hi, I'm MINI.\n" +
        "Type \`/help\` for help."
    );
});

bot.on("/help", (msg) => {
    logger.trace("Query help");
    return msg.reply.text(
        "> Type \`/sleep\` to query oracle interval."
    );
});

bot.on(["/start", "/hello"], (msg) => {
    logger.trace("Query hello");
    return bot.sendMessage(
        chatId,
        `👋 Hello, ${msg.from.first_name}!`
    );
});

bot.on("/sleep", (msg) => {
    logger.trace("Query sleep");
    return msg.reply.text(
        `\`sleep\` is ${process.env.ORACLE_INTERVAL}`
    );
});

function sendPriceMessage(price) {
    bot.sendMessage(
        chatId,
        `${new Date()}\n` +
        `price: ${price}`
    ).then((response) => {
        logger.debug("Ok:", response);
    }).catch((error) => {
        logger.error("Error:", error);
    });
}

module.exports = {
    sendPriceMessage
};
