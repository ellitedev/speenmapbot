const Discord = require('discord.js');
const SSAPI = require('./module.api.js');
let api = new SSAPI();

function GetUserData (userArray, i, message){
    var arrayLengthIndex = i + 1;
    var user = userArray[i];
    api.getUserDetail(user.id).then(function(userInfoArray) {
    try{
    const songEmbed = new Discord.MessageEmbed()
    .setTitle("User: " + user.username)
    .setColor('#55acee')
    .setImage(user.avatar)
    if(userInfoArray.data.songs.length>0){
    songEmbed.setDescription("Songs:")
    userInfoArray.data.songs.forEach(element => {
    songEmbed.addField("-------", "["+element.title + ", by " + element.artist+"](https://spinsha.re/song/"+ element.id +")")   
    })
    }
    songEmbed.setFooter('Page '+ arrayLengthIndex +' of '+ userArray.length +'. Search results provided by Spinsha.re', 'https://spinsha.re/assets/img/favicon.png')
    message.channel.send(songEmbed).then(function(songEmbed){
        var userArrayLength = userArray.length
        if (userArrayLength == 1){}
        else if(i == 0 && userArrayLength != 1){songEmbed.react('➡')}
        else if(arrayLengthIndex == userArrayLength && userArrayLength != 1){songEmbed.react('⬅')}
        else {songEmbed.react('⬅'); songEmbed.react('➡')}
        
        
        const filter = (reaction, user) => {return ['⬅', '➡'].includes(reaction.emoji.name) && user.id === message.author.id;};
        songEmbed.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] }).then(collected => {
            const reaction = collected.first();
            if (reaction.emoji.name === '⬅') {
                i--
                GetUserData(userArray, i, message);
                songEmbed.delete();
            }
            else {
                i++
                GetUserData(userArray, i, message);
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
    })
} 
module.exports = GetUserData;