import { Message, MessageEmbed } from "discord.js";
import { command, default as CookiecordClient, Module } from "cookiecord";
import helpinterface from "../../interfaces/helpinterface";

export default class mcPlayerCommand extends Module {
    constructor(client: CookiecordClient) {
        super(client);
    }

    @command()
    minecraftPlayer() {
        
    }
}