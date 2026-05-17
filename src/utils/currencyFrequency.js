/** @format */

export function currencyDistribution(data) {
  const currencyFrequency = {};

  for (let key of data) {
    if (currencyFrequency[key.currency]) {
      currencyFrequency[key.currency] += 1;
    } else {
      currencyFrequency[key.currency] = 1;
    }
  }

  return currencyFrequency;
}
