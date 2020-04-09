const Discord = require('discord.js');
const bot = new Discord.Client();
const token = process.env.token;
const SSAPI = require('./assets/js/module.api.js');
let api = new SSAPI();

bot.login(token);

bot.on('ready', () =>{
    console.log("We're rolling baby");
    bot.user.setActivity('speeeeeeeeeeeeeeeeeeen', { type: 'STREAMING' }, { url: 'https://spinsha.re/' })
  .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
  .catch(console.error);
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
            message.react('695440682952687656');
            message.react('695440704809336942');
            message.react('695440945306533939');
        }
    else {
    if (message.content.includes('speen')) {
                message.react('🗺️');
        }
    else {         
        if (message.content.includes('nappers')) {
            message.react('🗺️');
        }
        else{
            if (message.content.startsWith('!search ')) {
                message.react('🔍');
                let searchterm = message.content.slice(8)
                api.search(searchterm).then(function(songArray) {
                    var firstSong = songArray[0]
                    try{
                    const songEmbed = new Discord.MessageEmbed()
                    .setTitle(firstSong.title + ", by " + firstSong.artist)
                    .setImage(firstSong.cover)
                    .setURL('https://spinsha.re/song/'+firstSong.id)
                    .setAuthor("Charter: " + firstSong.charter)
                    .setFooter('Search results provided by Spinsha.re')
                    message.channel.send(songEmbed);
                    }
                    catch(err){message.react('❌');}
                    });
                }
                                
            }
        }
    }
    }
    }
    }
    }
}});