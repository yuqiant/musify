import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate, Link } from "react-router-dom";
import * as client from "./client";

function Account() {
  const { isAuthenticated, setIsAuthenticated, userId, setUserId } = useContext(AuthContext); // Extract setIsAuthenticated and setUserId
  const [account, setAccount] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    role: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchAccount = async () => {
    try {
      const accountData = await client.account();
      
      // Format the DOB for the date input
      if (accountData.dob) {
        const formattedDOB = new Date(accountData.dob).toISOString().split('T')[0];
        accountData.dob = formattedDOB;
      } else {
        accountData.dob = ''; // Set to empty if undefined or null
      }
  
      setAccount(accountData);
      localStorage.setItem('role', accountData.role);
    } catch (err) {
      setError("Failed to load account data.");
    }
  };
  
  useEffect(() => {
    fetchAccount();
  }, []);

  const save = async () => {
    try {
      await client.updateUser(account);
      localStorage.setItem('role', account.role);
    } catch (err) {
      setError("Failed to update account.");
    }
  };

  const signout = async () => {
    try {
      await client.signout();
      setIsAuthenticated(false); // Set isAuthenticated to false
      setUserId(null); // Clear the userId
      localStorage.removeItem('userId'); // Clear the userId from local storage
      navigate("/signin");
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccount({ ...account, [name]: value });
  };

  return (
    <div className="w-50">
      <h1>Account</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {account && (
        <div>
          <label>First Name</label>
          <input name="firstName" value={account.firstName} onChange={handleChange} />
          <label>Last Name</label>
          <input name="lastName" value={account.lastName} onChange={handleChange} />
          <label>Date of Birth</label>
          <input type="date" name="dob" value={account.dob} onChange={handleChange} />
          <label>Email</label>
          <input name="email" value={account.email} onChange={handleChange} />
          <label>Role</label>
          <select name="role" value={account.role} onChange={handleChange}>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="REVIEWER">Reviewer</option>
          </select>
          <button onClick={save}>Save</button>
          <button onClick={signout}>Signout</button>
          {account.role === "ADMIN" && (
            <Link to="/admin/profile" className="btn btn-warning w-100">User Management</Link>
          )}
        </div>
      )}
    </div>
  );
}

export default Account;
