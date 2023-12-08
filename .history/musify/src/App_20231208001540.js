import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './navbar';
import Home from './home';
import Results from './result';
function App() {
  return (
    // <div>
    //   <Navbar />
    //   <Home />
    // </div>
    <div>
      <Routes>
        <Navbar />
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </div>
  );

}

export default App;
