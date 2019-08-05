"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const emotesController_1 = require("./controllers/emotesController");
class ApiRoutes {
    constructor() {
        this.router = express.Router();
        this.config();
    }
    config() {
        this.router.get("/emotes/:channelId", emotesController_1.emotesController.getEmotes);
    }
}
exports.apiRouter = new ApiRoutes().router;
//# sourceMappingURL=apiRouter.js.map