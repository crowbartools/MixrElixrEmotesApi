import { ICrowbarEmote } from "../models/crowbar-types";
import { MaxSize } from "../models/emote-enums";
import { IElixrEmote } from "../models/emote-types";

export function mapCrowbarEmoteToElixrEmote(crowbarEmote: ICrowbarEmote): IElixrEmote {
    const elixrEmote: IElixrEmote = {
        id: crowbarEmote.filename,
        code: crowbarEmote.name,
        animated: crowbarEmote.filename.toLowerCase().endsWith(".gif"),
        maxSize: crowbarEmote.maxSize || MaxSize.Fifty,
    };
    return elixrEmote;
}
