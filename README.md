# jeffbot
[Add me to your server!](https://discordapp.com/oauth2/authorize?client_id=459065201992531979&scope=bot)
## Setup
Clone the repository and install the npm modules.

```
npm install typescript -g
git clone https://github.com/voze/jeffbot.git
cd jeffbot
npm install
```

Configure your .env file.

```dosini
# .env
DISCORD_TOKEN=<Your discord token here>
GOOGLE_TOKEN=<Your Google API token here, activate Youtube Data Api V3>
BOT_PREFIX=!
BOT_NAME=jeffbot
BOT_ACTIVITY=!help for help
BOT_ACTIVITY_TYPE=PLAYING
```

Build and run the bot.

```
tsc
node ./built/index.js
```
