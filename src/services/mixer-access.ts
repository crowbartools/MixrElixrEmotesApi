import * as httpRequest from "request-promise-native";
import { IMixerChannel } from "../models/mixer-types";

export default class MixerAccess {
    public static async getChannelId(channelName: string): Promise<number> {
        let channelId: number;
        try {
            const resp: string = await httpRequest.get(`https://mixer.com/api/v1/channels/${channelName}?fields=id`);
            const channel: IMixerChannel = JSON.parse(resp);
            channelId = channel.id;
        } catch (reason) {
            console.log("Error getting channel", reason);
        }
        return channelId;
    }
}
