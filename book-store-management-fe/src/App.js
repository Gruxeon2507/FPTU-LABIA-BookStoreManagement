import "./App.css";
import ListBook from "./components/Homepage/ListBook";
import UserProfile from "./components/UserProfile/UserProfile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar/NavBar";
import AccountSetting from "./components/AccountSetting/AccountSetting";
import ListUser from "./components/Admin/ListUser";
import ViewABook from "./components/ViewBook/ViewABook";
import AdminBooks from "./components/Admin/AdminBooks";

import "./App.css";
import AddBook from "./components/AddBook/AddBook";
import RegisterUser from "./components/RegisterUser/RegisterUser";

import UpdateBook from "./components/UpdateBook/UpdateBook";

import LoginForm from "./components/Login/Login";
import SessionManager from "./components/Authentication/SessionManager/SessionManager";

import Dashboard from "./components/Admin/Dashboard";
import Footer from "./components/Footer/Footer";
import MyBook from "./components/MyBook/MyBook";
import ForbiddenPage from "./components/Authentication/Forbidden";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App() {
  const role = window.localStorage.getItem("role");
  return (
    <div className="App">
      <Navbar />

      <Routes>
        {/* 
        <Route path="" Component={ListBook}></Route>
        <Route path="/user/:userId" Component={UserProfile}></Route>
        <Route path="/user/setting" Component={AccountSetting}></Route>
        <Route path="/admin" Component={Dashboard}></Route>
        <Route path="/admin/book" Component={AdminBooks}></Route>
        <Route path="/admin/user" Component={ListUser}></Route>
        <Route path="/book/view/:bookId" Component={ViewABook}></Route> */}

        <Route path="/login" Component={LoginForm}></Route>
        <Route path="/login/:link" Component={LoginForm}></Route>

        <Route path="/register" Component={RegisterUser}></Route>


        <Route path="" Component={ListBook}></Route>
        <Route path="/user/:userId" Component={UserProfile}></Route>
        <Route path="/book/view/:bookId" Component={ViewABook}></Route>

        <Route
          path="/user"
          element={
            <PrivateRoute
              component={Dashboard}
              roles={["Admin", "Super Admin", "User"]}
            />
          }
        />
        <Route
          path="/user/setting"
          element={
            <PrivateRoute
              component={AccountSetting}
              roles={["Admin", "Super Admin", "User"]}
            />
          }
        />
        <Route
          path="/book/add"
          element={
            <PrivateRoute
              component={AddBook}
              roles={["Admin", "Super Admin", "User"]}
            />
          }
        />
        <Route
          path="/book/update/:bookId"
          element={
            <PrivateRoute
              component={UpdateBook}
              roles={["Admin", "Super Admin", "User"]}
            />
          }
        />
        <Route
          path="/mybook"
          element={
            <PrivateRoute
              component={MyBook}
              roles={["Admin", "Super Admin", "User"]}
            />
          }
        />

        <Route
          path="/admin/user"
<<<<<<< HEAD
          element={
            <PrivateRoute
              component={ListUser}
              roles={["Admin", "Super Admin"]}
            />
          }
        />
        <Route
          path="/admin/book"
          element={
            <PrivateRoute
              component={AdminBooks}
              roles={["Admin", "Super Admin"]}
            />
          }
=======
          element={<PrivateRoute component={ListUser} roles={["Admin"]} />}
        />
        <Route
          path="/admin/book"
          element={<PrivateRoute component={AdminBooks} roles={["Admin"]} />}
>>>>>>> refs/remotes/origin/main
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute
              component={Dashboard}
              roles={["Admin", "Super Admin"]}
            />
          }
        />
      </Routes>
      <div className="footer-class"></div>
      {/* <Footer /> */}
    </div>
  );
}
function AccessDenied() {
  return (
    <div className="forbiddenPage">
      <div></div>
      <h1>
        <span className="forbiddenTitle">404</span> - Not Found
      </h1>
      <p>
        This Page Is Not Found.{" "}
        <a href="javascript:history.go(-1)">Return To Previous Page</a>
      </p>
    </div>
  );
}
export default App;
