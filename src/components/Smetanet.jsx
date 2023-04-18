import { useState, } from "react"
import ForceLayout from "./ForceLayout"

function Smetanet() {

  const [CobraModel, setCobraModel] = useState({})

  const fileHandler = (event) => {
    var file = event.target.files[0]
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      setCobraModel(JSON.parse(content))
    };
    reader.readAsText(file);
  }

  

  return(
    <div className="smetanet-page">
      <h1>SMETANET</h1>
      <label htmlFor="upload-button">
        <div className="button"> Upload </div>
      </label>
      <input id="upload-button" type="file" className="button" name="myJSONfile" onChange={fileHandler} style={{ width: "fit-content", display: "none"}}/>
      <div>{Object.keys(CobraModel).length !== 0 ? "Model Loaded" : "No Model Uploaded"}</div>
      {Object.keys(CobraModel).length !== 0 && <ForceLayout data={CobraModel}/>}
    </div>
  )
}

export default Smetanet
