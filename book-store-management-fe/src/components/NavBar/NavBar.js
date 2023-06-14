import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.scss";
import { NavDropdown } from "react-bootstrap";
import api from "../../services/BaseAuthenticationServices";
function Navbar() {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const logout = () => {
    window.localStorage.removeItem("token");
    window.location.href = "/login";
  };
  useEffect(() => {
    api.get("/api/users/loginuser").then((res) => setUsername(res.data));
    // api.get("/api/users/roles").then((res) => setRole(res.data));
  }, []);

  return (
    <div>
      <nav>
        <div className="nav-logo">
          <img
            src="https://t4.ftcdn.net/jpg/04/92/24/55/360_F_492245515_B06u4GqjtSox45R7iDOCLIamWIJipzFT.jpg"
            width={70}
          ></img>
        </div>

        <div className="nav-left">
          <div className="nav-homepage">
            <Link to="">Home Page</Link>
          </div>
          <div className="nav-homepage">
            <Link to="/mybook">My Book</Link>
          </div>
          <div className="nav-dropdown">
            <div className="nav-avatar">
              <img
                src={"http://localhost:6789/api/users/avatar/" + username}
              ></img>
            </div>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title={username}
              // menuVariant="dark"
            >
              <NavDropdown.Item href={"../../user/" + username}>
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item href="../../user/setting">
                Account Setting
              </NavDropdown.Item>
              {window.localStorage.getItem("role") === "Admin" ||
              window.localStorage.getItem("role") === "Super Admin" ? (
                <NavDropdown.Item href="../../admin">
                  Management
                </NavDropdown.Item>
              ) : (
                ""
              )}
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </div>
        </div>
      </nav>
      {/* <div className="userFeature">
                <p>User Feature</p>
                <nav>
                    <div className="navbarItem">
                        <Link to="">Home Page</Link>
                    </div>

                    <div className="navbarItem">

                        <Link to="/auth/register">Register User </Link>
                    </div>
                    <div>

                        <Link to={"/user/" + window.localStorage.getItem("user")}>User Profile</Link>
                    </div>
                    <div className="navbarItem">

                        <a href={"/user/setting"}>Account Setting</a>
                    </div>
                    <div className="navbarItem">

                        <Link to="/book/view">View Book</Link>
                    </div>
                    <div className="navbarItem">
                        <Link to="/book/add">Add Book</Link>
                    </div>
                </nav>
            </div> */}
      {/* <div className="adminFeature">
                <p>Admin Feature</p>
                <nav>
                    <div className="navbarItem">

                        <Link to="/admin">Admin Page</Link>
                    </div>
                    <div className="navbarItem">

                        <Link to="/admin/book">Admin Book Management</Link>
                    </div>
                    <div className="navbarItem">

                        <Link to="/admin/user">Admin User Managemet</Link>
                    </div>
                </nav>
            </div>
            <div className="superAdminFeature">
                <p>Super Admin Feature</p>
                <nav>
                    <div className="navbarItem">

                        <Link to="/superadmin">Super Admin Page</Link>
                    </div>

                </nav>
            </div> */}
    </div>
  );
}
export default Navbar;
