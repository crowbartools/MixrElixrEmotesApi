import { MaxSize } from "./emote-enums";

export interface ICrowbarEmote {
    name: string;
    filename: string;
    id: string;
    maxSize?: MaxSize;
}

export interface ICrowbarEmotesData {
    id: number;
    username: string;
    emotes: Map<string, ICrowbarEmote>;
}
