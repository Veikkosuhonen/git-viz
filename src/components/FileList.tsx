import { Component, For, createSignal } from "solid-js";
import { File, selectFile, setState, state } from "~/state";

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

const getRank = (value: number) => {
  const percentiles = state.percentiles
  for (let i = percentiles.length; i >= 0; i--) {
    if (value <= percentiles[i]) {
      return ranks[Math.min(ranks.length - 1, i)]
    }
  }
  return ranks[ranks.length - 1]
}

const FileList: Component = () => {
  const filteredFiles = () => {
    return state.files?.filter(f => f.name.includes(state.searchText)).toSorted((a, b) => 
      (b.importance ?? 0) - (a.importance ?? 0))
  }

  return (
    <>
      <div class="p-2 flex items-center gap-2 border-b border-slate-300 bg-slate-100">
        <h2 class="text-xl">File list</h2>
        <input type="text" 
          value={state.searchText}
          onInput={(e) => setState("searchText", e.currentTarget.value)}
          class="ml-auto p-1 border border-slate-300 bg-slate-200 rounded-md placeholder:text-slate-400" placeholder="Filter files" />
      </div>
      <div class="overflow-y-scroll overflow-x-hidden max-h-[50rem] p-2 flex flex-col items-stretch">
        <For each={filteredFiles()}>
          {file => (
            <button 
              onClick={() => selectFile(file.id)}
              class="block text-left text-sm text-slate-600 text-nowrap rounded-md hover:bg-amber-300 active:bg-amber-400 transition-all duration-75"
              classList={{
                "bg-amber-300 outline outline-slate-400": file.id === state.selectedId,
                "opacity-30": file.blur,
              }}
            >
              <span class={`text-slate-50 px-1 mx-1 ${getRank(file.importance ?? 0)[1]}`}>
                {getRank(file.importance ?? 0)[0]}
              </span>
              {file.name.split("/").slice(0, -1).join(' / ').concat(' / ')}
              <span class="text-base text-slate-800 font-medium">
                {file.name.split("/").splice(-1)}
              </span>
            </button>
          )}
        </For>
      </div>
    </>
  )
}

export default FileList
