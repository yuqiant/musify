import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './home';
import Results from './result';
import SongDetails from './details';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './navbar';
import Home from './home';
import { AuthProvider } from './AuthContext';
import Users from "./users"; // This should handle /signin, /signup, etc.

function App() {
  console.log(process.env.REACT_APP_BASE_API_URL);
  return (
    <Router>
      <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Results />} />
        <Route path="/details/:id" element={<SongDetails />} />
        <Route path="/*" element={<Users />} /> 
        // /* may need to be changed to /profile
      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
