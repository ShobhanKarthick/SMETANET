import { useState, useEffect } from "react"
import * as d3 from "d3";
import ReactionMetaboliteFormatter from "./ReactionMetaboliteFormatter"

const linkArc  = (d) => {
  const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y) 
  return `
    M${d.source.x},${d.source.y}
    A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
  `;
}

function linkArc2(d) {
    let sx = d.source.x;
    let sy = d.source.y;
    let tx = d.target.x;
    let ty = d.target.y;

    const linknum = 3

    // distance b/w curve paths
    let cd = 30;

    // find middle of source and target
    let cx = (sx + tx) / 2;
    let cy = (sy + ty) / 2;
    
    // find angle of line b/w source and target
    var angle = Math.atan2(ty - sy, tx - sx);

    // add radian equivalent of 90 degree
    var c_angle = angle + 1.5708;

    var final = ""
    // draw odd and even curves either side of line
    if (linknum & 1) {
      final = 'Q ' + (cx - ((linknum - 1) * cd * Math.cos(c_angle))) + ',' + (cy - ((linknum - 1) * cd * Math.sin(c_angle))) + ' ';
    }
    else {
      final = 'Q ' + (cx + (linknum * cd * Math.cos(c_angle))) + ',' + (cy + (linknum * cd * Math.sin(c_angle))) + ' ';
    }

    return 'M' + d.source.x + ',' + d.source.y + final + d.target.x + ',' + d.target.y
  }

const drag = simulation => {
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  
  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }
  
  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
  
  return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      /* .on("end", dragended); */
}


function ForceLayout(props) {
  const { data } = props
  const [reRender, setRerender] = useState(0)

  useEffect(() => {
    setRerender(reRender + 1)
  }, [data])

  /* data && ReactionMetaboliteFormatter(data) */

  // set the dimensions and margins of the graph
  const width = window.innerWidth
  const height = window.innerHeight

  const xOffset = -width / 2
  const yOffset = -height / 2

  // append the svg object to the body of the page
  var svg = d3.select("#smetanetMap")
  if(svg.empty) {
    svg.html("")
    svg = svg.append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [xOffset , yOffset, width, height])
      .style("font", "12px sans-serif")
      .attr("style", "overflow: scroll" )

    svg.append("defs")
    .append("marker")
      .attr('markerUnits', 'userSpaceOnUse')
      .attr('id', 'arrowhead')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 13)
      .attr('refY', 0)
      .attr('orient', 'auto')
      .attr('markerWidth', 15)
      .attr('markerHeight', 15)
      .append("path")
      .attr("fill", "#999")
      .attr("d", "M0,-5L10,0L0,5");

      console.log(data)

      // Initialize the links
      const link = svg.append("g")
        .attr("fill", "none")
        .attr("stroke-width", 2.5)
        .selectAll("path")
        .data(data.links)
        .join("path")
          .attr("stroke", "#999")
          .attr('marker-end', d => 'url(#arrowhead)')



      // Let's list the force we wanna apply on the network
      // This function is run at each iteration of the force algorithm, updating the nodes position.
  const simulation = d3.forceSimulation(data.nodes)                 // Force algorithm is applied to data.nodes
      .force("link", d3.forceLink()                               // This force provides links between nodes
            .id(function(d) { return d.id; })                     // This provide  the id of a node
            .links(data.links)                                    // and this the list of links
      )
      .force("charge", d3.forceManyBody().strength(-400))         // This adds repulsion between nodes. Play with the -400 for the repulsion strength
      .force("x", d3.forceX())
      .force("y", d3.forceY())

    console.log(link)
      // Initialize the nodes
      const node = svg
        .selectAll("g.node")
        .data(data.nodes)
        .join("g")
          .attr("class", "node")

      node.append("circle")
        .attr("r", 12)
        .style("fill", "#69b3a2")
    
      node.append("text")
        .attr("x", 19)
        .attr("y", "0.31em")
        /* .text(d => d.labels) */
        .text(d => d.id.split(" ")[1])
        /* .text(d => d.labels ? d.labels : d.id.split(" ")[1] ? d.id.split(" ")[1] : d.id) */
          .attr("fill", "#888")
          .attr("stroke", "#888")
          .attr("stroke-width", 0.5);
    
      node.call(drag(simulation))
    
    
  simulation.on("tick", () => {
    link.attr("d", linkArc);
    node.attr("transform", d => `translate(${d.x},${d.y})`);
  })


  }

  return(
    <div id="smetanetMap"></div>
  )
}

export default ForceLayout

