import { For, Show, createMemo } from "solid-js"
import { state } from "~/state"
import Rank from "./Rank"
import { getPercentageRank } from "~/util/getRank"

const Details = () => {
  const selected = createMemo(() => {
    return state.files.find(f => f.id === state.selectedId)
  })

  const relatedFiles = createMemo(() => {
    return Object.entries(state.adjacency[state.selectedId ?? ""] ?? {}).toSorted((a, b) => b[1] - a[1])
  })

  const maxWeight = createMemo(() => {
    return relatedFiles()[0]?.[1] ?? 1
  })

  return (
    <>
      <div class="overflow-y-scroll overflow-x-hidden max-h-[50rem]">
        <Show when={selected()}>
          <div class="border-b border-slate-300 p-2 bg-slate-100">
            <h2 class="text-sm mb-1">{selected()?.name}</h2>
            <p>Importance: <Rank importance={selected()?.importance} /></p>
            <p>Related:</p>
          </div>
          <div class="overflow-y-scroll overflow-x-hidden max-h-[45rem] p-2">
            <For each={relatedFiles()}>
              {([id, weight]) => (
                <p class="text-xs flex flex-nowrap mb-1">
                  <span class={`mr-1 ${getPercentageRank(weight / maxWeight())[1]} text-slate-100 px-1 font-mono rounded`}>{(weight/maxWeight() * 100).toFixed()}</span>
                  {id}
                </p>
              )}
            </For>
          </div>
        </Show>
      </div>
    </>
  )
}

export default Details