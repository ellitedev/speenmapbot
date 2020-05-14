const Discord = require("index.js")

module.exports.run = async (bot, message, args) => {
    console.log("works");
    const channel = bot.channels.cache.get('697732663045259334');
    channel.send("works");
}

module.exports.help = {
    name: "clear"
}