import './App.css';
import ListBook from "./components/Homepage/ListBook"
import UserProfile from './components/UserProfile/UserProfile';
import { BrowserRouter as Router, Routes,Route} from "react-router-dom";
import Navbar from './components/NavBar/NavBar';
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" Component={ListBook}></Route>
        <Route path="/user" Component={UserProfile}></Route>
      </Routes>
      
    </div>
   );
}

export default App;
