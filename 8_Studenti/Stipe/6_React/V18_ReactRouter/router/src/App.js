
import './App.css';
import Index from "./Components/Index";
import Komponenta1 from './Components/Komponenta1';
import Komponenta2 from './Components/Komponenta2';
import {Routes, Route, Link} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/k1">Komponenta1</Link>
          </li>
          <li>
            <Link to="/k2">Komponenta2</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Index/>}/>
        <Route path="/k1" element={<Komponenta1/>}/>
        <Route path="/k2" element={<Komponenta2/>}/>
      </Routes>
    
      
    </div>
  );
}

export default App;
