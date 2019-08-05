"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpRequest = __importStar(require("request-promise-native"));
const util_1 = require("util");
class Channel {
    constructor(id) {
        this.id = id;
    }
}
class NotFoundErrorResponse {
    constructor() {
        this.error = "Not Found";
        this.message = "Channel not found.";
        this.statusCode = 404;
    }
}
class CrowbarEmote {
}
class CrowbarEmotesData {
}
class EmotesController {
    getEmotes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let channelNameOrId = req.params.channelId;
            let channel;
            if (!util_1.isNumber(channelNameOrId)) {
                try {
                    let resp = yield httpRequest.get(`https://mixer.com/api/v1/channels/${channelNameOrId}?fields=id`);
                    channel = JSON.parse(resp);
                }
                catch (reason) {
                    console.log("Error getting channel", reason);
                    //channel not found
                }
            }
            else {
                channel = new Channel(Number(channelNameOrId));
            }
            if (util_1.isNullOrUndefined(channel)) {
                res.status(404).json(new NotFoundErrorResponse());
                return;
            }
            console.log("CHANNEL ID: ", channel.id);
            let crowbarEmotesData;
            try {
                let emotesResp = yield httpRequest.get(`https://crowbartools.com/user-content/emotes/live/${channel.id}/emotes.json`);
                emotesResp = JSON.parse(emotesResp);
                crowbarEmotesData = Array.isArray(emotesResp) ? emotesResp[0] : emotesResp;
            }
            catch (error) {
                console.log("Error getting emotes", error.statusCode);
            }
            console.log(crowbarEmotesData);
            res.json({
                foo: "bar"
            });
        });
    }
}
exports.EmotesController = EmotesController;
exports.emotesController = new EmotesController();
//# sourceMappingURL=emotesController.js.map