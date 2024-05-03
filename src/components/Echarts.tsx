import { GraphSeriesOption } from "echarts";
import { EChartsAutoSize } from "echarts-solid"
import { Component } from "solid-js";
import { produce } from "solid-js/store";
import { state, setState, selectFile } from "~/state";

const Echarts: Component = () => {

  const nodes: () => GraphSeriesOption["data"] = () => state.files.map((file) => {
    return {
      id: file.id,
      name: file.name,
      value: file.importance,
      x: 0,
      y: 0,
      symbolSize: 10 * Math.sqrt(file.importance ?? 8),
      category: file.category,
      itemStyle: {
        opacity: file.blur ? 0.2 : 1,
      },
    }
  })

  const links: () => GraphSeriesOption["links"] = () => state.links

  const onClick = (params: any) => {
    if (params.dataType === 'node') {
      const nodeId = params.data.id as string
      selectFile(nodeId)
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
            animation: true,
            
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
              // hideOverlap: true,
            },
            label: {
              // show: true,
              position: 'right',
              formatter: "{b}"
            },
            data: nodes(),
            links: links(),
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
              friction: 0.7,
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