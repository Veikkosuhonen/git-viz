import { clientOnly } from '@solidjs/start';
import { Match, Show, Switch } from 'solid-js';
import { setState, state } from '~/state';

const Graph = clientOnly(() => import('./Echarts'));
const Scatter = clientOnly(() => import('./Scatter'));

export const Visualization = () => {
  return (
    <>
      <div class="flex gap-2 absolute z-10 pl-2 pt-2">
        <button onClick={() => setState("type", "scatter")} class="p-1 rounded text-lg border border-slate-300 bg-slate-50 transition-all hover:text-amber-600" classList={{ "text-amber-600 border-amber-600 shadow-md": state.type === "scatter" }}>Scatterplot</button>
        <button onClick={() => setState("type", "graph")}   class="p-1 rounded text-lg border border-slate-300 bg-slate-50 transition-all hover:text-amber-600" classList={{ "text-amber-600 border-amber-600 shadow-md": state.type === "graph" }}>Relation Graph</button>
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