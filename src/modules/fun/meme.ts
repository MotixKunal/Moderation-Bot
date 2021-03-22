import { GuildMember, Message, MessageEmbed } from "discord.js";
import { command, default as CookiecordClient, Module } from "cookiecord";
import * as axios from 'axios';
import helpinterface from "../../interfaces/helpinterface";

export default class MemeCommand extends Module {
    constructor(public client: CookiecordClient) {
        super(client);
    }

    @command()
    meme(msg: Message) {
        let url = "http://meme-api.herokuapp.com/gimme";

        axios.default.get(url)
            .then(response => {
                let embed: MessageEmbed = new MessageEmbed()
                    .setTitle(response.data.title)
                    .setImage(response.data.url)
                    .setURL(response.data.postLink)
                    .setFooter(`Meme From r/${response.data.subreddit}`, msg.author.displayAvatarURL())
                    .setTimestamp()
                    .setColor('#7CFC00')

                msg.channel.send(embed);
            })
    }
}

export let help: helpinterface = {
    commandName: "meme",
    commandDescription: "Generate a random meme",
    usage: "meme",
    category: 'Fun',
}
