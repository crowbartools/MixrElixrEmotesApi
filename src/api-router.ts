import { Router } from "express";
import { emotesController } from "./controllers/emotes-controller";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger";

class ApiRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    private config(): void {

        this.router.use('/docs', swaggerUi.serve);
        this.router.get('/docs', swaggerUi.setup(swaggerDocument));
        
        this.router.get("/emotes", emotesController.getAvailableEmotesForChannels);

        this.router.get("/emotes/:channelId", emotesController.getAvailableEmotesForChannel);

        this.router.get("/global", emotesController.getGlobalEmotes);
    }
}

export const apiRouter = new ApiRoutes().router;
