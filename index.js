const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const bot = new Discord.Client();
const token = process.env.token;
const SSAPI = require("./assets/js/module.api.js");
const emojiCharacters = require("./assets/js/module.emojis.js");
var GetSongData = require("./assets/js/module.search.js");
var GetUserData = require("./assets/js/module.searchuser.js");
let api = new SSAPI();
const fs = require("fs");
const { prefix } = require("./botconfig.json");

bot.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  bot.commands.set(command.name, command);
}

bot.login(token);

bot.on("ready", () => {
  console.log("We're rolling baby");
  bot.user
    .setActivity("speeeeeeeeeeeeeeeeeeen", {
      type: "STREAMING",
      url: "https://twitch.tv/spinshare",
    })
    .then((presence) =>
      console.log(`Activity set to ${presence.activities[0].name}`)
    )
    .catch(console.error);
  try {
    const channel = bot.channels.cache.get("697732663045259334");
    channel.send("We're back up and speening!");
  } catch {}
});

bot.on("message", (message) => {
  const messageWords = message.content.split(" ");
  const rollFlavor = messageWords.slice(1).join(" ");
  if (messageWords[0] === "!roll") {
    if (messageWords.length >= 1) {
      //!roll
      return message.reply(
        Math.floor(Math.random() * 100) + 1 + " " + rollFlavor
      );
    }
  }
});

bot.on("message", (message) => {
  // TODO: ORGANISE ALL THIS, the tech debt is gonna be huge if we continue like this.
  let lowerCaseMessageContent = message.content.toLowerCase();

  let faq = [
    "download custom",
    "are there custom leaderboards",
    "are there leaderboards",
    "custom leaderboard",
    "import custom",
    "get custom",
    "where can i get custom",
    "download custom",
    "how do i upload",
    "install custom",
    "what is this server",
    "when is the tournament",
    "when are the qualifiers",
    "when are the finals",
  ];
  if (faq.some((el) => lowerCaseMessageContent.includes(el))) {
    message.reply("Please read the <#642824638748950549> channel");
  } else if (lowerCaseMessageContent.startsWith("!search ")) {
    message.react("🔍");
    message.react("🎵");
    let searchterm = message.content.slice(8);
    api.search(searchterm).then(function (songArray) {
      let i = 0;
      GetSongData(songArray.data.songs, i, message);
    });
  } else if (lowerCaseMessageContent.startsWith("!usearch ")) {
    message.react("🔍");
    let searchterm = message.content.slice(9);
    api.search(searchterm).then(function (userArray) {
      let i = 0;
      GetUserData(userArray.data.users, i, message);
    });
  }
});
