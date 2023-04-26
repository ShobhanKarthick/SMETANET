import * as d3 from "d3"
import saveNetworkAsSvg from "./SaveAsSVG"

const MenuBar = (props) => {
  const {
    heightHandler,
    height,
    widthHandler,
    width,
    fixedDrag,
    fixedDragHandler,
    showCycles,
    showCyclesHandler,
    resizeHandler,
  } = props;

  const saveAsSVGHandler = () => {
    const network = d3.select('svg').node()
    saveNetworkAsSvg(network, 'network.svg')
  }

  return(
    <div style={{ display: "flex", flexDirection: "row", gap: 10, marginLeft: "auto", justifyContent: "center", alignItems: "center" }}>
      <div>h: <input placeholder="Height" ref={height} onChange={heightHandler} /></div>
      <div>w: <input placeholder="Width" ref={width} onChange={widthHandler} /></div>
      <div className="button" style={{ marginTop: 0 }} onClick={resizeHandler}>Resize</div>
      <div><input type="checkbox" checked={fixedDrag} onChange={fixedDragHandler} /> Fixed drag </div>
      <div><input type="checkbox" checked={showCycles} onChange={showCyclesHandler} /> Highlight cycles </div>
      <div className="button" style={{ marginTop: 0 }} onClick={saveAsSVGHandler}>Save as SVG</div>
    </div>
  )
}

export default MenuBar
