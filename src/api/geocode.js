import express from "express";
import randomLocation from "random-location";
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

/**
 * Get Mock data from known city
 */
const getMockCityMapLocations = () => {
    const mapLocations = [
        {
            mapArea: {
                latitude: 6.9357122,
                longitude: 79.8500395
            },
            radius: 500
        },
        {
            mapArea: {
                latitude: 7.2946291,
                longitude: 80.5907619
            },
            radius: 60000
        },
        {
            mapArea: {
                latitude: 6.9514501,
                longitude: 80.7459274
            },
            radius: 30000
        },
        {
            mapArea: {
                latitude: 6.1009775,
                longitude: 80.4687595
            },
            radius: 5000
        },
        {
            mapArea: {
                latitude: 8.3353156,
                longitude: 80.3332731
            },
            radius: 20000
        },
        {
            mapArea: {
                latitude: 9.1356512,
                longitude: 80.4356533
            },
            radius: 9000
        },
        {
            mapArea: {
                latitude: 7.1896135,
                longitude: 79.7882127
            },
            radius: 1000
        },
        {
            mapArea: {
                latitude: 7.161053,
                longitude: 79.859403
            },
            radius: 1000
        },
        {
            mapArea: {
                latitude: 7.8815276,
                longitude: 80.559472
            },
            radius: 3000
        },
        {
            mapArea: {
                latitude: 8.7521311,
                longitude: 80.4155225
            },
            radius: 500
        }];

    return mapLocations;
};

/**
 * Generate mock object fot given cities.
 * nimbus/mock/geolocation/
 */
router.get("/", (req, res, next) => {
    const mapLocations = getMockCityMapLocations();
    let response = [];

    mapLocations.forEach(mapLocation => {
        for (let index = 0; index < 50; ++index) {
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
});

module.exports = router;