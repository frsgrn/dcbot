import Token from "../token";

export default class Command {
    public content: string
    public channel: any
    public author: any
    public tokens: Array<Token>

    constructor(tokens: Array<Token>, content: string, author: any, channel: any) {
        this.content = content
        this.channel = channel
        this.author = author
        this.tokens = tokens
    }

    getTokenAt(index): Token {
        return this.tokens[index]
    }

    setTokenAt(index, value: Token): void {
        this.tokens[index] = value
    }
}