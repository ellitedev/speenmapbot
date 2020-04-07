const Discord = require('discord.js');
const bot = new Discord.Client();
const token = process.env.token;


bot.login(token);

bot.on('ready', () =>{
    console.log("We're rolling baby");
})

bot.on("ready", () =>{
    console.log(`Logged in as ${bot.user.tag}!`);
    bot.user.setPresence({
        status: "online",  //You can show online, idle....
        game: {
            name: "to speeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeen",  //The message shown
            type: "LISTENING" //PLAYING: WATCHING: LISTENING: STREAMING:
        }
    });
 });

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
            message.react('695440682952687656');
            message.react('695440704809336942');
            message.react('695440945306533939');
        }
    }
    }
    }
    }
});