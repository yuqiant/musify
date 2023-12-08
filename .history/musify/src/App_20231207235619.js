import logo from './logo.svg';
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
    <Router>
      <Routes>
        <Navbar />
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );

}

export default App;
