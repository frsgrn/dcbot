import Command from "../../command/command";
import Lego from  './lego';
import {EmbeddedImageResponse, ErrorResponse} from '../../response';
import BotError from "../../error";

export default function searchLegoset (command: Command) {
    let lego = new Lego(command.getTokenAt(1).content)
    lego.exists().then(result => {
        if (result.exists) {
            new EmbeddedImageResponse(command.channel).send("Lego set " + lego.legosetId, command.getTokenAt(2).content, lego.getImageUrl())
        }
        else { 
            new ErrorResponse(command.channel).send(new BotError("Unable to find that lego set."))
        } 
    })
}
