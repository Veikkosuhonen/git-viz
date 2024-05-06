import { GraphSeriesOption } from "echarts";
import { EChartsAutoSize } from "echarts-solid"
import { Component } from "solid-js";
import { state, setState, selectFile } from "~/state";

const Scatter: Component = () => {

  const nodes: () => GraphSeriesOption["data"] = () => state.files.map((file) => {
    return {
      id: file.id,
      name: file.name,
      value: file.importance,
      x: 0,
      y: 0,
      symbolSize: (file.importance ?? 8) / state.maxImportance * 100,
      category: file.category,
    }
  })

  const links: () => GraphSeriesOption["links"] = () => state.links

  const onClick = (params: any) => {
    if (params.dataType === 'node') {
      const nodeId = params.data.id as string
      console.log(nodeId, state.selectedId)
      selectFile(nodeId !== state.selectedId ? nodeId : null)
    } else {
      selectFile(null)
    }
  }
  
  return (
    <EChartsAutoSize
      onInit={(chart) => setState("chart", chart)}
      initOptions={{
        renderer: "canvas"
      }}
      option={{
        
        
      }}
      eventHandlers={{ click: onClick, globalout: () => selectFile(state.selectedId ?? '') }}
      lazyUpdate={true}
    />
  )
}

export default Scatter