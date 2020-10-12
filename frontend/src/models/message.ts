import { stringToLink, linkToString, ExternalLink } from "./url";
import {Region, toRegion} from "./region";

export interface Message {
    messageID: number;
    orig_msg: string;
    tl_msg: string;
    region: Region;
    username: string;
    animationLink: ExternalLink;
    artistLink: ExternalLink;
    title: string;
}

export interface MessageJson {
    messageID: number;
    orig_msg: string;
    tl_msg: string;
    region: string;
    username: string;
    animationLink: ExternalLink;
    artistLink: ExternalLink;
    title: string;
}

export function messageFromJson(json: MessageJson): Message {
    const {
        messageID,
        orig_msg,
        tl_msg,
        region,
        username,
        animationLink=stringToLink("about:blank"),
        artistLink=stringToLink("about:blank"),
        title="" } = json;
    return {
        messageID,
        orig_msg,
        tl_msg,
        region: toRegion(region),
        username,
        animationLink,
        title,
        artistLink,
    }
}

export function messageToJson(message: Message): MessageJson {
    const {
        messageID,
        orig_msg,
        tl_msg,
        region,
        username,
        animationLink=stringToLink("about:blank"),
        artistLink=stringToLink("about:blank"),
        title="" } = message;
    return {
        messageID,
        orig_msg,
        tl_msg,
        region: region as string,
        username,
        animationLink,
        title,
        artistLink,
    }
}
