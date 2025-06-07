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


module.exports = { read, store, readByTimeRange, summarize };
