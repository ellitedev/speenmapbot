const Discord = require('discord.js');
function GetSongData (songArray, i, message){
    var arrayLengthIndex = i + 1;
    var firstSong = songArray[i];
    try{
    const songEmbed = new Discord.MessageEmbed()
    .setTitle(firstSong.title + ", by " + firstSong.artist)
    .setColor('#55acee')
    .setImage(firstSong.cover)
    .setURL('https://spinsha.re/song/'+firstSong.id)
    .setAuthor("Charter: " + firstSong.charter)
    .setFooter('Page '+ arrayLengthIndex +' of '+ songArray.length +'. Search results provided by Spinsha.re', 'https://spinsha.re/assets/img/favicon.png')
    message.channel.send(songEmbed).then(function(songEmbed){
        var songArrayLength = songArray.length
        if (songArrayLength == 1){}
        else if(i == 0 && songArrayLength != 1){songEmbed.react('➡')}
        else if(arrayLengthIndex == songArrayLength && songArrayLength != 1){songEmbed.react('⬅')}
        else {songEmbed.react('⬅'); songEmbed.react('➡')}
        
        
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
        console.error(err);
    }
}
module.exports = GetSongData;


