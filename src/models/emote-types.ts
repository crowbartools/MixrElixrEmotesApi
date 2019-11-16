import { MaxSize } from "./emote-enums";

export interface IElixrEmote {
    id: string;
    code: string;
    animated: boolean;
    shared?: boolean;
    maxSize?: MaxSize;
}

export interface IChannelEmotes {
    channelId: number;
    emotes: IElixrEmote[];
    channelEmoteUrlTemplate: string;
}

export interface IGetEmotesResponse {
    channelId: number;
    channelEmotes: IElixrEmote[];
    globalEmotes: IElixrEmote[];
    channelEmoteUrlTemplate: string;
    globalEmoteUrlTemplate: string;
}

export interface IGetMultiChannelEmotesResponse {
    channelEmotes: IChannelEmotes[];
    globalEmotes: IElixrEmote[];
    globalEmoteUrlTemplate: string;
}

export interface IGetGlobalEmotesResponse {
    globalEmotes: IElixrEmote[];
    globalEmoteUrlTemplate: string;
}
