const Telegraf = require("telegraf");
const fs = require("fs-extra");

let { BOTKEY } = process.env;

const bot = new Telegraf(BOTKEY);

bot.start(ctx => ctx.reply("Welcome, i am your guide to learning JavaScript. \n\nWould you like to learn JavaScript, use the keyboard below to answer.",{
  reply_markup: {
    keyboard: [
      ["/yes_i_want_to_learn","/no_i_dont_want_to_learn"]
    ],
    one_time_keyboard: true
  }
}));

bot.command("/yes_i_want_to_learn",async ctx => {
  ctx.replyWithPhoto("https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",{
    caption: "This is JavaScript's logo, you will learn to love it or hate it",
    reply_markup: {
      inline_keyboard: [
        [{
          text: "next",
          callback_data: "step 1"
        }]
      ]
    }
  });
});

bot.on("callback_query",ctx => {
  let { update: { callback_query: { data }} } = ctx;

  data == "step 1" ? ctx.replyWithPhoto({ source: "./photos/step_1.png" },{ 
    caption: "This a little bit of JavaScript. This bit of JavaScript prints out **Hello World** in the JavaScript console. We will get into that a bit later :)",
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "What is JavaScript?",
            callback_data: "js def"
          }
        ]
      ]
    }
  }) : {};

  data == "js def" ? ctx.reply(`
  So you are here for a reason and you obviously want to learn JavaScript, so here is a basic definition of JavaScript (commonly referred to as JS).\n\nJS is a small, yet powerful scripting language which is commonly used in the browser to make webpages more interactive.\n\nNowadays, JS can be found running on servers through the use of a platform called NodeJS. In short, JS is a force to be reckoned with. It was often seen as a toy programming language before the use of NodeJS became more widespread.\n\nLarge corporations use JS on both the browser and the server. Some of these terms like *server*, *NodeJS* and *scripting language* will all be explained in further detail as we go through the course :)
  `,{ 
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "What is a scripting language?",
            url: "https://www.techopedia.com/definition/3873/scripting-language"
          }
        ],
        [
          {
            text: "What is a server?",
            url: "https://www.lifewire.com/servers-in-computer-networking-817380"
          }
        ],
        [
          {
            text: "Who created JavaScript?",
            url: "https://en.wikipedia.org/wiki/Brendan_Eich"
          }
        ],
        [
          {
            text: "next",
            callback_data: "requirements"
          }
        ]
      ]
    }
  }) : {}

  data == "requirements" ? ctx.reply(`You only got a small taste of JS, but before we continue i advise you that knowing technologies like HTML and CSS is a requirement. Throughout the course will be doing mostly server-side JS`) : {};

});

bot.command("/no_i_dont_want_to_learn",ctx => {
  ctx.reply("Okay thank you for giving me a try! Have a great day");
});

// ! Start Bot

bot.startPolling();