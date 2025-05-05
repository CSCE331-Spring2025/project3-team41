export function calculateAdjustedPrice(basePrice: number, temp: number | null | undefined): number {
    if (!temp) return basePrice;
    const upperBound = 77;
    if (temp > upperBound) {
      // When above upperbound, increase the price by 10% for each degree above
      return basePrice * (1 + (temp - upperBound) * 0.1);
    }
    const lowerBound = 65;
    if (temp < lowerBound) {
      // When below lowerbound, decrease the price by 1% for each degree below
      return basePrice * (1 - (lowerBound - temp) * 0.01);
    }
    return basePrice;
  }