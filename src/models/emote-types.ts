import { MaxSize } from "./emote-enums";

export interface IElixrEmote {
    id: string;
    code: string;
    animated: boolean;
    maxSize?: MaxSize;
}

export interface IGetEmotesResponse {
    channelEmotes: IElixrEmote[];
    globalEmotes: IElixrEmote[];
    channelEmoteTemplateUrl: string;
    globalEmoteTemplateUrl: string;
}
