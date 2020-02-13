import express from "express";
import randomLocation from "random-location";

const router = express.Router();

router.get("/", (req, res, next) => {
    const mapArea = {
        latitude: 6.927079,
        longitude: 79.861244
    };

    const radius = 21600;

    let response = [];

    for (let i = 0; i < 100; ++i) {
        const randomPoint = randomLocation.randomCirclePoint(mapArea, radius);
        let responseModel = {
            "geoPoint": {
                "lat": randomPoint.longitude,
                "lon": randomPoint.latitude
            }
        };
        response.push(responseModel);
    }

    res.status(200).json(response);
});

module.exports = router;