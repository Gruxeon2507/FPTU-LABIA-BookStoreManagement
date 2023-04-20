import React from "react";
import { Link } from "react-router-dom"
import "./NavBar.css"
function Navbar() {
    return (
        <div>
            <div className="userFeature">
                <p>User Feature</p>
                <nav>
                    <div className="navbarItem">
                        <Link to="/">Home Page</Link>
                    </div>
                    <div>

                        <Link to="/user">User Profile</Link>
                    </div>
                    <div className="navbarItem">

                        <Link to="/user/setting">Account Setting</Link>
                    </div>
                    <div className="navbarItem">

                        <Link to="/book/view">View Book</Link>
                    </div>
                    <div className="navbarItem">

                        <Link to="/book/add">Add Book</Link>
                    </div>
                </nav>
            </div>
            <div className="adminFeature">
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
            </div>



        </div>
    )
}
export default Navbar;