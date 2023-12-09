import * as client from "./client";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext"; // Make sure this path is correct

function Signin() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState(""); // Define the error state
  const { setIsAuthenticated, setUserId } = useContext(AuthContext); // Destructure from your AuthContext
  const navigate = useNavigate();

  const signin = async () => {
    try {
      const response = await client.signin(credentials);
      if (response.success) {
        setIsAuthenticated(true);
        setUserId(response.data._id);
        localStorage.setItem('userId', response.data._id);
        navigate('/home');
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Sign-in failed. Please check your credentials and try again.");
    }
  };
  
  return (
    <div>
      <h1>Signin</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <input
        placeholder="Username"
        value={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />
      <button onClick={signin}>Signin</button>
      <button onClick={() => navigate("/signup")}>Sign Up</button> {/* Button to navigate to the signup page */}
    </div>
  );
}

export default Signin;

