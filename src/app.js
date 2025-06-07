const express = require("express");
const { readings } = require("./readings/readings");
const { readingsData } = require("./readings/readings.data");
const { read, store } = require("./readings/readings-controller");
const { recommend, compare } = require("./price-plans/price-plans-controller");
const { readByTimeRange } = require("./readings/readings-controller");
const { summarize } = require("./readings/readings-controller");

const app = express();
app.use(express.json());

const { getReadings, setReadings } = readings(readingsData);

app.get("/readings/read/:smartMeterId", (req, res) => {
    res.send(read(getReadings, req));
});

app.post("/readings/store", (req, res) => {
    res.send(store(setReadings, req));
});

app.get("/price-plans/recommend/:smartMeterId", (req, res) => {
    res.send(recommend(getReadings, req));
});

app.get("/price-plans/compare-all/:smartMeterId", (req, res) => {
    res.send(compare(getReadings, req));
});

// Get readings by time range ::
app.get("/readings/read-by-time-range/:smartMeterId", (req, res) => {
  const data = readByTimeRange(getReadings, req);
  if (data.error) {
    return res.status(400).send(data);
  }
  res.send(data);
});


// Adding aggregated usage summary endpoint ::: (this works for both time range and all readings)
app.get("/readings/summary/:smartMeterId", (req, res) => {
  const summary = summarize(getReadings, req);
  if (summary.error) {
    return res.status(404).send(summary);
  }
  res.send(summary);
});

const port = process.env.PORT || 8080;
app.listen(port);

console.log(`🚀 app listening on port ${port}`);
