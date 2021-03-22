import CookiecordClient from "cookiecord";
import HelpModule  from '../modules/help';

export default class Client extends CookiecordClient {
    constructor(public Prefix: string[], public admins: string) {
        super({
            botAdmins: admins?.split(","),
            prefix: Prefix
        });
    };

    start(Token: string): void {
        this.login(Token);
        this.on("ready", () => console.log(`Logged in as ${this.user?.tag}`));
        this.loadModulesFromFolder("src/modules/fun");
        this.loadModulesFromFolder("src/modules/moderation");
        this.registerModule(HelpModule);
    }
}