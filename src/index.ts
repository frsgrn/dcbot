require('dotenv').config()

import Discord from './discord'

let bot = new Discord()
bot.login(process.env.DISCORD_TOKEN)
bot.eventListener()
