import {AnimationJson} from "./animation";
import {ArchiveJson} from "./archive";
import {ArtworkJson} from "./artwork";
import {GameJson} from "./game";
import {MessageJson} from "./message";

interface BaseResponse {
    status: string;
}

export interface ArchiveResponse extends BaseResponse {
    archives: ArchiveJson[];
}

export interface AnimationResponse extends BaseResponse {
    archives: AnimationJson[];
}

export interface CountResponse extends BaseResponse {
    count: number;
}

export interface GalleryResponse extends BaseResponse {
    gallery: ArtworkJson[];
}

export interface GamesResponse extends BaseResponse {
    games: GameJson[];
}

export interface MessageResponse extends BaseResponse {
    messages: MessageJson[];
}
