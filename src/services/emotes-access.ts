import { isNullOrUndefined, isNumber } from "util";
import { IElixrEmote, IGetEmotesResponse } from "../models/emote-types";
import crowbarAccess from "./crowbar-access";
import { mapCrowbarEmoteToElixrEmote } from "./crowbar-mapper";
import mixerAccess from "./mixer-access";

export async function getEmotesForChannel(channelIdOrName: string): Promise<IGetEmotesResponse> {

    let channelId: number;
    if (!isNumber(channelIdOrName)) {
        channelId = await mixerAccess.getChannelId(channelIdOrName);
    } else {
        channelId = Number(channelIdOrName).valueOf();
    }

    if (isNullOrUndefined(channelId)) {
        return null;
    }

    const channelEmoteData = await crowbarAccess.getChannelEmotes(channelId);
    const globalEmoteData = await crowbarAccess.getGlobalEmotes();

    const channelEmotes: IElixrEmote[] =
        channelEmoteData && channelEmoteData.emotes ?
            Object.values(channelEmoteData.emotes).map((ce) => mapCrowbarEmoteToElixrEmote(ce)) : [];

    const globalEmotes: IElixrEmote[] =
        globalEmoteData && globalEmoteData.emotes ?
            Object.values(globalEmoteData.emotes).map((ce) => mapCrowbarEmoteToElixrEmote(ce)) : [];

    const emotesResponse: IGetEmotesResponse = {
        channelId,
        channelEmotes,
        globalEmotes,
        channelEmoteUrlTemplate: `//crowbartools.com/user-content/emotes/live/${channelId}/{{emoteId}}`,
        globalEmoteUrlTemplate: "//crowbartools.com/user-content/emotes/global/{{emoteId}}",
    };

    return emotesResponse;
}
