import { RequiredCommandOption, OptionalCommandOption } from "../command/commandOption";
import Route from './route'

import LegoController from '../modules/lego/controller'
import findYoutubeVideo, { listYoutubeVideos } from '../modules/youtube/controller'
import HelpController from '../modules/help/controller'
import XKCDController from '../modules/xkcd/controller'

export default [
    new Route([new RequiredCommandOption("lego"), new RequiredCommandOption(), new OptionalCommandOption("")], LegoController),
    new Route([new RequiredCommandOption("xkcd"), new RequiredCommandOption(), new OptionalCommandOption("")], XKCDController),
    new Route([new RequiredCommandOption("video"), new RequiredCommandOption()], findYoutubeVideo),
    new Route([new RequiredCommandOption("videos"), new RequiredCommandOption()], listYoutubeVideos),
    new Route([new RequiredCommandOption("help")], HelpController)
]