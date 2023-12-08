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
        <Route path="/*" element={<Users />} />
      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
