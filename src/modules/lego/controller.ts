import Command from "../../command/command";
import Lego from  './lego';
import Response, {EmbeddedImageResponse, ErrorResponse} from '../../response';
import BotError from "../../error";

export default async function searchLegoset (command: Command): Promise<Response> {
    let lego = new Lego(command.getTokenAt(1).content)
    let res = await lego.exists()
    if (res.exists) {
        return new EmbeddedImageResponse(command.channel, "Lego set " + lego.legosetId, command.getTokenAt(2).content, lego.getImageUrl())
    }
    else { 
        return new ErrorResponse(command.channel, new BotError("Unable to find that lego set."))
    } 
}
