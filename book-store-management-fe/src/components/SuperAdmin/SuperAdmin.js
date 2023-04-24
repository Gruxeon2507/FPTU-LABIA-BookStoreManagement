import React from "react";
import { Link } from "react-router-dom";

function SuperAdmin() {
  return (
    <>
      <div>
        <Link to={"/superadmin"}>Darboard </Link>
        <Link to={"/admin/user"}>User</Link>
        <Link to={"/admin/book"}>Book </Link>
      </div>

    </>
  );
}

export default SuperAdmin;
