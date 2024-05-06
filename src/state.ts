import { createStore, produce } from "solid-js/store";
import { loadAdjacency, loadChanges, loadFileTree } from "./lib/api";
import { EChartsType, GraphSeriesOption } from "echarts";
import { batch, createEffect, createMemo } from "solid-js";
import { memo } from "solid-js/web";

const LINK_DEFAULT_OPACITY = 0.05
const LINK_HIGHLIGHT_OPACITY = 0.5
const LINK_BLUR_OPACITY = 0.01

type TeamMember = {
  name: string,
  enabled: boolean,
}

type Contributors = {
  [id: string]: number
}

export type File = {
  id: string
  name: string
  category?: string
  children?: File[]
  importance?: number
  blur?: boolean
  contributors?: Contributors
}

type Adjacency = {
  [sourceId: string]: {
    [targetId: string]: number
  }
}

export const [state, setState] = createStore<{
  files: File[],
  links: GraphSeriesOption["links"],
  searchText: string,
  selectedId: string | null,
  type: string,
  data: any,
  percentiles: number[],
  adjacencyData: any
  adjacency: Adjacency
  adjacencyThreshold: number
  maxImportance: number
  chart: EChartsType|null
  teamMembers: TeamMember[]
}>({
  files: [],
  links: [],
  searchText: "",
  selectedId: null,
  type: "echarts",
  data: null,
  percentiles: [],
  adjacencyData: null,
  adjacency: {},
  adjacencyThreshold: 1,
  maxImportance: 0,
  chart: null,
  teamMembers: []
});

const getFileCategory = (file: File) => {
  const extension = file.name.split('.').pop()
  if (extension && /[tj]sx?$/.test(extension)) {
    return "code"
  } else {
    return "file"
  }
}

Promise.all([
  loadFileTree(),
  loadAdjacency(),
  loadChanges()
]).then(([fileJson, adjacencyJson, changes]) => {
  const adjacencyData = Object.fromEntries(adjacencyJson.map((row: any) => {
    const rowId = row[""]
    const rowData = Object.fromEntries(
      Object.entries(row)
      .filter(([key,]) => key !== "")
      .map(([key, value]) => [key, parseInt(value as string, 10)])
      .filter(([key, value]) => value as number > 0)
    )
    return [rowId, rowData]
  }))

  const adjacency = {} as Adjacency
  updateAdjacency(adjacency, adjacencyData, state.adjacencyThreshold)

  let maxImportance = 0
  const files: File[] = [];
  const links: GraphSeriesOption["links"] = []

  const visitFiles = (node: File) => {
    node.id = node.name

    if (node.children) {
      node.children.forEach(visitFiles)

      node.children.forEach((child: File) => {
        links.push({
          source: node.id,
          target: child.id,
          value: 1,
          emphasis: {
            disabled: true,
          },
        })
      })

      node.category = "directory"
  
    } else {
      node.importance = adjacencyData[node.id] 
        ? (Object.values(adjacencyData[node.id]) as number[])
          .reduce((acc: number, curr: number) => acc + curr, 0) 
        : 0

      if (node.importance > maxImportance) {
        maxImportance = node.importance
      }

      node.category = getFileCategory(node)
    }

    files.push(node)
  }

  visitFiles(fileJson)

  files.sort((a, b) => (b.importance ?? 0) - (a.importance ?? 0))

  const percentiles = []
  for (let i = 0; i < 10; i++) {
    percentiles.push(files[Math.floor(i * files.length / 10)].importance ?? 0)
  }

  // contributors
  const fileContributorsMap = {} as { [file: string]: Contributors }
  const teamMembers = {} as { [name: string]: TeamMember }
  for (const change of changes) {
    const file = change.file
    const contributor = change.author
    teamMembers[contributor] = teamMembers[contributor] ?? { name: contributor, enabled: true }
    fileContributorsMap[file] = fileContributorsMap[file] ?? {}
    fileContributorsMap[file][contributor] = fileContributorsMap[file][contributor] ?? 0
    fileContributorsMap[file][contributor] += 1 // parseInt(change.insertions, 10) + parseInt(change.deletions, 10)
  }

  files.forEach(file => {
    file.contributors = fileContributorsMap[file.id] ?? {}
  })

  const N_LINKS = 1000
  const visited = new Set<string>()
  let allLinks = []
  for (const [sourceId, outLinks] of Object.entries(adjacencyData)) {
    for (const [targetId, value] of Object.entries(outLinks)) {
      if (visited.has(`${targetId}-${sourceId}`)) {
        continue
      }
      allLinks.push([sourceId, targetId, value as number])
      visited.add(`${sourceId}-${targetId}`)
    }
  }
  allLinks.sort((a, b) => b[2] as number - (a[2] as number))
  const dedupedLinks = allLinks.slice(0, N_LINKS)

  const adjacencyThreshold = dedupedLinks[N_LINKS - 1][2] as number

  for (const l of dedupedLinks) {
    links.push({
      source: l[0],
      target: l[1],
      ignoreForceLayout: true,
      lineStyle: {
        width: l[2] as number,
      },
      emphasis: {
        disabled: true,
      },
    })
  }

  setState("files", files);
  setState("maxImportance", maxImportance);
  setState("percentiles", percentiles);
  setState("links", links);
  setState("data", fileJson)
  setState("adjacencyData", adjacencyData)
  setState("adjacency", adjacency)
  setState("adjacencyThreshold", adjacencyThreshold)
})

const updateAdjacency = (current: Adjacency, adjacencyData: any, threshold: number) => {
  Object.entries(adjacencyData).forEach(([sourceId, outLinks]) => {
    Object.entries(outLinks as any).forEach(([targetId, value]) => {
      if (value as number >= threshold) {
        current[sourceId] = current[sourceId] ?? {}
        current[sourceId][targetId] = value as number
      }
    })
  })
}

export const selectFile = (fileId: string) => {
  setState("selectedId", fileId)
  const highlighted = Object.entries(state.adjacency[fileId] ?? {}).filter(([_, value]) => value >= state.adjacencyThreshold).map(([id, _]) => id)
  const blurred = state.files.map(f => f.id).filter(id => !highlighted.includes(id))
  // state.chart?.dispatchAction({
  //   type: "unselect",
  //   seriesIndex: 0,
  //   name: blurred,
  // })
  // state.chart?.dispatchAction({
  //   type: "downplay",
  //   seriesIndex: 0,
  //   name: blurred,
  // })
  state.chart?.dispatchAction({
    type: "select",
    seriesIndex: 0,
    name: fileId,
  })
  state.chart?.dispatchAction({
    type: "highlight",
    seriesIndex: 0,
    name: fileId,
  })
}

export const setAdjacencyThreshold = (threshold: number) => {
  batch(() => {
    setState("adjacencyThreshold", threshold)
    setState("adjacency", produce((adj) => {
      updateAdjacency(adj, state.adjacencyData, threshold)
    }))
    if (state.selectedId) {
      selectFile(state.selectedId)
    }
  })
}
