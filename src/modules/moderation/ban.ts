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

        msg.delete();

        let reason = msg.content.slice(this.client.prefix.length).trim().split(/ /);
        reason.shift();
        reason.shift();

        user.ban({reason: reason.join(' ')})
            .then(() => {
                let embed: MessageEmbed = new MessageEmbed()
                    .setTitle(`✅ ${user.user.tag} was banned successfully.`)
                    .setColor('#7CFC00')

                    msg.channel.send(embed).then(msg2 => msg2.delete({ timeout: 5000 }));
                }).catch(err => msg.channel.send('Something went wrong while trying to ban this user.').then(msg3 => msg3.delete({ timeout: 5000 })));    }
}