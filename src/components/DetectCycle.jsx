const detectCycles = (data, firstTime) => {
  const visited = new Set(); // Set to keep track of visited nodes
  const stack = new Set(); // Set to keep track of nodes in the current traversal path
  const cycles = new Set(); // Set to store detected cycles
  const cycleClass = "cycle"; // CSS class to apply to highlighted nodes and edges

  // Function to perform DFS
  function dfs(nodeId) {
    visited.add(nodeId); // Add current node to visited set
    stack.add(nodeId); // Add current node to stack

    // Loop through the edges to find neighbors of the current node
    for (const link of data.links) {
      const source = firstTime ? link.source : link.source.id
      if (source === nodeId) {
        const neighborId = firstTime ? link.target : link.target.id
        if (!visited.has(neighborId)) {
          // If neighbor is not visited, recursively call DFS
          dfs(neighborId);
        } else if (stack.has(neighborId)) {
          // If neighbor is already in stack, a cycle is found
          cycles.add(nodeId); // Add current node to cycles set
          cycles.add(neighborId); // Add neighbor node to cycles set
        }
      }
    }

    stack.delete(nodeId); // Remove current node from stack after traversal
  }

  // Loop through all nodes in the graph and perform DFS
  for (const node of data.nodes) {
    if (!visited.has(node.id)) {
      dfs(node.id);
    }
  }

  // Highlight nodes and edges corresponding to the detected cycles
  data.nodes.forEach((node) => {
    if (cycles.has(node.id)) {
      node.isPartOfCycle = true; // Add custom property to mark nodes in cycles
    } else {
      node.isPartOfCycle = false;
    }
  });

  data.links.forEach((link) => {
    const source = firstTime ? link.source : link.source.id
    const target = firstTime ? link.target : link.target.id
    if (cycles.has(source) && cycles.has(target)) {
      link.isPartOfCycle = true; // Add custom property to mark edges in cycles
    } else {
      link.isPartOfCycle = false;
    }
  });

  return data
}

export default detectCycles
