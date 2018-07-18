import Command from "../../command/command";
import Response from "../../response";
const fs = require('fs')

let helpText = fs.readFileSync('./assets/help.md', 'utf-8')

export default async function help(command: Command) {
    return new Response(command.author, helpText)
}