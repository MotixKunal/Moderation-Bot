import { Message, MessageEmbed, GuildMember } from "discord.js";
import { command, default as CookiecordClient, Module } from "cookiecord";
import helpinterface from "../../interfaces/helpinterface";

export default class BanModule extends  Module {
    constructor(client: CookiecordClient) {
        super(client);
    }

    @command()
    ban(msg: Message, user: GuildMember) {
        if (msg.channel.type === "dm" || msg.guild === null) return msg.channel.send("This command is server only!");

        if (!msg.member?.hasPermission("BAN_MEMBERS")) return msg.channel.send("You are missing permission: `Ban members`");
        if (!msg.guild.me?.hasPermission("BAN_MEMBERS")) return msg.channel.send("Iam missing permission: `Ban members`");
        if (user.hasPermission("KICK_MEMBERS")) return msg.channel.send("This user is mod/admin, you cannot Ban them").then(msg => msg.delete({ timeout: 5000 }));
        
        let embed: MessageEmbed = new MessageEmbed()
            .setTitle('`🔨` Ban')
            .setDescription(`Are you sure you want to ban ${user}?\nReact with \`❗\``)
    }
}