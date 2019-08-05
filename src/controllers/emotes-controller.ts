import { Request, Response } from "express";

import { isNullOrUndefined } from "util";
import * as emotesAccess from "../services/emotes-access";

export class EmotesController {

    public async getAvailalbeEmotesForChannel(req: Request, res: Response) {

        const channelIdOrName = req.params.channelId;

        const emotes = await emotesAccess.getEmotesForChannel(channelIdOrName);

        if (isNullOrUndefined(emotes)) {
            res.status(404).json({
                error: "Not found",
                message: "Can't find channel.",
            });
            return;
        }

        res.json(emotes);
    }
}

export const emotesController = new EmotesController();
