import { EChartsOption } from "echarts";
import { EChartsAutoSize } from "echarts-solid"
import { Component } from "solid-js";

const Echarts: Component<{
  data: any
  adjacencyData: any
}> = (props) => {

  const nodes: { name: any; x: number; y: number; symbolSize: number; itemStyle: { color: string | null; }; }[] = []

  const links: { source: string; target: string; value: number; }[] = []

  const mapNodes = (node: any) => {
    if (node.children) {
      node.children.forEach(mapNodes)

      node.children.forEach((child: any) => {
        links.push({
          source: node.name,
          target: child.name,
          value: 1
        })
      })
    } else {
      node.importance = props.adjacencyData[node.name] ? Object.values(props.adjacencyData[node.name]).reduce((acc: any, curr: any) => acc + curr, 0) : 0
    }

    nodes.push({
      name: node.name,
      x: 0,
      y: 0,
      symbolSize: 20,
      itemStyle: {
        color: node.children ? null : "#000"
      }
    })
  }

  mapNodes(props.data)

  const options: EChartsOption = {
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
          max: 0.06
        },

        data: nodes,
        links,
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
  };
      

  return (
    <EChartsAutoSize
      option={options}
      onInit={(echartsInstance) => { console.log(echartsInstance) }}
    />
  )
}

export default Echarts