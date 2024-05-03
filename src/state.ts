import { createStore } from "solid-js/store";
import { loadAdjacency, loadFileTree } from "./lib/api";
import { GraphSeriesOption } from "echarts";

export type File = {
  id: string
  name: string
  category?: string
  children?: File[]
  importance?: number
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
}>({
  files: [],
  links: [],
  searchText: "",
  selectedId: null,
  type: "echarts",
  data: null,
  percentiles: [],
  adjacencyData: null,
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
  const adjacency = Object.fromEntries(adjacencyJson.map((row: any) => {
    const rowId = row[""]
    const rowData = Object.fromEntries(
      Object.entries(row)
      .filter(([key,]) => key !== "")
      .map(([key, value]) => [key, parseInt(value as string, 10)])
      // .filter(([,value]) => (value as number) > 5)
    )
    return [rowId, rowData]
  }))

  const files: File[] = [];
  const links: GraphSeriesOption["links"] = []

  const visitFiles = (node: File) => {
    if (node.children) {
      node.children.forEach(visitFiles)

      node.children.forEach((child: File) => {
        links.push({
          source: node.name,
          target: child.name,
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
      node.importance = adjacency[node.name] 
        ? (Object.values(adjacency[node.name]) as number[])
          .reduce((acc: number, curr: number) => acc + curr, 0) 
        : 0

      node.category = getFileCategory(node)
    }
    node.id = node.name

    files.push(node)
  }

  visitFiles(data)

  files.sort((a, b) => (b.importance ?? 0) - (a.importance ?? 0))

  const percentiles = []
  for (let i = 0; i < 10; i++) {
    percentiles.push(files[Math.floor(i * files.length / 10)].importance ?? 0)
  }

  Object.entries(adjacency).forEach(([sourceId, outLinks]) => {
    Object.entries(outLinks).filter(([, value]) => value as number > 1).forEach(([targetId, value]) => {
      links.push({
        source: sourceId,
        target: targetId,
        value: value as number,
        ignoreForceLayout: true,
        lineStyle: {
          color: "#82a6e0",
          opacity: 0.1,
          curveness: 0.3,
          width: value as number
        }
      })
    })
  })  
  console.log(percentiles)


  setState("files", files);
  setState("percentiles", percentiles);
  setState("links", links);
  setState("data", data)
  setState("adjacencyData", adjacency)
})

