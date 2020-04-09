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
	if (message.content.includes('map'||'mapping'||'mapped'||'mapper'||'mappers')) {
        message.react('🗺️');
    }


    else if (message.content.includes('speen')){

            message.react('695440682952687656');
            message.react('695440704809336942');
            message.react('695440945306533939');
            message.react('🗺️');
        }



    else if (message.content.startsWith('!search ')) {
        message.react('🔍');
        let searchterm = message.content.slice(8)
            api.search(searchterm).then(function(songArray) {
                let i = 0;
                GetSongData(songArray, i, message, searchterm);
            });
    }
});

    function GetSongData (songArray, i, message){
        var firstSong = songArray[i]
        try{
        const songEmbed = new Discord.MessageEmbed()
        .setTitle(firstSong.title + ", by " + firstSong.artist)
        .setImage(firstSong.cover)
        .setURL('https://spinsha.re/song/'+firstSong.id)
        .setAuthor("Charter: " + firstSong.charter)
        .setFooter('Search results provided by Spinsha.re', 'https://spinsha.re/assets/img/favicon.png')
        message.channel.send(songEmbed).then(function(songEmbed){
            songEmbed.react('⬅')
            songEmbed.react('➡')
            
            const filter = (reaction, user) => {return ['⬅', '➡'].includes(reaction.emoji.name) && user.id === message.author.id;};
            songEmbed.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] }).then(collected => {
                const reaction = collected.first();
                if (reaction.emoji.name === '⬅') {
                    i--
                    GetSongData(songArray, i, message);
                    songEmbed.delete();
                }
                else {
                    i++
                    GetSongData(songArray, i, message);
                    songEmbed.delete();
                }
            })
            .catch(collected => {
            });
        })
        }
        catch(err){
            message.react('❌');
        };
    };