import CommandOption, { RequiredCommandOption, OptionalCommandOption } from "../command/commandOption";
import Route from './route'

import LegoController from '../modules/lego/controller'
import findYoutubeVideo, { listYoutubeVideos } from '../modules/youtube/controller'
import HelpController from '../modules/help/controller'
import XKCDController from '../modules/xkcd/controller'
import MathController, {evalExpression} from '../modules/math/controller'
import Command from "../command/command";

export default [
    new Route([new RequiredCommandOption("lego"), new RequiredCommandOption(), new OptionalCommandOption("")], LegoController),
    new Route([new RequiredCommandOption("xkcd"), new OptionalCommandOption(""), new OptionalCommandOption("")], XKCDController),
    new Route([new RequiredCommandOption("video"), new RequiredCommandOption()], findYoutubeVideo),
    new Route([new RequiredCommandOption("videos"), new RequiredCommandOption()], listYoutubeVideos),
    new Route([new RequiredCommandOption("help")], HelpController),
    new Route([new RequiredCommandOption("rand"), new RequiredCommandOption()], MathController),
    new Route([new RequiredCommandOption("calc"), new RequiredCommandOption()], evalExpression)
]

export function getRoute(command: Command, routes: Array<Route>): Route {
    for (let route of routes) {
        if (CommandOption.compareToOptions(command, route.commandOptions)) {
            return route
        }
    }
}