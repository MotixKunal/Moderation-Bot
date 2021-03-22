import { Message, MessageEmbed } from "discord.js";
import { Command, command, default as CookiecordClient, Module } from "cookiecord";
import { readdirSync } from 'fs';

function getModerationCmds(): Array<string> {
    let commands: Array<string> = [];
    let commandFiles = readdirSync(__dirname + '\\moderation').filter(file => file.endsWith('.ts' || '.js'));

    for (let File of commandFiles) {
        let newFile = require('./moderation/' + File)

        newFile.help?.category.toLowerCase() === 'moderation' ? commands.push(`-${newFile.help.commandName}\n`) : console.log('not moderation 😳')
    }

    return commands;
}

function getFunCmds(): Array<string> {
    let commands: Array<string> = [];
    let commandFiles = readdirSync(__dirname + '\\fun').filter(file => file.endsWith('.ts' || '.js'));

    for (let File of commandFiles) {
        let newFile = require('./fun/' + File)

        newFile.help?.category.toLowerCase() === 'fun' ? commands.push(`-${newFile.help.commandName}\n`) : console.log('not fun 😳')
    }

    return commands;
}

export default class HelpModule extends Module {
    constructor(client: CookiecordClient) {
        super(client);
    }

    @command()
    help(msg: Message) {
        let cmd = msg.content.split(' ')[1];

        if (!cmd) {

            let embed: MessageEmbed = new MessageEmbed()
                .setTitle('`ℹ` Help!')
                .setDescription('List of all commands, do `-help [commandname]`\n for more details on a command.')
                .setColor("#7CFC00")
                .addFields(
                    {name: 'Moderation', value: '```\n' +  getModerationCmds().join('') + '```', inline: true},
                    {name: 'Fun', value: '```\n' + getFunCmds().join('') + '```', inline: true}
                );

            return msg.channel.send(embed);
        } 
        let foundvalue = false;
        let errorEmbed: MessageEmbed = new MessageEmbed()
            .setTitle('Error!')
            .setColor('ff0000')
            .setDescription(`Cannot find command \`${cmd}\``);

        let embed: MessageEmbed = new MessageEmbed()
            .setColor("#7CFC00")

        readdirSync(__dirname).forEach(folder => {
            if (folder.endsWith('.ts' || '.js')) return;

            let commands = readdirSync(`${__dirname}\\${folder}`).filter(cmd => cmd.endsWith('.ts' || '.js'));

            for (let file of commands) {
                let command = require(`./${folder}/${file}`);

                if (command.help.commandName !== cmd) {
                    //lol if i dont add this it break
                } else {
                    foundvalue = true;

                    embed.addFields(
                        {name: 'Name', value: command.help?.commandName},
                        {name: 'Description', value: command.help?.commandDescription},
                        {name: 'Category', value: command.help?.category},
                        {name: 'Usage', value: '`-' + command.help?.usage + '`'},
                        {name: 'Aliases', value: command.help?.commandAliases? command.help.commandAliases : 'No Aliases.'}
                    )

                    break;
                }
            }


        })
        foundvalue ? msg.channel.send(embed) : msg.channel.send(errorEmbed);
    }
}