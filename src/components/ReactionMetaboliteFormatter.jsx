const ReactionMetaboliteFormatter = (graphAsJson) => {
  const coFactors = ['coa', 'nadh', 'nad', 'nadph', 'nadp', 'atp', 'adp', 'amp',
                    'q8', 'q8h2', 'pi', 'co2', 'h2o', 'h', 'o2', 'h2', 'nh4', 'fad', 'fadh']

  let coFactorFrequency = {}
  coFactors.forEach(element => {
    coFactorFrequency[element] = 0
  });

  console.log(coFactorFrequency)

  graphAsJson["links"].forEach(link => {
    /* console.log(link.source.id.split(" ")[1]) */
    /* console.log(link.target.id.split(" ")[1]) */
    let source = ""
    let target = ""

    if(link.source.id == null) {
      console.log(link.source)
      source = link.source.split(" ")[link.source.length - 1]
    } else if (link.source.id != null) {
      source = link.source.id.split(" ")[link.source.id.length - 1]
      source = source.split("[")
      source = source[source.length - 1]
    }
      
    if(link.target.id == null) {
      console.log(link.target)
      target = link.target.split(" ")[1]
    } else if (link.target.id != null) {
      target = link.target.id.split(" ")[link.target.id.length - 1]
      target = target.split("[")
      target = target[target.length - 1]
    }

    console.log(source, target)
  });

}

export default ReactionMetaboliteFormatter
