import { isNullOrUndefined, isNumber } from "util";
import { 
    IElixrEmote, 
    IGetEmotesResponse, 
    IGetMultiChannelEmotesResponse, 
    IChannelEmotes, 
    IGetGlobalEmotesResponse 
} from "../models/emote-types";
import crowbarAccess from "./crowbar-access";
import { mapCrowbarEmoteToElixrEmote } from "./crowbar-mapper";
import mixerAccess from "./mixer-access";

const GLOBAL_EMOTE_URL_TEMPLATE = "//crowbartools.com/user-content/emotes/global/{{emoteId}}";
function getChannelEmoteUrlTemplate(channelId: number) {
    return `//crowbartools.com/user-content/emotes/live/${channelId}/{{emoteId}}`;
}

export async function getAllEmotesResponse(channelIdOrName: string, excludeGlobals: boolean = false): Promise<IGetEmotesResponse> {

    let channelId = await getChannelId(channelIdOrName);

    if (isNullOrUndefined(channelId)) {
        return null;
    }

    let channelEmotes = await getEmotesForChannel(channelId);

    let globalEmotes: IElixrEmote[] = undefined;
    if(!excludeGlobals) {
        globalEmotes = await getGlobalEmotes();
    }

    const emotesResponse: IGetEmotesResponse = {
        channelId,
        channelEmotes,
        globalEmotes,
        channelEmoteUrlTemplate: getChannelEmoteUrlTemplate(channelId),
        globalEmoteUrlTemplate: !excludeGlobals ? GLOBAL_EMOTE_URL_TEMPLATE : undefined,
    };

    return emotesResponse;
}

export async function getMultiChannelEmotesResponse(channels: string[], excludeGlobals: boolean = false): Promise<IGetMultiChannelEmotesResponse> {  
    let channelEmotes: IChannelEmotes[];
    for(let channelIdOrName of channels) {
        let channelId = await getChannelId(channelIdOrName);

        if (isNullOrUndefined(channelId)) {
            return null;
        }

        let emotes = await getEmotesForChannel(channelId);

        channelEmotes.push({
            channelId,
            emotes,
            channelEmoteUrlTemplate: getChannelEmoteUrlTemplate(channelId),
        })
    }

    let globalEmotes: IElixrEmote[] = undefined;
    if(!excludeGlobals) {
        globalEmotes = await getGlobalEmotes();
    }

    const emotesResponse: IGetMultiChannelEmotesResponse = {
        channelEmotes,
        globalEmotes,
        globalEmoteUrlTemplate: !excludeGlobals ? GLOBAL_EMOTE_URL_TEMPLATE : undefined,
    };

    return emotesResponse;
}

export async function getGlobalEmotesResponse(): Promise<IGetGlobalEmotesResponse> {
    let globalEmotes = await getGlobalEmotes();

    const globalEmotesResponse: IGetGlobalEmotesResponse = {
        globalEmotes,
        globalEmoteUrlTemplate: GLOBAL_EMOTE_URL_TEMPLATE
    };

    return globalEmotesResponse;
}

async function getEmotesForChannel(channelId: number): Promise<IElixrEmote[]> {

    const channelEmoteData = await crowbarAccess.getChannelEmotes(channelId);

    const channelEmotes: IElixrEmote[] =
        channelEmoteData && channelEmoteData.emotes ?
            Object.values(channelEmoteData.emotes).map((ce) => mapCrowbarEmoteToElixrEmote(ce)) : [];

    return channelEmotes
}

async function getGlobalEmotes(): Promise<IElixrEmote[]> {
    const globalEmoteData = await crowbarAccess.getGlobalEmotes();

    const globalEmotes: IElixrEmote[] =
        globalEmoteData && globalEmoteData.emotes ?
            Object.values(globalEmoteData.emotes).map((ce) => mapCrowbarEmoteToElixrEmote(ce)) : [];

    return globalEmotes;
}

async function getChannelId(channelIdOrName: string): Promise<number> {
    let channelId: number;
    if (!isNumber(channelIdOrName)) {
        channelId = await mixerAccess.getChannelId(channelIdOrName);
    } else {
        channelId = Number(channelIdOrName).valueOf();
    }
    return channelId;
}
