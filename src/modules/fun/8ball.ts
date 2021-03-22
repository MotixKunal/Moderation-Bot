import { Message, MessageEmbed } from "discord.js";
import { command, default as CookiecordClient, Module } from "cookiecord";
import helpinterface from "../../interfaces/helpinterface";

const questions = ["It is certain.", "It is decidedly so.", "Without a doubt.", "Yes - definitely.", "You may rely on it.", "As I see it, yes.", "Most likely.", "Outlook good.", "Yes.", "Signs point to yes.", "Reply hazy, try again.", "Ask again later.", "Better not tell you now.", "Cannot predict now.", "Concentrate and ask again.", "Don't count on it.", "My reply is no.", "My sources say no.", "Outlook not so good.", "Very doubtful."]

export default class ballmodule extends Module {
    constructor(client: CookiecordClient) {
        super(client);
    }

    @command({aliases: ['8ball']})
    _8ball(msg: Message, question: string) { 
        let args = msg.content.slice(this.client.prefix.length).trim().split(/ /)
        args.shift();
        
        let embed: MessageEmbed = new MessageEmbed()
            .setTitle('`🎱` 8Ball')
            .addFields({
                name: `${msg.author.username}'s Question:`,
                value: args.join(' ')}, {
                name: `Answer:`,
                value: questions[Math.floor(Math.random()*questions.length)]
            })
            .setColor("#7CFC00")
            .setFooter(`Requested By ${msg.author.tag}`, msg.author.displayAvatarURL())
            .setTimestamp()

        return msg.channel.send(embed);
    }
}

export let help: helpinterface = {
    commandName: '8ball',
    commandDescription: 'Answers your question',
    usage: `8ball [question]`,
    category: 'Fun',
    commandAliases: ['_8ball', 'magic8ball', 'question']
}