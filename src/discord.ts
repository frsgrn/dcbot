let DiscordAPI = require('discord.js')

import CommandParser from './command/commandParser';
import routes, {getRoute} from './routing/routes'
import Response from './response';

export default class Discord {
    client: any
    constructor() {
        this.client = new DiscordAPI.Client()
    }

    login(discordToken: string) {
        this.client.login(discordToken)
    }

    eventListener() {
        this.client.on('ready', ():void => {
            this.client.user.setActivity(process.env.BOT_ACTIVITY, {type: process.env.BOT_ACTIVITY_TYPE})
        })

        this.client.on('message', async (message) => {
            if (message.author.bot) return
            if (process.env.BOT_PREFIX && !message.content.match(process.env.BOT_PREFIX + ".*")) return
            
            let content = CommandParser.stripPrefix(message.content)
            content = await CommandParser.injectSubCommands(message, content)
            
            let command = CommandParser.parse(content, message.author, message.channel)
            let res = await command.execute()
            if (res) res.send()
        })
    }
}