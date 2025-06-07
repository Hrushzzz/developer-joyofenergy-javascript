const { pricePlans } = require("./price-plans");
const { usageForAllPricePlans } = require("../usage/usage");

const currentPricePlanPerMeter = {};

const recommend = (getReadings, req) => {
    const meter = req.params.smartMeterId;
    const pricePlanComparisons = usageForAllPricePlans(pricePlans, getReadings(meter)).sort((a, b) => extractCost(a) - extractCost(b))
    if("limit" in req.query) {
        return pricePlanComparisons.slice(0, req.query.limit);
    }
    return pricePlanComparisons;
};

const extractCost = (cost) => {
    const [, value] = Object.entries(cost).find( ([key]) => key in pricePlans)
    return value
}

const compare = (getData, req) => {
    const meter = req.params.smartMeterId;
    const pricePlanComparisons = usageForAllPricePlans(pricePlans, getData(meter));
    return {
        smartMeterId: req.params.smartMeterId,
        pricePlanComparisons,
    };
};


// Switching the price plan for a smart-meter ::
const switchPlan = (req) => {
  const { smartMeterId, newPricePlan } = req.body;

  if (!smartMeterId || !newPricePlan) {
    return { error: "smartMeterId and newPricePlan are required" };
  }

  // validating if the new plan exists
  const validPlans = Object.keys(pricePlans);
  if (!validPlans.includes(newPricePlan)) {
    return { error: "Invalid price plan" };
  }

  currentPricePlanPerMeter[smartMeterId] = newPricePlan;

  return {
    message: `Price plan for ${smartMeterId} successfully switched to ${newPricePlan}`,
    currentPricePlanPerMeter,
  };
};


module.exports = { recommend, compare, switchPlan };
