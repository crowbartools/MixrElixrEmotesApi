import * as express from "express";
import { emotesController } from "./controllers/emotesController";

class ApiRoutes {
    public router: express.Router = express.Router();

    constructor() {
        this.config();
    }

    private config(): void {
        this.router.get("/emotes/:channelId", emotesController.getEmotes);
    }
}

export const apiRouter = new ApiRoutes().router;