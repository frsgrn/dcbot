import Token from "../token";
import Command from "./command";

export default abstract class CommandOption {
    abstract check(token?: Token): boolean
    abstract update(token?: Token): Token

    static compareToOptions(command: Command, options: Array<CommandOption>) {
        for (let [index, option] of options.entries()) {
            if (!option.check(command.tokens[index])) return false
        }
        return true
    }
}

export class RequiredCommandOption extends CommandOption {
    equals?: string
    constructor(equals?: string) {
        super()
        this.equals = equals
    }

    check(token?: Token): boolean {
        if (!token) return false
        if (this.equals && !token.compare(this.equals)) return false
        return true
    }

    update(token: Token) {
        return token
    }
}

export class OptionalCommandOption extends CommandOption {
    defaultValue: string
    constructor(defaultValue: string) {
        super()
        this.defaultValue = defaultValue
    }

    check(token?: Token): boolean {
        return true
    }

    update(token?: Token): Token {
        if (!token || token.isEmpty()) return new Token(this.defaultValue)
        return token
    }
}