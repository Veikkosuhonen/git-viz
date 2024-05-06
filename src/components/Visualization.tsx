import { clientOnly } from '@solidjs/start';
import { Match, Show, Switch } from 'solid-js';
import { setState, state } from '~/state';

const Graph = clientOnly(() => import('./Echarts'));
const Scatter = clientOnly(() => import('./Scatter'));

export const Visualization = () => {
  return (
    <>
      <h1>Visualization</h1>
      <select value={state.type} onChange={(e) => setState("type", e.target.value)}>
        <option selected value="scatter">Scatter</option>
        <option value="graph">Graph</option>
      </select>
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