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
  } = props;

  return(
    <div style={{ display: "flex", flexDirection: "row", gap: 10, paddingTop: 33, marginLeft: "auto" }}>
      <div>h: <input placeholder="Height" value={height} onChange={heightHandler} /></div>
      <div>w: <input placeholder="Width" value={width} onChange={widthHandler} /></div>
      <div><input type="checkbox" checked={fixedDrag} onChange={fixedDragHandler} /> Fixed drag </div>
      <div><input type="checkbox" checked={showCycles} onChange={showCyclesHandler} /> Highlight cycles </div>
    </div>
  )
}

export default MenuBar
