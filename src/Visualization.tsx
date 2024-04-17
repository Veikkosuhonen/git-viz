import {parse} from 'csv-parse/browser/esm/sync';
import { Component, Match, Show, Switch, createEffect, createResource, createSignal, onCleanup, onMount } from 'solid-js';
import * as d3 from 'd3';

const Pack: Component<{ data: any }> = (props) => {
  // Specify the chart’s dimensions.
  const width = window.innerWidth * 0.9;
  const height = window.innerHeight * 0.9;

  // Create the color scale.
  const color = d3.scaleLinear()
      .domain([0, 5])
      .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
      .interpolate(d3.interpolateHcl);

  // Compute the layout.
  const pack = (data: any) => d3.pack()
      .size([width, height])
      .padding(3)
    (d3.hierarchy(data)
      .sum(d => d.lines ?? 0)
      .sort((a, b) => b.lines ?? 0 - a.lines ?? 0));
  const root = pack(props.data);

  // Create the SVG container.
  const svg = d3.create("svg")
      .attr("viewBox", `-${width} -${height} ${2*width} ${2*height}`)
      .attr("width", width)
      .attr("height", height)
      .attr("style", `max-width: 100%; height: auto; display: block; margin: 0 -14px; background: ${color(0)}; cursor: pointer;`);

  // Append the nodes.
  const node = svg.append("g")
    .selectAll("circle")
    .data(root.descendants().slice(1))
    .join("circle")
      .attr("fill", d => d.children ? color(d.depth) : "white")
      .attr("pointer-events", d => !d.children ? "none" : null)
      .on("mouseover", function() { d3.select(this).attr("stroke", "#000"); })
      .on("mouseout", function() { d3.select(this).attr("stroke", null); })
      .on("click", (event, d) => focus !== d && (zoom(event, d), event.stopPropagation()));

  // Append the text labels.
  const label = svg.append("g")
      .style("font", "20px sans-serif")
      .style("padding", "2px")
      .style("background", "white")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
    .selectAll("text")
    .data(root.descendants())
    .join("text")
      .style("fill-opacity", 0 /*d => d.parent === root ? 1 : 0*/)
      .style("display", d => d.parent === root ? "inline" : "none")
      .text(d => d.data.name);

  // Create the zoom behavior and zoom immediately in to the initial focus node.
  svg.on("click", (event) => zoom(event, root));
  let focus = root;
  let view;
  zoomTo([focus.x, focus.y, focus.r * 2]);

  function zoomTo(v: d3.ZoomView) {
    const k = width / v[2];

    view = v;

    label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
    node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
    node.attr("r", d => d.r * k);
  }

  function zoom(event: any, d: d3.HierarchyCircularNode<any>) {
    const focus0 = focus;

    focus = d;

    const transition = svg.transition()
        .duration(event.altKey ? 7500 : 750)
        .tween("zoom", d => {
          const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
          return t => zoomTo(i(t));
        });

    label
      .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
      .transition(transition)
        .style("fill-opacity", d => d.parent === focus ? 1 : 0)
        .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
        .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
  }

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

const FDG: Component<{ data: any, adjacencyData: any }> = (props) => {
  // Specify the chart’s dimensions.
  const width = window.innerWidth * 0.8;
  const height = window.innerHeight * 0.8;

  const mapNodes = (node: any) => {
    if (node.children) {
      node.children.forEach(mapNodes)
    } else {
      node.importance = props.adjacencyData[node.name] ? Object.values(props.adjacencyData[node.name]).reduce((acc: any, curr: any) => acc + curr, 0) : 0
    }
  }

  mapNodes(props.data)

  // Compute the graph and start the force simulation.
  const root = d3.hierarchy(props.data).sum(d => d.lines ?? 0);
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
  const adjacencyLinks = Object.entries(props.adjacencyData).flatMap(([sourceId, targets]) => Object.entries(targets).map(([targetId, value]) => { 
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
      .call(drag(simulation));

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

  const zoom = d3.zoom()
      .scaleExtent([0.5, 32])
      .on("zoom", event => {
        const {transform} = event;
        svg.attr("transform", transform);
      });

  svg.call(zoom).call(zoom.transform, d3.zoomIdentity);

  onCleanup(() => simulation.stop());

  return svg.node();
}

export const Visualization = () => {
  const [data] = createResource(() => fetch('./gptwrapper_file_tree.json').then((res) => res.json()))
  const [adjacencyData] = createResource(() => fetch('./gptwrapper_adjacency.csv')
    .then(res => res.text())
    .then((res) => parse(res, { 
      columns: true,
      skip_empty_lines: true
    }))
    .then((json) => Object.fromEntries(json.map((row: any) => {
      const rowId = row[""]
      const rowData = Object.fromEntries(
        Object.entries(row)
        .filter(([key,]) => key !== "")
        .map(([key, value]) => [key, parseInt(value as string, 10)])
        .filter(([,value]) => (value as number) > 1)
      )
      return [rowId, rowData]
    })))
  )

  createEffect(() => {
    console.log(adjacencyData())
  })
  const [type, setType] = createSignal('fdg')

  return (
    <>
      <h1>Visualization</h1>
      <div>
        <select value={type()} onChange={(e) => setType(e.currentTarget.value)}>
          <option value="pack">Pack</option>
          <option value="fdg">Force-Directed Graph</option>
        </select>
        <section style={{
          "margin-top": "2rem",
          "border-radius": "3rem",
          "box-shadow": "0 5px 1rem 0 rgba(0, 0, 1, 0.3)",
          "border": "1px solid rgba(0, 0, 0, 0.3)",
          "overflow": "hidden",
        }}>
          <Show when={data() && adjacencyData()}>
            <Switch>
              <Match when={type() === 'fdg'}>
                <FDG data={data()} adjacencyData={adjacencyData()} />
              </Match>
              <Match when={type() === 'pack'}>
                <Pack data={data()} />
              </Match>
            </Switch>
          </Show>
        </section>
      </div>
    </>
  )
}