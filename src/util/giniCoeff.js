import * as gini from 'gini'

export function computeGiniCoefficient(data) {
  try {
    return gini.unordered(data)
  } catch (e) {
    console.error('Error computing Gini coefficient:', e)
    return 0
  }
}

console.log(computeGiniCoefficient([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])) // 0.26666666666666666
console.log(computeGiniCoefficient([1, 1, 1, 1, 1, 1, 1, 1, 1, 1])) // 0
console.log(computeGiniCoefficient([1, 0, 0, 0])) // 0
