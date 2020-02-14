import express from "express";
import randomLocation from "random-location";
import { v4 as uuidv4 } from 'uuid';
import getMockCityMapLocations from "../repository/data.repository";
import isValidCoordinates from "is-valid-coordinates";

const router = express.Router();

/**
 * Generate mock object fot given cities.
 * nimbus/mock/geolocation/
 * nimbus/mock/geolocation?nodeCount=100
 */
router.get("/", (req, res) => {
    let nodeCount = req.query.nodeCount || 100;

    if ((nodeCount != null && isNaN(nodeCount)) || nodeCount < 0) {
        res.status(400).json({
            code: 400,
            message: `nodeCount Invalide. ${nodeCount}`
        });
    }
    else {
        const mapLocations = getMockCityMapLocations();
        let response = [];

        mapLocations.forEach(mapLocation => {
            for (let index = 0; index < nodeCount; ++index) {
                const randomPoint = randomLocation.randomCirclePoint(mapLocation.mapArea, mapLocation.radius);
                const bookingRequestXid = uuidv4();
                const passengerXid = uuidv4();

                let responseModel = {
                    "bookingMode": "Mock Booking Mode",
                    bookingRequestXid,
                    "geoPoint": {
                        "lat": randomPoint.latitude,
                        "lon": randomPoint.longitude
                    },
                    passengerXid,
                    "serviceType": "Mock Service Type",
                    "vehicleType": "Mock Vehicle"
                };
                response.push(responseModel);
            }
        });

        res.status(200).json(response);
    }
});

/**
 * Generate mock object fot given city lat & lon.
 * nimbus/mock/geolocation/
 * nimbus/mock/geolocation?nodeCount=100
 */
router.get("/point", (req, res) => {
    const radius = req.query.radius;
    let nodeCount = req.query.nodeCount;

    if (isValidCoordinates(Number(req.query.lon), Number(req.query.lat)) && Number(radius) > 0 && Number(nodeCount) >= 0) {
        const mapArea = {
            latitude: req.query.lat,
            longitude: req.query.lon
        };

        let response = [];

        for (let index = 0; index < nodeCount; ++index) {
            const randomPoint = randomLocation.randomCirclePoint(mapArea, radius);
            const bookingRequestXid = uuidv4();
            const passengerXid = uuidv4();

            let responseModel = {
                "bookingMode": "Mock Booking Mode",
                bookingRequestXid,
                "geoPoint": {
                    "lat": randomPoint.latitude,
                    "lon": randomPoint.longitude
                },
                passengerXid,
                "serviceType": "Mock Service Type",
                "vehicleType": "Mock Vehicle"
            };
            response.push(responseModel);
        }

        res.status(200).json(response);
    }
    else {
        res.status(400).json({
            code: 400,
            message: 'Invalid query params.'
        });
    }
});

module.exports = router;