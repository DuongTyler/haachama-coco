import { stringToLink, linkToString, ExternalLink } from "./url";

export interface Animation {
    animationID: number;
    animationLink: ExternalLink;
    artistLink: ExternalLink;
    username: string;
    title: string;
}

export interface AnimationJson {
    animationID: number;
    animationLink: string;
    artistLink: string;
    username: string;
    title: string;
}

export function animationFromJson(json: AnimationJson): Animation {
    const { animationID, animationLink, artistLink, username, title } = json;
    return {
        animationID,
        animationLink: stringToLink(animationLink),
        artistLink: stringToLink(artistLink),
        username,
        title,
    }
}

export function animationToJson(animation: Animation): AnimationJson {
    const { animationID, animationLink, artistLink, username, title } = animation;
    return {
        animationID,
        animationLink: linkToString(animationLink),
        artistLink: linkToString(artistLink),
        username,
        title,
    }
}
