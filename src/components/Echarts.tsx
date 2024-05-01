import { GraphSeriesOption } from "echarts";
import { EChartsAutoSize } from "echarts-solid"
import { Component } from "solid-js";
import { state, setState } from "~/state";

const Echarts: Component = () => {

  const nodes: GraphSeriesOption["data"] = state.files.map((file) => {
    return {
      name: file.name,
      value: file.importance,
      x: 0,
      y: 0,
      symbolSize: 10 * Math.sqrt(file.importance ?? 8),
      category: file.category,
    }
  })

  const links = state.links.map((link) => {
    return {
      source: link.source,
      target: link.target,
    }
  })

  const onClick = (params: any) => {
    if (params.dataType === 'node') {
      setState("selectedId", state.selectedId === params.data.name ? null : params.data.name)
    }
  }
  
  return (
    <EChartsAutoSize
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
            animation: false,
            roam: true,
            scaleLimit: {
              min: 0.001,
              max: 0.02,
            },
            zoom: 0.003,
            categories: [
              {
                name: 'directory',
                itemStyle: {
                  color: "#7cd9a7",
                  borderColor: "#fff",
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
              // hideOverlap: true,
            },
            label: {
              // show: true,
              position: 'right',
              formatter: "{b}"
            },
            data: nodes,
            links: links,
            lineStyle: {
              opacity: 0.9,
              width: 2,
              curveness: 0.1,
            },
            force: {
              initLayout: 'circular',
              repulsion: 50,
              // edgeLength: 1,
              gravity: 0.15,
              friction: 0.5,
              layoutAnimation: true,
            }
          }
        ]
      }}
      eventHandlers={{ click: onClick }}
      lazyUpdate={true}
    />
  )
}

export default Echarts