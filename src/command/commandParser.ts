import Command from "./command";
import Token from "../token";
import CommandOption from "./commandOption";
import Response from "../response";

const validator = require('validator')

export default class CommandParser {
    public static parse(content, author, channel) {
        let tokens = CommandParser.tokenize(CommandParser.sanitizeInput(content))
        return new Command(tokens, content, author, channel)
    }

    public static transform(tokens: Array<Token>, commandOptions: Array<CommandOption>): Array<Token> {
        let updatedTokens = []
        for (let [index, commandOption] of commandOptions.entries()) {
            updatedTokens[index] = commandOption.update(tokens[index])
        }
        return updatedTokens
    }

    public static stripPrefix(text: string) {
        if (process.env.BOT_PREFIX) {
            return text.slice(process.env.BOT_PREFIX.length)
        }
        return text
    }

    public static async injectSubCommands(message, content: string): Promise<string> {
        var reg = /\|(.+?)\|/g;
        var regNoGlob = /\|(.+?)\|/
        let newContent: string = content;
        var result;
        while((result = reg.exec(content)) !== null) {
            let ncontent = result[1]
            let command: Command = CommandParser.parse(ncontent, message.author, message.channel)
            let res: Response = await command.execute()

            if(res && typeof res.message === "string") {
                newContent = newContent.replace(regNoGlob, res.message)
            }
        }
        return newContent
    }

    public static sanitizeInput(input: string): string {
        let sanitized = validator.blacklist(input, '\\[\\]')
        sanitized =validator.escape(input)
        sanitized = validator.ltrim(input)
        sanitized = validator.rtrim(input)
        return sanitized
    }

    public static tokenize(content: string): Array<Token> {
        let stringTokenArray: Array<string> = [].concat.apply([], content.split('"').map(function (v, i) { return i % 2 ? v : v.split(' ') })).filter(Boolean);
        let tokenArray: Array<Token> = stringTokenArray.map(x => new Token(x))
        return tokenArray
    }
}