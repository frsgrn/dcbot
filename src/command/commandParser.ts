import Command from "./command";
import Token from "../token";
import CommandOption from "./commandOption";

const validator = require('validator')

export default class CommandParser {
    public parse(message: any) {
        let tokens = this.tokenize(this.sanitizeInput(message.content))

        if (process.env.BOT_PREFIX) {
            tokens[0].content = tokens[0].content.slice(process.env.BOT_PREFIX.length)
        }

        return new Command(tokens, message.content, message.author, message.channel)
    }
    
    public update(tokens: Array<Token>, commandOptions: Array<CommandOption>): Array<Token> {
        let updatedTokens = []
        for (let [index, commandOption] of commandOptions.entries()) {
            updatedTokens[index] = commandOption.update(tokens[index])
        }
        return updatedTokens
    }

    public sanitizeInput(input: string): string {
        let sanitized = validator.blacklist(input, '\\[\\]')
        sanitized =validator.escape(input)
        sanitized = validator.ltrim(input)
        sanitized = validator.rtrim(input)
        return sanitized
    }

    private tokenize(content: string): Array<Token> {
        let stringTokenArray: Array<string> = [].concat.apply([], content.split('"').map(function (v, i) { return i % 2 ? v : v.split(' ') })).filter(Boolean);
        let tokenArray: Array<Token> = stringTokenArray.map(x => new Token(x))
        return tokenArray
    }

    commandMatchesOptions(command: Command, options: Array<CommandOption>) {
        for (let [index, option] of options.entries()) {
            if (!option.check(command.tokens[index])) return false
        }
        return true
    }
}