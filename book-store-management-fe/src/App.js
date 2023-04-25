import './App.css';
import ListBook from "./components/Homepage/ListBook"
import UserProfile from './components/UserProfile/UserProfile';
import { BrowserRouter as Router, Routes,Route} from "react-router-dom";
import Navbar from './components/NavBar/NavBar';
import AccountSetting from './components/AccountSetting/AccountSetting';
import ListUser from './components/Admin/ListUser';
import Dashboard from './components/Admin/Dashboard';
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="" Component={ListBook}></Route>
        <Route path="/user/:userId" Component={UserProfile}></Route>
        <Route path="/user/setting" Component={AccountSetting}></Route>
        <Route path="/superadmin" Component={Dashboard}></Route>
        <Route path="/admin/user" Component={ListUser}></Route>
      </Routes>
      
    </div>
   );
}

export default App;
