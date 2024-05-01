import { createStore } from "solid-js/store";
import { loadAdjacency, loadFileTree } from "./lib/api";

export type File = {
  id: string
  name: string
  category?: string
  children?: File[]
  importance?: number
}

export type Link = {
  source: string
  target: string
  value: number
}

export const [state, setState] = createStore<{
  files: File[],
  links: Link[],
  searchText: string,
  selectedId: string | null,
  type: string,
  data: any,
  adjacencyData: any
}>({
  files: [],
  links: [],
  searchText: "",
  selectedId: null,
  type: "echarts",
  data: null,
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
  const links: Link[] = []

  const visitFiles = (node: File) => {
    if (node.children) {
      node.children.forEach(visitFiles)

      node.children.forEach((child: File) => {
        links.push({
          source: node.name,
          target: child.name,
          value: 1
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


  setState("files", files);
  setState("links", links);
  setState("data", data)
  setState("adjacencyData", adjacency)
})

