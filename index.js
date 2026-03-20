const { Client, GatewayIntentBits, Collection } = require('discord.js');
const SSAPI = require('./assets/js/module.api.js');
const GetSongData = require('./assets/js/module.search.js');
const GetUserData = require('./assets/js/module.searchuser.js');
const api = new SSAPI();
const fs = require('fs');

const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
  ],
});

bot.commands = new Collection();

const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  bot.commands.set(command.name, command);
}

bot.login(process.env.DISCORD_TOKEN);

bot.on('clientReady', () => {
  console.log('We\'re rolling baby');
  bot.user.setActivity('speen :3', {
    type: 1,
    url: 'https://twitch.tv/spinshare',
  });
  console.log('Activity set to speen :3');
  try {
    const channel = bot.channels.cache.get('697732663045259334');
    channel.send('We\'re back up and spinning! NOW EXTRA HARD! :3');
  } catch (error) {
    console.error(error);
  }
});

bot.on('messageCreate', (message) => {
  if (message.author.bot) return;
  const messageWords = message.content.split(' ');
  const rollFlavor = messageWords.slice(1).join(' ');
  if (messageWords[0] === '!roll') {
    if (messageWords.length >= 1) {
      return message.reply(
        Math.floor(Math.random() * 100) + 1 + ' ' + rollFlavor
      );
    }
  }
});

bot.on('messageCreate', (message) => {
  if (message.author.bot) return;
  const lowerCaseMessageContent = message.content.toLowerCase();

  const faq = [
    'download custom',
    'import custom',
    'get custom',
    'where can i get custom',
    'how do i upload',
    'install custom',
    'what is this server',
    'when is the tournament',
    'when are the qualifiers',
    'when are the finals',
  ];
  if (faq.some((el) => lowerCaseMessageContent.includes(el))) {
    message.reply('Please read the <#642824638748950549> channel');
  } else if (lowerCaseMessageContent.startsWith('!search ')) {
    message.react('🔍');
    message.react('🎵');
    const searchterm = message.content.slice(8);
    api.search(searchterm).then(function(songArray) {
      if (!songArray.data.songs || songArray.data.songs.length === 0) {
        return message.reply('No results found!');
      }
      GetSongData(songArray.data.songs, 0, message);
    });
  } else if (lowerCaseMessageContent.startsWith('!usearch ')) {
    message.react('🔍');
    const searchterm = message.content.slice(9);
    api.search(searchterm).then(function(userArray) {
      if (!userArray.data.users || userArray.data.users.length === 0) {
        return message.reply('No results found!');
      }
      GetUserData(userArray.data.users, 0, message);
    });
  }
});
