const Discord = require('discord.js');
const bot = new Discord.Client();
const token = process.env.token;
const prefix = process.env.prefix;
const SSAPI = require('./assets/js/module.api.js');
const emojiCharacters = require('./assets/js/module.emojis.js');
var GetSongData = require('./assets/js/module.search.js');
var GetUserData = require('./assets/js/module.searchuser.js');
let api = new SSAPI();

bot.login(token);

bot.on('ready', () =>{
    console.log("We're rolling baby");
    bot.user.setActivity('speeeeeeeeeeeeeeeeeeen', {type: 'STREAMING', url: 'https://twitch.tv/spinshare'})
.then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
.catch(console.error);
  const channel = bot.channels.cache.get('697732663045259334');
  channel.send("We're back up and speening!");
})

bot.on('message', (message)=>{
    const messageWords = message.content.split(' ');
    const rollFlavor = messageWords.slice(1).join(' ');
    if (messageWords[0] === '!roll'){
        if (messageWords.length >= 1){
            //!roll
            return message.reply(
                (Math.floor(Math.random() * 100) + 1) + ' ' + rollFlavor
            );
        }
    }
})

bot.on('message', message => {
    let lowerCaseMessageContent = message.content.toLowerCase();

    if (lowerCaseMessageContent.includes('map'||'mapping'||'mapped'||'mapper'||'mappers')) {
        message.react('🗺️');
    }

    if (lowerCaseMessageContent.includes('chart'||'charting'||'charted'||'charter'||'charters')) {
       	message.react('📈');
    }

    if (lowerCaseMessageContent.includes('speen')){
            message.react('695440682952687656');
            message.react('695440704809336942');
            message.react('695440945306533939');
        }

    if (lowerCaseMessageContent.includes('spleen')){
            message.react('695440682952687656');
            message.react(emojiCharacters.l);
            message.react('695440704809336942');
            message.react('695440945306533939');
        }

    if (lowerCaseMessageContent.includes('mapy')){
            message.react('699274566849265756');
        }
    
    let metalman = ['metalman', 'metalman20', 'guitarman', 'metal', 'guitar', '<@!105429810158784512>']
    if (metalman.some(el => lowerCaseMessageContent.includes(el))){
            message.react('704090735707685067');
    }

    if (lowerCaseMessageContent.includes('trump')){
            message.react('704087779193258005');
    }

    let faq = ['download custom', 'import custom', 'get custom', 'where can i get custom', 'how do i upload', 'install custom', 'what is this', 'when is the tournament', 'when are the qualifiers', 'when are the finals']
    if (faq.some(el => lowerCaseMessageContent.includes(el))){
        message.reply("Please read the <#642824638748950549> channel");
    }

    if (message.content == CLEAR_MESSAGES) {
  
        // Check the following permissions before deleting messages:
        //    1. Check if the user has enough permissions
        //    2. Check if I have the permission to execute the command
  
        if (!message.channel.permissionsFor(message.author).hasPermission("MANAGE_MESSAGES")) {
          message.channel.sendMessage("Sorry, you don't have the permission to execute the command \""+message.content+"\"");
          console.log("Sorry, you don't have the permission to execute the command \""+message.content+"\"");
          return;
        } else if (!message.channel.permissionsFor(bot.user).hasPermission("MANAGE_MESSAGES")) {
          message.channel.sendMessage("Sorry, I don't have the permission to execute the command \""+message.content+"\"");
          console.log("Sorry, I don't have the permission to execute the command \""+message.content+"\"");
          return;
        }
  
        // Only delete messages if the channel type is TextChannel
        // DO NOT delete messages in DM Channel or Group DM Channel
        if (message.channel.type == 'text') {
          message.channel.fetchMessages()
            .then(messages => {
              message.channel.bulkDelete(messages);
              messagesDeleted = messages.array().length; // number of messages deleted
  
              // Logging the number of messages deleted on both the channel and console.
              message.channel.sendMessage("Deletion of messages successful. Total messages deleted: "+messagesDeleted);
              console.log('Deletion of messages successful. Total messages deleted: '+messagesDeleted)
            })
            .catch(err => {
              console.log('Error while doing Bulk Delete');
              console.log(err);
            });
        }
      }

    else if (lowerCaseMessageContent.startsWith('!search ')) {
        message.react('🔍');
        message.react('🎵');
        let searchterm = message.content.slice(8)
            api.search(searchterm).then(function(songArray) {
                let i = 0;
                GetSongData(songArray.songs, i, message);
            });
    }
    else if (lowerCaseMessageContent.startsWith('!usearch ')) {
        message.react('🔍');
        let searchterm = message.content.slice(9)
            api.search(searchterm).then(function(userArray) {
                let i = 0;
                GetUserData(userArray.users, i, message);
            });
    }
});

    
