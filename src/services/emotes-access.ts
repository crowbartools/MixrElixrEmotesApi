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

    console.log(channelEmoteData);

    const channelEmotes: IElixrEmote[] =
        isNullOrUndefined(channelEmoteData) ?
            [] : Object.values(channelEmoteData.emotes).map((ce) => mapCrowbarEmoteToElixrEmote(ce));

    const globalEmotes: IElixrEmote[] =
        isNullOrUndefined(channelEmoteData) ?
            [] : Object.values(globalEmoteData.emotes).map((ce) => mapCrowbarEmoteToElixrEmote(ce));

    const emotesResponse: IGetEmotesResponse = {
        channelEmotes,
        globalEmotes,
        channelEmoteTemplateUrl: `//crowbartools.com/user-content/emotes/live/${channelId}/{{emoteId}}`,
        globalEmoteTemplateUrl: "//crowbartools.com/user-content/emotes/global/{{emoteId}}",
    };

    return emotesResponse;
}
