import { For, Show, createEffect, createMemo, createSignal } from "solid-js"
import { state } from "~/state"
import Rank from "./Rank"
import { getPercentageRank, getRank } from "~/util/getRank"
import { EChartsAutoSize } from "echarts-solid"
import Team from "./Team"
import Dismiss from "solid-dismiss"
import InfoButton from "./InfoButton"

const Details = () => {
  const [showTeam, setShowTeam] = createSignal(false)

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
    return contributors
      .filter(([name,]) => state.teamMembers.some(t => t.enabled && t.name === name))
      .toSorted((a, b) => b[1] - a[1])
      .slice(0, 6)
  })

  let btnElement: HTMLButtonElement | undefined = undefined

  return (
    <>
      <div>
        <Show when={selected()}>
          <div class="flex flex-col items-stretch border-b border-slate-300 p-2 bg-slate-100">
            <h2 class="text-sm mb-1 font-bold">{selected()?.name}</h2>
            <p class="text-sm mb-1">Importance: <Rank importance={selected()?.importance} /></p>
            <div class="flex relative">
              <p class="text-sm">Contributors</p>
              <button
                ref={btnElement}
                class="text-xs ml-8 text-slate-800 px-2 py-1 rounded-md shadow shadow-slate-700/50 bg-slate-50 transition-all duration-150"
                classList={{
                  "bg-amber-200": showTeam(),
                }}
              >
                Filter team members
              </button>
              <Dismiss menuButton={btnElement} open={showTeam} setOpen={setShowTeam} class="absolute mt-6 z-10 bg-slate-200/60 backdrop-blur-md rounded shadow-lg shadow-slate-800/50">
                <Team />
              </Dismiss>
            </div>
            
            <div class="h-[20rem]">
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
            <p class="text-sm mb-1">Ownership distribution: 
              <span class={`font-mono text-white px-1 rounded ${getRank((selected()?.gini ?? 0), state.giniPercentiles)[1]} transition-colors duration-500`}>
                {selected()?.gini?.toFixed(2)}
              </span>
              <InfoButton text="Ownership distribution is measured by the Gini-coefficient of the contributors. 0.0 means perfectly distributed ownership (good), while 1.0 means perfectly inequal ownership (bad)" />
            </p>
            <p class="text-sm">Related files:
              <InfoButton text="Relative value between 0 and 100 describing how often a file appears in a commit with this file, compared to all other files" />
            </p>
          </div>
          <div class="overflow-y-scroll overflow-x-hidden max-h-[25rem] p-2">
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