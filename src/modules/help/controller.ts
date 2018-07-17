import Command from "../../command/command";
import { TextResponse } from "../../response";
const fs = require('fs')

let helpText = fs.readFileSync('./assets/help.md', 'utf-8')

export default function help(command: Command) {
    new TextResponse(command.author).send(helpText)
}