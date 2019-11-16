import { Request, Response } from "express";

import { isNullOrUndefined } from "util";
import * as emotesAccess from "../services/emotes-access";

const NOT_FOUND_RESPONSE = {
    error: "Not found",
    message: "Can't find channel.",
    status: 404
};

export class EmotesController {

    public async getAvailableEmotesForChannel(req: Request, res: Response) {

        const channelIdOrName = req.params.channelId;

        const excludeGlobals = req.query.excludeGlobals as boolean;

        const emotes = await emotesAccess.getAllEmotesResponse(channelIdOrName, excludeGlobals);

        if (isNullOrUndefined(emotes)) {
            res.status(404).json(NOT_FOUND_RESPONSE);
            return;
        }

        res.json(emotes);
    }

    public async getAvailableEmotesForChannels(req: Request, res: Response) {
        const channelsRaw = req.query.channels;

        if (isNullOrUndefined(channelsRaw)) {
            res.status(404).json(NOT_FOUND_RESPONSE);
            return;
        }

        let channels: string[];
        try {
            channels = JSON.parse(channelsRaw);
        } catch(err) {
            console.log(err);
            res.status(404).json(NOT_FOUND_RESPONSE);
            return;
        }

        const excludeGlobals = req.query.excludeGlobals as boolean;

        const emotes = await emotesAccess.getMultiChannelEmotesResponse(channels, excludeGlobals);

        if (isNullOrUndefined(emotes)) {
            res.status(404).json(NOT_FOUND_RESPONSE);
            return;
        }

        res.json(emotes);
    }

    public async getGlobalEmotes(req: Request, res: Response) {
        const emotes = await emotesAccess.getGlobalEmotesResponse();
        res.json(emotes);
    }
}

export const emotesController = new EmotesController();
