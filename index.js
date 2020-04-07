const Discord = require('discord.js');
const bot = new Discord.Client();
const token = process.env.token;


bot.login(token);

bot.on('ready', () =>{
    console.log("We're rolling baby");
})


bot.on('message', message => {
	if (message.content.includes('map')) {
        message.react('🗺️');
    }
    else {
        if (message.content.includes('mapping')) {
            message.react('🗺️');
        }
    else {
        if (message.content.includes('mapped')) {
            message.react('🗺️');
        }
    else {
        if (message.content.includes('mapper')) {
            message.react('🗺️');
        }
    else {
        if (message.content.includes('speen')) {
            const emoji = client.emojis.cache.get(config.emojiID);
            message.react(emoji);
        }
    }
    }
    }
    }
});