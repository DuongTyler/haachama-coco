import { stringToLink, linkToString, ExternalLink } from "./url";
import { toRegion, Region } from "./region";

export interface Animation {
    animationID: number;
    animationLink: ExternalLink;
    artistLink: ExternalLink;
    username: string;
    title: string;
    messageID: number;
    orig_msg: string;
    tl_msg: string;
    region: Region;
}

export interface AnimationJson {
    animationID: number;
    animationLink: string;
    artistLink: string;
    username: string;
    title: string;
    messageID: number;
    orig_msg: string;
    tl_msg: string;
    region: Region;
}

export function animationFromJson(json: AnimationJson): Animation {
    const {
        animationID,
        animationLink,
        artistLink,
        username,
        title,
        messageID=9999,
        orig_msg="falsy msg",
        tl_msg="falsy msg",
        region=toRegion("AQ") } = json;
    return {
        animationID,
        animationLink: stringToLink(animationLink),
        artistLink: stringToLink(artistLink),
        username,
        title,
        messageID,
        orig_msg,
        tl_msg,
        region,
    }
}

export function animationToJson(animation: Animation): AnimationJson {
    const {
        animationID,
        animationLink,
        artistLink,
        username,
        title,
        messageID=9999,
        orig_msg="falsy msg",
        tl_msg="falsy msg",
        region=toRegion("AQ") } = animation;
    return {
        animationID,
        animationLink: linkToString(animationLink),
        artistLink: linkToString(artistLink),
        username,
        title,
        messageID,
        orig_msg,
        tl_msg,
        region,
    }
}
