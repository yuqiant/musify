import Signin from "./signin";
import Account from "./account";
import UserTable from "./table";
import Signup from "./signup";
import { Routes, Route } from "react-router-dom";
import Nav from "./nav";

function Users() {
  return (
    <div className="row">
      <div className="col-2">
        <Nav />
      </div>
      <div className="col-10">
        <Routes>
          <Route path="signin" element={<Signin />} />
          <Route path="account" element={<Account />} />
          <Route path="signup" element={<Signup />} />
          <Route path="admin/profile" element={<UserTable />} />
        </Routes>
      </div>
    </div>
  );
}

export default Users;
