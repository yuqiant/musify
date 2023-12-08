import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './navbar';
import Home from './home';
import Results from './result';
import SongDetails from './details';
function App() {
  return (
    // <div>
    //   <Navbar />
    //   <Home />
    // </div>
    <div>
      <Routes>
        {/* <Navbar /> */}
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Results />} />
        <Route path="/details" element={<SongDetails />} />

      </Routes>
    </div>
  );

}

export default App;
