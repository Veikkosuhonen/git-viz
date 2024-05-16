import { clientOnly } from '@solidjs/start';
import { Match, Show, Switch } from 'solid-js';
import { selectFile, setState, state } from '~/state';

const Graph = clientOnly(() => import('./Echarts'));
const Scatter = clientOnly(() => import('./Scatter'));

export const Visualization = () => {
  return (
    <>
      <div class="flex gap-2 absolute z-10 pl-2 pt-2">
        <button onClick={() => setState("type", "scatter")} class="p-1 rounded text-lg border border-slate-300 bg-slate-50 transition-all hover:text-amber-600" classList={{ "text-amber-600 border-amber-600 shadow-md": state.type === "scatter" }}>Scatterplot</button>
        <button onClick={() => setState("type", "graph")}   class="p-1 rounded text-lg border border-slate-300 bg-slate-50 transition-all hover:text-amber-600" classList={{ "text-amber-600 border-amber-600 shadow-md": state.type === "graph" }}>Relation Graph</button>
        <Show when={state.highlightedDirId}>
          <div class="flex gap-2 ml-4 py-2 px-3 rounded-full border text-amber-600 border-amber-600 bg-slate-50 text-xs">
            <p>
              Looking at directory: <span class="text-sm text-slate-800">{state.highlightedDirId}</span>
            </p>
            <button onClick={() => setState("highlightedDirId", null)} class="bg-slate-200 rounded-full px-1 ml-1 text-slate-500">
              x
            </button>
          </div>          
        </Show>
        <Show when={state.selectedId}>
          <div class="flex gap-2 py-2 px-3 rounded-full border text-amber-600 border-amber-600 bg-slate-50 text-xs">
            <p>
              Looking at file: <span class="text-sm text-slate-800">{state.selectedId}</span>
              <Show when={!state.selectedId?.startsWith(state.highlightedDirId ?? '')}>
                <span class="text-xs ml-2 text-amber-700">
                  (outside selection)
                </span>
              </Show>
            </p>
            <button onClick={() => selectFile(null)} class="bg-slate-200 rounded-full px-1 ml-1 text-slate-500">
              x
            </button>
          </div>          
        </Show>
      </div>
      <section class="flex-grow">
        <Show when={state.data && state.adjacencyData}>
          <Switch>
            <Match when={state.type === 'graph'}>
              <Graph />
            </Match>
            <Match when={state.type === 'scatter'}>
              <Scatter />
            </Match>
          </Switch>
        </Show>
      </section>
    </>
  )
}