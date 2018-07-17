import YoutubeVideo, { Youtube } from './youtube';
import Command from '../../command/command';
import { TextResponse, ErrorResponse } from '../../response';
import BotError from '../../error';

export default function findYoutubeVideo(command: Command) {
    new Youtube().listVideos(command.getTokenAt(1).content).then((videos: Array<YoutubeVideo>) => {
        if (videos[0]) {
            new TextResponse(command.channel).send(videos[0].title + "\n" + videos[0].getYoutubeVideoLink())
        }
        else {
            new ErrorResponse(command.channel).send(new BotError("Unable to find a video from query: " + command.getTokenAt(1).content))
        }
    })
}