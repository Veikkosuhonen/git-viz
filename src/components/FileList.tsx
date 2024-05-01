import { Component, For, createSignal } from "solid-js";
import { File, setState, state } from "~/state";

const FileList: Component = () => {
  const filteredFiles = () => {
    return state.files?.filter(f => f.name.includes(state.searchText))
  }

  const setSelected = (file: File) => {
    setState("selectedId", state.selectedId === file.id ? null : file.id)
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
              onClick={() => setSelected(file)}
              class="block text-left text-sm text-slate-600 text-nowrap rounded-md hover:bg-amber-300 active:bg-amber-400 transition-all duration-75"
              classList={{
                "bg-amber-300 outline outline-slate-400": file.id === state.selectedId,
              }}
            >
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
