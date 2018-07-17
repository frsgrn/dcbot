import BotError from "./error";

const DiscordAPI = require('discord.js')

export default class Response {
    public channel: any
    constructor(channel: any) {
        this.channel = channel
    }
}

export class EmbeddedImageResponse extends Response {
    send(title: string, description: string, imageUrl: string): Promise<any> {
        return this.channel.send(new DiscordAPI.RichEmbed().setTitle(title).setDescription(description).setImage(imageUrl))
    }
}

export class TextResponse extends Response {
    send(content: string): Promise<any> {
        return this.channel.send(content)
    }
}

export class ErrorResponse extends Response {
    send(error: BotError): Promise<any> {
        return this.channel.send(error.text)
    }
}