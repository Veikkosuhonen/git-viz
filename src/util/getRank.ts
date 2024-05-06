import { state } from "~/state"

const ranks = [
  ["S", "bg-fuchsia-600"],
  ["A", "bg-rose-400"],
  ["B", "bg-orange-500"],
  ["C", "bg-amber-500"],
  ["D", "bg-yellow-500"],
  ["E", "bg-green-400"],
  ["F", "bg-emerald-400"],
  ["G", "bg-cyan-400"],
]

export const getRank = (value: number, percentiles: number[]) => {
  let result = ranks[ranks.length - 1]
  for (let i = percentiles.length; i >= 0; i--) {
    if (value <= percentiles[i]) {
      result = ranks[Math.min(ranks.length - 1, i)]
      break
    }
  }
  // console.log(value, percentiles, result)
  return result
}

export const getPercentageRank = (value: number) => {
  // convert 0-1 to ranks.length-0
  const index = Math.floor((1 - value) * (ranks.length - 1))
  return ranks[index]
}