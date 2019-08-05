import { MaxSize } from "./emote-enums";

export interface IElixrEmote {
    id: string;
    code: string;
    animated: boolean;
    shared?: boolean;
    maxSize?: MaxSize;
}

export interface IGetEmotesResponse {
    channelId: number;
    channelEmotes: IElixrEmote[];
    globalEmotes: IElixrEmote[];
    channelEmoteUrlTemplate: string;
    globalEmoteUrlTemplate: string;
}
