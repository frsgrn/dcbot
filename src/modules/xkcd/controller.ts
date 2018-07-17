import Command from "../../command/command";
import XKCD from  './xkcd';
import {EmbeddedImageResponse, ErrorResponse} from '../../response';
import BotError from "../../error";

export default function searchXKCD (command: Command) {
    let xkcd = new XKCD(command.getTokenAt(1).content)

    xkcd.exists().then(async result => {
        let xkcdJson = await xkcd.getXKCDJson()
        if (result) new EmbeddedImageResponse(command.channel).send("xkcd " + xkcdJson.num + " - " + xkcdJson.title, command.getTokenAt(2).content, xkcdJson.img)
        else new ErrorResponse(command.channel).send(new BotError("Unable to find that xkcd."))
    })
}