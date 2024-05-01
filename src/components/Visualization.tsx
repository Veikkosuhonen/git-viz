import { clientOnly } from '@solidjs/start';
import { Match, Show, Switch } from 'solid-js';
import TidyTree from './TidyTree';
import { state, setState } from '~/state';

const FDG = clientOnly(() => import('./FDG'));
const Pack = clientOnly(() => import('./Pack'));
const Echarts = clientOnly(() => import('./Echarts'));

export const Visualization = () => {
  return (
    <>
      <h1>Visualization</h1>
      <select value={state.type} onChange={(e) => setState("type", e.target.value)}>
        <option value="pack">Pack</option>
        <option value="fdg">Force-Directed Graph</option>
        <option value="tidy-tree">Tidy Tree</option>
        <option selected value="echarts">ECharts</option>
      </select>
      <section class="flex-grow">
        <Show when={state.data && state.adjacencyData}>
          <Switch>
            <Match when={state.type === 'fdg'}>
              <FDG />
            </Match>
            <Match when={state.type === 'pack'}>
              <Pack />
            </Match>
            <Match when={state.type === 'tidy-tree'}>
              <TidyTree />
            </Match>
            <Match when={state.type === 'echarts'}>
              <Echarts />
            </Match>
          </Switch>
        </Show>
      </section>
    </>
  )
}