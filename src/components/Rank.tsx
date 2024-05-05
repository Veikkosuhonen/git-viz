import { Component } from "solid-js"
import { getRank } from "~/util/getRank"

const Rank: Component<{
  importance?: number
}> = (props) => {

  return (
    <span class={`text-slate-50 px-1 mx-1 ${getRank(props.importance ?? 0)[1]}`}>
      {getRank(props.importance ?? 0)[0]}
    </span>
  )
}

export default Rank