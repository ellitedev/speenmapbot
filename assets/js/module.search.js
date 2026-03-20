const { EmbedBuilder } = require('discord.js');

function GetSongData(songArray, i, message) {
  var arrayLengthIndex = i + 1;
  var firstSong = songArray[i];
  try {
    const songEmbed = new EmbedBuilder()
      .setTitle(firstSong.title + ', by ' + firstSong.artist)
      .setColor('#55acee')
      .setImage(firstSong.cover)
      .setURL('https://spinsha.re/song/' + firstSong.id)
      .setAuthor({ name: 'Charter: ' + firstSong.charter })
      .setFooter({
        text: 'Page ' + arrayLengthIndex + ' of ' + songArray.length + '. Search results provided by Spinsha.re',
        iconURL: 'https://spinsha.re/assets/img/favicon.png',
      });

    message.channel.send({ embeds: [songEmbed] }).then(function(sentMsg) {
      var songArrayLength = songArray.length;
      if (songArrayLength == 1) {}
      else if (i == 0 && songArrayLength != 1) { sentMsg.react('➡'); }
      else if (arrayLengthIndex == songArrayLength && songArrayLength != 1) { sentMsg.react('⬅'); }
      else { sentMsg.react('⬅'); sentMsg.react('➡'); }

      const filter = (reaction, user) => {
        return ['⬅', '➡'].includes(reaction.emoji.name) && user.id === message.author.id;
      };

      sentMsg.awaitReactions({ filter, max: 1, time: 60000, errors: ['time'] })
        .then(collected => {
          const reaction = collected.first();
          if (reaction.emoji.name === '⬅') {
            i--;
            GetSongData(songArray, i, message);
            sentMsg.delete();
          }
          else {
            i++;
            GetSongData(songArray, i, message);
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
}

module.exports = GetSongData;
