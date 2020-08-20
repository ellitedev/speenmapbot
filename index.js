const Discord = require('discord.js');
const botconfig = require("./botconfig.json");
const bot = new Discord.Client();
const token = process.env.token;
const SSAPI = require('./assets/js/module.api.js');
const emojiCharacters = require('./assets/js/module.emojis.js');
var GetSongData = require('./assets/js/module.search.js');
var GetUserData = require('./assets/js/module.searchuser.js');
let api = new SSAPI();
const fs = require('fs');
const { prefix } = require('./botconfig.json');

// TODO: ELLITE, change this to the role name of limitedmode, else weebs will be confused
const limitedRoleName = "limiter"

bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

bot.login(token);


bot.on('ready', () =>{
    console.log("We're rolling baby");
    bot.user.setActivity('speeeeeeeeeeeeeeeeeeen', {type: 'STREAMING', url: 'https://twitch.tv/spinshare'})
.then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
.catch(console.error);
try {
    const channel = bot.channels.cache.get('697732663045259334');
    channel.send("We're back up and speening!");
}
catch {} 
});

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
    // if (!message.content.startsWith(prefix) || message.author.bot) return;
    // const args = message.content.slice(prefix.length).split(/ +/);
	// const command = args.shift().toLowerCase();

	// if (command === 'ping') {
	// 	message.channel.send('Pong.');
	// } else if (command === 'beep') {
	// 	message.channel.send('Boop.');
    // }

    // Above is old command handling code, this is a make shift merging of the two that (hopefully) works

    // TODO: ORGANISE ALL THIS, the tech debt is gonna be huge if we continue like this.

    // limitedMode disables everything that is not fired manually (Primarily meme roles)
    // Something tells me this should be booleanified using !!, that'll come later though. (Done now)
    let limitedBoolCalc;
    try {
        limitedBoolCalc = message.member.roles.cache.find(r => r.name === limitedRoleName)
    }
    catch(err) {
        limitedBoolCalc = false;
        console.log("error: "+err)
    }
    
    let limitedMode = Boolean(limitedBoolCalc)

    let lowerCaseMessageContent = message.content.toLowerCase();

    if (!limitedMode) {

        if (lowerCaseMessageContent.includes('way', 'theway')) {
            message.react('745814454901407816');
        }

        if (lowerCaseMessageContent.includes('trex')) {
            message.react('745814455677354054');
        }
        
        if (lowerCaseMessageContent.includes('ambi', 'ambulance')) {
            message.react('745814454788292680');
        }

        let kali = ['blade', 'kali']
        if (kali.some(el => lowerCaseMessageContent.includes(el))){
                message.react('745817406265360384');
        }

        if (lowerCaseMessageContent.includes('map', 'mapping', 'mapped', 'mapper', 'mappers')) {
            message.react('🗺️');
        }

        if (lowerCaseMessageContent.includes('chart', 'charting', 'charted', 'charter', 'charters')) {
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
                message.react('745814455677354054');
        }
    }

    let faq = ['download custom', 'invite', 'import custom', 'get custom', 'where can i get custom', 'how do i upload', 'install custom', 'what is this', 'when is the tournament', 'when are the qualifiers', 'when are the finals']
    if (faq.some(el => lowerCaseMessageContent.includes(el))){
        message.reply("Please read the <#642824638748950549> channel");
    }

    else if (lowerCaseMessageContent.startsWith('!search ')) {
        message.react('🔍');
        message.react('🎵');
        let searchterm = message.content.slice(8)
            api.search(searchterm).then(function(songArray) {
                let i = 0;
                GetSongData(songArray.data.songs, i, message);
            });
    }
    else if (lowerCaseMessageContent.startsWith('!usearch ')) {
        message.react('🔍');
        let searchterm = message.content.slice(9)
            api.search(searchterm).then(function(userArray) {
                let i = 0;
                GetUserData(userArray.data.users, i, message);
            });
    }
});

    
