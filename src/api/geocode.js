import express from "express";
import randomLocation from "random-location";

const router = express.Router();

router.get("/", (req, res, next) => {
    const mapArea = {
        latitude: 7.294544,
        longitude: 80.5907618
    };

    const radius = 100000;

    let response = [];

    for (let i = 0; i < 500; ++i) {
        const randomPoint = randomLocation.randomCirclePoint(mapArea, radius);

        let responseModel = {
            "geoPoint": {
                "lat": randomPoint.latitude,
                "lon": randomPoint.longitude
            }
        };
        response.push(responseModel);
    }

    res.status(200).json(response);
});

module.exports = router;