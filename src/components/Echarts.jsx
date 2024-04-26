import { EChartsAutoSize } from "echarts-solid"

const Echarts = (props) => {

  const options = {
    renderer: 'svg',
    title: {
      text: 'ECharts Getting Started Example'
    },
    tooltip: {},
    legend: {
      data: ['sales']
    },
    xAxis: {
      data: ['Shirts', 'Cardigans', 'Chiffons', 'Pants', 'Heels', 'Socks']
    },
    yAxis: {},
    series: [
      {
        name: 'sales',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
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