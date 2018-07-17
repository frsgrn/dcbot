const { google } = require('googleapis')

let youtubeAPI = google.youtube({
    version: 'v3',
    auth: process.env.GOOGLE_TOKEN
});


export default class YoutubeVideo {
    videoId: string
    title: string
    description: string

    constructor(videoId: string, title: string, description: string) {
        this.videoId = videoId
        this.title = title
        this.description = description
    }

    getYoutubeVideoLink(): string {
        return "https://youtu.be/" + this.videoId
    }
}

export class Youtube {
    async listVideos(query: string) {
        const response = await youtubeAPI.search.list({
            part: 'id,snippet',
            q: query,
            type: 'video',
            maxResults: 10
        });
        return response.data.items.map(vidObject => new YoutubeVideo(vidObject.id.videoId, vidObject.snippet.title, vidObject.snippet.description))
    }
}