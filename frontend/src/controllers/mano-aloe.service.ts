import {Animation, animationFromJson} from "../models/animation";
import {Archive, archiveFromJson} from "../models/archive";
import {Artwork, artworkFromJson} from "../models/artwork";
import {Game, gameFromJson} from "../models/game";
import {Message, messageFromJson} from "../models/message";
import {AnimationResponse,ArchiveResponse, CountResponse, GalleryResponse, GamesResponse, MessageResponse} from "../models/response";


export default class ManoAloeService {
    private readonly apiURL: string;

    constructor() {
        this.apiURL = process.env.REACT_APP_API ? process.env.REACT_APP_API : 'http://localhost:5000/api/';
    }

    private getCount(functionality: string): Promise<number> {
        return fetch(this.apiURL + functionality + '/count')
            .then((res: { json: () => any; }) => {
                return res.json();
            })
            .then((apiResponse: CountResponse) => {
                return apiResponse.count;
            })
            .catch((error: Error) => {
                throw error;
            })
    }

    public getMessage(messageID: number): Promise<Message> {
        return fetch(this.apiURL + 'messages/' + messageID)
            .then((res: { json: () => any; }) => {
                return res.json();
            })
            .then((apiResponse: MessageResponse) => {
                return messageFromJson(apiResponse.messages[0]);
            })
            .catch((error: Error) => {
                throw error;
            });
    }

    public getAllMessages(): Promise<Message[]> {
        return fetch(this.apiURL + 'messages')
            .then((res: { json: () => any; }) => {
                return res.json();
            })
            .then((apiResponse: MessageResponse) => {
                return apiResponse.messages.map(messageFromJson);
            })
            .catch((error: Error) => {
                throw error;
            })
    }

    public getMessages(from: number, to: number): Promise<Message[]> {
        return fetch(this.apiURL + 'messages/range/' + from + '/' + to)
            .then((res: { json: () => any; }) => {
                return res.json();
            })
            .then((apiResponse: MessageResponse) => {
                return apiResponse.messages.map(messageFromJson);
            })
            .catch((error: Error) => {
                throw error;
            })
    }

    public getMessageCount(): Promise<number> {
        return this.getCount('messages');
    }

    public getAllGames(): Promise<Game[]> {
        return fetch(this.apiURL + 'games')
            .then((res: { json: () => any; }) => {
                return res.json();
            })
            .then((apiResponse: GamesResponse) => {
                return apiResponse.games.map(gameFromJson);
            })
            .catch((error: Error) => {
                throw error;
            })
    }

    public getGamesCount(): Promise<number> {
        return this.getCount('games');
    }

    public getGallery(): Promise<Artwork[]> {
        return fetch(this.apiURL + 'gallery')
            .then((res: { json: () => any; }) => {
                return res.json();
            })
            .then((apiResponse: GalleryResponse) => {
                return apiResponse.gallery.map(artworkFromJson);
            })
            .catch((error: Error) => {
                throw error;
            })
    }

    public getGalleryCount(): Promise<number> {
        return this.getCount('gallery');
    }

    public getArchive(who: string, archiveID: number): Promise<Archive> {
        return fetch(this.apiURL + 'archives/' + who + '/' + archiveID)
            .then((res: { json: () => any; }) => {
                return res.json();
            })
            .then((apiResponse: ArchiveResponse) => {
                return archiveFromJson(apiResponse.archives[0]);
            })
            .catch((error: Error) => {
                throw error;
            });
    }

    public getAllArchives(who: string): Promise<Archive[]> {
        return fetch(this.apiURL + 'archives/' + who)
            .then((res: { json: () => any; }) => {
                return res.json();
            })
            .then((apiResponse: ArchiveResponse) => {
                return apiResponse.archives.map(archiveFromJson);
            })
            .catch((error: Error) => {
                throw error;
            })
    }

    public getRandomArchive(who: string): Promise<Archive> {
        return fetch(this.apiURL + 'archives/' + who + '/random')
            .then((res: { json: () => any; }) => {
                return res.json();
            })
            .then((apiResponse: ArchiveResponse) => {
                return archiveFromJson(apiResponse.archives[0]);
            })
            .catch((error: Error) => {
                throw error;
            });
    }

    public getArchiveCount(who: string): Promise<number> {
        return this.getCount('archives/' + who);
    }

    public getAnimations(): Promise<Animation[]> {
        return fetch(this.apiURL + 'animations')
            .then((res: { json: () => any; }) => {
                return res.json();
            })
            .then((apiResponse: AnimationResponse) => {
                return apiResponse.animations.map(animationFromJson);
            })
            .catch((error: Error) => {
                throw error;
            })
    }

}
