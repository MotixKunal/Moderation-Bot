type categorys = 'Fun' | 'Moderation' | 'utility';

export default interface help {
    commandName: string;
    commandDescription: string;
    usage: string;
    category: categorys;
    commandAliases?: Array<string>;
}