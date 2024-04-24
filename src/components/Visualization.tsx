import { clientOnly } from '@solidjs/start';
import {parse} from 'csv-parse/browser/esm/sync';
import { Component, Match, Show, Switch, createEffect, createResource, createSignal, onCleanup, onMount } from 'solid-js';
import TidyTree from './TidyTree';
const FDG = clientOnly(() => import('./FDG'));
const Pack = clientOnly(() => import('./Pack'));

const PUBLIC_URL = `https://${import.meta.env.VERCEL_URL}` ?? "http://localhost:3000"

console.log(import.meta.env)

export const Visualization = () => {
  const [data] = createResource(() => fetch(`${PUBLIC_URL}/gptwrapper_file_tree.json`)
    .then((res) => res.json()))
  const [adjacencyData] = createResource(() => fetch(`${PUBLIC_URL}/gptwrapper_adjacency.csv`)
    .then(res => res.text())
    .then((res) => parse(res, { 
      columns: true,
      skip_empty_lines: true
    }))
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
  const [type, setType] = createSignal('fdg')

  return (
    <>
      <h1>Visualization</h1>
      <div>
        <select value={type()} onChange={(e) => setType(e.currentTarget.value)}>
          <option value="pack">Pack</option>
          <option value="fdg">Force-Directed Graph</option>
          <option value="tidy-tree">Tidy Tree</option>
        </select>
        <section style={{
          "margin-top": "2rem",
          "border-radius": "3rem",
          "box-shadow": "0 5px 1rem 0 rgba(0, 0, 1, 0.3)",
          "border": "1px solid rgba(0, 0, 0, 0.3)",
          "overflow": "hidden",
        }}>
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
            </Switch>
          </Show>
        </section>
      </div>
    </>
  )
}