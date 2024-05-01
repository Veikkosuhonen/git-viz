import { Component, onCleanup } from "solid-js";
import * as d3 from 'd3';
import { state } from "~/state";

const FDG: Component = () => {
  // Specify the chart’s dimensions.
  const width = window.innerWidth * 0.8;
  const height = window.innerHeight * 0.8;

  // Compute the graph and start the force simulation.
  const root = d3.hierarchy(state.data).sum(d => d.lines ?? 0);
  const links = root.links();
  const nodes = root.descendants();

  const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.index ?? 0).distance(0).strength(0.5))
      .force("charge", d3.forceManyBody().strength(d => 
        3 * -Math.min(nodes[d.index].data.lines ?? 100, 500))
      )
      .force("x", d3.forceX())
      .force("y", d3.forceY());

  // Create the container SVG.
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto;");

  // Create adjacency links
  const adjacencyLinks = Object.entries(state.adjacencyData).flatMap(([sourceId, targets]) => Object.entries(targets).map(([targetId, value]) => { 
    //console.log(sourceId, targetId); 
    return {
      source: nodes.find(node => node.data.name === sourceId),
      target: nodes.find(node => node.data.name === targetId),
      value: value
    }
  })
  ).filter(link => link.source && link.target);

  // Append adjacency links
  const adjacencyLink = svg.append("g")
    .attr("stroke", "#17a")
    .selectAll("line")
    .data(adjacencyLinks)
    .join("line")
      .attr("stroke-width", d => Math.sqrt(d.value))
      .attr("stroke-opacity", d => d.value / 50)
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

  // Append links.
  const link = svg.append("g")
      .attr("stroke", "#000")
      .attr("stroke-opacity", 1)
      .attr("stroke-width", 1.5)
    .selectAll("line")
    .data(links)
    .join("line");

  // Append nodes.
  const node = svg.append("g")
      .attr("fill", "#fff")
      .attr("stroke", "#000")
      .attr("stroke-width", 1.5)
    .selectAll("circle")
    .data(nodes)
    .join("circle")
      .attr("fill", d => d.children ? null : "#000")
      .attr("stroke", d => d.children ? null : "#fff")
      .attr("r", d => d.children?.length ? 10 : (Math.sqrt(d.data.importance + 2)))
      .call(drag(simulation), []);

  node.append("title")
      .text(d => d.data.name);

  // Append the text labels.
  const label = svg.append("g")
      .style("font", "10px sans-serif")
      .attr("pointer-events", "none")
      .attr("selectable", "false")
      .attr("text-anchor", "begin")
    .selectAll("text")
    .data(root.descendants())
    .join("text")
      .style("fill-opacity", d => d.children?.length ? 1 : d.data.importance / 10)
      .text(d => d.data.name);

  simulation.on("tick", () => {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    adjacencyLink
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);

    label
        .attr("x", d => d.x)
        .attr("y", d => d.y);
  });

  simulation.on("end", () => {
    console.log("Simulation ended")
  })

  function handleZoom(e) {
    console.log(e)
    d3.select('g').attr('transform', e.transform);
  }

  const zoom = d3.zoom()
    .scaleExtent([0.1, 10])
    .on('zoom', handleZoom);

  d3.select('svg')
    .call(zoom);

  onCleanup(() => simulation.stop());

  return svg.node();
}


const drag = (simulation: d3.Simulation<d3.HierarchyNode<any>, undefined>) => {
  
  function dragstarted(event: any, d: d3.SimulationNodeDatum) {
    if (!event.active) simulation.alphaTarget(0.2).restart();
    d.fx = d.x;                                                                                                                                                                              
    d.fy = d.y;
  }
  
  function dragged(event: any, d: d3.SimulationNodeDatum) {
    d.fx = event.x;
    d.fy = event.y;
  }
  
  function dragended(event: any, d: d3.SimulationNodeDatum) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
  
  return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
}

export default FDG;
