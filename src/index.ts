import Client from "./Client/client";
import dotenv from "dotenv-safe";
dotenv.config();

const client: Client = new Client(['-'],  '542729181679583263')

typeof process.env.TOKEN === "string" ? client.start(process.env.TOKEN) : console.log('Token is not a string.');