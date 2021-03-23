import { Message, MessageEmbed } from "discord.js";
import { command, default as CookiecordClient, Module } from "cookiecord";
import * as db from "quick.db"
import helpinterface from "../../interfaces/helpinterface";

export default class PrefixCommand extends Module {
    constructor(client: CookiecordClient) {
        super(client);
    }

    @command()
    prefix(msg: Message) {
        
    }
}