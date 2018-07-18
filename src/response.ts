import BotError from "./error";

const DiscordAPI = require('discord.js')

export default class Response {
    channel: any
    message: any
    constructor(channel: any, message: any) {
        this.channel = channel
        this.message = message
    }

    send() {
        return this.channel.send(this.message)
    }
}

export class EmbeddedImageResponse extends Response {
    constructor(channel: any, title: string, description: string, imageUrl: string) {
        super(channel, new DiscordAPI.RichEmbed().setTitle(title).setDescription(description).setImage(imageUrl).setTimestamp())
    }
}

export class ErrorResponse extends Response {
    constructor(channel: any, error: BotError) {
        super(channel, error.text)
    }
}