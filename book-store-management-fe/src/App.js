import './App.css';
import ListBook from './components/Homepage/ListBook'; 
import UserProfile from './components/UserProfile/UserProfile';
import { BrowserRouter as Router, Routes,Route} from "react-router-dom";
import Navbar from './components/NavBar/NavBar';
import AccountSetting from './components/AccountSetting/AccountSetting';
import LoginForm from './components/Login/Login';
import SessionManager from './components/Authentication/SessionManager/SessionManager';
import SuperAdmin from './components/SuperAdmin/SuperAdmin';
import ListUser from './components/Admin/ListUser';
import ViewABook from './components/ViewBook/ViewABook';
function App() {
  const role = window.localStorage.getItem("role");
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/login" Component={LoginForm}></Route>
        {role==="Super Admin" ? 
        (
          <>
            <Route path="/superadmin" Component={SuperAdmin}></Route>
            <Route path="" Component={ListBook}></Route>
            <Route path="/user/:userId" Component={UserProfile}></Route>
            <Route path="/user" Component={UserProfile}></Route>
            <Route path="/user/setting/:userId" Component={AccountSetting}></Route>
            <Route path="/admin/user" Component={ListUser}></Route>
            <Route path="/book/view/:bookId" Component={ViewABook}></Route>
          </>
        ) : (<></>)
        }
        {role==="Admin" ? 
        (
          <>
            <Route path="" Component={ListBook}></Route>
            <Route path="/user/:userId" Component={UserProfile}></Route>
            <Route path="/user" Component={UserProfile}></Route>
            <Route path="/user/setting/:userId" Component={AccountSetting}></Route>
            
    
            <Route path="/admin/user" Component={ListUser}></Route>
            <Route path="/book/view/:bookId" Component={ViewABook}></Route>
          </>
        ) : (<></>)
        }
        {role==="User" ? 
        (
          <>
            <Route path="" Component={ListBook}></Route>
            <Route path="/user/:userId" Component={UserProfile}></Route>
            <Route path="/user" Component={UserProfile}></Route>
            <Route path="/user/setting/:userId" Component={AccountSetting}></Route>
            <Route path="/book/view/:bookId" Component={ViewABook}></Route>
          </>
        ) : (<></>)
        }
        {/* <>
            <Route path="/user/:userId" Component={UserProfile}></Route>
            <Route path="/user/setting/:userId" Component={AccountSetting}></Route>
            <Route path="/book/view/:bookId" Component={ViewABook}></Route>
          </> */}
        <Route path='*' Component={AccessDenied}></Route>

      </Routes>
      
    </div>
   );
}
function AccessDenied() {
  return <div>Access denied. You are not authorized to access this page.</div>;
}
export default App;
