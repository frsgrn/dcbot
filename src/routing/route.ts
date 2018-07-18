import CommandOption from "../command/commandOption";
import Command from "../command/command";
import Response from "../response";

export default class Route {
    commandOptions: Array<CommandOption>
    action: (command: Command) => Promise<Response>
    constructor(commandOptions: Array<CommandOption>, action: (command: Command) => Promise<Response>) {
        this.commandOptions = commandOptions
        this.action = action
    }
}