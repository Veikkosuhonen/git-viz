import { GraphSeriesOption } from "echarts";
import { EChartsAutoSize } from "echarts-solid"
import { Component, onCleanup } from "solid-js";
import { produce } from "solid-js/store";
import { state, setState, selectFile } from "~/state";

const Echarts: Component = () => {

  console.log(state.maxImportance)

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

  onCleanup(() => {
    setState("charts", produce(charts => {
      delete charts.graph
    }))
  })
  
  return (
    <EChartsAutoSize
      onInit={(chart) => setState("charts", "graph", chart)}
      initOptions={{
        renderer: "canvas"
      }}
      option={{
        
        title: {
          
        },
        tooltip: {},
        legend: [
          {
            data: ['directory', 'file', 'code'],
          }
        ],
        series: [
          {
            type: 'graph',
            layout: 'force',
            animation: true,
            
            roam: true,
            scaleLimit: {
              min: 0.001,
              max: 0.02,
            },
            zoom: 0.002,
            categories: [
              {
                name: 'directory',
                itemStyle: {
                  color: "#fff",
                  borderColor: "#000",
                }
              },
              {
                name: 'file',
                itemStyle: {
                  color: "#c48fdb",
                  borderColor: "#fff",
                }
              },
              {
                name: 'code',
                itemStyle: {
                  color: "#fc9003",
                  borderColor: "#fff",
                }
              },
            ],
            labelLayout: {
              hideOverlap: true,
            },
            label: {
              // show: true,
              position: 'right',
              formatter: "{b}"
            },
            data: nodes(),
            links: links(),
            lineStyle: {
              color: "#2e448f",
              opacity: 0.1,
              curveness: 0.3,
            },
            selectedMode: 'single',
            select: {
              label: {
                show: true,
              },
              itemStyle: {
                borderColor: "#000",
                borderWidth: 3,
              },
            },
            blur: {
              itemStyle: {
                opacity: 0.2,
              },
              lineStyle: {
                opacity: 0,
              },
            },
            emphasis: {
              focus: 'adjacency',
              label: {
                show: true,
              },
            },
            force: {
              initLayout: 'circular',
              repulsion: 50,
              // edgeLength: 1,
              gravity: 0.15,
              friction: 0.7,
              layoutAnimation: true,
            }
          }
        ]
      }}
      eventHandlers={{ click: onClick, globalout: () => selectFile(state.selectedId ?? '') }}
      lazyUpdate={true}
    />
  )
}

export default Echarts