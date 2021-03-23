import CookiecordClient from "cookiecord";
import HelpModule  from '../modules/help';

export default class Client extends CookiecordClient {
    constructor(public Prefix: string[], public admins: string) {
        super({
            botAdmins: admins?.split(","),
            prefix: Prefix
        });
    };

    start(Token: string, paths?: string[]): void {
        this.login(Token);
        this.on("ready", () => console.log(`Logged in as ${this.user?.tag}`));
        
        paths?.forEach(path => {
            this.loadModulesFromFolder(path);
        })
        
        this.registerModule(HelpModule);
    }
}