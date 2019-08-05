import express from 'express';
import * as bodyParser from "body-parser";
import { apiRouter } from "./apiRouter";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('The sedulous hyena ate the antelope!');
});

app.use("/v1", apiRouter);

app.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    return console.log(`server is listening on ${port}`);
});


