const {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
} = require("./farm");

// get yield for plant
describe("getYieldForPlant", () => {
  const corn = {
    name: "corn",
    yield: 30,
    factor: {
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },
      wind: {
        low: 0,
        medium: -30,
        high: -60,
      },
    },
  };

  const environmentFactors = {
    sun: "high",
    wind: "medium",
    temperature: "high",
  };

  // get yield for plant with no environment factors
  test("Get yield for plant with no environment factors", () => {
    expect(getYieldForPlant(corn)).toBe(30);
  });

  // get yield for plant with environment factors
  test("Get yield for plant with environment factors", () => {
    expect(getYieldForPlant(corn, environmentFactors)).toBe(36);
  });
});

// get yield for crop
describe("getYieldForCrop", () => {
  // get yield for crop, simple
  test("Get yield for crop, simple", () => {
    const corn = {
      name: "corn",
      yield: 1,
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    expect(getYieldForCrop(input)).toBe(10);
  });

  // get yield for crop, with environment factors
  test("Get yield for crop, with environment factors", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
      },
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    const environmentFactors = {
      sun: "high",
      wind: "medium",
      temperature: "high",
    };
    expect(getYieldForCrop(input, environmentFactors)).toBe(36);
  });
});

// get total yield
describe("getTotalYield", () => {
  // calculate total yield with multiple crops, simple
  test("Calculate total yield with multiple crops, simple", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
    };
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    expect(getTotalYield({ crops })).toBe(23);
  });

  // calculate total yield with 0 amount
  test("Calculate total yield with 0 amount", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const crops = [{ crop: corn, numCrops: 0 }];
    expect(getTotalYield({ crops })).toBe(0);
  });

  // calculate total yield with multiple crops, with environment factors
  test("Calculate total yield with multiple crops, with environment factors", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
      },
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        temperature: {
          low: 20,
          medium: 0,
          high: -40,
        },
      },
    };
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    const environmentFactors = {
      sun: "medium",
      wind: "medium",
      temperature: "low",
    };
    expect(getTotalYield({ crops }, environmentFactors)).toBe(20.1);
  });
});

// get costs for crop
describe("getCostsForCrop", () => {
  // get costs for crop
  test("Get costs for crop", () => {
    const corn = {
      name: "corn",
      cost: 1,
    };
    const input = {
      crop: corn,
      numCrops: 230,
    };
    expect(getCostsForCrop(input)).toBe(230);
  });
});

// get revenue for crop
describe("getRevenueForCrop", () => {
  // get revenue for crop, simple
  test("Get revenue for crop, simple", () => {
    const corn = {
      name: "corn",
      yield: 10,
      price: 4,
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    expect(getRevenueForCrop(input)).toBe(400);
  });

  // get revenue for crop, with environment factors
  test("Get revenue for crop, with environment factors", () => {
    const corn = {
      name: "corn",
      yield: 10,
      price: 4,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
      },
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    const environmentFactors = {
      sun: "high",
      wind: "medium",
      temperature: "high",
    };
    expect(getRevenueForCrop(input, environmentFactors)).toBe(480);
  });
});

// get profit for crop
describe("getProfitForCrop", () => {
  // get profit for crop, simple
  test("Get profit for crop, simple", () => {
    const corn = {
      name: "corn",
      yield: 1,
      cost: 1,
      price: 4,
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    expect(getProfitForCrop(input)).toBe(30);
  });
  test("Get profit for crop, with environment factors", () => {
    const corn = {
      name: "corn",
      yield: 1,
      cost: 1,
      price: 4,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
      },
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    const environmentFactors = {
      sun: "high",
      wind: "medium",
      temperature: "high",
    };
    expect(getProfitForCrop(input, environmentFactors)).toBe(38);
  });
});

// get total profit
describe("getTotalProfit", () => {
  // calculate total profit with multiple crops, simple
  test("Calculate total profit with multiple crops, simple", () => {
    const corn = {
      name: "corn",
      yield: 3,
      cost: 1,
      price: 4,
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 5,
      cost: 1,
      price: 3,
    };
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    expect(getTotalProfit({ crops })).toBe(83);
  });

  // calculate total profit with multiple crops, with environment factors
  test("Calculate total profit with multiple crops, simple", () => {
    const corn = {
      name: "corn",
      yield: 3,
      cost: 1,
      price: 4,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
      },
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 5,
      cost: 1,
      price: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        temperature: {
          low: 20,
          medium: 0,
          high: -40,
        },
      },
    };
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];

    const environmentFactors = {
      sun: "medium",
      wind: "medium",
      temperature: "low",
    };
    expect(getTotalProfit({ crops }, environmentFactors)).toBe(71);
  });
});
