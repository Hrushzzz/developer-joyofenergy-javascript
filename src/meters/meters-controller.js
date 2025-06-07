const { pricePlans } = require('../price-plans/price-plans');
const { meterPricePlanMap } = require('./meters');


// Get meters for a specific price plan ::
function getMetersForPricePlan(req, res) {
  const { pricePlanId } = req.params;

  // Validating pricePlanId string
  if (!pricePlans[pricePlanId]) {
    return res.status(400).json({ error: 'Invalid pricePlanId' });
  }

  const targetPlanObj = pricePlans[pricePlanId];

  // Filtering meters that have this exact plan object
  const smartMeterIds = Object.entries(meterPricePlanMap)
    .filter(([meterId, planObj]) => planObj === targetPlanObj)
    .map(([meterId]) => meterId);

  if (smartMeterIds.length === 0) {
    return res.status(404).json({ error: 'No meters found for this price plan' });
  }

  res.json({
    pricePlanId,
    smartMeterIds,
  });
}

module.exports = {
  getMetersForPricePlan
};
