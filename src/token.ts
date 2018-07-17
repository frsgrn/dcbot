export default class Token {
    content: string
    constructor(content: string) {
        this.content = content
    }

    isEmpty() {
        if (!this.content || this.content.length < 1 || this.content.length == 0) return true
        return false
    }

    compare(otherContent: string) {
        if (otherContent == this.content) return true
        return false
    }
}