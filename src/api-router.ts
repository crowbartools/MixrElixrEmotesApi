import { Router } from "express";
import { emotesController } from "./controllers/emotes-controller";
import swaggerUi from "swagger-ui-express";

class ApiRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    private config(): void {

        const swaggerDocument = require('./swagger.json');

        this.router.use('/docs', swaggerUi.serve);
        this.router.get('/docs', swaggerUi.setup(swaggerDocument));  

        this.router.get("/emotes/:channelId", emotesController.getAvailalbeEmotesForChannel);
    }
}

export const apiRouter = new ApiRoutes().router;
