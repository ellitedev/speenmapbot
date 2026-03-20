const { EmbedBuilder } = require('discord.js');
const SSAPI = require('./module.api.js');
let api = new SSAPI();

function GetUserData(userArray, i, message) {
  var arrayLengthIndex = i + 1;
  var user = userArray[i];
  api.getUserDetail(user.id).then(function(userInfoArray) {
    try {
      const songEmbed = new EmbedBuilder()
        .setTitle('User: ' + user.username)
        .setColor('#55acee')
        .setImage(user.avatar);

      if (userInfoArray.data.songs.length > 0) {
        songEmbed.setDescription('Songs:');
        userInfoArray.data.songs.forEach(element => {
          songEmbed.addFields({
            name: '-------',
            value: '[' + element.title + ', by ' + element.artist + '](https://spinsha.re/song/' + element.id + ')',
          });
        });
      }

      songEmbed.setFooter({
        text: 'Page ' + arrayLengthIndex + ' of ' + userArray.length + '. Search results provided by Spinsha.re',
        iconURL: 'https://spinsha.re/assets/img/favicon.png',
      });

      message.channel.send({ embeds: [songEmbed] }).then(function(sentMsg) {
        var userArrayLength = userArray.length;
        if (userArrayLength == 1) {}
        else if (i == 0 && userArrayLength != 1) { sentMsg.react('➡'); }
        else if (arrayLengthIndex == userArrayLength && userArrayLength != 1) { sentMsg.react('⬅'); }
        else { sentMsg.react('⬅'); sentMsg.react('➡'); }

        const filter = (reaction, user) => {
          return ['⬅', '➡'].includes(reaction.emoji.name) && user.id === message.author.id;
        };

        sentMsg.awaitReactions({ filter, max: 1, time: 60000, errors: ['time'] })
          .then(collected => {
            const reaction = collected.first();
            if (reaction.emoji.name === '⬅') {
              i--;
              GetUserData(userArray, i, message);
              sentMsg.delete();
            }
            else {
              i++;
              GetUserData(userArray, i, message);
              sentMsg.delete();
            }
          })
          .catch(() => {});
      });
    }
    catch(err) {
      message.react('❌');
      console.error(err);
    }
  });
}

module.exports = GetUserData;
