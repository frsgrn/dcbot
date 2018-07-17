import CommandOption from "../command/commandOption";
import Command from "../command/command";

export default class Route {
    commandOptions: Array<CommandOption>
    action: (command: Command) => void
    constructor(commandOptions: Array<CommandOption>, action: (command: Command) => void) {
        this.commandOptions = commandOptions
        this.action = action
    }
}