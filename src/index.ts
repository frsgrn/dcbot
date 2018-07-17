require('dotenv').config()

import Discord from './discord'
import XKCD from './modules/xkcd/xkcd';

let bot = new Discord()
bot.login(process.env.DISCORD_TOKEN)
bot.eventListener()

new XKCD("123").getXKCDJson()