import { createStore, produce } from "solid-js/store";
import { loadAdjacency, loadFileTree } from "./lib/api";
import { GraphSeriesOption } from "echarts";
import { batch, createEffect } from "solid-js";

const LINK_DEFAULT_OPACITY = 0.05
const LINK_HIGHLIGHT_OPACITY = 0.5
const LINK_BLUR_OPACITY = 0.01

export type File = {
  id: string
  name: string
  category?: string
  children?: File[]
  importance?: number
  blur?: boolean
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
  adjacencyThreshold: 3
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
]).then(([data, adjacencyJson]) => {
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
          label: {
            show: false,
          },
          tooltip: {
            show: false,
          },
          emphasis: {
            disabled: true,
          },
          lineStyle: {
            
          },

        })
      })

      node.category = "directory"
  
    } else {
      node.importance = adjacencyData[node.id] 
        ? (Object.values(adjacencyData[node.id]) as number[])
          .reduce((acc: number, curr: number) => acc + curr, 0) 
        : 0

      node.category = getFileCategory(node)
    }

    files.push(node)
  }

  visitFiles(data)

  files.sort((a, b) => (b.importance ?? 0) - (a.importance ?? 0))

  const percentiles = []
  for (let i = 0; i < 10; i++) {
    percentiles.push(files[Math.floor(i * files.length / 10)].importance ?? 0)
  }

  Object.entries(adjacencyData).forEach(([sourceId, outLinks]) => {
    Object.entries(outLinks).forEach(([targetId, value]) => {
      links.push({
        source: sourceId,
        target: targetId,
        value: value as number,
        ignoreForceLayout: true,
        lineStyle: {
          color: "#2e448f",
          opacity: 0.05,
          curveness: 0.3,
          width: value as number,
        }
      })
    })
  })  
  console.log(percentiles)


  setState("files", files);
  setState("percentiles", percentiles);
  setState("links", links);
  setState("data", data)
  setState("adjacencyData", adjacencyData)
  setState("adjacency", adjacency)
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
  batch(() => {
    setState("selectedId", fileId)
    setState("files", {}, produce((f) => {
      f.blur = !Object.entries(state.adjacency[fileId] ?? {}).some(([id, value]) => value >= state.adjacencyThreshold && f.id === id)
        && f.id !== fileId
    }))
    setState("links", {}, produce((l) => {
      const links = state.adjacency[fileId] ?? {}
      const isLinked = ((l.value ?? 0) >= state.adjacencyThreshold) && l.source === fileId
      l.lineStyle!.opacity = isLinked ? LINK_HIGHLIGHT_OPACITY : LINK_BLUR_OPACITY
    }))
    console.log(state.adjacency)
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