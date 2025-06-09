const { meters } = require("../meters/meters");

const generateSingle = () => {
    const startTime = Date.now()/1000; // Friday, 11 December 2020 11:28:45 GMT+00:00
    const hour = 3600;
    const pastDate = startTime-(86400 * 7);
    const readingsLength = Math.ceil(168);

    return [...new Array(readingsLength)].map((reading, index) => ({
        time: Math.floor(startTime - index * hour),
        reading: Math.random() * 2,
    }));
};

const generateAllMeters = () => {
    const readings = {};

    for (const key in meters) {
        if (meters.hasOwnProperty(key)) {
            readings[meters[key]] = generateSingle();
        }
    }

    return readings;
};

const readingsData = generateAllMeters();

module.exports = { readingsData };
