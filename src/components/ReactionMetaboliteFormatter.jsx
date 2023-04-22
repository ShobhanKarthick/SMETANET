function DataFormatter(graphAsJSON) {
  const coFactors = [ "coa", "nadh", "nad", "nadph", "nadp", "atp", "adp", "amp",
                      "q8", "q8h2", "pi", "co2", "h2o", "h", "o2", "h2",
                      "nh4", "fad", "fadh", "gtp", "ctp", "ttp", "pi",
                    ];


  const data = graphAsJSON
  const newData = data.nodes.map((node) => {
    const nodeLinks = data.links.filter((link) => link.source === node.id || link.target === node.id)
    const numEdges = nodeLinks.length;

    let coFactor = false
    let reactionNode = false

    const nodeName = node.id.split(" ")
    if(nodeName[nodeName.length - 1]?.includes("[")){
      if(coFactors.includes(nodeName[nodeName.length - 1].split("[")[0])) {
        coFactor = true
      }
    } else {
      reactionNode = true
    }
    node["numEdges"] = numEdges
    node["coFactor"] = coFactor
    node["reactionNode"] = reactionNode

    if (node.coFactor && node.numEdges > 1) {
      for (let i = 0; i < node.numEdges - 1; i++) {
        const newNode = { ...node }; 
        newNode.id = `${i+1}_${node.id}` 
        newNode.numEdges = 1
        data.nodes.push(newNode)
        if (nodeLinks[i].source === node.id) {
          const index = data.links.findIndex(link => link.source === node.id)
          data.links[index].source = newNode 
        } else {
          const index = data.links.findIndex(link => link.target === node.id)
          data.links[index].target = newNode 
        }
      }
      node.numEdges = 1
    }
  })
  return data
}

export default DataFormatter
