// get yield for plant
const getYieldForPlant = (input, environmentFactors) => {
  if (!environmentFactors) {
    return input.yield;
  }
  if (environmentFactors) {
    let Percentage = 100;
    if (input.factor.sun) {
      Percentage += input.factor.sun[environmentFactors.sun];
    }
    if (input.factor.wind) {
      Percentage += input.factor.wind[environmentFactors.wind];
    }
    if (input.factor.temperature) {
      Percentage += input.factor.temperature[environmentFactors.temperature];
    }
    return (input.yield / 100) * Percentage;
  }
};

// get yield for crop
const getYieldForCrop = (input, environmentFactors) => {
  return getYieldForPlant(input.crop, environmentFactors) * input.numCrops;
};

// get total yield
const getTotalYield = (input, environmentFactors) => {
  let totalYield = 0;
  input.crops.forEach((crop) => {
    totalYield += getYieldForCrop(crop, environmentFactors);
  });
  return totalYield;
};

// get costs for crop
const getCostsForCrop = (input) => {
  return input.numCrops * input.crop.cost;
};

// get revenue for crop
const getRevenueForCrop = (input, environmentFactors) => {
  return getYieldForCrop(input, environmentFactors) * input.crop.price;
};

// get profit for crop
const getProfitForCrop = (input, environmentFactors) => {
  return getRevenueForCrop(input, environmentFactors) - getCostsForCrop(input);
};

// get total profit
const getTotalProfit = (input, environmentFactors) => {
  let totalProfit = 0;
  input.crops.forEach((crop) => {
    totalProfit += getProfitForCrop(crop, environmentFactors);
  });
  return totalProfit;
};

// export functions
module.exports = {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
};
