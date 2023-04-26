
import "./App.css";
import ListBook from "./components/Homepage/ListBook";
import UserProfile from "./components/UserProfile/UserProfile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar/NavBar";
import AccountSetting from "./components/AccountSetting/AccountSetting";
import SuperAdmin from "./components/SuperAdmin/SuperAdmin";
import ListUser from "./components/Admin/ListUser";
import ViewABook from "./components/ViewBook/ViewABook";
import AdminBooks from "./components/Admin/AdminBooks";

import './App.css';
import ListBook from './components/Homepage/ListBook'; 
import UserProfile from './components/UserProfile/UserProfile';
import { BrowserRouter as Router, Routes,Route} from "react-router-dom";
import Navbar from './components/NavBar/NavBar';
import AccountSetting from './components/AccountSetting/AccountSetting';

import AddBook from './components/AddBook/AddBook';
import RegisterUser from './components/RegisterUser/RegisterUser';


import UpdateBook from './components/UpdateBook/UpdateBook';

import LoginForm from './components/Login/Login';
import SessionManager from './components/Authentication/SessionManager/SessionManager';

import ListUser from './components/Admin/ListUser';
import ViewABook from './components/ViewBook/ViewABook';
import Dashboard from './components/Admin/Dashboard';




function App() {
  const role = window.localStorage.getItem("role");
  return (
    <div className="App">
      <Navbar />
      <Routes>

        <Route path="" Component={ListBook}></Route>
        <Route path="/user/:userId" Component={UserProfile}></Route>
        <Route path="/user/setting" Component={AccountSetting}></Route>
        <Route path="/superadmin" Component={SuperAdmin}></Route>
        <Route path="/admin/book" Component={AdminBooks}></Route>
        <Route path="/admin/user" Component={ListUser}></Route>
        <Route path="/book/view/:bookId" Component={ViewABook}></Route>


        <Route path="/login" Component={LoginForm}></Route>
        <Route path="/auth/register" Component={RegisterUser}></Route>
        {role==="Super Admin" ? 
        (
          <>
            <Route path="/admin" Component={Dashboard}></Route>
            <Route path="" Component={ListBook}></Route>
            <Route path="/user/:userId" Component={UserProfile}></Route>
            <Route path="/user" Component={UserProfile}></Route>
            <Route path="/user/setting" Component={AccountSetting}></Route>
            <Route path="/admin/user" Component={ListUser}></Route>
            <Route path="/book/view/:bookId" Component={ViewABook}></Route>
            <Route path="/book/add" Component={AddBook}></Route>
            <Route path="/book/update/:bookId" Component={UpdateBook}></Route>
          </>
        ) : (<></>)
        }
        {role==="Admin" ? 
        (
          <>
            <Route path="" Component={ListBook}></Route>
            <Route path='/admin' Component={Dashboard}></Route>
            <Route path="/user/:userId" Component={UserProfile}></Route>
            <Route path="/user" Component={UserProfile}></Route>
            <Route path="/user/setting" Component={AccountSetting}></Route>
            <Route path="/admin/user" Component={ListUser}></Route>
            <Route path="/book/view/:bookId" Component={ViewABook}></Route>
            <Route path="/book/add" Component={AddBook}></Route>
            <Route path="/book/update/:bookId" Component={UpdateBook}></Route>
          </>
        ) : (<></>)
        }
        {role==="User" ? 
        (
          <>
            <Route path="" Component={ListBook}></Route>
            <Route path="/user/:userId" Component={UserProfile}></Route>
            <Route path="/user" Component={UserProfile}></Route>
            <Route path="/user/setting" Component={AccountSetting}></Route>
            <Route path="/book/view/:bookId" Component={ViewABook}></Route>
            <Route path="/book/add" Component={AddBook}></Route>
            <Route path="/book/update/:bookId" Component={UpdateBook}></Route>
          </>
        ) : (<></>)
        }       
        <Route path='*' Component={AccessDenied}></Route>


      </Routes>
      
    </div>
   );
}
function AccessDenied() {
  return <div>Access denied. You are not authorized to access this page.</div>;
}
export default App;
