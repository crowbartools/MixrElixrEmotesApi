class CrowbarEmote {
    name: String;
    filename: String;
    id: string;
    maxSize?: Number;
}

class CrowbarEmotesData {
    id: Number;
    username: String;
    emotes: Map<string, CrowbarEmote>;
}


export function getChannelEmotes(channelId: Number): CrowbarEmotesData {
    return null;
}

export function getGlobalEmotes(): CrowbarEmotesData {
    return null;
}