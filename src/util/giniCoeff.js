import * as gini from 'gini'

export function computeGiniCoefficient(data) {
  if (data.length === 0) return 0
  if (data.length === 1) return 1
  try {
    return gini.unordered(data)
  } catch (e) {
    return 0
  }
}
