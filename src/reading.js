export const getReadings = async (length = 1200) => {
  const current = Date.now();
  const hour = 1000 * 60 * 60;
  return [...new Array(length)].map((_, index) => ({
    time: current - index * hour,
    value: Math.random() * 0.7 + 0.4,
  }));
};

export const formatPart = (value) => {
  return value < 10 ? `0${value}` : `${value}`;
};

export const groupByDay = (readings) => {
  const groupedByDay = readings.reduce((curr, { time, value }) => {
    const readingDate = new Date(time);
    const day = new Date(
      readingDate.getFullYear(),
      readingDate.getMonth(),
      readingDate.getDate()
    ).getTime();
    if (!curr[day]) curr[day] = 0;
    curr[day] += value;
    return curr;
  }, {});

  return Object.entries(groupedByDay).map(([day, value]) => ({
    time: Number(day),
    value,
  }));
};



export const sortByTime = (readings) => {
  return [...readings].sort(
    (readingA, readingB) => readingA.time - readingB.time
  );
};

// 消耗总和
export const getAllKwhByTime = (readings) => {
 if(!Array.isArray(readings)) {
   throw new TypeError('readings is not a Array')
 }
  return Math.round(readings.reduce((prev, next) => prev + next.value, 0));
}
// 消耗的电量带来的成本
export const getCostByTime = (readings) => {
  if (!Array.isArray(readings)) {
    throw new TypeError('readings is not a Array')
  }
  const totalAmount = getAllKwhByTime(readings);
  return Math.round(totalAmount * 0.138);
}

// 电量换算

export const filterCost = (readings) => {
  const totalAmount = getAllKwhByTime(readings);
  return (totalAmount * 0.0002532).toFixed(4);
}

// 计算显示数据
export const compute = (readings) => {
  // 获取具体元素
  const costNumItem = document.getElementById(
    'cost-num'
  );
  const consumptionNumItem = document.getElementById(
    'consumption-num'
  );
  const tonnesNumItem = document.getElementById('tonnes-num');
  costNumItem.textContent = getCostByTime(readings);
  consumptionNumItem.textContent = getAllKwhByTime(readings);
  tonnesNumItem.textContent = filterCost(readings);
}


