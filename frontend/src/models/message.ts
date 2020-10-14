import { stringToLink, linkToString, ExternalLink } from "./url";
import { Region, toRegion } from "./region";
import { Content, ContentJson } from "./content"

export interface Message extends Content {
    messageID: number;
    orig_msg: string;
    tl_msg: string;
    region: Region;
    username: string;
}

export interface MessageJson extends ContentJson{
    messageID: number;
    orig_msg: string;
    tl_msg: string;
    region: string;
    username: string;
}

export function messageFromJson(json: MessageJson): Message {
    const {
        messageID,
        orig_msg,
        tl_msg,
        region,
        username} = json;
    return {
        messageID,
        orig_msg,
        tl_msg,
        region: toRegion(region),
        username,
    }
}

export function messageToJson(message: Message): MessageJson {
    const {
        messageID,
        orig_msg,
        tl_msg,
        region,
        username} = message;
    return {
        messageID,
        orig_msg,
        tl_msg,
        region: region as string,
        username,
    }
}
