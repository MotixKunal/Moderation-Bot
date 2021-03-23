import Client from "./Client/client";
import dotenv from "dotenv-safe";
dotenv.config();

let client: Client = new Client(['-'],  '542729181679583263')

typeof process.env.TOKEN === "string" ? client.start(process.env.TOKEN, [
    './src/modules/fun',
    './src/modules/moderation',
    './src/modules/Config'
]) : console.log('Token is not a string.');