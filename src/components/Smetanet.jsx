import { useState, } from "react"
import ForceLayout from "./ForceLayout"
import DataFormatter from "./ReactionMetaboliteFormatter"
import MenuBar from "./MenuBar"

function Smetanet() {

  const [graphModel, setGraphModel] = useState({})
  const [height, setHeight] = useState(window.innerHeight)
  const [width, setWidth] = useState(window.innerWidth)
  const [fixedDrag, setFixedDrag] = useState(false)
  const [showCycles, setShowCycles] = useState(true)

  const heightHandler = (event) => {
    setHeight(event.target.value)
  }

  const widthHandler = (event) => {
    setWidth(event.target.value)
  }

  const showCyclesHandler = (event) => {
    setShowCycles(!showCycles)
  }

  const fixedDragHandler = (event) => {
    setFixedDrag(!fixedDrag)
  }

  const fileHandler = (event) => {
    var file = event.target.files[0]
    const reader = new FileReader();
    reader.onload = (event) => {
      let content = JSON.parse(event.target.result)
      content = DataFormatter(content)
      console.log(content)
      setGraphModel(content)
    };
    reader.readAsText(file);
  }

  return (
    <div className="smetanet-page">
      <h1>SMETANET</h1>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <label htmlFor="upload-button">
          <div className="button"> Upload </div>
        </label>
        <input
          id="upload-button"
          type="file"
          className="button"
          name="myJSONfile"
          onChange={fileHandler}
          style={{ width: "fit-content", display: "none" }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 20,
            marginLeft: 20,
          }}
        >
          {Object.keys(graphModel).length !== 0
            ? "Model Loaded"
            : "No Model Uploaded"}
        </div>
        <MenuBar
          width={width}
          height={height}
          fixedDrag={fixedDrag}
          showCycles={showCycles}
          widthHandler={widthHandler}
          heightHandler={heightHandler}
          fixedDragHandler={fixedDragHandler}
          showCyclesHandler={showCyclesHandler}
        />
      </div>
      {Object.keys(graphModel).length !== 0 && (
        <ForceLayout
          graphData={graphModel}
          width={width}
          height={height}
          fixedDrag={fixedDrag}
          showCycles={showCycles}
        />
      )}
    </div>
  );
}

export default Smetanet
