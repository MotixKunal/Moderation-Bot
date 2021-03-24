import { User, Message, MessageEmbed } from "discord.js";
import { command, default as CookiecordClient, Module } from "cookiecord";
import helpinterface from "../../interfaces/helpinterface";

export default class AvatarModule extends Module {
    constructor(client: CookiecordClient) {
        super(client);
    }

    @command({aliases: ["av"]})
    avatar(msg: Message) {
        let user = msg.mentions.users.first();

        user = user
        ? user 
        : msg.author;

        msg.channel.send(user.displayAvatarURL());
    }
}

export let help: helpinterface = {
    commandName: "avatar",
    commandDescription: "Get a users/your avatar.",
    usage: "avatar [user]",
    category: 'utility',
    commandAliases: ["av"]
}
