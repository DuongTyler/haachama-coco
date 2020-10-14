
import { stringToLink, linkToString, ExternalLink } from "./url";
import { toRegion, Region } from "./region";


// This is a base interface for all contents
export interface Content {
    animationID ?: number;
    messageID ?: number;
    animationLink ?: ExternalLink;
    artistLink ?: ExternalLink;
    username ?: string;
    title ?: string;
    orig_msg ?: string;
    tl_msg ?: string;
    region ?: Region;
}

// This is a base interface for all content JSONs
export interface ContentJson {
    animationID ?: number;
    messageID ?: number;
    animationLink ?: string;
    artistLink ?: string;
    username ?: string;
    title ?: string;
    orig_msg ?: string;
    tl_msg ?: string;
    region ?: string;
}
