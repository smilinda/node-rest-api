import express from "express";
import bodyparser from "body-parser";
import cors from "cors";
import http from "http";

import geocode from "./api/geocode";

const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use("/nimbus/mock/geolocation", geocode);

app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 501);
    res.json({
        error: {
            code: err.status || 501,
            message: err.message
        }
    });
});

const server = http.createServer(app);
server.listen(process.env.PORT || 3000);