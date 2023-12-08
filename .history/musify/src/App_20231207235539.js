import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './navbar';
import Home from './home';
import SearchResults from './search';

function App() {
  return (
    // <div>
    //   <Navbar />
    //   <Home />
    // </div>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );

}

export default App;
