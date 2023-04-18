import { Link } from "react-router-dom"
import SMETANETLogo from "../images/SMETANET_logo.png"

function Home() {
  return(
    <div className="App">
      <img src={SMETANETLogo} width="125" height="auto"/>
      <div className="logo-text">SMETANET</div>
      <div className="sub-text">Simplify Metabolic Networks</div>
      <button className="button"><Link to="/smetanet">Get Started</Link></button>
    </div>
  )
}

export default Home
