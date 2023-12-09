import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as client from "./client";

function Account() {
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
      setAccount(accountData);
      // Store role in local storage for persistent access control
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
      // Reflect role changes in local storage
      localStorage.setItem('role', account.role);
    } catch (err) {
      setError("Failed to update account.");
    }
  };

  const signout = async () => {
    await client.signout();
    // Clear role from local storage on signout
    localStorage.removeItem('role');
    navigate("/signin");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccount({ ...account, [name]: value });
  };

  return (
    <div className="w-50">
      <h1>Account</h1>
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
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
          <button onClick={save}>Save</button>
          <button onClick={signout}>Signout</button>
          {account.role === "ADMIN" && (
            <Link to="/admin/profile" className="btn btn-warning w-100">Users</Link>
          )}
        </div>
      )}
    </div>
  );
}

export default Account;
