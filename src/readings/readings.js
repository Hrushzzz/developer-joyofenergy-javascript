// Here, readings is a function, not an object.
// It returns an object with getReadings and setReadings methods.

const readings = (data) => ({
    getReadings: (meterId) => data[meterId] || [],
    setReadings: (meterId, readings) => {
        const currentReadings = data[meterId];
        data[meterId] = [...currentReadings, ...readings];
        return data[meterId];
    },
});

module.exports = { readings };


// const { readings } = require("./readings");
// const { readingsData } = require("./readings.data");

// const { getReadings, setReadings } = readings(readingsData);
// This is the way to use the readings function in other files.