import YoutubeVideo, { Youtube } from './youtube';
import Command from '../../command/command';
import Response, { ErrorResponse } from '../../response';
import BotError from '../../error';

const DiscordApi = require('discord.js')

export default async function findYoutubeVideo(command: Command) {
    let videos: Array<YoutubeVideo> = await new Youtube().listVideos(command.getTokenAt(1).content)
    let selectedVideo = videos[0]
    if (selectedVideo) {
        return new Response(command.channel, selectedVideo.title + "\n" + selectedVideo.getYoutubeVideoLink())
    }
    else {
        return new ErrorResponse(command.channel, new BotError("Unable to find a video from query: " + command.getTokenAt(1).content))
    }
}

export async function listYoutubeVideos(command: Command) {
    let videos: Array<YoutubeVideo> = await new Youtube().listVideos(command.getTokenAt(1).content)
    let relatedText = ""
    if (videos.length == 0) {
        return new Response(command.channel, "No videos matching query.")
    }
    videos.forEach((vid, index) => {
        if (index < 10) {
            relatedText += "[" + vid.title + "](" + vid.getYoutubeVideoLink() + ")\n"
        }
    })
    return new Response(command.channel, new DiscordApi.RichEmbed().setTitle("Videos related to " + command.getTokenAt(1).content).setDescription(relatedText))
}