import { Message, MessageEmbed, TextChannel } from "discord.js";
import { command, default as CookiecordClient, Module } from "cookiecord";
import helpinterface from "../../interfaces/helpinterface";
import help from "../../interfaces/helpinterface";

export default class extends Module {
    constructor(client: CookiecordClient) {
        super(client);
    }

    @command({ aliases: ["bulkdelete"] })
    async purge(msg: Message) {
        let args = msg.content.slice(this.client.prefix.length).trim().split(/ /);
        args.shift();

        let amount: number = parseInt(args[0]) + 1; //amount to delete

        if (msg.channel.type === "dm" || msg.guild === null) return msg.channel.send("This command is server only!");

        if (!msg.member?.hasPermission('MANAGE_MESSAGES')) return msg.channel.send("You are missing permission: `Manage_Messages`");
        if (!msg.guild.me?.hasPermission('MANAGE_MESSAGES')) return msg.channel.send("Iam missing permission: `MANAGE_MESSAGES`");

        if (amount < 0 || amount > 100) return msg.channel.send("You can only purge between 1-100 messages.");    

        msg.channel.bulkDelete(amount)
            .then(() => msg.channel.send(`♻ Successfully Purged ${amount-1} messages.`).then(msg => msg.delete({ timeout: 5000 })))
    }
}

export let help: helpinterface = {
    commandName: "purge",
    commandDescription: "Bulk delete messages",
    usage: "purge [amount]",
    category: "Moderation",
    commandAliases: ["BulkDelete"]
}