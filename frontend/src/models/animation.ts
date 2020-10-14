import { stringToLink, linkToString, ExternalLink } from "./url";
import { toRegion, Region } from "./region";
import { Content, ContentJson } from "./content"

export interface Animation extends Content {
    animationID: number;
    animationLink: ExternalLink;
    artistLink: ExternalLink;
    username: string;
    title: string;
}

export interface AnimationJson extends ContentJson{
    animationID: number;
    animationLink: string;
    artistLink: string;
    username: string;
    title: string;
}

export function animationFromJson(json: AnimationJson): Animation {
    const {
        animationID,
        animationLink,
        artistLink,
        username,
        title,
        messageID=9999} = json;
    return {
        animationID,
        animationLink: stringToLink(animationLink),
        artistLink: stringToLink(artistLink),
        username,
        title,
        messageID,
    }
}

export function animationToJson(animation: Animation): AnimationJson {
    const {
        animationID,
        animationLink,
        artistLink,
        username,
        title,
        messageID=9999} = animation;
    return {
        animationID,
        animationLink: linkToString(animationLink),
        artistLink: linkToString(artistLink),
        username,
        title,
        messageID,
    }
}
