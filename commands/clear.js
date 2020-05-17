module.exports = {
    name: "clear",
    aliases: ["purge", "nuke"],
    category: "moderation",
    description: "clears the chat",
    run: async (bot,message,args) => {
        if (message.deletable){
            message.delete();
        }

        if (!message.member.hasPermission("MANAGE_MESSAGES")){
            return message.reply("You can't delete messages...").then(m => m.delete(5000));
        }

        if (isNaN(args[0]) || parseInt(args[0]) <= 0){
            return message.reply("That's not a number?").then(m => m.delete(5000));
        }

        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("I don't have the right permissions").then(m => m.delete(5000));
        }

        let deleteAmount;
        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }

        message.channel.bulkDelete(deleteAmount, true)
        .then(deleted => message.channel.send(`I deleted \`${deleted.size}\` messages.`))
        .catch(err => message.reply(`Something went wrong... ${err}`));
    }
}

