type catogerys = 'Fun' | 'Moderation';

export default interface info {
    name: string,
    description: string,
    catogery: catogerys,
    usage: string,
    aliases?: string[],
}