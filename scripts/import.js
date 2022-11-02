const log4js = require("log4js");
log4js.configure("./log4js.config.json");
const logger = log4js.getLogger();

const TeleBot = require("telebot");
const bot = new TeleBot(process.env.API_KEY_TELEGRAM);
const chatId = process.env.TELEGRAM_CHAT_ID;

let signer = {
    "bot": null
};

let contract = {
    "oracleFeeder": null,
    "fox": null,
    "foxFarm": null
};

module.exports = {
    logger,
    bot,
    chatId,
    signer,
    contract
};
