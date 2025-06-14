const pricePlanNames = {
    PRICEPLAN0: "price-plan-0",
    PRICEPLAN1: "price-plan-1",
    PRICEPLAN2: "price-plan-2",
    PRICEPLAN3: "price-plan-3",
    PRICEPLAN4: "price-plan-4",
};

const supplierNames = {
    DR_EVILS_DARK_ENERGY_ENERGY_SUPPLIER: "Dr Evil's Dark Energy",
    THE_GREEN_ECO_ENERGY_SUPPLIER: "The Green Eco",
    POWER_FOR_EVERYONE_ENERGY_SUPPLIER: "Power for Everyone",
};

const pricePlans = {
    [pricePlanNames.PRICEPLAN0]: {
        supplier: supplierNames.DR_EVILS_DARK_ENERGY_ENERGY_SUPPLIER,
        rate: 10,
    },
    [pricePlanNames.PRICEPLAN1]: {
        supplier: supplierNames.POWER_FOR_EVERYONE_ENERGY_SUPPLIER,
        rate: 2,
    },
    [pricePlanNames.PRICEPLAN2]: {
        supplier: supplierNames.THE_GREEN_ECO_ENERGY_SUPPLIER,
        rate: 1,
    },
    // Adding new price plans ::
    [pricePlanNames.PRICEPLAN3]: {
        supplier: supplierNames.DR_EVILS_DARK_ENERGY_ENERGY_SUPPLIER,
        rate: 5,
    },
    [pricePlanNames.PRICEPLAN4]: {
        supplier: supplierNames.POWER_FOR_EVERYONE_ENERGY_SUPPLIER,
        rate: 3,
    },
};

module.exports = { pricePlans, pricePlanNames };
