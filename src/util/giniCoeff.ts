export function computeGiniCoefficient(data: number[]) {
  // Sort the data in ascending order
  data.sort((a, b) => a - b);

  // Calculate cumulative relative frequency
  let cumulativeFrequency = 0;
  const cumulativeFrequencies = data.map((value, index) => {
      cumulativeFrequency += value;
      return cumulativeFrequency / (index + 1);
  });

  // Calculate Lorenz curve
  const totalArea = cumulativeFrequencies.reduce((sum, value) => sum + value, 0) / data.length;
  const lorenzCurveArea = cumulativeFrequencies.reduce((sum, value, index) => {
      const x0 = index === 0 ? 0 : cumulativeFrequencies[index - 1];
      const x1 = value;
      const y0 = index === 0 ? 0 : (index - 1) / data.length;
      const y1 = index / data.length;
      const area = (x0 + x1) * (y1 - y0) / 2;
      return sum + area;
  }, 0);

  // Calculate Gini coefficient
  const giniCoefficient = (lorenzCurveArea / totalArea) * 2 - 1;

  return giniCoefficient;
}
