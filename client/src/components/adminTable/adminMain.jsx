import React from "react";
import { Link } from "react-router-dom";
import AdminDashboard from "./adminDashboard";
import AdminUsers from "./adminUsers";

const AdminMain = () => {
  const [users, setUsers] = React.useState();
  const [table, setTable] = React.useState(<AdminDashboard />);
  const handleShowUsers = () => {
    console.log("handleShowUsers");
    setTable(<AdminUsers />);
  };
  const handleShowBooks = () => {
    console.log("handleShowUsers");
    setTable(<AdminDashboard />);
  };
  return (
    <section>
      <div class="container">
        <nav class="grid-filter gf-outline">
          <ul>
            <li>
              <Link onClick={handleShowUsers} to="#">
                Users
              </Link>
            </li>
            <li>
              <Link onClick={handleShowBooks} to="#">
                Books
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="container">{table}</div>
    </section>
  );
};

export default AdminMain;
