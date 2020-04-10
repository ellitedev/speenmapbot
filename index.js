const Discord = require('discord.js');
const bot = new Discord.Client();
const token = process.env.token;
const SSAPI = require('./assets/js/module.api.js');
var GetSongData = require('./assets/js/module.search.js');
var GetUserData = require('./assets/js/module.searchuser.js');
let api = new SSAPI();

bot.login(token);

bot.on('ready', () =>{
    console.log("We're rolling baby");
    bot.user.setActivity('speeeeeeeeeeeeeeeeeeen', { type: 'STREAMING' }, { url: 'https://spinsha.re/' })
.then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
.catch(console.error);
  const channel = bot.channels.cache.get('697732663045259334');
  channel.send("We're back up and speening!");
})


bot.on('message', message => {
    let lowerCaseMessageContent = message.content.toLowerCase();
	if (lowerCaseMessageContent.includes('map'||'mapping'||'mapped'||'mapper'||'mappers')) {
        message.react('🗺️');
    }

  
    if (lowerCaseMessageContent.includes('speen')){
            message.react('695440682952687656');
            message.react('695440704809336942');
            message.react('695440945306533939');
        }

    else if (lowerCaseMessageContent.includes('spleen')){
            message.react('95440682952687656');
            message.react('🇱');
            message.react('695440704809336942');
            message.react('695440945306533939');
        }


    else if (lowerCaseMessageContent.startsWith('!search ') && message.channel.id == '638817716634910722') {
        message.react('🔍');
        message.react('🎵');
        let searchterm = message.content.slice(8)
            api.search(searchterm).then(function(songArray) {
                let i = 0;
                GetSongData(songArray.songs, i, message);
            });
    }
    else if (lowerCaseMessageContent.startsWith('!usearch ') && message.channel.id == '638817716634910722') {
        message.react('🔍');
        let searchterm = message.content.slice(9)
            api.search(searchterm).then(function(userArray) {
                let i = 0;
                GetUserData(userArray.users, i, message);
            });
    }
});

    