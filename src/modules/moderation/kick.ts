import { GuildMember, Message, MessageEmbed } from "discord.js";
import { command, default as CookiecordClient, Module } from "cookiecord";
import helpinterface from "../../interfaces/helpinterface";

export default class KickModule extends Module {
    constructor(client: CookiecordClient) {
        super(client);
    }

    @command({aliases: ['boot']})
    async kick(msg: Message, user: GuildMember) {
        if (msg.channel.type === "dm" || msg.guild === null) return msg.channel.send("This command is server only!");

        if (!msg.member?.hasPermission("KICK_MEMBERS")) return msg.channel.send("You are missing permission: `kick members`");
        if (!msg.guild.me?.hasPermission("KICK_MEMBERS")) return msg.channel.send("Iam missing permission: `kick members`");
        if (user.hasPermission("KICK_MEMBERS")) return msg.channel.send("This user is mod/admin, you cannot kick them").then(msg => msg.delete({ timeout: 5000 }));

        user.kick().then(() => {
            let embed = new MessageEmbed()
                .setTitle(`\`✅\` Succesfully Kicked ${user.user.tag}`)
                .setColor('#7CFC00')

            msg.channel.send(embed).then(msg2 => msg2.delete({ timeout: 5000 }));
        }).catch(err => msg.channel.send('failed to kick user:\n' + err));
    }
}

export let help: helpinterface = {
    commandName: "kick",
    commandDescription: "kick a user out of the current guild.",
    usage: "kick [user]",
    category: 'Moderation',
    commandAliases: ["boot"]
}
