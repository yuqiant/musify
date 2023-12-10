import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate, Link } from "react-router-dom";
import * as client from "./client";
import './account.css'; // Ensure this path is correct

function Account() {
  const { isAuthenticated, setIsAuthenticated, userId, setUserId } = useContext(AuthContext);
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
      if (accountData.dob) {
        const formattedDOB = new Date(accountData.dob).toISOString().split('T')[0];
        accountData.dob = formattedDOB;
      } else {
        accountData.dob = '';
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
      setIsAuthenticated(false);
      setUserId(null);
      localStorage.removeItem('userId');
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
    <div className="account-section">
      <h1 className="account-heading">Profile</h1>
      {error && <div className="error-message">{error}</div>}
      <div className="account-form">
        <div className="account-row">
          <label htmlFor="firstName">First Name</label>
          <input id="firstName" className="account-input" name="firstName" value={account.firstName} onChange={handleChange} />
        </div>

        <div className="account-row">
          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" className="account-input" name="lastName" value={account.lastName} onChange={handleChange} />
        </div>

        <div className="account-row">
          <label htmlFor="dob">Date of Birth</label>
          <input id="dob" className="account-input" type="date" name="dob" value={account.dob} onChange={handleChange} />
        </div>

        <div className="account-row">
          <label htmlFor="email">Email</label>
          <input id="email" className="account-input" name="email" value={account.email} onChange={handleChange} />
        </div>

        <div className="account-row">
          <label htmlFor="role">Role</label>
          <select id="role" className="account-input" name="role" value={account.role} onChange={handleChange}>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="REVIEWER">Reviewer</option>
          </select>
        </div>

        <div className="account-actions">
          <button className="account-btn save-btn" onClick={save}>Save</button>
          <button className="account-btn signout-btn" onClick={signout}>Signout</button>
        </div>

        {account.role === "ADMIN" && (
          <Link to="/admin/profile" className="btn btn-warning w-100">User Management</Link>
        )}
      </div>
    </div>
  );
}

export default Account;
