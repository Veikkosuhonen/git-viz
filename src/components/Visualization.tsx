import { clientOnly } from '@solidjs/start';
import { Component, Match, Show, Switch, createEffect, createResource, createSignal, onCleanup, onMount } from 'solid-js';
import TidyTree from './TidyTree';
import {  createAsync } from '@solidjs/router';
import { loadAdjacency, loadFileTree } from '~/lib/api';

const FDG = clientOnly(() => import('./FDG'));
const Pack = clientOnly(() => import('./Pack'));
const Echarts = clientOnly(() => import('./Echarts'));

export const Visualization = () => {
  const data = createAsync(() => loadFileTree())
  const adjacencyData = createAsync(() => loadAdjacency()
    .then((json) => Object.fromEntries(json.map((row: any) => {
      const rowId = row[""]
      const rowData = Object.fromEntries(
        Object.entries(row)
        .filter(([key,]) => key !== "")
        .map(([key, value]) => [key, parseInt(value as string, 10)])
        .filter(([,value]) => (value as number) > 5)
      )
      return [rowId, rowData]
    })))
  )

  createEffect(() => {
    console.log(adjacencyData())
  })
  const [type, setType] = createSignal('echarts')

  return (
    <>
      <h1>Visualization</h1>
      <select value={type()} onChange={(e) => setType(e.currentTarget.value)}>
        <option value="pack">Pack</option>
        <option value="fdg">Force-Directed Graph</option>
        <option value="tidy-tree">Tidy Tree</option>
        <option value="echarts">ECharts</option>
      </select>
      <section class="flex-grow">
        <Show when={data() && adjacencyData()}>
          <Switch>
            <Match when={type() === 'fdg'}>
              <FDG data={data()} adjacencyData={adjacencyData()} />
            </Match>
            <Match when={type() === 'pack'}>
              <Pack data={data()} />
            </Match>
            <Match when={type() === 'tidy-tree'}>
              <TidyTree data={data()} />
            </Match>
            <Match when={type() === 'echarts'}>
              <Echarts data={data()} />
            </Match>
          </Switch>
        </Show>
      </section>
    </>
  )
}