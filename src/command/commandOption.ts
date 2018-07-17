import Token from "../token";

export default interface CommandOption {
    check(token?: Token): boolean
    update(token?: Token): Token
}

export class RequiredCommandOption implements CommandOption {
    equals?: string
    constructor(equals?: string) {
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

export class OptionalCommandOption implements CommandOption {
    defaultValue: string
    constructor(defaultValue: string) {
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