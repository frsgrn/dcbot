let DiscordAPI = require('discord.js')

import CommandParser from './command/commandParser';
import routes from './routing/routes'

export default class Discord {
    client: any
    commandParser: CommandParser
    constructor() {
        this.client = new DiscordAPI.Client()
        this.commandParser = new CommandParser()
    }

    login(discordToken: string) {
        this.client.login(discordToken)
    }

    eventListener() {
        this.client.on('ready', ():void => {
            this.client.user.setActivity(process.env.BOT_ACTIVITY, {type: process.env.BOT_ACTIVITY_TYPE})
        })

        this.client.on('message', (message):void => {
            if (message.author.bot) return
            let command = this.commandParser.parse(message)

            if (process.env.BOT_PREFIX && !command.content.match(process.env.BOT_PREFIX + ".*")) return

            for (let route of routes) {
                if (this.commandParser.commandMatchesOptions(command, route.commandOptions)) {
                    command.tokens = this.commandParser.update(command.tokens, route.commandOptions)
                    route.action(command)
                    break
                }
            }
        })
    }
}