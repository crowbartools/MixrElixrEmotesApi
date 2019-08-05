import { Request, Response } from "express";

import * as httpRequest from "request-promise-native";

import { isNumber, isNullOrUndefined } from "util";

class Channel {
    id: Number;
    constructor(id: Number) {
        this.id = id;
    }
}

class NotFoundErrorResponse {
    error: string = "Not Found";
    message: string = "Channel not found.";
    statusCode: Number = 404;
}

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

export class EmotesController {

    public async getEmotes(req: Request, res: Response) {

        let channelNameOrId = req.params.channelId;

        let channel: Channel;
        if(!isNumber(channelNameOrId)) {
            try {
                let resp = await httpRequest.get(`https://mixer.com/api/v1/channels/${channelNameOrId}?fields=id`);
                channel = JSON.parse(resp);
            } catch(reason) {
                console.log("Error getting channel", reason);
                //channel not found
            }
        } else {
            channel = new Channel(Number(channelNameOrId));
        }

        if(isNullOrUndefined(channel)) {
            res.status(404).json(new NotFoundErrorResponse());
            return;
        }

        console.log("CHANNEL ID: ", channel.id);
        let crowbarEmotesData: CrowbarEmotesData;
        try {
            let emotesResp = await httpRequest.get(`https://crowbartools.com/user-content/emotes/live/${channel.id}/emotes.json`);
            emotesResp = JSON.parse(emotesResp);
            crowbarEmotesData = Array.isArray(emotesResp) ? emotesResp[0] : emotesResp;
        } catch(error) {
            console.log("Error getting emotes", error.statusCode);
        }

        console.log(crowbarEmotesData);

        res.json({
            foo: "bar"
        });
    }

}

export const emotesController = new EmotesController();
