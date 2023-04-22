import { useState, } from "react"
import ForceLayout from "./ForceLayout"
import DataFormatter from "./ReactionMetaboliteFormatter"

function Smetanet() {

  const [graphModel, setGraphModel] = useState({})

  const fileHandler = (event) => {
    var file = event.target.files[0]
    const reader = new FileReader();
    reader.onload = (event) => {
      let content = event.target.result;
      content = DataFormatter(JSON.parse(content))
      setGraphModel(content)
    };
    reader.readAsText(file);
  }

  return(
    <div className="smetanet-page">
      <h1>SMETANET</h1>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <label htmlFor="upload-button">
          <div className="button"> Upload </div>
        </label>
        <input id="upload-button" type="file" className="button" name="myJSONfile" onChange={fileHandler} style={{ width: "fit-content", display: "none"}}/>
        <div style={{ display: "flex", alignItems: "center", marginTop: 20, marginLeft: 20}}>
          {Object.keys(graphModel).length !== 0 ? "Model Loaded" : "No Model Uploaded"}
        </div>
      </div>
      {Object.keys(graphModel).length !== 0 && <ForceLayout data={graphModel}/>}
    </div>
  )
}

export default Smetanet
