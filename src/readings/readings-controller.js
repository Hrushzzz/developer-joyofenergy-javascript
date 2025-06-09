const { usage, average, usageCost } = require("../usage/usage");

const read = (getData, req) => {
    const meter = req.params.smartMeterId;
    return getData(meter);
};

const store = (setData, req) => {
    const data = req.body;
    return setData(data.smartMeterId, data.electricityReadings);
};


// Filtering readings by time range ::
const readByTimeRange = (getData, req) => {
  const meterId = req.params.smartMeterId;
  const from = parseInt(req.query.from);
  const to = parseInt(req.query.to);

  if (isNaN(from) || isNaN(to)) {
    return { error: "Invalid 'from' or 'to' query parameters" };
  }

  const readings = getData(meterId);
  if (!readings || readings.length === 0) {
    return { error: "No readings found for this meter" };
  }

  const filtered = readings.filter((r) => r.time >= from && r.time <= to);
  console.log(
    "All readings timestamps:",
    readings.map((r) => r.time)
  );
  console.log("Filtering from", from, "to", to);
  return filtered;
};


// To calculate the usage cost for a duration (D) in which lets assume we have captured 
// N electricity readings (er1,er2,er3....erN)
// Average reading in KW = (er1.reading + er2.reading + ..... erN.Reading)/N
// Usage time in hours = Duration(D) in hours
// Energy consumed in kWh = average reading * usage time
// Cost = tariff unit prices * energy consumed

// Getting stats of the meter for the last one week ::
const getStats = (getData, req) => {
  console.log("params :: ", req.params.smartMeterId);
  const meterId = req.params.smartMeterId;
  console.log("After getting the meterId :: ", meterId);
  let readings = getData(meterId);
  console.log(readings);
  const timing = Date.now()/1000 - (86400 * 7);
  const readingsOfLastWeek = readings.filter((rt) => rt.time > timing);
  if (!readingsOfLastWeek) {
    return {error : "Readings are unavailbale after the mentioned time"}
  }
  const averageUsage = average / readingsOfLastWeek.length;
  const totalUsage = readingsOfLastWeek.reduce((sum, r) => sum + r.reading, 0);
  const costOfUsage = totalUsage ;

  return {
    averageUsage,
    costOfUsage,
    totalUsage
  }
}

// Adding aggregated usage summary :::
const summarize = (getData, req) => {
  const meterId = req.params.smartMeterId;
  let readings = getData(meterId);
  const from = parseInt(req.query.from);
  const to = parseInt(req.query.to);

  if (!readings || readings.length === 0) {
    return { error: "No readings found for this meter" };
  }

  // If both 'from' and 'to' are valid timestamps, filter readings by time
  if (!isNaN(from) && !isNaN(to)) {
    readings = readings.filter(r => r.time >= from && r.time <= to);
    if (readings.length === 0) {
      return { error: "No readings found in the specified time range" };
    }
  }

  const totalUsage = readings.reduce((sum, r) => sum + r.reading, 0);
  const averageUsage = totalUsage / readings.length;
  const peakReading = Math.max(...readings.map(r => r.reading));
  const minReading = Math.min(...readings.map(r => r.reading));
  const readingCount = readings.length;

  return {
    smartMeterId: meterId,
    averageUsage,
    totalUsage,
    peakReading,
    minReading,
    readingCount,
  };
};


module.exports = { read, store, readByTimeRange, summarize, getStats };
