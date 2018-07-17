import YoutubeVideo, { Youtube } from './youtube';
import Command from '../../command/command';
import { TextResponse, ErrorResponse } from '../../response';
import BotError from '../../error';

const DiscordApi = require('discord.js')

export default function findYoutubeVideo(command: Command) {
    new Youtube().listVideos(command.getTokenAt(1).content).then((videos: Array<YoutubeVideo>) => {
        let selectedVideo = videos[0]
        if (selectedVideo) {
            new TextResponse(command.channel).send(selectedVideo.title + "\n" + selectedVideo.getYoutubeVideoLink())
        }
        else {
            new ErrorResponse(command.channel).send(new BotError("Unable to find a video from query: " + command.getTokenAt(1).content))
        }
    })
}

export function listYoutubeVideos(command: Command) {
    new Youtube().listVideos(command.getTokenAt(1).content).then((videos: Array<YoutubeVideo>) => {
        let relatedText = ""
        videos.forEach((vid, index) => {
            if (index < 10) {
                relatedText += "[" + vid.title + "](" + vid.getYoutubeVideoLink() + ")\n"
            }
        })
        new TextResponse(command.channel).send(new DiscordApi.RichEmbed().setTitle("Videos related to " + command.getTokenAt(1).content).setDescription(relatedText))
    })
}