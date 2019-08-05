import * as httpRequest from "request-promise-native";
import { ICrowbarEmotesData } from "../models/crowbar-types";

export default class CrowbarAccess {

    public static async getChannelEmotes(channelId: number): Promise<ICrowbarEmotesData> {
        let crowbarEmotesData: ICrowbarEmotesData;
        try {
            let emotesResp = await httpRequest.get(
                `https://crowbartools.com/user-content/emotes/live/${channelId}/emotes.json`,
            );
            emotesResp = JSON.parse(emotesResp);
            crowbarEmotesData = Array.isArray(emotesResp) ? emotesResp[0] : emotesResp;
        } catch (error) {
            console.log("Error getting emotes", error.statusCode);
        }
        return crowbarEmotesData;
    }

    public static async getGlobalEmotes(): Promise<ICrowbarEmotesData> {
        let crowbarEmotesData: ICrowbarEmotesData;
        try {
            let emotesResp = await httpRequest.get(
                `https://crowbartools.com/user-content/emotes/global/emotes.json`,
            );
            emotesResp = JSON.parse(emotesResp);
            crowbarEmotesData = Array.isArray(emotesResp) ? emotesResp[0] : emotesResp;
        } catch (error) {
            console.log("Error getting emotes", error.statusCode);
        }
        return crowbarEmotesData;
    }
}
