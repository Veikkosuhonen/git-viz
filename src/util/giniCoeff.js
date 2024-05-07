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

export function computeKnowledgeAtRisk(data) {
  const sorted = data.toSorted((a, b) => b - a)
  const sum = data.reduce((v, acc) => v + acc, 0)
  const greatest = sorted[0]
  return greatest / sum
}
