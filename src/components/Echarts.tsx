import { GraphSeriesOption } from "echarts";
import { EChartsAutoSize } from "echarts-solid"
import { Component } from "solid-js";
import { state } from "~/state";

const Echarts: Component = () => {

  const nodes: GraphSeriesOption["data"] = state.files.map((file) => {
    return {
      name: file.name,
      value: file.importance,
      x: 0,
      y: 0,
      symbolSize: 10 * Math.sqrt(file.importance ?? 8),
      itemStyle: {
        color: file.children ? "#999" : "#000",
        borderColor: "#fff",
      },
    }
  })

  const links = state.links.map((link) => {
    return {
      source: link.source,
      target: link.target,
    }
  })
  
  return (
    <EChartsAutoSize
      option={{
        title: {
          
        },
        tooltip: {},
        legend: [
          {
            
          }
        ],
        series: [
          {
            type: 'graph',
            layout: 'force',
            animation: false,
            roam: true,
            scaleLimit: {
              min: 0.04,
              max: 0.1,
            },
    
            data: nodes,
            links: links,
            lineStyle: {
              opacity: 0.9,
              width: 2,
              curveness: 0
            },
            force: {
              repulsion: 1,
              edgeLength: 1,
              gravity: 1,
              friction: 0.9,
              layoutAnimation: true,
            }
          }
        ]
      }}
      lazyUpdate={true}
    />
  )
}

export default Echarts