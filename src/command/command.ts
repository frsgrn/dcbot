import Token from "../token";
import routes, { getRoute } from "../routing/routes";
import CommandParser from "./commandParser";
import Response from "../response";

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

    async execute() {
        let route = getRoute(this, routes)
        if (route) {
            this.tokens = CommandParser.transform(this.tokens, route.commandOptions)
            try {
                return route.action(this)
            } catch(e) {
                console.error(e)
                new Response(this.channel, "Internal error").send()
                return null
            }
        }
        else {
            return null
        }
    }

    setTokenAt(index, value: Token): void {
        this.tokens[index] = value
    }
}