import { For, Show, createEffect, createMemo } from "solid-js"
import { state } from "~/state"
import Rank from "./Rank"
import { getPercentageRank } from "~/util/getRank"
import { EChartsAutoSize } from "echarts-solid"

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

  const contributorData = createMemo(() => {
    const contributors = Object.entries(selected()?.contributors ?? {})
    return contributors.toSorted((a, b) => b[1] - a[1]).slice(0, 5)
  })

  return (
    <>
      <div class="overflow-y-scroll overflow-x-hidden max-h-[60rem]">
        <Show when={selected()}>
          <div class="flex flex-col items-stretch border-b border-slate-300 p-2 bg-slate-100">
            <h2 class="text-sm mb-1">{selected()?.name}</h2>
            <p>Importance: <Rank importance={selected()?.importance} /></p>
            <div class="h-64">
              <EChartsAutoSize 
                option={{
                  grid: {
                    containLabel: true,
                  },
                  xAxis: {
                    type: "category",
                    data: contributorData().map(([id,]) => id),
                    axisLabel: {
                      interval: 0,
                      rotate: 25,
                      fontSize: 10,
                    },
                  },
                  yAxis: {
                    type: "value",
                  },
                  series: [{
                    data: contributorData().map(([id, weight]) => weight),
                    type: "bar",
                  }]
                }}
              />
            </div>
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