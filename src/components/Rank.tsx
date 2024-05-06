import { Component } from "solid-js"
import { state } from "~/state"
import { getRank } from "~/util/getRank"

const Rank: Component<{
  importance?: number
}> = (props) => {

  return (
    <span class={`text-slate-50 px-1 mx-1 ${getRank(props.importance ?? 0, state.importancePercentiles)[1]}`}>
      {getRank(props.importance ?? 0, state.importancePercentiles)[0]}
    </span>
  )
}

export default Rank