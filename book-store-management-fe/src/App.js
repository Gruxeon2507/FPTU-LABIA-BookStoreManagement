import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ListBook from "./components/ListBook";
import Navbar from "./components/NavBar/NavBar";
import ViewABook from "./components/ViewBook/ViewABook";
import UserProfile from "./components/UserProfile/UserProfile";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/"></Route>
        <Route path="/user" Component={UserProfile}></Route>
        <Route path="/book/view/:bookId" Component={ViewABook}></Route>
      </Routes>
    </div>
  );
}

export default App;
