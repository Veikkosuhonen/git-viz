import { GraphSeriesOption, ScatterSeriesOption } from "echarts";
import { EChartsAutoSize } from "echarts-solid"
import { Component, onCleanup } from "solid-js";
import { produce } from "solid-js/store";
import { state, setState, selectFile } from "~/state";

const Scatter: Component = () => {

  const nodes: () => ScatterSeriesOption["data"] = () => {
    const nodes = state.files.map((file) => {
      return {
        id: file.id,
        name: file.name,
        value: [file.importance ?? 1, file.kar],
        symbolSize: Math.sqrt(
          (file.importance ?
          file.importance / state.maxImportance 
          : 0.1
          ) * 1000
        ),
      }
    })
    const highlightedDirId = state.highlightedDirId
    if (highlightedDirId) return nodes.filter(node => node.id.startsWith(highlightedDirId))
    return nodes
  }

  const onClick = (params: any) => {
    const nodeId = params.data.id as string
    console.log(params)
    selectFile(nodeId !== state.selectedId ? nodeId : null)
  }

  onCleanup(() => {
    setState("charts", produce(charts => {
      delete charts.scatter
    }))
  })
  
  return (
    <EChartsAutoSize
      onInit={(chart) => setState("charts", "scatter", chart)}
      initOptions={{
        renderer: "canvas"
      }}
      option={{
        legend: [
          {
            // data: ['directory', 'file', 'code'],
          }
        ],
        xAxis: {
          type: 'value',
          name: 'Importance',
        },
        yAxis: {
          type: 'value',
          name: 'Knowledge at risk',
        },
        tooltip: {
          // trigger: 'axis',
          showDelay: 0,
          formatter: function (params) {
            return params?.name
          },
          axisPointer: {
            show: true,
            type: 'cross',
            lineStyle: {
              type: 'dashed',
              width: 1
            }
          }
        },
        series: [
          {
            type: "scatter",
            data: nodes(),
            selectedMode: 'single',
            itemStyle: {
              borderWidth: 1,
              borderType: "solid",
              borderColor: "#fff",
            },
            select: {
              label: {
                show: true,
              },
              itemStyle: {
                borderColor: "#000",
                borderWidth: 4,
              },
            },
          }
        ]
        
      }}
      eventHandlers={{ click: onClick, globalout: () => selectFile(state.selectedId ?? '') }}
      lazyUpdate={true}
    />
  )
}

export default Scatter