import './App.css';
import ListBook from "./components/Homepage/ListBook"
import UserProfile from './components/UserProfile/UserProfile';
import { BrowserRouter as Router, Routes,Route} from "react-router-dom";
import Navbar from './components/NavBar/NavBar';
import AccountSetting from './components/AccountSetting/AccountSetting';
import AddBook from './components/AddBook/AddBook';
import RegisterUser from './components/RegisterUser/RegisterUser';
import UpdateBook from './components/UpdateBook/UpdateBook';
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>

        <Route path="" Component={ListBook}></Route>
        <Route path="/auth/register" Component={RegisterUser}></Route>
        <Route path="/user/:userId" Component={UserProfile}></Route>
        <Route path="/user/setting" Component={AccountSetting}></Route>
        <Route path="/book/add" Component={AddBook}></Route>
        <Route path="/book/update/:bookId" Component={UpdateBook}></Route>
      </Routes>
      
    </div>
   );
}

export default App;
