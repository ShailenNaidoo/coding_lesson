const Telegraf = require("telegraf");

let { BOTKEY } = process.env;

const bot = new Telegraf(BOTKEY);

bot.start(ctx => ctx.reply("Welcome, i am your guide to learning JavaScript. \n\nWould you like to learn JavaScript, use the keyboard below to answer.",{
  reply_markup: {
    keyboard: [
      ["Yes","No"]
    ]
  }
}));

bot.startPolling();