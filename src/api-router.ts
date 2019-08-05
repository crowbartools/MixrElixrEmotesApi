import { Router } from "express";
import { emotesController } from "./controllers/emotes-controller";

class ApiRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    private config(): void {
        this.router.get("/emotes/:channelId", emotesController.getAvailalbeEmotesForChannel);
    }
}

export const apiRouter = new ApiRoutes().router;
