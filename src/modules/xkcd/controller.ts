import Command from "../../command/command";
import XKCD from  './xkcd';
import Response, {EmbeddedImageResponse, ErrorResponse} from '../../response';
import BotError from "../../error";

export default async function searchXKCD (command: Command): Promise<Response> {
    let xkcd = new XKCD(command.getTokenAt(1).content)

    let res = await xkcd.exists()
    let xkcdJson = await xkcd.getXKCDJson()
    if (res) return new EmbeddedImageResponse(command.channel, "xkcd " + xkcdJson.num + " - " + xkcdJson.title, xkcdJson.alt + ((!command.getTokenAt(2).isEmpty()) ? "\n\n\"" + command.getTokenAt(2).content + "\"" : ""), xkcdJson.img)
    else return new ErrorResponse(command.channel, new BotError("Unable to find that xkcd."))
}