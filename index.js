const Discord = require('discord.js');
const bot = new Discord.Client();
const token = process.env.token;


bot.login(token);

bot.on('ready', () =>{
    console.log("We're rolling baby");
})

const SP = client.emojis.get("695440682952687656");
const EE = client.emojis.get("695440704809336942");
const N = client.emojis.get("695440945306533939");

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
            message.react(SP.id);
            message.react(EE.id);
            message.react(N.id);
        }
    }
    }
    }
    }
});