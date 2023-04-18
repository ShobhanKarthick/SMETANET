import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home"
import Smetanet from "./components/Smetanet"

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/smetanet" element={<Smetanet/>} />
        </Routes>
      </Router>
  );
}

export default App;
