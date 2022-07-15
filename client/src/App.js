import "./App.css";
import Login from "./pages/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import CreatePost from "./components/CreatePost";
import { useSelector } from "react-redux";
import DetailPost from "./pages/DetailPost";
function App() {
  const { user } = useSelector((state) => state.user);
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
          <Route
            path='/posts/createPost'
            element={user ? <CreatePost /> : <Navigate to={`/login`} />}
          />
          <Route
            path='/posts/:id'
            element={user ? <CreatePost /> : <Navigate to={`/login`} />}
          />
          <Route path='/:id' element={<DetailPost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
